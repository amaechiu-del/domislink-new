/**
 * Voice Interaction Panel - Enables pilot to communicate with AI Instructor via headset/microphone
 * Implements Web Speech API for real-time voice recognition and response
 */
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Mic, MicOff, Headphones, Volume2, MessageCircle } from 'lucide-react';

interface VoiceInteractionProps {
  userName: string;
  onPilotCommand: (command: string) => void;
  examinationMode?: boolean;
}

export const VoiceInteraction: React.FC<VoiceInteractionProps> = ({
  userName,
  onPilotCommand,
  examinationMode = false
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Check for Web Speech API support
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setIsSupported(true);
      // Initialize speech recognition
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) {
          setTranscript(finalTranscript);
          onPilotCommand(finalTranscript);
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
    }
  }, [onPilotCommand]);

  const toggleListening = () => {
    if (!isSupported) {
      alert('Speech recognition is not supported in your browser. Please use Chrome or Edge.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
      setTranscript('');
    }
  };

  const simulateVoiceCommand = (command: string) => {
    setTranscript(command);
    onPilotCommand(command);
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-white flex items-center justify-between">
          <div className="flex items-center">
            <Headphones className="h-5 w-5 mr-2 text-blue-400" />
            Voice Communication System
          </div>
          <Badge className={
            isListening ? 
            'bg-green-500/20 text-green-300 border-green-400' : 
            'bg-slate-500/20 text-slate-300 border-slate-400'
          }>
            {isListening ? 'LISTENING' : 'STANDBY'}
          </Badge>
        </CardTitle>
        <CardDescription className="text-blue-200">
          Communicate with AI Instructor through headset and microphone
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Voice Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              onClick={toggleListening}
              className={
                isListening ? 
                'bg-red-600 hover:bg-red-700' : 
                'bg-green-600 hover:bg-green-700'
              }
              size="lg"
            >
              {isListening ? (
                <MicOff className="h-5 w-5 mr-2" />
              ) : (
                <Mic className="h-5 w-5 mr-2" />
              )}
              {isListening ? 'Stop Listening' : 'Start Voice Chat'}
            </Button>
          </div>
          
          <div className="flex items-center text-sm text-blue-300">
            <Volume2 className="h-4 w-4 mr-1" />
            {isSupported ? 'API Ready' : 'Not Supported'}
          </div>
        </div>

        {/* Transcript Display */}
        {transcript && (
          <div className="bg-slate-900 rounded-lg p-3 border border-blue-400/30">
            <div className="text-blue-300 text-sm font-semibold mb-1">Pilot Transmission:</div>
            <div className="text-white font-mono text-sm">{transcript}</div>
          </div>
        )}

        {/* Quick Command Buttons for Demo */}
        {!isSupported && (
          <div className="bg-amber-500/10 border border-amber-400/30 rounded-lg p-3">
            <div className="text-amber-300 text-sm font-semibold mb-2">
              Voice API Not Available - Simulated Commands:
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button 
                size="sm" 
                variant="outline"
                className="bg-transparent border-blue-400 text-blue-400 hover:bg-blue-400/10"
                onClick={() => simulateVoiceCommand("Request ILS approach runway 27L")}
              >
                ILS Approach
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                className="bg-transparent border-green-400 text-green-400 hover:bg-green-400/10"
                onClick={() => simulateVoiceCommand("Executing holding pattern at VOR")}
              >
                Holding Procedure
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                className="bg-transparent border-purple-400 text-purple-400 hover:bg-purple-400/10"
                onClick={() => simulateVoiceCommand("Initiating VOR approach")}
              >
                VOR Approach
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                className="bg-transparent border-red-400 text-red-400 hover:bg-red-400/10"
                onClick={() => simulateVoiceCommand("Partial panel instruments failure")}
              >
                Partial Panel
              </Button>
            </div>
          </div>
        )}

        {/* Voice Protocol Instructions */}
        <div className="bg-slate-700/50 rounded-lg p-3">
          <div className="text-white text-sm font-semibold mb-2 flex items-center">
            <MessageCircle className="h-4 w-4 mr-2 text-blue-400" />
            Standard Voice Protocol
          </div>
          <ul className="text-blue-200 text-xs space-y-1">
            <li>• Speak clearly and concisely</li>
            <li>• Use standard aviation phraseology</li>
            <li>• State intentions clearly: "Request", "Executing", "Completed"</li>
            <li>• AI will respond immediately to valid commands</li>
            {examinationMode && (
              <li className="text-amber-300">• ALL COMMUNICATIONS ARE RECORDED AND EVALUATED</li>
            )}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};