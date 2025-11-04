/**
 * Instrument Recurrency Training - Strict IFR proficiency maintenance
 * Meets FAA/EASA requirements for instrument currency
 */
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  Navigation, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  BarChart3,
  Map,
  Cloud,
  Eye
} from 'lucide-react';

interface RecurrencyRequirement {
  task: string;
  required: number;
  completed: number;
  lastCompleted: string;
  dueDate: string;
  status: 'current' | 'due' | 'overdue';
}

export const InstrumentRecurrency: React.FC = () => {
  const [requirements, setRequirements] = useState<RecurrencyRequirement[]>([
    {
      task: 'Holding Procedures',
      required: 6,
      completed: 6,
      lastCompleted: '2024-01-15',
      dueDate: '2024-07-15',
      status: 'current'
    },
    {
      task: 'Precision Approaches',
      required: 6,
      completed: 4,
      lastCompleted: '2024-01-10',
      dueDate: '2024-07-10',
      status: 'due'
    },
    {
      task: 'Non-precision Approaches',
      required: 6,
      completed: 6,
      lastCompleted: '2024-01-12',
      dueDate: '2024-07-12',
      status: 'current'
    },
    {
      task: 'Tracking & Intercepting',
      required: 6,
      completed: 3,
      lastCompleted: '2024-01-08',
      dueDate: '2024-07-08',
      status: 'overdue'
    },
    {
      task: 'Partial Panel',
      required: 2,
      completed: 2,
      lastCompleted: '2024-01-20',
      dueDate: '2024-07-20',
      status: 'current'
    },
    {
      task: 'Unusual Attitudes',
      required: 2,
      completed: 1,
      lastCompleted: '2024-01-05',
      dueDate: '2024-07-05',
      status: 'overdue'
    }
  ]);

  const [aiInstructorActive, setAiInstructorActive] = useState(true);
  const [currentSession, setCurrentSession] = useState<string | null>(null);

  const calculateOverallProgress = () => {
    const totalRequired = requirements.reduce((sum, req) => sum + req.required, 0);
    const totalCompleted = requirements.reduce((sum, req) => sum + req.completed, 0);
    return (totalCompleted / totalRequired) * 100;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'current': return 'bg-green-500/20 text-green-300 border-green-400';
      case 'due': return 'bg-amber-500/20 text-amber-300 border-amber-400';
      case 'overdue': return 'bg-red-500/20 text-red-300 border-red-400';
      default: return 'bg-slate-500/20 text-slate-300 border-slate-400';
    }
  };

  const startTrainingSession = (task: string) => {
    setCurrentSession(task);
    // AI Instructor would begin briefing here
    console.log(`Starting ${task} training session with AI Instructor`);
  };

  const overallProgress = calculateOverallProgress();

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Navigation className="h-6 w-6 mr-2 text-blue-400" />
          Instrument Recurrency Training
        </CardTitle>
        <CardDescription className="text-blue-200">
          FAA 14 CFR §61.57 & EASA FCL.065 Compliance Tracking
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Compliance Status */}
        <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
          <div className="flex items-center justify-between mb-3">
            <div className="text-white font-semibold">IFR Currency Status</div>
            <Badge className={
              overallProgress >= 100 ? 'bg-green-500/20 text-green-300 border-green-400' :
              overallProgress >= 80 ? 'bg-amber-500/20 text-amber-300 border-amber-400' :
              'bg-red-500/20 text-red-300 border-red-400'
            }>
              {overallProgress >= 100 ? 'CURRENT' : 'NOT CURRENT'}
            </Badge>
          </div>
          <Progress value={overallProgress} className="h-2 mb-2" />
          <div className="flex justify-between text-sm text-blue-200">
            <span>Overall Progress</span>
            <span>{Math.round(overallProgress)}% Complete</span>
          </div>
        </div>

        {/* AI Instructor Warning */}
        <div className="bg-amber-500/10 border border-amber-400/30 rounded-lg p-3">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-amber-400 mr-2" />
            <div className="text-amber-300 font-semibold">AI Instructor Required</div>
          </div>
          <p className="text-amber-200 text-sm mt-1">
            Instrument training requires AI instructor supervision. Instructor cannot be disabled during IFR sessions.
          </p>
        </div>

        {/* Training Requirements */}
        <div className="space-y-3">
          <h4 className="text-white font-semibold flex items-center">
            <BarChart3 className="h-4 w-4 mr-2 text-blue-400" />
            Training Requirements (6-Month Cycle)
          </h4>
          
          {requirements.map((requirement, index) => (
            <div key={index} className="border border-slate-600 rounded-lg p-3 hover:border-blue-400/50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div className="text-white font-medium">{requirement.task}</div>
                  <Badge className={`ml-2 ${getStatusColor(requirement.status)}`}>
                    {requirement.status.toUpperCase()}
                  </Badge>
                </div>
                <div className="text-blue-200 text-sm">
                  {requirement.completed}/{requirement.required}
                </div>
              </div>
              
              <Progress 
                value={(requirement.completed / requirement.required) * 100} 
                className="h-1 mb-2"
              />
              
              <div className="flex items-center justify-between text-xs text-slate-400">
                <div>Last: {requirement.lastCompleted}</div>
                <div>Due: {requirement.dueDate}</div>
              </div>
              
              <Button 
                size="sm" 
                className="w-full mt-2 bg-blue-600 hover:bg-blue-700"
                onClick={() => startTrainingSession(requirement.task)}
              >
                Start Training Session
              </Button>
            </div>
          ))}
        </div>

        {/* Quick Start Sessions */}
        <div className="grid grid-cols-2 gap-3">
          <Button className="bg-slate-700 hover:bg-slate-600 text-white">
            <Map className="h-4 w-4 mr-2" />
            Holding Patterns
          </Button>
          <Button className="bg-slate-700 hover:bg-slate-600 text-white">
            <Eye className="h-4 w-4 mr-2" />
            Approaches
          </Button>
          <Button className="bg-slate-700 hover:bg-slate-600 text-white">
            <Cloud className="h-4 w-4 mr-2" />
            Weather Emergencies
          </Button>
          <Button className="bg-slate-700 hover:bg-slate-600 text-white">
            <Navigation className="h-4 w-4 mr-2" />
            Partial Panel
          </Button>
        </div>

        {/* Current Session Display */}
        {currentSession && (
          <div className="bg-blue-500/10 border border-blue-400/30 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div className="text-blue-300 font-semibold">Active Session</div>
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-400">
                AI INSTRUCTOR ACTIVE
              </Badge>
            </div>
            <div className="text-white mt-1">{currentSession}</div>
            <div className="text-blue-200 text-sm mt-2">
              AI Instructor is monitoring your performance and will provide real-time feedback.
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};