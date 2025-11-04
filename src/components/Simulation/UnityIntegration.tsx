/**
 * Unity Integration Component for 3D Simulation Embedding
 * Framework for embedding Unity WebGL builds and external simulators
 */
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Download, 
  Settings,
  Monitor,
  Gamepad2,
  VR
} from 'lucide-react';

interface UnityIntegrationProps {
  language?: string;
}

export default function UnityIntegration({ language = 'en' }: UnityIntegrationProps) {
  const [isSimulationRunning, setIsSimulationRunning] = useState(false);
  const [simulationQuality, setSimulationQuality] = useState<'low' | 'medium' | 'high'>('medium');

  const content = {
    en: {
      title: "3D Simulation Integration",
      subtitle: "Embed Unity WebGL simulations and external training modules",
      status: {
        ready: "Ready",
        loading: "Loading",
        error: "Error"
      },
      controls: {
        start: "Start Simulation",
        stop: "Stop Simulation",
        reset: "Reset",
        download: "Download Simulator",
        settings: "Settings"
      },
      features: [
        "Real-time 3D rendering",
        "Physics-based vehicle simulation",
        "Multi-platform compatibility",
        "VR/AR ready",
        "Performance optimization"
      ]
    },
    fr: {
      title: "Intégration Simulation 3D",
      subtitle: "Intégrez des simulations Unity WebGL et modules de formation externes",
      status: {
        ready: "Prêt",
        loading: "Chargement",
        error: "Erreur"
      },
      controls: {
        start: "Démarrer Simulation",
        stop: "Arrêter Simulation",
        reset: "Réinitialiser",
        download: "Télécharger Simulateur",
        settings: "Paramètres"
      },
      features: [
        "Rendu 3D en temps réel",
        "Simulation véhicule basée physique",
        "Compatibilité multiplateforme",
        "Prêt VR/AR",
        "Optimisation performance"
      ]
    }
  };

  const currentContent = content[language as keyof typeof content] || content.en;

  const toggleSimulation = () => {
    setIsSimulationRunning(!isSimulationRunning);
  };

  const handleQualityChange = (quality: 'low' | 'medium' | 'high') => {
    setSimulationQuality(quality);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{currentContent.title}</CardTitle>
            <CardDescription>{currentContent.subtitle}</CardDescription>
          </div>
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            {currentContent.status.ready}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Simulation Preview/Placeholder */}
          <div className="bg-gray-900 rounded-lg h-64 flex items-center justify-center">
            <div className="text-center text-white">
              <Monitor className="h-16 w-16 mx-auto mb-4 text-gray-400" />
              <p className="text-lg font-semibold">3D Simulation Area</p>
              <p className="text-gray-400 text-sm mt-2">
                Unity WebGL simulation would be embedded here
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {currentContent.features.map((feature, index) => (
              <div key={index} className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-sm text-blue-700 font-medium">{feature}</div>
              </div>
            ))}
          </div>

          {/* Control Panel */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Simulation Controls */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Simulation Controls</h4>
              <div className="flex space-x-3">
                <Button
                  onClick={toggleSimulation}
                  className={`flex-1 ${isSimulationRunning ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
                >
                  {isSimulationRunning ? (
                    <>
                      <Pause className="h-4 w-4 mr-2" />
                      {currentContent.controls.stop}
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      {currentContent.controls.start}
                    </>
                  )}
                </Button>
                <Button variant="outline" className="bg-transparent">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  {currentContent.controls.reset}
                </Button>
              </div>
            </div>

            {/* Quality Settings */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Quality Settings</h4>
              <div className="flex space-x-2">
                {['low', 'medium', 'high'].map((quality) => (
                  <Button
                    key={quality}
                    variant={simulationQuality === quality ? 'default' : 'outline'}
                    className="flex-1 bg-transparent capitalize"
                    onClick={() => handleQualityChange(quality as any)}
                  >
                    {quality}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Additional Controls */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button variant="outline" className="bg-transparent h-16">
              <Download className="h-5 w-5 mr-2" />
              {currentContent.controls.download}
            </Button>
            <Button variant="outline" className="bg-transparent h-16">
              <Settings className="h-5 w-5 mr-2" />
              {currentContent.controls.settings}
            </Button>
            <Button variant="outline" className="bg-transparent h-16">
              <Gamepad2 className="h-5 w-5 mr-2" />
              Controller
            </Button>
            <Button variant="outline" className="bg-transparent h-16">
              <VR className="h-5 w-5 mr-2" />
              VR Mode
            </Button>
          </div>

          {/* Integration Status */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h5 className="font-semibold text-blue-900 mb-2">Integration Status</h5>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <div className="text-blue-700">Unity WebGL</div>
                <div className="text-green-600 font-medium">Ready</div>
              </div>
              <div>
                <div className="text-blue-700">Physics Engine</div>
                <div className="text-green-600 font-medium">Active</div>
              </div>
              <div>
                <div className="text-blue-700">Asset Loading</div>
                <div className="text-green-600 font-medium">Complete</div>
              </div>
              <div>
                <div className="text-blue-700">Performance</div>
                <div className="text-yellow-600 font-medium">Optimizing</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}