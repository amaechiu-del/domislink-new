/**
 * Flight Examination System - Strict evaluation mode with mandatory AI instructor
 * Enforces professional standards and provides comprehensive debriefing
 */
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { ScrollArea } from '../ui/scroll-area';
import { 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Award,
  BarChart3,
  MessageCircle,
  Volume2,
  VolumeX
} from 'lucide-react';

interface ExaminationCriteria {
  category: string;
  weight: number;
  score: number;
  comments: string[];
  passed: boolean;
}

interface FlightExaminationProps {
  userName: string;
  examinationType: 'ppl-check' | 'cpl-check' | 'atpl-check' | 'instrument-recurrency';
  onExaminationComplete: (results: ExaminationResults) => void;
}

interface ExaminationResults {
  overallScore: number;
  passed: boolean;
  criteria: ExaminationCriteria[];
  debriefing: string;
  recommendations: string[];
}

export const FlightExamination: React.FC<FlightExaminationProps> = ({
  userName,
  examinationType,
  onExaminationComplete
}) => {
  const [examinationActive, setExaminationActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(180); // 3 minutes in seconds
  const [currentPhase, setCurrentPhase] = useState<'pre-flight' | 'takeoff' | 'enroute' | 'approach' | 'landing' | 'post-flight'>('pre-flight');
  const [aiMessages, setAiMessages] = useState<string[]>([]);
  const [performanceScores, setPerformanceScores] = useState<ExaminationCriteria[]>([]);
  const [speechEnabled, setSpeechEnabled] = useState(true);

  // Examination criteria based on type
  const examinationCriteria: Record<string, ExaminationCriteria[]> = {
    'ppl-check': [
      { category: 'Pre-flight Inspection', weight: 10, score: 0, comments: [], passed: false },
      { category: 'Engine Start & Taxi', weight: 5, score: 0, comments: [], passed: false },
      { category: 'Takeoff Procedure', weight: 15, score: 0, comments: [], passed: false },
      { category: 'Climb & Cruise', weight: 10, score: 0, comments: [], passed: false },
      { category: 'Maneuvers', weight: 20, score: 0, comments: [], passed: false },
      { category: 'Approach Planning', weight: 15, score: 0, comments: [], passed: false },
      { category: 'Landing', weight: 20, score: 0, comments: [], passed: false },
      { category: 'Emergency Procedures', weight: 5, score: 0, comments: [], passed: false }
    ],
    'instrument-recurrency': [
      { category: 'Instrument Scan', weight: 15, score: 0, comments: [], passed: false },
      { category: 'Holding Patterns', weight: 20, score: 0, comments: [], passed: false },
      { category: 'Precision Approaches', weight: 25, score: 0, comments: [], passed: false },
      { category: 'Non-precision Approaches', weight: 20, score: 0, comments: [], passed: false },
      { category: 'Partial Panel', weight: 10, score: 0, comments: [], passed: false },
      { category: 'Unusual Attitudes', weight: 10, score: 0, comments: [], passed: false }
    ],
    'cpl-check': [
      { category: 'Multi-engine Operations', weight: 20, score: 0, comments: [], passed: false },
      { category: 'IFR Procedures', weight: 25, score: 0, comments: [], passed: false },
      { category: 'Systems Management', weight: 15, score: 0, comments: [], passed: false },
      { category: 'Emergency Drills', weight: 20, score: 0, comments: [], passed: false },
      { category: 'Commercial Maneuvers', weight: 20, score: 0, comments: [], passed: false }
    ],
    'atpl-check': [
      { category: 'Jet Systems', weight: 15, score: 0, comments: [], passed: false },
      { category: 'CRM & Leadership', weight: 20, score: 0, comments: [], passed: false },
      { category: 'High-altitude Operations', weight: 15, score: 0, comments: [], passed: false },
      { category: 'Line Operations', weight: 25, score: 0, comments: [], passed: false },
      { category: 'Emergency & Abnormal', weight: 25, score: 0, comments: [], passed: false }
    ]
  };

  useEffect(() => {
    setPerformanceScores(examinationCriteria[examinationType] || examinationCriteria['ppl-check']);
  }, [examinationType]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (examinationActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            completeExamination();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [examinationActive, timeRemaining]);

  const startExamination = () => {
    setExaminationActive(true);
    setTimeRemaining(180);
    setCurrentPhase('pre-flight');
    addAiMessage(`${userName}, this is your ${getExaminationTitle()} examination. I cannot be disabled during this evaluation. Maintain professional standards.`);
    addAiMessage("Beginning with pre-flight inspection. Follow procedures exactly as trained.");
  };

  const completeExamination = () => {
    setExaminationActive(false);
    
    // Calculate final scores (mock implementation)
    const finalScores = performanceScores.map(criteria => ({
      ...criteria,
      score: Math.floor(Math.random() * 40) + 60, // Random score between 60-100
      passed: Math.random() > 0.3 // 70% pass rate for demo
    }));

    const overallScore = finalScores.reduce((sum, criteria) => 
      sum + (criteria.score * criteria.weight / 100), 0
    );

    const passed = overallScore >= 80;

    const results: ExaminationResults = {
      overallScore: Math.round(overallScore),
      passed,
      criteria: finalScores,
      debriefing: generateDebriefing(overallScore, passed, userName),
      recommendations: generateRecommendations(finalScores)
    };

    onExaminationComplete(results);
  };

  const addAiMessage = (message: string) => {
    setAiMessages(prev => [...prev, message]);
    
    if (speechEnabled) {
      // Text-to-speech implementation would go here
      console.log("AI Speaking:", message);
    }
  };

  const getExaminationTitle = () => {
    const titles = {
      'ppl-check': 'Private Pilot License Check Ride',
      'cpl-check': 'Commercial Pilot License Check Ride', 
      'atpl-check': 'Airline Transport Pilot License Check Ride',
      'instrument-recurrency': 'Instrument Proficiency Check'
    };
    return titles[examinationType] || 'Flight Examination';
  };

  const generateDebriefing = (score: number, passed: boolean, name: string): string => {
    if (passed) {
      if (score >= 95) return `Outstanding performance, ${name}! Your precision and professionalism exceeded standards. You're ready for the next level.`;
      if (score >= 90) return `Excellent work, ${name}. Your procedures were crisp and decision-making sound. Minor areas for refinement noted.`;
      if (score >= 85) return `Good performance, ${name}. You demonstrated solid skills with room for improvement in specific areas.`;
      return `Satisfactory performance, ${name}. You met the minimum standards but need focused practice to excel.`;
    } else {
      if (score >= 70) return `${name}, you were close but fell short in critical areas. Additional training required before re-examination.`;
      if (score >= 60) return `${name}, significant deficiencies noted. You need comprehensive review and practice before attempting this examination again.`;
      return `${name}, this performance is unacceptable for certification. Immediate remedial training required.`;
    }
  };

  const generateRecommendations = (criteria: ExaminationCriteria[]): string[] => {
    const recommendations: string[] = [];
    const failedCriteria = criteria.filter(c => !c.passed);
    
    failedCriteria.forEach(criterion => {
      recommendations.push(`Focus on ${criterion.category.toLowerCase()} during your next training session`);
    });

    if (recommendations.length === 0) {
      recommendations.push("Continue current training regimen to maintain proficiency");
      recommendations.push("Consider advanced scenarios to challenge your skills further");
    }

    return recommendations.slice(0, 3);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center justify-between">
          <div className="flex items-center">
            <Award className="h-6 w-6 mr-2 text-amber-400" />
            Flight Examination System
          </div>
          <Badge className={
            examinationActive ? 
            'bg-red-500/20 text-red-300 border-red-400' : 
            'bg-blue-500/20 text-blue-300 border-blue-400'
          }>
            {examinationActive ? 'EXAMINATION ACTIVE' : 'READY FOR EVALUATION'}
          </Badge>
        </CardTitle>
        <CardDescription className="text-blue-200">
          {getExaminationTitle()} - AI Instructor Cannot Be Disabled
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {!examinationActive ? (
          // Pre-examination briefing
          <div className="space-y-4">
            <div className="bg-slate-700/50 rounded-lg p-4 border border-amber-400/30">
              <h4 className="text-amber-400 font-semibold mb-2 flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Examination Rules
              </h4>
              <ul className="text-sm text-blue-200 space-y-1">
                <li>• AI Instructor cannot be disabled during examination</li>
                <li>• Follow all procedures exactly as trained</li>
                <li>• Maintain professional communication standards</li>
                <li>• Time limit: 3 minutes for evaluation phase</li>
                <li>• Minimum passing score: 80%</li>
              </ul>
            </div>
            
            <Button 
              onClick={startExamination}
              className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold"
            >
              Begin Flight Examination
            </Button>
          </div>
        ) : (
          // Active examination
          <div className="space-y-4">
            {/* Examination Timer */}
            <div className="flex items-center justify-between bg-slate-700 rounded-lg p-3">
              <div className="flex items-center text-white">
                <Clock className="h-5 w-5 mr-2 text-blue-400" />
                Time Remaining
              </div>
              <div className={`text-lg font-mono font-bold ${
                timeRemaining < 60 ? 'text-red-400' : 'text-green-400'
              }`}>
                {formatTime(timeRemaining)}
              </div>
            </div>

            {/* Current Phase */}
            <div className="bg-slate-700 rounded-lg p-3">
              <div className="text-sm text-blue-200 mb-1">Current Phase</div>
              <div className="text-white font-semibold capitalize">{currentPhase.replace('-', ' ')}</div>
              <Progress value={
                currentPhase === 'pre-flight' ? 10 :
                currentPhase === 'takeoff' ? 30 :
                currentPhase === 'enroute' ? 50 :
                currentPhase === 'approach' ? 70 :
                currentPhase === 'landing' ? 90 : 100
              } className="mt-2" />
            </div>

            {/* AI Instructor Messages */}
            <ScrollArea className="h-32 bg-slate-900 rounded-lg p-3">
              <div className="space-y-2">
                {aiMessages.map((message, index) => (
                  <div key={index} className="text-sm text-white bg-slate-800 rounded p-2 border-l-2 border-amber-400">
                    <div className="flex items-start">
                      <MessageCircle className="h-3 w-3 text-amber-400 mt-1 mr-2 flex-shrink-0" />
                      {message}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Performance Indicators */}
            <div className="grid grid-cols-2 gap-2">
              {performanceScores.slice(0, 4).map((criteria, index) => (
                <div key={index} className="bg-slate-700 rounded p-2 text-center">
                  <div className="text-xs text-blue-200 mb-1">{criteria.category}</div>
                  <div className="text-white font-bold text-lg">
                    {criteria.score > 0 ? `${criteria.score}%` : '--'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};