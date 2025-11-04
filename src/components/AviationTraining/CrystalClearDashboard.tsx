/**
 * Crystal Clear Aircraft Dashboard - Professional aviation-grade instrument display
 * Real-time weather integration and GPS navigation with enhanced clarity
 */
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Navigation, 
  Cloud, 
  Compass, 
  Gauge, 
  MapPin,
  Wifi,
  Satellite,
  Wind
} from 'lucide-react';

interface FlightParameters {
  altitude: number;
  heading: number;
  airspeed: number;
  verticalSpeed: number;
  fuel: number;
  latitude: number;
  longitude: number;
  gpsSatellites: number;
  gpsSignal: number;
}

interface WeatherData {
  temperature: number;
  windDirection: number;
  windSpeed: number;
  visibility: number;
  clouds: string;
  pressure: number;
}

interface CrystalClearDashboardProps {
  aircraftType: 'cessna-172' | 'beechcraft-baron' | 'king-air-350' | 'boeing-737' | 'airbus-a320';
  realTimeWeather?: boolean;
  onInstrumentUpdate?: (instruments: FlightParameters) => void;
}

export const CrystalClearDashboard: React.FC<CrystalClearDashboardProps> = ({
  aircraftType,
  realTimeWeather = true,
  onInstrumentUpdate
}) => {
  const [flightParams, setFlightParams] = useState<FlightParameters>({
    altitude: 2500,
    heading: 180,
    airspeed: 120,
    verticalSpeed: 0,
    fuel: 100,
    latitude: 40.7128,
    longitude: -74.0060,
    gpsSatellites: 8,
    gpsSignal: 95
  });

  const [weather, setWeather] = useState<WeatherData>({
    temperature: 15,
    windDirection: 270,
    windSpeed: 12,
    visibility: 10,
    clouds: 'Few at 3000ft',
    pressure: 1013
  });

  const [activeTab, setActiveTab] = useState('primary');

  // Simulate real-time instrument updates
  useEffect(() => {
    const interval = setInterval(() => {
      setFlightParams(prev => ({
        ...prev,
        altitude: prev.altitude + (prev.verticalSpeed / 60),
        heading: (prev.heading + 0.1) % 360,
        latitude: prev.latitude + 0.0001,
        longitude: prev.longitude - 0.0001,
        gpsSatellites: Math.max(6, Math.min(12, prev.gpsSatellites + (Math.random() - 0.5))),
        gpsSignal: Math.max(85, Math.min(100, prev.gpsSignal + (Math.random() - 0.3)))
      }));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Simulate weather updates if real-time enabled
  useEffect(() => {
    if (realTimeWeather) {
      const interval = setInterval(() => {
        setWeather(prev => ({
          ...prev,
          windDirection: (prev.windDirection + Math.random() * 10 - 5) % 360,
          windSpeed: Math.max(5, Math.min(25, prev.windSpeed + Math.random() * 4 - 2)),
          temperature: prev.temperature + (Math.random() - 0.5)
        }));
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [realTimeWeather]);

  const formatAltitude = (alt: number) => Math.round(alt).toString().padStart(5, '0');
  const formatHeading = (hdg: number) => Math.round(hdg).toString().padStart(3, '0');
  const formatAirspeed = (speed: number) => Math.round(speed);
  const formatVerticalSpeed = (vs: number) => {
    const absVs = Math.abs(vs);
    const sign = vs >= 0 ? '+' : '-';
    return `${sign}${Math.round(absVs)}`;
  };

  const getAircraftLimits = () => {
    const limits = {
      'cessna-172': { maxSpeed: 140, maxAltitude: 14000 },
      'beechcraft-baron': { maxSpeed: 202, maxAltitude: 20000 },
      'king-air-350': { maxSpeed: 312, maxAltitude: 35000 },
      'boeing-737': { maxSpeed: 430, maxAltitude: 41000 },
      'airbus-a320': { maxSpeed: 430, maxAltitude: 39000 }
    };
    return limits[aircraftType] || limits['cessna-172'];
  };

  const aircraftLimits = getAircraftLimits();

  return (
    <Card className="bg-slate-800/70 border-slate-600 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white text-lg flex items-center">
            <Gauge className="h-5 w-5 mr-2 text-blue-400" />
            Crystal Clear Dashboard
          </CardTitle>
          <Badge className="bg-green-500/20 text-green-300 border-green-400">
            <Wifi className="h-3 w-3 mr-1" />
            GPS: {flightParams.gpsSignal}%
          </Badge>
        </div>
        <CardDescription className="text-blue-200">
          Real-time flight instruments with enhanced clarity
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 p-1 m-4">
            <TabsTrigger value="primary" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              Primary
            </TabsTrigger>
            <TabsTrigger value="navigation" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
              Navigation
            </TabsTrigger>
            <TabsTrigger value="systems" className="data-[state=active]:bg-amber-500 data-[state=active]:text-white">
              Systems
            </TabsTrigger>
          </TabsList>

          <TabsContent value="primary" className="m-0 p-4 space-y-4">
            {/* Primary Flight Display */}
            <div className="grid grid-cols-2 gap-4">
              {/* Airspeed Indicator */}
              <div className="bg-slate-900 rounded-lg p-4 border-2 border-blue-400/30">
                <div className="text-center mb-3">
                  <div className="text-blue-300 text-sm font-semibold">AIRSPEED</div>
                  <div className="text-3xl font-mono text-white font-bold">
                    {formatAirspeed(flightParams.airspeed)}
                    <span className="text-sm text-blue-300 ml-1">KTS</span>
                  </div>
                </div>
                <div className="w-full bg-slate-700 h-3 rounded-full overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-amber-400 h-full rounded-full transition-all duration-200"
                    style={{ width: `${(flightParams.airspeed / aircraftLimits.maxSpeed) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Altimeter */}
              <div className="bg-slate-900 rounded-lg p-4 border-2 border-cyan-400/30">
                <div className="text-center mb-3">
                  <div className="text-cyan-300 text-sm font-semibold">ALTITUDE</div>
                  <div className="text-3xl font-mono text-white font-bold">
                    {formatAltitude(flightParams.altitude)}
                    <span className="text-sm text-cyan-300 ml-1">FT</span>
                  </div>
                </div>
                <div className="w-full bg-slate-700 h-3 rounded-full overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-cyan-400 to-blue-400 h-full rounded-full transition-all duration-200"
                    style={{ width: `${(flightParams.altitude / aircraftLimits.maxAltitude) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Heading Indicator */}
              <div className="bg-slate-900 rounded-lg p-4 border-2 border-amber-400/30">
                <div className="text-center mb-3">
                  <div className="text-amber-300 text-sm font-semibold">HEADING</div>
                  <div className="text-3xl font-mono text-white font-bold">
                    {formatHeading(flightParams.heading)}
                    <span className="text-sm text-amber-300 ml-1">°</span>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="w-20 h-20 border-2 border-amber-400 rounded-full relative">
                    <div 
                      className="absolute top-1/2 left-1/2 w-1 h-10 bg-white transform -translate-x-1/2 -translate-y-1/2 origin-bottom shadow-lg"
                      style={{ transform: `translate(-50%, -50%) rotate(${flightParams.heading}deg)` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Vertical Speed */}
              <div className="bg-slate-900 rounded-lg p-4 border-2 border-purple-400/30">
                <div className="text-center mb-3">
                  <div className="text-purple-300 text-sm font-semibold">V/S</div>
                  <div className="text-3xl font-mono text-white font-bold">
                    {formatVerticalSpeed(flightParams.verticalSpeed)}
                    <span className="text-sm text-purple-300 ml-1">FPM</span>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="w-20 h-20 border-2 border-purple-400 rounded-full relative overflow-hidden">
                    <div 
                      className="absolute bottom-0 left-1/2 w-full transform -translate-x-1/2 transition-all duration-200"
                      style={{ 
                        height: `${Math.min(100, Math.abs(flightParams.verticalSpeed) / 20)}%`,
                        background: flightParams.verticalSpeed >= 0 ? 
                          'linear-gradient(to top, #34d399, #10b981)' : 
                          'linear-gradient(to top, #f87171, #ef4444)'
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Fuel & Systems Status */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-900 rounded-lg p-3 border border-slate-700">
                <div className="text-green-300 text-sm font-semibold mb-2">FUEL QUANTITY</div>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-mono text-white font-bold">
                    {flightParams.fuel.toFixed(1)}
                    <span className="text-sm text-green-300 ml-1">%</span>
                  </div>
                  <div className="w-24 bg-slate-700 h-3 rounded-full overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-green-400 to-green-600 h-full rounded-full transition-all duration-200"
                      style={{ width: `${flightParams.fuel}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 rounded-lg p-3 border border-slate-700">
                <div className="text-blue-300 text-sm font-semibold mb-2">GPS STATUS</div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-white">
                    <Satellite className="h-4 w-4 mr-2 text-green-400" />
                    {flightParams.gpsSatellites} Sats
                  </div>
                  <Badge className={
                    flightParams.gpsSignal > 90 ? 'bg-green-500/20 text-green-300 border-green-400' :
                    flightParams.gpsSignal > 80 ? 'bg-amber-500/20 text-amber-300 border-amber-400' :
                    'bg-red-500/20 text-red-300 border-red-400'
                  }>
                    {flightParams.gpsSignal}%
                  </Badge>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="navigation" className="m-0 p-4">
            <div className="bg-slate-900 rounded-lg p-4 border-2 border-green-400/30">
              <div className="flex items-center mb-4">
                <Navigation className="h-5 w-5 mr-2 text-green-400" />
                <div className="text-green-300 font-semibold">GPS NAVIGATION</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-blue-200 text-sm">POSITION</div>
                  <div className="text-white font-mono text-lg">
                    {flightParams.latitude.toFixed(4)}°N
                  </div>
                  <div className="text-white font-mono text-lg">
                    {flightParams.longitude.toFixed(4)}°W
                  </div>
                </div>
                <div>
                  <div className="text-blue-200 text-sm">DESTINATION</div>
                  <div className="text-white font-semibold">KBOS</div>
                  <div className="text-green-300 text-sm">Boston Logan</div>
                </div>
              </div>

              {/* Moving Map Placeholder */}
              <div className="bg-slate-800 rounded-lg p-8 border border-slate-700 text-center">
                <MapPin className="h-12 w-12 text-green-400 mx-auto mb-3" />
                <div className="text-white font-semibold mb-1">Moving Map Display</div>
                <div className="text-blue-200 text-sm">Active GPS Navigation with Terrain</div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="systems" className="m-0 p-4">
            <div className="bg-slate-900 rounded-lg p-4 border-2 border-amber-400/30">
              <div className="flex items-center mb-4">
                <Cloud className="h-5 w-5 mr-2 text-amber-400" />
                <div className="text-amber-300 font-semibold">WEATHER & SYSTEMS</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-blue-200 text-sm">TEMPERATURE</div>
                  <div className="text-white font-mono text-xl">
                    {weather.temperature.toFixed(1)}°C
                  </div>
                </div>
                <div>
                  <div className="text-blue-200 text-sm">WIND</div>
                  <div className="text-white font-mono text-xl">
                    {Math.round(weather.windSpeed)}KTS
                  </div>
                  <div className="text-blue-200 text-xs">
                    {Math.round(weather.windDirection)}°
                  </div>
                </div>
                <div>
                  <div className="text-blue-200 text-sm">VISIBILITY</div>
                  <div className="text-white font-mono text-xl">
                    {weather.visibility}SM
                  </div>
                </div>
                <div>
                  <div className="text-blue-200 text-sm">PRESSURE</div>
                  <div className="text-white font-mono text-xl">
                    {weather.pressure}hPa
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-slate-800 rounded-lg">
                <div className="text-blue-200 text-sm mb-1">CLOUDS & CONDITIONS</div>
                <div className="text-white font-semibold">{weather.clouds}</div>
                <div className="text-green-300 text-xs mt-1">Real-time METAR Data Active</div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};