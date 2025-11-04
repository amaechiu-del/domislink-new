/**
 * NCAA Compliance Checklist & Questionnaire for Online Aviation Courses
 * Nigerian Civil Aviation Authority Regulations Compliance System
 * Ensures DomisLink Aviation Academy meets all NCAA requirements
 */

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Checkbox } from '../ui/checkbox';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import { 
  FileCheck, 
  Shield, 
  BookOpen, 
  Users, 
  Monitor, 
  Clock,
  CheckCircle,
  AlertCircle,
  Download,
  Upload,
  Save,
  Globe,
  Plane
} from 'lucide-react';

interface ComplianceItem {
  id: string;
  category: string;
  requirement: string;
  description: string;
  ncaaReference: string;
  status: 'compliant' | 'non-compliant' | 'pending';
  evidenceRequired: string[];
  priority: 'high' | 'medium' | 'low';
}

interface QuestionnaireResponse {
  questionId: string;
  answer: string;
  supportingDocuments: string[];
  complianceLevel: 'full' | 'partial' | 'none';
}

export default function NCAACompliance() {
  const [complianceItems, setComplianceItems] = useState<ComplianceItem[]>([
    {
      id: 'ncaa-001',
      category: 'Course Approval',
      requirement: 'NCAA Part 7 - Flight Training Organization Approval',
      description: 'Approval for conducting aviation training courses',
      ncaaReference: 'NCARs Part 7.1.3',
      status: 'pending',
      evidenceRequired: ['Approval Certificate', 'Course Syllabus', 'Instructor Qualifications'],
      priority: 'high'
    },
    {
      id: 'ncaa-002',
      category: 'Instructor Qualifications',
      requirement: 'Certified Flight Instructors with NCAA Approval',
      description: 'All instructors must hold valid NCAA instructor certificates',
      ncaaReference: 'NCARs Part 7.2.1',
      status: 'pending',
      evidenceRequired: ['Instructor Certificates', 'Medical Certificates', 'Experience Records'],
      priority: 'high'
    },
    {
      id: 'ncaa-003',
      category: 'Course Content',
      requirement: 'NCAA-Approved Curriculum and Syllabus',
      description: 'Course content must align with NCAA training requirements',
      ncaaReference: 'NCARs Part 7.3.2',
      status: 'pending',
      evidenceRequired: ['Course Syllabus', 'Lesson Plans', 'Assessment Methods'],
      priority: 'high'
    },
    {
      id: 'ncaa-004',
      category: 'Online Delivery',
      requirement: 'Secure Online Learning Platform',
      description: 'Platform must ensure secure authentication and proctoring',
      ncaaReference: 'NCARs Part 7.4.5',
      status: 'pending',
      evidenceRequired: ['Platform Security Certificate', 'Proctoring System', 'Data Protection'],
      priority: 'medium'
    },
    {
      id: 'ncaa-005',
      category: 'Assessment',
      requirement: 'Secure Online Examination System',
      description: 'Exams must be proctored and secure from cheating',
      ncaaReference: 'NCARs Part 7.5.1',
      status: 'pending',
      evidenceRequired: ['Proctoring Software', 'Exam Security Protocols', 'Result Verification'],
      priority: 'high'
    },
    {
      id: 'ncaa-006',
      category: 'Record Keeping',
      requirement: 'Digital Student Records Maintenance',
      description: 'Secure storage of student records for minimum 5 years',
      ncaaReference: 'NCARs Part 7.6.3',
      status: 'pending',
      evidenceRequired: ['Record Storage System', 'Backup Procedures', 'Access Controls'],
      priority: 'medium'
    },
    {
      id: 'ncaa-007',
      category: 'Student Verification',
      requirement: 'Identity Verification for Online Students',
      description: 'Secure student identity verification system',
      ncaaReference: 'NCARs Part 7.7.2',
      status: 'pending',
      evidenceRequired: ['ID Verification System', 'Biometric Data', 'Photo Verification'],
      priority: 'medium'
    },
    {
      id: 'ncaa-008',
      category: 'Practical Training',
      requirement: 'Approved Practical Training Arrangements',
      description: 'Arrangements for practical flight training components',
      ncaaReference: 'NCARs Part 7.8.1',
      status: 'pending',
      evidenceRequired: ['Training Aircraft Records', 'Simulator Access', 'Instructor Availability'],
      priority: 'high'
    }
  ]);

  const [questionnaire, setQuestionnaire] = useState<QuestionnaireResponse[]>([
    {
      questionId: 'q1',
      answer: '',
      supportingDocuments: [],
      complianceLevel: 'none'
    }
  ]);

  const [selectedItem, setSelectedItem] = useState<ComplianceItem | null>(null);
  const [complianceScore, setComplianceScore] = useState(0);

  const handleStatusChange = (itemId: string, status: 'compliant' | 'non-compliant' | 'pending') => {
    setComplianceItems(prev => 
      prev.map(item => 
        item.id === itemId ? { ...item, status } : item
      )
    );
  };

  const calculateComplianceScore = () => {
    const total = complianceItems.length;
    const compliant = complianceItems.filter(item => item.status === 'compliant').length;
    const score = Math.round((compliant / total) * 100);
    setComplianceScore(score);
    return score;
  };

  const generateComplianceReport = () => {
    const report = {
      generated: new Date().toISOString(),
      academy: 'DomisLink Aviation Academy',
      complianceScore: calculateComplianceScore(),
      items: complianceItems,
      summary: `NCAA Compliance Report - Score: ${complianceScore}%`
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `NCAA_Compliance_Report_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'bg-green-100 text-green-800';
      case 'non-compliant': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  NCAA Compliance System
                </h1>
                <p className="text-gray-600">
                  Nigerian Civil Aviation Authority Regulations for Online Aviation Courses
                </p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              <FileCheck className="h-4 w-4 mr-1" />
              Compliance Manager
            </Badge>
          </div>
        </div>

        {/* Compliance Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{complianceScore}%</div>
              <p className="text-xs text-gray-600">Overall NCAA compliance</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">High Priority Items</CardTitle>
              <AlertCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {complianceItems.filter(item => item.priority === 'high' && item.status !== 'compliant').length}
              </div>
              <p className="text-xs text-gray-600">Require immediate attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Compliant Items</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {complianceItems.filter(item => item.status === 'compliant').length}
              </div>
              <p className="text-xs text-gray-600">Meets NCAA standards</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Requirements</CardTitle>
              <FileCheck className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{complianceItems.length}</div>
              <p className="text-xs text-gray-600">NCAA regulatory items</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Compliance Checklist */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileCheck className="h-5 w-5 mr-2" />
                NCAA Compliance Checklist
              </CardTitle>
              <CardDescription>
                Essential requirements for online aviation course approval
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complianceItems.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <Badge className={getPriorityColor(item.priority)}>
                            {item.priority.toUpperCase()}
                          </Badge>
                          <Badge className={getStatusColor(item.status)}>
                            {item.status.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="font-medium">{item.requirement}</div>
                        <div className="text-sm text-gray-600 mt-1">{item.description}</div>
                        <div className="text-xs text-blue-600 mt-1">
                          Reference: {item.ncaaReference}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <Button
                          size="sm"
                          variant={item.status === 'compliant' ? 'default' : 'outline'}
                          className="bg-transparent"
                          onClick={() => handleStatusChange(item.id, 'compliant')}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Compliant
                        </Button>
                        <Button
                          size="sm"
                          variant={item.status === 'non-compliant' ? 'default' : 'outline'}
                          className="bg-transparent"
                          onClick={() => handleStatusChange(item.id, 'non-compliant')}
                        >
                          <AlertCircle className="h-4 w-4 mr-1" />
                          Non-Compliant
                        </Button>
                      </div>
                    </div>
                    
                    <div className="text-sm font-medium mt-3">Required Evidence:</div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {item.evidenceRequired.map((evidence, index) => (
                        <Badge key={index} variant="outline" className="bg-transparent">
                          {evidence}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* NCAA Questionnaire */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                NCAA Questionnaire
              </CardTitle>
              <CardDescription>
                Self-assessment for online course compliance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Question 1 */}
                <div className="space-y-3">
                  <div className="font-medium">
                    1. Does your online platform have secure student authentication?
                  </div>
                  <Textarea 
                    placeholder="Describe your student authentication system..."
                    className="min-h-[80px]"
                  />
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="bg-transparent">
                      <Upload className="h-4 w-4 mr-1" />
                      Upload Evidence
                    </Button>
                    <Button size="sm">
                      <Save className="h-4 w-4 mr-1" />
                      Save Response
                    </Button>
                  </div>
                </div>

                {/* Question 2 */}
                <div className="space-y-3">
                  <div className="font-medium">
                    2. How do you ensure exam integrity for online assessments?
                  </div>
                  <Textarea 
                    placeholder="Describe your proctoring and exam security measures..."
                    className="min-h-[80px]"
                  />
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="bg-transparent">
                      <Upload className="h-4 w-4 mr-1" />
                      Upload Evidence
                    </Button>
                    <Button size="sm">
                      <Save className="h-4 w-4 mr-1" />
                      Save Response
                    </Button>
                  </div>
                </div>

                {/* Question 3 */}
                <div className="space-y-3">
                  <div className="font-medium">
                    3. Describe your record-keeping system for student training records
                  </div>
                  <Textarea 
                    placeholder="Explain your digital record storage and retention policies..."
                    className="min-h-[80px]"
                  />
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="bg-transparent">
                      <Upload className="h-4 w-4 mr-1" />
                      Upload Evidence
                    </Button>
                    <Button size="sm">
                      <Save className="h-4 w-4 mr-1" />
                      Save Response
                    </Button>
                  </div>
                </div>

                {/* Compliance Actions */}
                <div className="space-y-3 pt-4 border-t">
                  <div className="font-medium">Compliance Actions</div>
                  <div className="space-y-2">
                    <Button 
                      onClick={calculateComplianceScore}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Calculate Compliance Score
                    </Button>
                    <Button 
                      onClick={generateComplianceReport}
                      variant="outline"
                      className="w-full bg-transparent"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Generate Compliance Report
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Global Aviation Standards Integration */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="h-5 w-5 mr-2 text-blue-600" />
              Global Aviation Training Standards
            </CardTitle>
            <CardDescription>
              International compliance with ICAO, FAA, EASA, and regional aviation authorities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* International Standards */}
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="font-medium flex items-center text-blue-800">
                    <Globe className="h-4 w-4 mr-2" />
                    ICAO Standards (International)
                  </div>
                  <div className="text-sm text-blue-700 mt-1">
                    Compliant with Annex 1 Personnel Licensing and ICAO Doc 9868 Training Procedures
                  </div>
                  <div className="text-xs text-blue-600 mt-2">
                    Standards: English Language Proficiency, Evidence-Based Training
                  </div>
                </div>

                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="font-medium flex items-center text-red-800">
                    <Plane className="h-4 w-4 mr-2" />
                    FAA Regulations (USA)
                  </div>
                  <div className="text-sm text-red-700 mt-1">
                    FAR Part 141 Pilot School standards with advanced training device integration
                  </div>
                  <div className="text-xs text-red-600 mt-2">
                    Compliance: AC 61-136, AC 141-1, Advanced Training Devices
                  </div>
                </div>
              </div>

              {/* Regional Authorities */}
              <div className="space-y-4">
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="font-medium flex items-center text-purple-800">
                    <Shield className="h-4 w-4 mr-2" />
                    EASA Compliance (Europe)
                  </div>
                  <div className="text-sm text-purple-700 mt-1">
                    EASA Part-FCL and Part-ORA standards for theoretical knowledge instruction
                  </div>
                  <div className="text-xs text-purple-600 mt-2">
                    Regulations: EU 1178/2011, AMC1 FCL.210, ORA.ATO.105
                  </div>
                </div>

                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="font-medium flex items-center text-green-800">
                    <Users className="h-4 w-4 mr-2" />
                    Regional Authorities
                  </div>
                  <div className="text-sm text-green-700 mt-1">
                    Adaptable compliance framework for GCAA, CAA, and other regional aviation authorities
                  </div>
                  <div className="text-xs text-green-600 mt-2">
                    Coverage: Middle East, Asia, Africa, South America
                  </div>
                </div>
              </div>
            </div>

            {/* Global Responsibility Statement */}
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
              <div className="font-medium text-gray-800 mb-2">🌍 Our Global Responsibility</div>
              <div className="text-sm text-gray-700 space-y-2">
                <p>DomisLink Aviation Academy is committed to maintaining the highest international standards in aviation training. Our platform ensures:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Consistent training quality across all regions</li>
                  <li>Compliance with local aviation authority requirements</li>
                  <li>Cultural and regulatory adaptation for each market</li>
                  <li>Continuous monitoring of evolving international standards</li>
                </ul>
                <p className="text-xs text-gray-600 mt-2">
                  *Advanced implementation methodologies and proprietary training technologies are protected trade secrets. 
                  For detailed compliance documentation and implementation strategies, contact our standards team.
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="font-medium text-yellow-800">📞 Compliance & Standards Support</div>
              <div className="text-sm text-yellow-700 mt-1">
                For detailed compliance documentation, regional adaptation requirements, and implementation guidance:
              </div>
              <div className="text-xs text-yellow-600 mt-2 space-y-1">
                <div>🌐 Email: standards@domislink.com</div>
                <div>📧 Support: support@domislink.com</div>
                <div>📞 Information: info@domislink.com</div>
                <div className="mt-2 text-yellow-700 font-medium">
                  All proprietary training methodologies and advanced compliance implementations are protected intellectual property.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
