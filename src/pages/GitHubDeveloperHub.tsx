/**
 * GitHub Developer Hub Page
 * Central location for GitHub-related development tools and PR management
 */

import { ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import GitHubPRDashboard from '../components/Admin/GitHubPRDashboard';

export default function GitHubDeveloperHub() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Navigation */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => window.history.back()}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>

        {/* Main Dashboard */}
        <GitHubPRDashboard />
      </div>
    </div>
  );
}
