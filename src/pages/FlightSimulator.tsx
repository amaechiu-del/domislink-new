/**
 * Main Flight Simulator Interface - Interactive flight training with AI co-pilot
 * Combines instrument panel, controls, charts, and AI assistance
 */
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { 
  Plane, 
  Map, 
  BookOpen, 
  Mic, 
  Volume2, 
  Settings,
  Play,
  Pause,
  RotateCcw,
  Camera
} from 'lucide-react';
import { ProtectedContent } from '../components/FlightTraining/LicenseAuth';
import { AICoPilot } from '../components/FlightTraining/AICoPilot';
import { InstrumentPanel } from '../components/FlightTraining/InstrumentPanel';
import { SimulatorControls } from '../components/FlightTraining/SimulatorControls';
import { ChartsModal } from '../components/FlightTraining/ChartsModal';
import { WeatherPanel } from '../components/FlightTraining/WeatherPanel';

interface FlightParameters {
  altitude: number;
  heading: number;
  airspeed: number;
  verticalSpeed: number;
  fuel: number;
  latitude: number;
  longitude: number;
}

export default function FlightSimulator() {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('cockpit');
  const [flightParams, setFlightParams] = useState<FlightParameters>({
    altitude: 2500,
    heading: 180,
    airspeed: 120,
    verticalSpeed: 0,
    fuel: 100,
    latitude: 40.7128,
    longitude: -74.0060
  });
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [showCharts, setShowCharts] = useState(false);
  const [aiActive, setAiActive] = useState(true);

  const currentCourse = searchParams.get('course') || 'ppl';
  const currentModule = searchParams.get('module') || 'ppl-1';

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (simulationRunning) {
      interval = setInterval(() => {
        setFlightParams(prev => ({
          ...prev,
          altitude: prev.altitude + prev.verticalSpeed / 60, // Feet per minute to feet per second
          heading: (prev.heading + 0.1) % 360,
          latitude: prev.latitude + 0.001,
          fuel: Math.max(0, prev.fuel - 0.01)
        }));
      }, 100);
    }

    return () => clearInterval(interval);
  }, [simulationRunning]);

  const toggleSimulation = () => {
    setSimulationRunning(!simulationRunning);
  };

  const resetSimulation = () => {
    setFlightParams({
      altitude: 2500,
      heading: 180,
      airspeed: 120,
      verticalSpeed: 0,
      fuel: 100,
      latitude: 40.7128,
      longitude: -74.0060
    });
    setSimulationRunning(false);
  };

  const updateControl = (control: string, value: number) => {
    setFlightParams(prev => {
      switch (control) {
        case 'heading':
          return { ...prev, heading: (prev.heading + value) % 360 };
        case 'altitude':
          return { ...prev, verticalSpeed: value };
        case 'airspeed':
          return { ...prev, airspeed: Math.max(60, Math.min(200, prev.airspeed + value)) };
        default:
          return prev;
      }
    });
  };

  return (
    <ProtectedContent>
      <div className="h-screen bg-gradient-to-b from-slate-900 to-blue-900 text-white flex flex-col">
        {/* Header */}
        <header className="bg-slate-800/50 border-b border-slate-700 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/flight-training/courses">
                <Button variant="outline" size="sm" className="bg-transparent border-blue-400 text-blue-400 hover:bg-blue-400/10">
                  ← Back to Courses
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <Plane className="h-5 w-5 text-blue-400" />
                <span className="font-semibold">Flight Simulator</span>
              </div>
              <Badge className={
                currentCourse === 'ppl' ? 'bg-blue-500/20 text-blue-300 border-blue-400' :
                currentCourse === 'cpl' ? 'bg-green-500/20 text-green-300 border-green-400' :
                'bg-purple-500/20 text-purple-300 border-purple-400'
              }>
                {currentCourse.toUpperCase()} Training
              </Badge>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-transparent border-amber-400 text-amber-400 hover:bg-amber-400/10"
                onClick={() => setShowCharts(true)}
              >
                <Map className="h-4 w-4 mr-1" />
                Charts
              </Button>
              
              <div className="flex items-center space-x-2">
                <Button 
                  size="sm"
                  variant={simulationRunning ? "outline" : "default"}
                  className={
                    simulationRunning ? 
                    'bg-transparent border-red-400 text-red-400 hover:bg-red-400/10' :
                    'bg-green-500 hover:bg-green-600 text-white'
                  }
                  onClick={toggleSimulation}
                >
                  {simulationRunning ? (
                    <Pause className="h-4 w-4 mr-1" />
                  ) : (
                    <Play className="h-4 w-4 mr-1" />
                  )}
                  {simulationRunning ? 'Pause' : 'Start'}
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-transparent border-blue-400 text-blue-400 hover:bg-blue-400/10"
                  onClick={resetSimulation}
                >
                  <RotateCcw className="h-4 w-4 mr-1" />
                  Reset
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 flex">
          {/* Left Panel - Instruments and Controls */}
          <div className="w-80 bg-slate-800/30 border-r border-slate-700 flex flex-col">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
              <TabsList className="grid grid-cols-3 bg-slate-800/50 p-1 m-4">
                <TabsTrigger value="cockpit" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                  Cockpit
                </TabsTrigger>
                <TabsTrigger value="controls" className="data-[state=active]:bg-amber-500 data-[state=active]:text-white">
                  Controls
                </TabsTrigger>
                <TabsTrigger value="weather" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
                  Weather
                </TabsTrigger>
              </TabsList>

              <div className="flex-1 px-4 pb-4 overflow-y-auto">
                <TabsContent value="cockpit" className="m-0 h-full">
                  <InstrumentPanel 
                    altitude={flightParams.altitude}
                    heading={flightParams.heading}
                    airspeed={flightParams.airspeed}
                    verticalSpeed={flightParams.verticalSpeed}
                    fuel={flightParams.fuel}
                  />
                </TabsContent>

                <TabsContent value="controls" className="m-0 h-full">
                  <SimulatorControls 
                    onControlChange={updateControl}
                    disabled={!simulationRunning}
                  />
                </TabsContent>

                <TabsContent value="weather" className="m-0 h-full">
                  <WeatherPanel />
                </TabsContent>
              </div>
            </Tabs>
          </div>

          {/* Main Content - Visual Display and AI Co-Pilot */}
          <div className="flex-1 flex flex-col">
            {/* Visual Display */}
            <div className="flex-1 bg-slate-900 relative overflow-hidden">
              {/* 3D Visualization Placeholder */}
              <div className="absolute inset-0 bg-gradient-to-b from-blue-400 to-blue-600 flex items-center justify-center">
                <div className="text-center text-white/80">
                  <Camera className="h-16 w-16 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">3D Flight Visualization</h3>
                  <p className="text-sm">Live aircraft rendering and terrain display</p>
                </div>
              </div>
              
              {/* Position Overlay */}
              <div className="absolute top-4 left-4 bg-slate-800/80 backdrop-blur-sm rounded-lg p-3">
                <div className="text-sm space-y-1">
                  <div className="flex space-x-4">
                    <div>
                      <span className="text-blue-300">Lat:</span>
                      <span className="text-white ml-1">{flightParams.latitude.toFixed(4)}°</span>
                    </div>
                    <div>
                      <span className="text-blue-300">Lon:</span>
                      <span className="text-white ml-1">{flightParams.longitude.toFixed(4)}°</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-blue-300">Position:</span>
                    <span className="text-white ml-1">KJFK → KBOS</span>
                  </div>
                </div>
              </div>

              {/* AI Co-Pilot Status */}
              <div className="absolute top-4 right-4">
                <Button 
                  variant={aiActive ? "default" : "outline"}
                  size="sm"
                  className={
                    aiActive ? 
                    'bg-green-500 hover:bg-green-600' : 
                    'bg-transparent border-slate-400 text-slate-400 hover:bg-slate-400/10'
                  }
                  onClick={() => setAiActive(!aiActive)}
                >
                  <Volume2 className="h-4 w-4 mr-1" />
                  AI Co-Pilot: {aiActive ? 'ON' : 'OFF'}
                </Button>
              </div>
            </div>

            {/* AI Co-Pilot Panel */}
            <div className="h-64 border-t border-slate-700 bg-slate-800/50">
              <AICoPilot 
                active={aiActive}
                flightParams={flightParams}
                simulationRunning={simulationRunning}
                currentModule={currentModule}
              />
            </div>
          </div>
        </div>

        {/* Charts Modal */}
        <ChartsModal 
          open={showCharts}
          onOpenChange={setShowCharts}
          currentLocation={{ lat: flightParams.latitude, lng: flightParams.longitude }}
        />
      </div>
    </ProtectedContent>
  );
}