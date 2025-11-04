/**
 * AI Co-Pilot Component - Provides intelligent assistance and real-time guidance
 * Features text-to-speech, checklist reading, and contextual prompts
 */
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { 
  Volume2, 
  VolumeX, 
  MessageCircle, 
  CheckCircle2, 
  AlertTriangle,
  Mic,
  Play,
  Pause
} from 'lucide-react';

interface FlightParameters {
  altitude: number;
  heading: number;
  airspeed: number;
  verticalSpeed: number;
  fuel: number;
}

interface AICoPilotProps {
  active: boolean;
  flightParams: FlightParameters;
  simulationRunning: boolean;
  currentModule: string;
}

interface AIMessage {
  id: string;
  type: 'instruction' | 'warning' | 'info' | 'checklist';
  content: string;
  timestamp: Date;
  priority: 'low' | 'medium' | 'high';
}

export const AICoPilot: React.FC<AICoPilotProps> = ({ 
  active, 
  flightParams, 
  simulationRunning,
  currentModule 
}) => {
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [speechEnabled, setSpeechEnabled] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const speechSynth = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    speechSynth.current = window.speechSynthesis;
    
    // Initial briefing when AI becomes active
    if (active && messages.length === 0) {
      addMessage({
        type: 'info',
        content: 'AI Co-Pilot initialized. Ready to assist with flight training.',
        priority: 'low'
      });
    }
  }, [active]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    // Monitor flight parameters and provide guidance
    if (active && simulationRunning) {
      const { altitude, airspeed, verticalSpeed, fuel } = flightParams;

      // Altitude monitoring
      if (altitude < 1000 && verticalSpeed < -500) {
        addMessage({
          type: 'warning',
          content: 'Rapid descent detected. Consider reducing vertical speed.',
          priority: 'high'
        });
      }

      // Airspeed monitoring
      if (airspeed < 80) {
        addMessage({
          type: 'warning',
          content: 'Airspeed low. Risk of stall. Add power and lower nose.',
          priority: 'high'
        });
      }

      if (airspeed > 160) {
        addMessage({
          type: 'warning',
          content: 'Airspeed high for current configuration. Consider reducing power.',
          priority: 'medium'
        });
      }

      // Fuel monitoring
      if (fuel < 20) {
        addMessage({
          type: 'warning',
          content: 'Fuel level low. Consider diverting to nearest airport.',
          priority: 'high'
        });
      }

      // Regular position updates
      if (Math.random() < 0.1) { // 10% chance every render
        addMessage({
          type: 'info',
          content: `Maintaining ${Math.round(altitude)} feet at ${Math.round(airspeed)} knots.`,
          priority: 'low'
        });
      }
    }
  }, [flightParams, simulationRunning, active]);

  const addMessage = (message: Omit<AIMessage, 'id' | 'timestamp'>) => {
    const newMessage: AIMessage = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);

    // Speak the message if speech is enabled and it's not low priority
    if (speechEnabled && message.priority !== 'low' && active) {
      speakMessage(newMessage.content);
    }
  };

  const speakMessage = (text: string) => {
    if (!speechSynth.current) return;

    // Cancel any ongoing speech
    speechSynth.current.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    utterance.volume = 0.8;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    speechSynth.current.speak(utterance);
  };

  const stopSpeech = () => {
    if (speechSynth.current) {
      speechSynth.current.cancel();
      setIsSpeaking(false);
    }
  };

  const toggleSpeech = () => {
    if (isSpeaking) {
      stopSpeech();
    }
    setSpeechEnabled(!speechEnabled);
  };

  const readChecklist = () => {
    const checklist = [
      "Pre-flight inspection complete",
      "Fuel quantity checked",
      "Flight controls free and correct",
      "Instruments checked",
      "Radio set to proper frequency",
      "Seat belts secured",
      "Mixture rich",
      "Fuel pump on",
      "Master switch on",
      "Engine start"
    ];

    checklist.forEach((item, index) => {
      setTimeout(() => {
        addMessage({
          type: 'checklist',
          content: item,
          priority: 'medium'
        });
      }, index * 2000);
    });
  };

  const getMessageIcon = (type: AIMessage['type']) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-amber-400" />;
      case 'checklist':
        return <CheckCircle2 className="h-4 w-4 text-green-400" />;
      case 'info':
        return <MessageCircle className="h-4 w-4 text-blue-400" />;
      default:
        return <MessageCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getMessageColor = (type: AIMessage['type']) => {
    switch (type) {
      case 'warning':
        return 'border-amber-400/30 bg-amber-400/10';
      case 'checklist':
        return 'border-green-400/30 bg-green-400/10';
      case 'info':
        return 'border-blue-400/30 bg-blue-400/10';
      default:
        return 'border-gray-400/30 bg-gray-400/10';
    }
  };

  if (!active) {
    return (
      <Card className="h-full bg-slate-800/50 border-slate-700 rounded-none">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-white flex items-center">
            <MessageCircle className="h-5 w-5 mr-2 text-slate-400" />
            AI Co-Pilot
          </CardTitle>
          <CardDescription className="text-slate-400">
            AI assistance is currently disabled
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-32">
          <div className="text-center text-slate-400">
            <MessageCircle className="h-8 w-8 mx-auto mb-2" />
            <p>Enable AI Co-Pilot for assistance</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full bg-slate-800/50 border-slate-700 rounded-none">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg text-white flex items-center">
              <MessageCircle className="h-5 w-5 mr-2 text-green-400" />
              AI Co-Pilot
            </CardTitle>
            <CardDescription className="text-green-200">
              Active and monitoring flight parameters
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              className={`bg-transparent ${
                speechEnabled 
                  ? 'border-green-400 text-green-400 hover:bg-green-400/10' 
                  : 'border-slate-400 text-slate-400 hover:bg-slate-400/10'
              }`}
              onClick={toggleSpeech}
            >
              {speechEnabled ? (
                <Volume2 className="h-4 w-4" />
              ) : (
                <VolumeX className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-transparent border-blue-400 text-blue-400 hover:bg-blue-400/10"
              onClick={readChecklist}
            >
              <Play className="h-4 w-4 mr-1" />
              Checklist
            </Button>
            {isSpeaking && (
              <Button
                variant="outline"
                size="sm"
                className="bg-transparent border-amber-400 text-amber-400 hover:bg-amber-400/10"
                onClick={stopSpeech}
              >
                <Pause className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <ScrollArea className="h-44 pr-4">
          <div className="space-y-3 p-4">
            {messages.length === 0 ? (
              <div className="text-center text-slate-400 py-8">
                <MessageCircle className="h-8 w-8 mx-auto mb-2" />
                <p>No messages yet. AI Co-Pilot will provide guidance during flight.</p>
              </div>
            ) : (
              messages.slice(-10).map((message) => (
                <div
                  key={message.id}
                  className={`p-3 rounded-lg border ${getMessageColor(message.type)} backdrop-blur-sm`}
                >
                  <div className="flex items-start space-x-3">
                    {getMessageIcon(message.type)}
                    <div className="flex-1">
                      <p className="text-white text-sm">{message.content}</p>
                      <p className="text-slate-400 text-xs mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                    <Badge 
                      className={
                        message.priority === 'high' ? 'bg-red-500/20 text-red-300 border-red-400' :
                        message.priority === 'medium' ? 'bg-amber-500/20 text-amber-300 border-amber-400' :
                        'bg-blue-500/20 text-blue-300 border-blue-400'
                      }
                    >
                      {message.priority}
                    </Badge>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};