/**
 * AI Chief Accountant - Automated Financial Management System
 * Handles revenue tracking, receipt generation, and sponsor notifications
 */
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { 
  DollarSign, 
  Mail, 
  MessageCircle, 
  Users, 
  Bell,
  FileText,
  TrendingUp,
  Clock
} from 'lucide-react';

interface FinancialRecord {
  id: string;
  type: 'revenue' | 'expense';
  amount: number;
  description: string;
  timestamp: string;
  category: string;
  status: 'completed' | 'pending' | 'failed';
}

interface StudentRecord {
  id: string;
  name: string;
  email: string;
  course: string;
  progress: number;
  lastActive: string;
  sponsorEmail?: string;
  sponsorName?: string;
  pendingAssignments: number;
}

interface NotificationSettings {
  emailReceipts: boolean;
  whatsappReceipts: boolean;
  telegramReceipts: boolean;
  sponsorNotifications: boolean;
  assignmentReminders: boolean;
  lowProgressAlerts: boolean;
}

export default function AICChiefAccountant() {
  const [financialRecords, setFinancialRecords] = useState<FinancialRecord[]>([]);
  const [studentRecords, setStudentRecords] = useState<StudentRecord[]>([]);
  const [settings, setSettings] = useState<NotificationSettings>({
    emailReceipts: true,
    whatsappReceipts: true,
    telegramReceipts: true,
    sponsorNotifications: true,
    assignmentReminders: true,
    lowProgressAlerts: true
  });

  useEffect(() => {
    // Mock financial data
    setFinancialRecords([
      {
        id: '1',
        type: 'revenue',
        amount: 299.99,
        description: 'Advanced Aviation Course - John Doe',
        timestamp: '2024-01-15T10:30:00Z',
        category: 'Education',
        status: 'completed'
      },
      {
        id: '2',
        type: 'revenue',
        amount: 49.99,
        description: 'Marketplace Purchase - Sarah Smith',
        timestamp: '2024-01-15T09:15:00Z',
        category: 'Marketplace',
        status: 'completed'
      },
      {
        id: '3',
        type: 'revenue',
        amount: 199.99,
        description: 'Real Estate Subscription - Mike Johnson',
        timestamp: '2024-01-15T08:45:00Z',
        category: 'Real Estate',
        status: 'pending'
      }
    ]);

    // Mock student data
    setStudentRecords([
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        course: 'Commercial Pilot Training',
        progress: 85,
        lastActive: '2024-01-15T10:00:00Z',
        sponsorEmail: 'sponsor@company.com',
        sponsorName: 'ABC Airlines',
        pendingAssignments: 0
      },
      {
        id: '2',
        name: 'Sarah Smith',
        email: 'sarah@example.com',
        course: 'Air Traffic Control',
        progress: 45,
        lastActive: '2024-01-14T15:30:00Z',
        sponsorEmail: 'parent@example.com',
        sponsorName: 'Parent',
        pendingAssignments: 2
      },
      {
        id: '3',
        name: 'Mike Johnson',
        email: 'mike@example.com',
        course: 'Aircraft Maintenance',
        progress: 92,
        lastActive: '2024-01-15T11:20:00Z',
        pendingAssignments: 1
      }
    ]);
  }, []);

  const totalRevenue = financialRecords
    .filter(record => record.type === 'revenue' && record.status === 'completed')
    .reduce((sum, record) => sum + record.amount, 0);

  const pendingRevenue = financialRecords
    .filter(record => record.type === 'revenue' && record.status === 'pending')
    .reduce((sum, record) => sum + record.amount, 0);

  const handleSendReceipt = (recordId: string, method: 'email' | 'whatsapp' | 'telegram') => {
    const record = financialRecords.find(r => r.id === recordId);
    if (record) {
      // Simulate sending receipt
      console.log(`Sending ${method} receipt for:`, record.description);
      alert(`Receipt sent via ${method} for $${record.amount}`);
    }
  };

  const handleNotifySponsor = (studentId: string) => {
    const student = studentRecords.find(s => s.id === studentId);
    if (student && student.sponsorEmail) {
      // Simulate sponsor notification
      console.log(`Notifying sponsor for student:`, student.name);
      alert(`Notification sent to ${student.sponsorName} about ${student.name}'s progress`);
    }
  };

  const handleSendAssignmentReminder = (studentId: string) => {
    const student = studentRecords.find(s => s.id === studentId);
    if (student) {
      // Simulate assignment reminder
      console.log(`Sending assignment reminder to:`, student.name);
      alert(`Assignment reminder sent to ${student.name}`);
    }
  };

  const toggleSetting = (setting: keyof NotificationSettings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">AI Chief Accountant</h1>
        <p className="text-gray-600">Automated financial management and communication system</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Financial Summary */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-gray-600">All completed transactions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Revenue</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${pendingRevenue.toLocaleString()}</div>
            <p className="text-xs text-gray-600">Awaiting processing</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Students</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{studentRecords.length}</div>
            <p className="text-xs text-gray-600">With sponsorship tracking</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Financial Records */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Financial Records
            </CardTitle>
            <CardDescription>
              Recent transactions and revenue streams
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {financialRecords.map((record) => (
                <div key={record.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium">{record.description}</div>
                    <div className="text-sm text-gray-600">{record.category}</div>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant={record.status === 'completed' ? 'default' : 'secondary'}>
                        {record.status}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {new Date(record.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-bold ${
                      record.type === 'revenue' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      ${record.amount}
                    </div>
                    <div className="flex space-x-1 mt-2">
                      {settings.emailReceipts && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="bg-transparent h-8 w-8 p-0"
                          onClick={() => handleSendReceipt(record.id, 'email')}
                        >
                          <Mail className="h-3 w-3" />
                        </Button>
                      )}
                      {settings.whatsappReceipts && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="bg-transparent h-8 w-8 p-0"
                          onClick={() => handleSendReceipt(record.id, 'whatsapp')}
                        >
                          <MessageCircle className="h-3 w-3" />
                        </Button>
                      )}
                      {settings.telegramReceipts && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="bg-transparent h-8 w-8 p-0"
                          onClick={() => handleSendReceipt(record.id, 'telegram')}
                        >
                          <Send className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Student & Sponsor Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Student Progress Tracking
            </CardTitle>
            <CardDescription>
              Monitor student activity and manage sponsor communications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {studentRecords.map((student) => (
                <div key={student.id} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">{student.name}</div>
                    <Badge variant={student.progress > 70 ? 'default' : 'secondary'}>
                      {student.progress}% Progress
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">{student.course}</div>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <span>Last active: {new Date(student.lastActive).toLocaleDateString()}</span>
                    {student.pendingAssignments > 0 && (
                      <span className="text-orange-600">
                        {student.pendingAssignments} pending assignments
                      </span>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    {student.sponsorEmail && settings.sponsorNotifications && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="bg-transparent flex-1"
                        onClick={() => handleNotifySponsor(student.id)}
                      >
                        <Bell className="h-3 w-3 mr-1" />
                        Notify Sponsor
                      </Button>
                    )}
                    {student.pendingAssignments > 0 && settings.assignmentReminders && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="bg-transparent flex-1"
                        onClick={() => handleSendAssignmentReminder(student.id)}
                      >
                        <Clock className="h-3 w-3 mr-1" />
                        Remind Assignment
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="h-5 w-5 mr-2" />
              Notification Settings
            </CardTitle>
            <CardDescription>
              Configure automated communication channels
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Email Receipts</div>
                  <div className="text-sm text-gray-600">Send receipts via email</div>
                </div>
                <Switch
                  checked={settings.emailReceipts}
                  onCheckedChange={() => toggleSetting('emailReceipts')}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">WhatsApp Receipts</div>
                  <div className="text-sm text-gray-600">Send receipts via WhatsApp</div>
                </div>
                <Switch
                  checked={settings.whatsappReceipts}
                  onCheckedChange={() => toggleSetting('whatsappReceipts')}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Telegram Receipts</div>
                  <div className="text-sm text-gray-600">Send receipts via Telegram</div>
                </div>
                <Switch
                  checked={settings.telegramReceipts}
                  onCheckedChange={() => toggleSetting('telegramReceipts')}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Sponsor Notifications</div>
                  <div className="text-sm text-gray-600">Notify sponsors of progress</div>
                </div>
                <Switch
                  checked={settings.sponsorNotifications}
                  onCheckedChange={() => toggleSetting('sponsorNotifications')}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Assignment Reminders</div>
                  <div className="text-sm text-gray-600">Remind students of pending work</div>
                </div>
                <Switch
                  checked={settings.assignmentReminders}
                  onCheckedChange={() => toggleSetting('assignmentReminders')}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Real Estate Subscription System */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Real Estate Access Control
            </CardTitle>
            <CardDescription>
              Manage property information access and subscriptions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="font-medium mb-2">Property Access Subscription</div>
                <p className="text-sm text-gray-600 mb-4">
                  Users must sign in and pay to access detailed property information. 
                  Automated notifications are sent when matching properties are found.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subscription Fee:</span>
                    <span className="font-medium">$49.99/month</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Active Subscribers:</span>
                    <span className="font-medium">1,247</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly Revenue:</span>
                    <span className="font-medium text-green-600">$62,350</span>
                  </div>
                </div>
              </div>
              <Button className="w-full">
                Configure Subscription Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}