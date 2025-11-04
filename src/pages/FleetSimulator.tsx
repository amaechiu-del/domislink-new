/**
 * Fleet Simulator Management System
 * Comprehensive vehicle fleet management with simulation controls
 */
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { 
  Car, 
  Bus, 
  Truck, 
  Bike, 
  Moon, 
  Sun, 
  Cloud, 
  CloudRain,
  CloudDrizzle,
  Users,
  Zap,
  Shield,
  BarChart3,
  Play,
  Pause,
  RotateCcw,
  Settings
} from 'lucide-react';

interface FleetSimulatorProps {
  language?: string;
}

interface Vehicle {
  id: string;
  name: string;
  type: string;
  status: 'Online' | 'Offline' | 'In Use';
  fuel: number;
  maintenance: string;
  location: string;
  driver: string;
}

interface SimulationSettings {
  timeOfDay: 'day' | 'night';
  weather: 'clear' | 'rain' | 'fog';
  traffic: 'low' | 'medium' | 'high';
}

export default function FleetSimulator({ language = 'en' }: FleetSimulatorProps) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    {
      id: '1',
      name: 'Toyota Camry',
      type: 'Sedan',
      status: 'Online',
      fuel: 85,
      maintenance: '2024-12-01',
      location: 'Lagos HQ',
      driver: 'John D.'
    },
    {
      id: '2',
      name: 'Mercedes Sprinter',
      type: 'Bus',
      status: 'In Use',
      fuel: 45,
      maintenance: '2024-11-15',
      location: 'Abuja Route',
      driver: 'Sarah M.'
    },
    {
      id: '3',
      name: 'Volvo FH16',
      type: 'Truck',
      status: 'Online',
      fuel: 92,
      maintenance: '2024-12-20',
      location: 'Port Harcourt',
      driver: 'Mike T.'
    },
    {
      id: '4',
      name: 'Keke NAPEP',
      type: 'Tricycle',
      status: 'Offline',
      fuel: 30,
      maintenance: '2024-10-30',
      location: 'Kano',
      driver: 'Ahmed B.'
    },
    {
      id: '5',
      name: 'Ford Ranger',
      type: 'Open Body',
      status: 'Online',
      fuel: 78,
      maintenance: '2024-11-25',
      location: 'Ibadan',
      driver: 'Chinedu O.'
    },
    {
      id: '6',
      name: 'Toyota Hiace',
      type: 'Minibus',
      status: 'In Use',
      fuel: 60,
      maintenance: '2024-12-05',
      location: 'Enugu',
      driver: 'Grace L.'
    }
  ]);

  const [simulationSettings, setSimulationSettings] = useState<SimulationSettings>({
    timeOfDay: 'day',
    weather: 'clear',
    traffic: 'medium'
  });

  const [isSimulationRunning, setIsSimulationRunning] = useState(false);

  const content = {
    en: {
      title: "Fleet Simulator",
      subtitle: "Manage and simulate your entire vehicle fleet in real-time",
      vehicles: {
        title: "Vehicle Fleet",
        subtitle: "Monitor and manage all vehicles in your fleet"
      },
      simulation: {
        title: "Simulation Controls",
        subtitle: "Configure simulation environment and scenarios"
      },
      training: {
        title: "Training Modules",
        subtitle: "Available training scenarios for drivers"
      },
      analytics: {
        title: "Fleet Analytics",
        subtitle: "Real-time performance metrics and insights"
      },
      status: {
        online: "Online",
        offline: "Offline",
        inUse: "In Use"
      }
    },
    fr: {
      title: "Simulateur de Flotte",
      subtitle: "Gérez et simulez toute votre flotte de véhicules en temps réel",
      vehicles: {
        title: "Flotte de Véhicules",
        subtitle: "Surveillez et gérez tous les véhicules de votre flotte"
      },
      simulation: {
        title: "Contrôles de Simulation",
        subtitle: "Configurez l'environnement et les scénarios de simulation"
      },
      training: {
        title: "Modules de Formation",
        subtitle: "Scénarios de formation disponibles pour les conducteurs"
      },
      analytics: {
        title: "Analyses de Flotte",
        subtitle: "Métriques de performance et insights en temps réel"
      },
      status: {
        online: "En Ligne",
        offline: "Hors Ligne",
        inUse: "En Utilisation"
      }
    }
  };

  const currentContent = content[language as keyof typeof content] || content.en;

  const getVehicleIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'sedan':
      case 'car':
        return <Car className="h-6 w-6 text-blue-600" />;
      case 'bus':
      case 'minibus':
        return <Bus className="h-6 w-6 text-green-600" />;
      case 'truck':
        return <Truck className="h-6 w-6 text-orange-600" />;
      case 'tricycle':
        return <Bike className="h-6 w-6 text-purple-600" />;
      default:
        return <Car className="h-6 w-6 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Online':
        return <Badge className="bg-green-100 text-green-800">{currentContent.status.online}</Badge>;
      case 'Offline':
        return <Badge variant="secondary" className="bg-gray-100 text-gray-800">{currentContent.status.offline}</Badge>;
      case 'In Use':
        return <Badge className="bg-blue-100 text-blue-800">{currentContent.status.inUse}</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const toggleSimulation = () => {
    setIsSimulationRunning(!isSimulationRunning);
  };

  const resetSimulation = () => {
    setSimulationSettings({
      timeOfDay: 'day',
      weather: 'clear',
      traffic: 'medium'
    });
    setIsSimulationRunning(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {currentContent.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {currentContent.subtitle}
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Vehicle Fleet */}
          <div className="lg:col-span-2 space-y-8">
            {/* Vehicle Fleet */}
            <Card>
              <CardHeader>
                <CardTitle>{currentContent.vehicles.title}</CardTitle>
                <CardDescription>{currentContent.vehicles.subtitle}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {vehicles.map((vehicle) => (
                    <Card key={vehicle.id} className="hover:shadow-lg transition-shadow duration-300">
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            {getVehicleIcon(vehicle.type)}
                            <div>
                              <CardTitle className="text-lg">{vehicle.name}</CardTitle>
                              <CardDescription>{vehicle.type}</CardDescription>
                            </div>
                          </div>
                          {getStatusBadge(vehicle.status)}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Fuel:</span>
                            <span className="font-medium">{vehicle.fuel}%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Maintenance:</span>
                            <span className="font-medium">{vehicle.maintenance}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Location:</span>
                            <span className="font-medium">{vehicle.location}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Driver:</span>
                            <span className="font-medium">{vehicle.driver}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Training Modules */}
            <Card>
              <CardHeader>
                <CardTitle>{currentContent.training.title}</CardTitle>
                <CardDescription>{currentContent.training.subtitle}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: "Defensive Driving", duration: "2 hours", difficulty: "Intermediate" },
                    { name: "Night Driving", duration: "1.5 hours", difficulty: "Advanced" },
                    { name: "Emergency Response", duration: "3 hours", difficulty: "Expert" },
                    { name: "Fleet Management", duration: "2.5 hours", difficulty: "Intermediate" }
                  ].map((module, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow duration-300">
                      <CardContent className="pt-6">
                        <h4 className="font-semibold text-gray-900 mb-2">{module.name}</h4>
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>Duration: {module.duration}</span>
                          <span>Level: {module.difficulty}</span>
                        </div>
                        <Button className="w-full mt-3" size="sm">
                          Start Training
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Controls & Analytics */}
          <div className="space-y-8">
            {/* Simulation Controls */}
            <Card>
              <CardHeader>
                <CardTitle>{currentContent.simulation.title}</CardTitle>
                <CardDescription>{currentContent.simulation.subtitle}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Time of Day */}
                  <div>
                    <label className="block text-sm font-medium mb-3">Time of Day</label>
                    <div className="flex space-x-3">
                      <Button
                        variant={simulationSettings.timeOfDay === 'day' ? 'default' : 'outline'}
                        className="flex-1 bg-transparent"
                        onClick={() => setSimulationSettings(prev => ({ ...prev, timeOfDay: 'day' }))}
                      >
                        <Sun className="h-4 w-4 mr-2" />
                        Day
                      </Button>
                      <Button
                        variant={simulationSettings.timeOfDay === 'night' ? 'default' : 'outline'}
                        className="flex-1 bg-transparent"
                        onClick={() => setSimulationSettings(prev => ({ ...prev, timeOfDay: 'night' }))}
                      >
                        <Moon className="h-4 w-4 mr-2" />
                        Night
                      </Button>
                    </div>
                  </div>

                  {/* Weather */}
                  <div>
                    <label className="block text-sm font-medium mb-3">Weather Conditions</label>
                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        variant={simulationSettings.weather === 'clear' ? 'default' : 'outline'}
                        className="bg-transparent"
                        onClick={() => setSimulationSettings(prev => ({ ...prev, weather: 'clear' }))}
                      >
                        <Cloud className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={simulationSettings.weather === 'rain' ? 'default' : 'outline'}
                        className="bg-transparent"
                        onClick={() => setSimulationSettings(prev => ({ ...prev, weather: 'rain' }))}
                      >
                        <CloudRain className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={simulationSettings.weather === 'fog' ? 'default' : 'outline'}
                        className="bg-transparent"
                        onClick={() => setSimulationSettings(prev => ({ ...prev, weather: 'fog' }))}
                      >
                        <CloudDrizzle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Traffic Density */}
                  <div>
                    <label className="block text-sm font-medium mb-3">Traffic Density</label>
                    <div className="flex space-x-2">
                      {['low', 'medium', 'high'].map((density) => (
                        <Button
                          key={density}
                          variant={simulationSettings.traffic === density ? 'default' : 'outline'}
                          className="flex-1 bg-transparent capitalize"
                          onClick={() => setSimulationSettings(prev => ({ ...prev, traffic: density as any }))}
                        >
                          {density}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Control Buttons */}
                  <div className="flex space-x-3 pt-4">
                    <Button
                      onClick={toggleSimulation}
                      className={`flex-1 ${isSimulationRunning ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
                    >
                      {isSimulationRunning ? (
                        <>
                          <Pause className="h-4 w-4 mr-2" />
                          Stop
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 mr-2" />
                          Start
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={resetSimulation}
                      className="bg-transparent"
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Reset
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Analytics */}
            <Card>
              <CardHeader>
                <CardTitle>{currentContent.analytics.title}</CardTitle>
                <CardDescription>{currentContent.analytics.subtitle}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { label: "Fuel Consumption", value: "45.2 L/100km", trend: "↓ 2%" },
                    { label: "Maintenance Cost", value: "$12,450", trend: "↑ 5%" },
                    { label: "Vehicle Utilization", value: "78%", trend: "↑ 8%" },
                    { label: "Driver Performance", value: "4.2/5", trend: "→" }
                  ].map((metric, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">{metric.label}</div>
                        <div className="text-2xl font-bold text-blue-600">{metric.value}</div>
                      </div>
                      <div className={`text-sm font-medium ${
                        metric.trend.includes('↑') ? 'text-red-600' : 
                        metric.trend.includes('↓') ? 'text-green-600' : 'text-gray-600'
                      }`}>
                        {metric.trend}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="bg-transparent h-16">
                    <Users className="h-5 w-5 mr-2" />
                    Drivers
                  </Button>
                  <Button variant="outline" className="bg-transparent h-16">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Reports
                  </Button>
                  <Button variant="outline" className="bg-transparent h-16">
                    <Shield className="h-5 w-5 mr-2" />
                    Safety
                  </Button>
                  <Button variant="outline" className="bg-transparent h-16">
                    <Settings className="h-5 w-5 mr-2" />
                    Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}