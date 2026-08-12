/**
 * GitHub API Service
 * Handles all GitHub API interactions including PR listing, repository info, etc.
 */

export interface PullRequest {
  id: number;
  number: number;
  title: string;
  state: 'open' | 'closed' | 'merged';
  user: {
    login: string;
    avatar_url: string;
  };
  created_at: string;
  updated_at: string;
  html_url: string;
  draft: boolean;
  labels: Array<{
    name: string;
    color: string;
  }>;
  assignees: Array<{
    login: string;
    avatar_url: string;
  }>;
  head: {
    ref: string;
  };
  base: {
    ref: string;
  };
  mergeable_state?: string;
  comments: number;
  review_comments: number;
  commits: number;
}

export interface GitHubConfig {
  owner: string;
  repo: string;
}

class GitHubAPIService {
  private baseURL = 'https://api.github.com';
  private config: GitHubConfig | null = null;

  /**
   * Initialize the GitHub API service with repository configuration
   */
  configure(config: GitHubConfig): void {
    this.config = config;
  }

  /**
   * Get configuration from localStorage or use defaults
   */
  private getConfig(): GitHubConfig {
    if (this.config) return this.config;

    // Try to load from localStorage
    const savedConfig = localStorage.getItem('github_config');
    if (savedConfig) {
      try {
        return JSON.parse(savedConfig);
      } catch (e) {
        console.error('Failed to parse GitHub config:', e);
      }
    }

    // Default configuration
    return {
      owner: 'amaechiu-del',
      repo: 'domislink-new'
    };
  }

  /**
   * Save configuration to localStorage
   */
  saveConfig(config: GitHubConfig): void {
    this.config = config;
    localStorage.setItem('github_config', JSON.stringify(config));
  }

  /**
   * Build headers for unauthenticated requests to public repositories.
   */
  private getHeaders(): HeadersInit {
    return {
      Accept: 'application/vnd.github.v3+json',
    };
  }

  /**
   * Fetch all open pull requests for the configured repository
   */
  async fetchOpenPullRequests(
    state: 'open' | 'closed' | 'all' = 'open',
    sort: 'created' | 'updated' | 'popularity' = 'updated',
    direction: 'asc' | 'desc' = 'desc'
  ): Promise<PullRequest[]> {
    const config = this.getConfig();
    const url = `${this.baseURL}/repos/${config.owner}/${config.repo}/pulls?state=${state}&sort=${sort}&direction=${direction}&per_page=100`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data as PullRequest[];
    } catch (error) {
      console.error('Failed to fetch pull requests:', error);
      throw error;
    }
  }

  /**
   * Fetch a specific pull request by number
   */
  async fetchPullRequest(prNumber: number): Promise<PullRequest> {
    const config = this.getConfig();
    const url = `${this.baseURL}/repos/${config.owner}/${config.repo}/pulls/${prNumber}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data as PullRequest;
    } catch (error) {
      console.error('Failed to fetch pull request:', error);
      throw error;
    }
  }

  /**
   * Get rate limit information
   */
  async getRateLimit(): Promise<{
    limit: number;
    remaining: number;
    reset: number;
  }> {
    const url = `${this.baseURL}/rate_limit`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data.rate;
    } catch (error) {
      console.error('Failed to fetch rate limit:', error);
      throw error;
    }
  }

  /**
   * Filter PRs by various criteria
   */
  filterPullRequests(
    prs: PullRequest[],
    filters: {
      author?: string;
      label?: string;
      assignee?: string;
      draft?: boolean;
      searchText?: string;
    }
  ): PullRequest[] {
    let filtered = [...prs];

    if (filters.author) {
      filtered = filtered.filter(pr => 
        pr.user.login.toLowerCase().includes(filters.author!.toLowerCase())
      );
    }

    if (filters.label) {
      filtered = filtered.filter(pr =>
        pr.labels.some(label => 
          label.name.toLowerCase().includes(filters.label!.toLowerCase())
        )
      );
    }

    if (filters.assignee) {
      filtered = filtered.filter(pr =>
        pr.assignees.some(assignee =>
          assignee.login.toLowerCase().includes(filters.assignee!.toLowerCase())
        )
      );
    }

    if (filters.draft !== undefined) {
      filtered = filtered.filter(pr => pr.draft === filters.draft);
    }

    if (filters.searchText) {
      const searchLower = filters.searchText.toLowerCase();
      filtered = filtered.filter(pr =>
        pr.title.toLowerCase().includes(searchLower) ||
        pr.number.toString().includes(searchLower)
      );
    }

    return filtered;
  }

  /**
   * Group PRs by label
   */
  groupByLabel(prs: PullRequest[]): Map<string, PullRequest[]> {
    const grouped = new Map<string, PullRequest[]>();
    
    prs.forEach(pr => {
      if (pr.labels.length === 0) {
        const unlabeled = grouped.get('unlabeled') || [];
        unlabeled.push(pr);
        grouped.set('unlabeled', unlabeled);
      } else {
        pr.labels.forEach(label => {
          const group = grouped.get(label.name) || [];
          group.push(pr);
          grouped.set(label.name, group);
        });
      }
    });

    return grouped;
  }

  /**
   * Get PR statistics
   */
  getStatistics(prs: PullRequest[]): {
    total: number;
    draft: number;
    ready: number;
    withComments: number;
    needsReview: number;
  } {
    return {
      total: prs.length,
      draft: prs.filter(pr => pr.draft).length,
      ready: prs.filter(pr => !pr.draft).length,
      withComments: prs.filter(pr => pr.comments > 0 || pr.review_comments > 0).length,
      needsReview: prs.filter(pr => !pr.draft && pr.comments === 0 && pr.review_comments === 0).length,
    };
  }
}

// Export singleton instance
export const githubAPI = new GitHubAPIService();
export default githubAPI;
