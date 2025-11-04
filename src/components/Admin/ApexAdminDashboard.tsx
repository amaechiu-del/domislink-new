/**
 * Apex Admin Dashboard - Supreme Administrator with Full Control
 * Highest level administrator with complete system authority
 */
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { onDeploymentStatusUpdate } from '../../utils/deploymentStatus';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  Crown, 
  Users, 
  DollarSign, 
  Settings, 
  Shield, 
  BarChart3,
  MessageSquare,
  UserCheck,
  Lock,
  Eye,
  Rocket,
  Cloud,
  History,
  Activity,
  Building,
  Mail,
  Phone,
  Download,
  Terminal,
  Cpu,
  GitBranch,
  CheckCircle
} from 'lucide-react';

interface SubAdmin {
  id: string;
  name: string;
  email: string;
  assignedPage: string;
  status: 'active' | 'inactive' | 'pending';
  permissions: string[];
  recommendations: number;
  lastActive: string;
}

interface RevenueRecord {
  id: string;
  amount: number;
  source: string;
  timestamp: string;
  status: 'completed' | 'pending' | 'failed';
  userEmail: string;
}

export default function ApexAdminDashboard() {
  const [subAdmins, setSubAdmins] = useState<SubAdmin[]>([]);
  const [revenueRecords, setRevenueRecords] = useState<RevenueRecord[]>([]);
  const [pendingRecommendations, setPendingRecommendations] = useState<any[]>([]);
  const [selectedSubAdmin, setSelectedSubAdmin] = useState<SubAdmin | null>(null);
  const [deploymentStatus, setDeploymentStatus] = useState<{
    active: boolean;
    message: string;
    progress: number;
    timestamp?: string;
  }>({
    active: false,
    message: 'No active deployments',
    progress: 0
  });

  useEffect(() => {
    // Mock data - in real app, this would come from API
    setSubAdmins([
      {
        id: '1',
        name: 'Sarah Chen',
        email: 'sarah@domislink.academy',
        assignedPage: 'University Hub',
        status: 'active',
        permissions: ['view_analytics', 'make_recommendations'],
        recommendations: 12,
        lastActive: '2024-01-15T10:30:00Z'
      },
      {
        id: '2',
        name: 'Marcus Johnson',
        email: 'marcus@domislink.academy',
        assignedPage: 'Marketplace Hub',
        status: 'active',
        permissions: ['view_analytics', 'make_recommendations'],
        recommendations: 8,
        lastActive: '2024-01-15T09:15:00Z'
      },
      {
        id: '3',
        name: 'Aisha Patel',
        email: 'aisha@domislink.academy',
        assignedPage: 'Real Estate Hub',
        status: 'pending',
        permissions: ['view_analytics'],
        recommendations: 3,
        lastActive: '2024-01-14T16:45:00Z'
      }
    ]);

    setRevenueRecords([
      {
        id: 'rev1',
        amount: 299.99,
        source: 'University Course',
        timestamp: '2024-01-15T10:15:00Z',
        status: 'completed',
        userEmail: 'student1@example.com'
      },
      {
        id: 'rev2',
        amount: 49.99,
        source: 'Marketplace Purchase',
        timestamp: '2024-01-15T09:30:00Z',
        status: 'completed',
        userEmail: 'customer@example.com'
      },
      {
        id: 'rev3',
        amount: 1999.99,
        source: 'Real Estate Subscription',
        timestamp: '2024-01-15T08:45:00Z',
        status: 'pending',
        userEmail: 'buyer@example.com'
      }
    ]);

    // Load initial deployment status
    const savedStatus = localStorage.getItem('deployment_status');
    if (savedStatus) {
      setDeploymentStatus(JSON.parse(savedStatus));
    }

    // Listen for real-time deployment updates
    const cleanup = onDeploymentStatusUpdate((status) => {
      setDeploymentStatus(status);
    });

    return cleanup;
  }, []);

  const totalRevenue = revenueRecords
    .filter(record => record.status === 'completed')
    .reduce((sum, record) => sum + record.amount, 0);

  const handleApproveRecommendation = (recommendationId: string) => {
    // Implementation for approving recommendations
    console.log('Approving recommendation:', recommendationId);
  };

  const handleRejectRecommendation = (recommendationId: string) => {
    // Implementation for rejecting recommendations
    console.log('Rejecting recommendation:', recommendationId);
  };

  const handleCreateSubAdmin = () => {
    // Implementation for creating new sub-admin
    console.log('Creating new sub-admin');
  };

  const exportCEOContact = () => {
    const ceoContact = {
      name: 'Amaechi Ubadike',
      title: 'Chief Executive Officer & Founder',
      company: 'DomisLink International Services, Ltd',
      primaryEmail: 'ceo@domislink.com',
      secondaryEmails: ['amaechi.u@gmail.com', 'ubadike,a@live.com'],
      phone: '+2349049837474',
      office: 'Executive Suite, DomisLink Headquarters',
      location: 'Nigeria'
    };

    const blob = new Blob([JSON.stringify(ceoContact, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Amaechi_Ubadike_CEO_Contact.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    alert('CEO contact information exported successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Crown className="h-8 w-8 text-yellow-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Amaechi Ubadike</h1>
              <p className="text-gray-600">Chief Executive Officer & Founder - DomisLink International Services, Ltd</p>
              <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                <span>📧 ceo@domislink.com</span>
                <span>📱 +2349049837474</span>
                <span>🏢 Executive Suite</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              <Building className="h-4 w-4 mr-1" />
              Founder
            </Badge>
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
              <Shield className="h-4 w-4 mr-1" />
              CEO Access
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Quick Stats */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-gray-600">All-time platform earnings</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Sub-Admins</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{subAdmins.filter(admin => admin.status === 'active').length}</div>
            <p className="text-xs text-gray-600">Managing platform sections</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Actions</CardTitle>
            <BarChart3 className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingRecommendations.length}</div>
            <p className="text-xs text-gray-600">Recommendations awaiting approval</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sub-Admins Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <UserCheck className="h-5 w-5 mr-2" />
              Sub-Administrators
            </CardTitle>
            <CardDescription>
              Manage page-specific administrators and their permissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {subAdmins.map((admin) => (
                <div key={admin.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{admin.name}</div>
                    <div className="text-sm text-gray-600">{admin.assignedPage}</div>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant={admin.status === 'active' ? 'default' : 'secondary'}>
                        {admin.status}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {admin.recommendations} recommendations
                      </span>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="bg-transparent"
                    onClick={() => setSelectedSubAdmin(admin)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button onClick={handleCreateSubAdmin} className="w-full">
                <Users className="h-4 w-4 mr-2" />
                Add New Sub-Admin
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Revenue Monitoring */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="h-5 w-5 mr-2" />
              Revenue Streams
            </CardTitle>
            <CardDescription>
              Real-time financial tracking and monetization insights
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {revenueRecords.map((record) => (
                <div key={record.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{record.source}</div>
                    <div className="text-sm text-gray-600">{record.userEmail}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-600">${record.amount}</div>
                    <Badge variant={record.status === 'completed' ? 'default' : 'secondary'}>
                      {record.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Real Code Push Engine */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Rocket className="h-5 w-5 mr-2" />
              CEO Code Push Engine
            </CardTitle>
            <CardDescription>
              Deploy actual code changes using natural language. AI generates production-ready code instantly.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border">
                  <div className="font-medium mb-2">🎯 Natural Language Deployment</div>
                  <p className="text-sm text-gray-600 mb-3">
                    Describe what you want to build or change. AI generates and deploys the code.
                  </p>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center">
                      <CheckCircle className="h-3 w-3 text-green-600 mr-2" />
                      <span>Pricing structure updates</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-3 w-3 text-green-600 mr-2" />
                      <span>UI/UX improvements</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-3 w-3 text-green-600 mr-2" />
                      <span>Feature deployments</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-3 w-3 text-green-600 mr-2" />
                      <span>API integrations</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg border">
                  <div className="font-medium mb-2">🚀 Instant Execution</div>
                  <p className="text-sm text-gray-600 mb-3">
                    CEO commands execute immediately with enterprise-grade deployment pipeline.
                  </p>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center">
                      <Rocket className="h-3 w-3 text-blue-600 mr-2" />
                      <span>Real code generation</span>
                    </div>
                    <div className="flex items-center">
                      <GitBranch className="h-3 w-3 text-blue-600 mr-2" />
                      <span>Version control integration</span>
                    </div>
                    <div className="flex items-center">
                      <Cpu className="h-3 w-3 text-blue-600 mr-2" />
                      <span>AI-powered optimization</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-3 w-3 text-blue-600 mr-2" />
                      <span>Production deployment</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  <Terminal className="h-4 w-4 mr-2" />
                  Open Code Push Console
                </Button>
                <Button variant="outline" className="bg-transparent">
                  <FileText className="h-4 w-4 mr-2" />
                  View Deployment Docs
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Deployment Status Monitor */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              Deployment Status
            </CardTitle>
            <CardDescription>
              Real-time deployment progress and system updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className={`p-4 rounded-lg border ${
                deploymentStatus.active 
                  ? 'border-blue-200 bg-blue-50' 
                  : 'border-gray-200 bg-gray-50'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium">
                    {deploymentStatus.active ? '🔄 Deployment in Progress' : '✅ System Ready'}
                  </div>
                  {deploymentStatus.timestamp && (
                    <div className="text-sm text-gray-500">
                      {new Date(deploymentStatus.timestamp).toLocaleTimeString()}
                    </div>
                  )}
                </div>
                <div className="text-sm text-gray-600 mb-3">
                  {deploymentStatus.message}
                </div>
                {deploymentStatus.active && (
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${deploymentStatus.progress}%` }}
                    ></div>
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="font-bold text-green-600">12</div>
                  <div className="text-green-500">Successful Deploys</div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="font-bold text-blue-600">0</div>
                  <div className="text-blue-500">Active Deployments</div>
                </div>
                <div className="text-center p-3 bg-yellow-50 rounded-lg">
                  <div className="font-bold text-yellow-600">3</div>
                  <div className="text-yellow-500">Pending Updates</div>
                </div>
                <div className="text-center p-3 bg-red-50 rounded-lg">
                  <div className="font-bold text-red-600">1</div>
                  <div className="text-red-500">Failed Deploys</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CEO Contact & Communications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              CEO Contact Information
            </CardTitle>
            <CardDescription>
              Executive contact details and communication channels
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Primary Contact */}
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="font-medium">Primary Contact</div>
                <div className="text-sm text-gray-600 space-y-1 mt-2">
                  <div className="flex items-center">
                    <span className="w-20 font-medium">Email:</span>
                    <span>ceo@domislink.com</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-20 font-medium">Phone:</span>
                    <span>+2349049837474</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-20 font-medium">Office:</span>
                    <span>Executive Suite</span>
                  </div>
                </div>
              </div>
              
              {/* Secondary Emails */}
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="font-medium">Secondary Email Accounts</div>
                <div className="text-sm text-gray-600 space-y-1 mt-2">
                  <div>📧 amaechi.u@gmail.com</div>
                  <div>📧 ubadike,a@live.com</div>
                </div>
              </div>
              
              {/* Communication Channels */}
              <div className="p-3 bg-purple-50 rounded-lg">
                <div className="font-medium">Communication Channels</div>
                <div className="text-sm text-gray-600 space-y-1 mt-2">
                  <div>• Corporate Announcements</div>
                  <div>• Executive Decisions Tracking</div>
                  <div>• Team Coordination</div>
                  <div>• Investor Relations</div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                <Button variant="outline" className="bg-transparent">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </Button>
                <Button>
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now
                </Button>
                <Button variant="outline" className="bg-transparent" onClick={() => exportCEOContact()}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Chief Accountant */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="h-5 w-5 mr-2" />
              AI Chief Accountant
            </CardTitle>
            <CardDescription>
              Automated financial management for DomisLink International
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="font-medium">Revenue Tracking</div>
                <div className="text-sm text-gray-600">Real-time income monitoring</div>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="font-medium">Receipt Automation</div>
                <div className="text-sm text-gray-600">Email, WhatsApp, Telegram</div>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <div className="font-medium">Sponsor Notifications</div>
                <div className="text-sm text-gray-600">Student progress updates</div>
              </div>
              <Button className="w-full">
                Configure AI Accountant
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Admin Chat Space */}
      <SmartChatSpace context="admin" />
    </div>
  );
}