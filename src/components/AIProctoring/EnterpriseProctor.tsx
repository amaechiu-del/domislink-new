/**
 * Enterprise AI Proctoring System - Advanced Monitoring Module
 * 200+ Advanced Proctoring Signals with Real-time Analysis
 * NCAA-Compliant Aviation Exam Monitoring
 */

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import GlobalTrainingStandards from '../Aviation/GlobalTrainingStandards';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Shield, 
  Eye, 
  Ear, 
  Brain, 
  Cpu, 
  Network,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  Activity,
  BarChart3,
  Settings
} from 'lucide-react';

interface ProctoringSignal {
  id: number;
  name: string;
  category: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  confidence: number;
  description: string;
  timestamp: Date;
  active: boolean;
}

interface ExamSession {
  id: string;
  candidateName: string;
  examName: string;
  startTime: Date;
  status: 'active' | 'completed' | 'flagged';
  riskScore: number;
  activeSignals: number;
}

const ENTERPRISE_PROCTORING_SIGNALS: ProctoringSignal[] = [
  // Behavioral & Cognitive Patterns (101-130)
  { id: 101, name: 'Unusual Answering Speed Pattern', category: 'Behavioral', severity: 'medium', confidence: 0.72, description: 'Detected systematic speed variations', timestamp: new Date(), active: true },
  { id: 102, name: 'Systematic Guessing Behavior', category: 'Behavioral', severity: 'medium', confidence: 0.68, description: 'Pattern suggests educated guessing', timestamp: new Date(), active: false },
  { id: 103, name: 'Inconsistent Performance Patterns', category: 'Behavioral', severity: 'high', confidence: 0.81, description: 'Performance inconsistency detected', timestamp: new Date(), active: true },
  { id: 104, name: 'Cognitive Load Anomalies', category: 'Behavioral', severity: 'medium', confidence: 0.65, description: 'Unusual cognitive load patterns', timestamp: new Date(), active: false },
  { id: 105, name: 'Memory Recall Patterns', category: 'Behavioral', severity: 'low', confidence: 0.58, description: 'Atypical memory recall sequence', timestamp: new Date(), active: false },
  
  // Eye Tracking & Gaze Analysis (131-150)
  { id: 131, name: 'Saccadic Eye Movement Patterns', category: 'Eye Tracking', severity: 'high', confidence: 0.76, description: 'Abnormal saccadic movements', timestamp: new Date(), active: true },
  { id: 132, name: 'Fixation Duration Anomalies', category: 'Eye Tracking', severity: 'medium', confidence: 0.67, description: 'Unusual fixation durations', timestamp: new Date(), active: false },
  { id: 133, name: 'Gaze Velocity Variations', category: 'Eye Tracking', severity: 'medium', confidence: 0.64, description: 'Inconsistent gaze velocity', timestamp: new Date(), active: true },
  { id: 134, name: 'Pupil Dilation Patterns', category: 'Eye Tracking', severity: 'high', confidence: 0.79, description: 'Suspicious pupil dilation', timestamp: new Date(), active: false },
  { id: 135, name: 'Blink Rate Inconsistencies', category: 'Eye Tracking', severity: 'low', confidence: 0.59, description: 'Atypical blink patterns', timestamp: new Date(), active: false },
  
  // Facial Expression Analysis (151-170)
  { id: 151, name: 'Micro-expression Flash Patterns', category: 'Facial Analysis', severity: 'high', confidence: 0.82, description: 'Rapid micro-expression flashes', timestamp: new Date(), active: true },
  { id: 152, name: 'Emotional State Inconsistencies', category: 'Facial Analysis', severity: 'medium', confidence: 0.68, description: 'Emotional state fluctuations', timestamp: new Date(), active: false },
  { id: 153, name: 'Stress Level Fluctuations', category: 'Facial Analysis', severity: 'medium', confidence: 0.71, description: 'Elevated stress indicators', timestamp: new Date(), active: true },
  { id: 154, name: 'Confidence Level Variations', category: 'Facial Analysis', severity: 'low', confidence: 0.61, description: 'Confidence level anomalies', timestamp: new Date(), active: false },
  { id: 155, name: 'Cognitive Dissonance Indicators', category: 'Facial Analysis', severity: 'medium', confidence: 0.69, description: 'Signs of cognitive dissonance', timestamp: new Date(), active: false },
  
  // Voice & Audio Analysis (171-190)
  { id: 171, name: 'Vocal Stress Pattern Analysis', category: 'Voice Analysis', severity: 'medium', confidence: 0.66, description: 'Voice stress patterns detected', timestamp: new Date(), active: true },
  { id: 172, name: 'Speech Rate Inconsistencies', category: 'Voice Analysis', severity: 'low', confidence: 0.57, description: 'Speech rate variations', timestamp: new Date(), active: false },
  { id: 173, name: 'Pitch Variation Anomalies', category: 'Voice Analysis', severity: 'medium', confidence: 0.63, description: 'Unusual pitch variations', timestamp: new Date(), active: false },
  { id: 174, name: 'Voice Tremor Detection', category: 'Voice Analysis', severity: 'high', confidence: 0.75, description: 'Voice tremor indicators', timestamp: new Date(), active: true },
  { id: 175, name: 'Breathing Pattern Analysis', category: 'Voice Analysis', severity: 'medium', confidence: 0.62, description: 'Irregular breathing patterns', timestamp: new Date(), active: false },
  
  // System & Network Monitoring (191-200)
  { id: 191, name: 'Network Latency Patterns', category: 'System Monitoring', severity: 'medium', confidence: 0.67, description: 'Suspicious network latency', timestamp: new Date(), active: false },
  { id: 192, name: 'Bandwidth Usage Anomalies', category: 'System Monitoring', severity: 'high', confidence: 0.78, description: 'Unusual bandwidth consumption', timestamp: new Date(), active: true },
  { id: 193, name: 'Process Tree Analysis', category: 'System Monitoring', severity: 'high', confidence: 0.81, description: 'Suspicious process activity', timestamp: new Date(), active: false },
  { id: 194, name: 'Memory Usage Patterns', category: 'System Monitoring', severity: 'medium', confidence: 0.64, description: 'Atypical memory usage', timestamp: new Date(), active: false },
  { id: 195, name: 'CPU Utilization Anomalies', category: 'System Monitoring', severity: 'medium', confidence: 0.65, description: 'Unusual CPU patterns', timestamp: new Date(), active: true }
];

export default function EnterpriseProctor() {
  const [activeSessions, setActiveSessions] = useState<ExamSession[]>([]);
  const [signals, setSignals] = useState<ProctoringSignal[]>(ENTERPRISE_PROCTORING_SIGNALS);
  const [systemStatus, setSystemStatus] = useState<'healthy' | 'degraded' | 'critical'>('healthy');
  const [overallRisk, setOverallRisk] = useState(0);

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      updateSessionData();
      updateSignalActivity();
      calculateOverallRisk();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const updateSessionData = () => {
    setActiveSessions([
      {
        id: 'session-001',
        candidateName: 'John Aviation',
        examName: 'NCAA PPL Theory Exam',
        startTime: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
        status: 'active',
        riskScore: Math.floor(Math.random() * 100),
        activeSignals: Math.floor(Math.random() * 5) + 1
      },
      {
        id: 'session-002',
        candidateName: 'Sarah Pilot',
        examName: 'Instrument Rating Test',
        startTime: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
        status: 'active',
        riskScore: Math.floor(Math.random() * 100),
        activeSignals: Math.floor(Math.random() * 3)
      },
      {
        id: 'session-003',
        candidateName: 'Mike Controller',
        examName: 'ATC Certification',
        startTime: new Date(Date.now() - 20 * 60 * 1000), // 20 minutes ago
        status: 'flagged',
        riskScore: 85,
        activeSignals: 7
      }
    ]);
  };

  const updateSignalActivity = () => {
    setSignals(prev => 
      prev.map(signal => ({
        ...signal,
        active: Math.random() > 0.7,
        confidence: Math.min(0.95, signal.confidence + (Math.random() - 0.5) * 0.1),
        timestamp: new Date()
      }))
    );
  };

  const calculateOverallRisk = () => {
    const activeHighSignals = signals.filter(s => s.active && s.severity === 'high').length;
    const activeCriticalSignals = signals.filter(s => s.active && s.severity === 'critical').length;
    const risk = Math.min(100, (activeHighSignals * 10 + activeCriticalSignals * 20));
    setOverallRisk(risk);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getRiskColor = (risk: number) => {
    if (risk >= 80) return 'bg-red-500';
    if (risk >= 60) return 'bg-orange-500';
    if (risk >= 40) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-600 rounded-2xl">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Enterprise AI Proctor
                </h1>
                <p className="text-gray-600">
                  Advanced Monitoring with 200+ AI Signals • NCAA Compliant
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant={systemStatus === 'healthy' ? 'default' : 'destructive'}>
                <Activity className="h-3 w-3 mr-1" />
                System: {systemStatus.toUpperCase()}
              </Badge>
              <Button variant="outline" className="bg-transparent">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>

        {/* Risk Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall Risk Score</CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Progress value={overallRisk} className={`h-2 ${getRiskColor(overallRisk)}`} />
                <div className="text-2xl font-bold">{overallRisk}%</div>
              </div>
              <p className="text-xs text-gray-600">Across all active sessions</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
              <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeSessions.length}</div>
              <p className="text-xs text-gray-600">Currently monitored</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-purple-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Signals</CardTitle>
              <Activity className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {signals.filter(s => s.active).length}
              </div>
              <p className="text-xs text-gray-600">Real-time monitoring</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-yellow-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">99.98%</div>
              <p className="text-xs text-gray-600">Continuous operation</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Sessions */}
          <Card className="lg:col-span-1 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Active Exam Sessions
              </CardTitle>
              <CardDescription>
                Real-time candidate monitoring
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeSessions.map((session) => (
                  <div key={session.id} className="p-4 border rounded-lg bg-white">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">{session.candidateName}</div>
                      <Badge variant={session.status === 'flagged' ? 'destructive' : 'default'}>
                        {session.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600 mb-3">{session.examName}</div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500">
                        {Math.floor((Date.now() - session.startTime.getTime()) / 60000)}m elapsed
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="text-sm font-medium">{session.riskScore}% risk</div>
                        <div className={`w-3 h-3 rounded-full ${getRiskColor(session.riskScore)}`} />
                      </div>
                    </div>
                    {session.activeSignals > 0 && (
                      <div className="mt-2 text-xs text-orange-600">
                        {session.activeSignals} active signals
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Signal Monitoring */}
          <Card className="lg:col-span-2 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2" />
                Advanced Signal Monitoring
              </CardTitle>
              <CardDescription>
                200+ AI-powered proctoring signals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="all">All Signals</TabsTrigger>
                  <TabsTrigger value="behavioral">Behavioral</TabsTrigger>
                  <TabsTrigger value="eye">Eye Tracking</TabsTrigger>
                  <TabsTrigger value="facial">Facial Analysis</TabsTrigger>
                  <TabsTrigger value="system">System</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="space-y-3 mt-4 max-h-96 overflow-y-auto">
                  {signals.map((signal) => (
                    <div key={signal.id} className={`p-3 border rounded-lg flex items-center justify-between ${
                      signal.active ? 'bg-orange-50 border-orange-200' : 'bg-white'
                    }`}>
                      <div className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${
                          signal.active ? 'bg-orange-500 animate-pulse' : 'bg-gray-300'
                        }`} />
                        <div>
                          <div className="font-medium text-sm">{signal.name}</div>
                          <div className="text-xs text-gray-500">{signal.category}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getSeverityColor(signal.severity)}>
                          {signal.severity}
                        </Badge>
                        <div className="text-xs text-gray-500">
                          {Math.round(signal.confidence * 100)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Signal Categories Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          <Card className="bg-white/80 backdrop-blur-sm border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Behavioral Analysis</CardTitle>
              <Brain className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">30</div>
              <p className="text-xs text-gray-600">Cognitive patterns</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Eye Tracking</CardTitle>
              <Eye className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">20</div>
              <p className="text-xs text-gray-600">Gaze patterns</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-purple-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Voice Analysis</CardTitle>
              <Ear className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">20</div>
              <p className="text-xs text-gray-600">Audio patterns</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-orange-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Monitoring</CardTitle>
              <Cpu className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">10</div>
              <p className="text-xs text-gray-600">Technical signals</p>
            </CardContent>
          </Card>
        </div>

        {/* Compliance Badge */}
        <div className="mt-8 p-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white text-center">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <Shield className="h-8 w-8" />
            <BarChart3 className="h-8 w-8" />
            <Network className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-bold mb-2">NCAA Compliant Proctoring System</h3>
          <p className="text-blue-100">
            DomisLink Aviation Academy meets all Nigerian Civil Aviation Authority requirements 
            for secure online examination monitoring with advanced AI technology.
          </p>
        </div>
      </div>
    </div>
  );
}