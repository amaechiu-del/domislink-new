# GitHub Pull Request Dashboard - Usage Guide

## Overview
The GitHub PR Dashboard is a powerful tool for monitoring and managing pull requests from any GitHub repository. It provides advanced filtering, sorting, and visualization capabilities.

## Accessing the Dashboard
Navigate to: `/#/github-pr` in your browser

## Features

### 1. Configuration
Click the **Settings** button to configure:
- **Repository Owner**: GitHub username or organization name
- **Repository Name**: Name of the repository
- **Public repositories only**: This client dashboard does not accept GitHub tokens. Use a server-side GitHub App or proxy for private repository access.

### 2. Statistics Dashboard
View real-time metrics:
- **Total Open**: All open pull requests
- **Ready**: PRs ready for review (not drafts)
- **Draft**: Work-in-progress PRs
- **With Comments**: PRs with review comments or discussions
- **Needs Review**: PRs without any comments yet

### 3. Filtering & Search
- **Search**: Find PRs by title or PR number
- **Author**: Filter by GitHub username
- **Label**: Filter by label name
- **Sort By**: 
  - Recently Updated (default)
  - Recently Created
  - Most Popular (by comments/reactions)
- **Include Draft PRs**: Toggle to show/hide draft PRs

### 4. Pull Request Cards
Each PR card displays:
- Status badge (Draft/Open) with visual indicators
- PR number and title (clickable link to GitHub)
- Author avatar and username
- Time since last update
- Comment count
- Branch information (source → target)
- Labels with color coding
- Assigned reviewers

### 5. Refresh
Click **Refresh** to fetch the latest PR data from GitHub

## Tips

### Rate Limits
- GitHub applies unauthenticated API limits to this browser-based dashboard.
- Refresh only when needed and use filtering to reduce unnecessary requests.

### Best Practices
1. **Use Tokens for Private Repos**: Authentication is required for private repositories
2. **Save Configuration**: Your settings are saved in browser localStorage
3. **Filter Strategically**: Use multiple filters to narrow down PRs
4. **Check Time Stamps**: "Time since update" helps identify stale PRs

### Keyboard Shortcuts
- Use browser's search (Ctrl+F / Cmd+F) to find specific text within loaded PRs

## Troubleshooting

### "Failed to fetch" Error
**Causes**:
- Invalid repository owner/name
- Rate limit exceeded
- Network connectivity issues
- Private repository

**Solutions**:
- Verify repository owner and name are correct
- Check your internet connection
- Use a server-side GitHub App or proxy for private repositories

### No PRs Displayed
**Possible reasons**:
- Repository has no open PRs
- Filters are too restrictive
- Try adjusting or clearing filters

## API Reference
The dashboard uses GitHub's REST API v3:
- Endpoint: `GET /repos/{owner}/{repo}/pulls`
- Documentation: https://docs.github.com/en/rest/pulls/pulls

## Security
- The dashboard does not collect or store GitHub credentials.
- It uses unauthenticated GitHub API requests and is intended for public repositories.
- Access private repositories only through a server-side integration with least-privilege credentials.

## Future Features (Roadmap)
- Real-time updates via webhooks
- PR creation and editing
- Review submission
- Analytics and insights
- Multi-repository view
- Export functionality
