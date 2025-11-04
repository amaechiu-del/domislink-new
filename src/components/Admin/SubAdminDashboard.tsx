/**
 * Sub-Admin Dashboard - Page-Specific Administrator with Limited Permissions
 * Can view analytics and make recommendations but cannot implement changes
 */
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { 
  BarChart3, 
  MessageSquare, 
  Eye, 
  Send,
  Clock,
  CheckCircle,
  XCircle,
  User
} from 'lucide-react';

interface SubAdminDashboardProps {
  assignedPage: string;
  adminName: string;
}

interface Recommendation {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  timestamp: string;
  response?: string;
}

export default function SubAdminDashboard({ assignedPage, adminName }: SubAdminDashboardProps) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [newRecommendation, setNewRecommendation] = useState({
    title: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const pageAnalytics = {
    visitors: '12,458',
    engagement: '68%',
    revenue: '$45,230',
    conversions: '324'
  };

  const handleSubmitRecommendation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRecommendation.title || !newRecommendation.description) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const recommendation: Recommendation = {
        id: Date.now().toString(),
        title: newRecommendation.title,
        description: newRecommendation.description,
        status: 'pending',
        timestamp: new Date().toISOString()
      };

      setRecommendations(prev => [recommendation, ...prev]);
      setNewRecommendation({ title: '', description: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{assignedPage} Administration</h1>
            <p className="text-gray-600">Welcome, {adminName}. You have view-only access with recommendation privileges.</p>
          </div>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            <User className="h-4 w-4 mr-1" />
            Sub-Administrator
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        {/* Analytics Cards */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Visitors</CardTitle>
            <Eye className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pageAnalytics.visitors}</div>
            <p className="text-xs text-gray-600">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pageAnalytics.engagement}</div>
            <p className="text-xs text-gray-600">User interaction level</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Page Revenue</CardTitle>
            <Send className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pageAnalytics.revenue}</div>
            <p className="text-xs text-gray-600">Current month earnings</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversions</CardTitle>
            <CheckCircle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pageAnalytics.conversions}</div>
            <p className="text-xs text-gray-600">Successful actions</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Make Recommendation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              Submit Recommendation
            </CardTitle>
            <CardDescription>
              Suggest improvements to the Apex Administrator
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitRecommendation} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Recommendation Title</label>
                <input
                  type="text"
                  value={newRecommendation.title}
                  onChange={(e) => setNewRecommendation(prev => ({
                    ...prev,
                    title: e.target.value
                  }))}
                  className="w-full p-2 border rounded-md mt-1"
                  placeholder="Brief title for your recommendation"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Detailed Description</label>
                <Textarea
                  value={newRecommendation.description}
                  onChange={(e) => setNewRecommendation(prev => ({
                    ...prev,
                    description: e.target.value
                  }))}
                  className="w-full mt-1"
                  placeholder="Describe your recommendation in detail. Include expected impact and implementation steps."
                  rows={4}
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Submit to Apex Admin
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Recommendation History */}
        <Card>
          <CardHeader>
            <CardTitle>Recommendation History</CardTitle>
            <CardDescription>
              Track your submitted recommendations and their status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendations.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No recommendations submitted yet</p>
                </div>
              ) : (
                recommendations.map((recommendation) => (
                  <div key={recommendation.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="font-medium">{recommendation.title}</div>
                      <Badge className={getStatusColor(recommendation.status)}>
                        <span className="flex items-center">
                          {getStatusIcon(recommendation.status)}
                          <span className="ml-1 capitalize">{recommendation.status}</span>
                        </span>
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{recommendation.description}</p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>Submitted: {new Date(recommendation.timestamp).toLocaleDateString()}</span>
                      {recommendation.response && (
                        <span>Response: {recommendation.response}</span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}