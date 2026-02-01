/**
 * GitHub PR Dashboard - Developer Tools
 * Lists and manages open pull requests with advanced filtering and sorting
 */

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { 
  GitPullRequest,
  GitBranch,
  GitMerge,
  Calendar,
  MessageSquare,
  Search,
  RefreshCw,
  Settings,
  ExternalLink,
  Filter,
  TrendingUp,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';
import githubAPI, { PullRequest, GitHubConfig } from '../../utils/githubApiService';
import { Alert, AlertDescription } from '../ui/alert';

export default function GitHubPRDashboard() {
  const [pullRequests, setPullRequests] = useState<PullRequest[]>([]);
  const [filteredPRs, setFilteredPRs] = useState<PullRequest[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');
  const [filterAuthor, setFilterAuthor] = useState('');
  const [filterLabel, setFilterLabel] = useState('');
  const [showDrafts, setShowDrafts] = useState(true);
  const [sortBy, setSortBy] = useState<'created' | 'updated' | 'popularity'>('updated');
  const [showConfig, setShowConfig] = useState(false);
  const [config, setConfig] = useState<GitHubConfig>({
    owner: 'amaechiu-del',
    repo: 'domislink-new',
    token: ''
  });

  // Load PRs on component mount
  useEffect(() => {
    loadPullRequests();
    
    // Load saved configuration
    const savedConfig = localStorage.getItem('github_config');
    if (savedConfig) {
      try {
        setConfig(JSON.parse(savedConfig));
      } catch (e) {
        console.error('Failed to parse config:', e);
      }
    }
  }, []);

  // Apply filters when PRs or filter criteria change
  useEffect(() => {
    applyFilters();
  }, [pullRequests, searchText, filterAuthor, filterLabel, showDrafts]);

  const loadPullRequests = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const prs = await githubAPI.fetchOpenPullRequests('open', sortBy, 'desc');
      setPullRequests(prs);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch pull requests');
      console.error('Error loading PRs:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = githubAPI.filterPullRequests(pullRequests, {
      author: filterAuthor,
      label: filterLabel,
      draft: showDrafts ? undefined : false,
      searchText: searchText
    });

    setFilteredPRs(filtered);
  };

  const saveConfiguration = () => {
    githubAPI.saveConfig(config);
    setShowConfig(false);
    loadPullRequests();
  };

  const statistics = githubAPI.getStatistics(filteredPRs);

  const getTimeSince = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    const weeks = Math.floor(days / 7);
    if (weeks < 4) return `${weeks}w ago`;
    const months = Math.floor(days / 30);
    return `${months}mo ago`;
  };

  const getStateColor = (pr: PullRequest): string => {
    if (pr.draft) return 'bg-gray-100 text-gray-800 border-gray-300';
    if (pr.mergeable_state === 'behind') return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    if (pr.review_comments > 0) return 'bg-blue-100 text-blue-800 border-blue-300';
    return 'bg-green-100 text-green-800 border-green-300';
  };

  const getStateIcon = (pr: PullRequest) => {
    if (pr.draft) return <Clock className="h-3 w-3" />;
    if (pr.mergeable_state === 'behind') return <AlertCircle className="h-3 w-3" />;
    if (pr.review_comments > 0) return <MessageSquare className="h-3 w-3" />;
    return <CheckCircle2 className="h-3 w-3" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center text-2xl">
                <GitPullRequest className="h-6 w-6 mr-2 text-purple-600" />
                GitHub Pull Requests
              </CardTitle>
              <CardDescription>
                Monitor and manage open pull requests for {config.owner}/{config.repo}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowConfig(!showConfig)}
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={loadPullRequests}
                disabled={isLoading}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </div>
        </CardHeader>

        {showConfig && (
          <CardContent className="border-t pt-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Repository Owner</label>
                  <Input
                    value={config.owner}
                    onChange={(e) => setConfig({ ...config, owner: e.target.value })}
                    placeholder="username or org"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Repository Name</label>
                  <Input
                    value={config.repo}
                    onChange={(e) => setConfig({ ...config, repo: e.target.value })}
                    placeholder="repository-name"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  GitHub Token (Optional - for private repos and higher rate limits)
                </label>
                <Input
                  type="password"
                  value={config.token}
                  onChange={(e) => setConfig({ ...config, token: e.target.value })}
                  placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Create a token at: https://github.com/settings/tokens
                </p>
              </div>
              <Button onClick={saveConfiguration} className="w-full">
                Save Configuration
              </Button>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-5 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{statistics.total}</div>
              <div className="text-sm text-gray-600 mt-1">Total Open</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{statistics.ready}</div>
              <div className="text-sm text-gray-600 mt-1">Ready</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-600">{statistics.draft}</div>
              <div className="text-sm text-gray-600 mt-1">Draft</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{statistics.withComments}</div>
              <div className="text-sm text-gray-600 mt-1">With Comments</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">{statistics.needsReview}</div>
              <div className="text-sm text-gray-600 mt-1">Needs Review</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Filter className="h-5 w-5 mr-2" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="Search by title or number..."
                  className="pl-9"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Author</label>
              <Input
                value={filterAuthor}
                onChange={(e) => setFilterAuthor(e.target.value)}
                placeholder="Filter by author..."
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Label</label>
              <Input
                value={filterLabel}
                onChange={(e) => setFilterLabel(e.target.value)}
                placeholder="Filter by label..."
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value as 'created' | 'updated' | 'popularity');
                  loadPullRequests();
                }}
                className="w-full h-10 px-3 border rounded-md"
              >
                <option value="updated">Recently Updated</option>
                <option value="created">Recently Created</option>
                <option value="popularity">Most Popular</option>
              </select>
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <input
              type="checkbox"
              id="showDrafts"
              checked={showDrafts}
              onChange={(e) => setShowDrafts(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="showDrafts" className="text-sm font-medium cursor-pointer">
              Include Draft PRs
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Error Display */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error}
            {error.includes('rate limit') && (
              <span className="block mt-2 text-sm">
                Tip: Add a GitHub token in settings to increase rate limits.
              </span>
            )}
          </AlertDescription>
        </Alert>
      )}

      {/* Pull Requests List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Pull Requests ({filteredPRs.length})
            </span>
            {isLoading && (
              <Badge variant="outline">
                <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                Loading...
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredPRs.map((pr) => (
              <div
                key={pr.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={getStateColor(pr)} variant="outline">
                        {getStateIcon(pr)}
                        <span className="ml-1">{pr.draft ? 'Draft' : 'Open'}</span>
                      </Badge>
                      <span className="text-sm font-medium text-gray-500">#{pr.number}</span>
                    </div>
                    
                    <h3 className="font-medium text-lg mb-2 hover:text-blue-600">
                      <a 
                        href={pr.html_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        {pr.title}
                        <ExternalLink className="h-4 w-4 ml-2 opacity-50" />
                      </a>
                    </h3>

                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center">
                        <Avatar className="h-6 w-6 mr-2">
                          <AvatarImage src={pr.user.avatar_url} alt={pr.user.login} />
                          <AvatarFallback>{pr.user.login[0].toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <span>{pr.user.login}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {getTimeSince(pr.updated_at)}
                      </div>
                      {(pr.comments > 0 || pr.review_comments > 0) && (
                        <div className="flex items-center">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          {pr.comments + pr.review_comments}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <GitBranch className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {pr.head.ref}
                      </span>
                      <GitMerge className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {pr.base.ref}
                      </span>
                    </div>

                    {pr.labels.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {pr.labels.map((label, idx) => (
                          <Badge
                            key={idx}
                            variant="secondary"
                            style={{
                              backgroundColor: `#${label.color}33`,
                              borderColor: `#${label.color}`,
                              color: `#${label.color}`
                            }}
                          >
                            {label.name}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {pr.assignees.length > 0 && (
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-sm text-gray-500">Assignees:</span>
                        {pr.assignees.map((assignee, idx) => (
                          <Avatar key={idx} className="h-6 w-6">
                            <AvatarImage src={assignee.avatar_url} alt={assignee.login} />
                            <AvatarFallback>{assignee.login[0].toUpperCase()}</AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {!isLoading && filteredPRs.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <GitPullRequest className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">No pull requests found</p>
                <p className="text-sm mt-2">
                  {pullRequests.length === 0
                    ? 'There are no open pull requests in this repository.'
                    : 'Try adjusting your filters to see more results.'}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
