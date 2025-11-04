/**
 * Flight Training Homepage - Main entry point for the AI-powered flight simulator platform
 * Provides overview, program highlights, and entry point to training modules
 */
import React from 'react';
import { Link } from 'react-router';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { 
  Plane, 
  GraduationCap, 
  Map, 
  Cloud, 
  BookOpen, 
  PlayCircle,
  Shield,
  Users,
  Clock,
  Award
} from 'lucide-react';

export default function FlightTrainingHome() {
  const programHighlights = [
    {
      icon: <GraduationCap className="h-8 w-8" />,
      title: "Structured Curriculum",
      description: "Comprehensive training programs for PPL, CPL, and ATPL licenses"
    },
    {
      icon: <Cloud className="h-8 w-8" />,
      title: "Live Weather Integration",
      description: "Real-world METAR/TAF data with dynamic weather effects"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "AI Co-Pilot Assistance",
      description: "Intelligent AI instructor with real-time guidance and feedback"
    },
    {
      icon: <Map className="h-8 w-8" />,
      title: "Advanced Charting",
      description: "Secure VFR/IFR charts with dynamic moving-map overlays"
    }
  ];

  const licenseLevels = [
    {
      level: "PPL",
      title: "Private Pilot License",
      description: "Foundational training for single-engine aircraft",
      aircraft: "Cessna 152/172, Piper Warrior",
      duration: "40-60 hours",
      color: "blue"
    },
    {
      level: "CPL",
      title: "Commercial Pilot License",
      description: "Advanced training for multi-engine aircraft",
      aircraft: "Beechcraft Baron, King Air 350",
      duration: "150-200 hours",
      color: "green"
    },
    {
      level: "ATPL",
      title: "Airline Transport Pilot License",
      description: "Professional jet operations and multi-crew coordination",
      aircraft: "Boeing 737, Airbus A320, Boeing 787",
      duration: "1500+ hours",
      color: "purple"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-blue-900 text-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Plane className="h-8 w-8 text-blue-400" />
            <h1 className="text-2xl font-bold">DomisLink Flight Academy</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="bg-transparent border-blue-400 text-blue-400 hover:bg-blue-400/10">
              License Login
            </Button>
            <Button className="bg-amber-500 hover:bg-amber-600 text-slate-900">
              Start Training
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <Badge className="mb-4 bg-blue-500/20 text-blue-300 border-blue-400">
            AI-Powered Flight Training
          </Badge>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Professional Pilot Training
          </h1>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Advanced virtual flight simulator platform with AI co-pilot assistance, 
            live weather integration, and comprehensive training programs for PPL, CPL, and ATPL licenses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/flight-training/simulator">
              <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold">
                <PlayCircle className="h-5 w-5 mr-2" />
                Start Simulation
              </Button>
            </Link>
            <Link to="/flight-training/courses">
              <Button size="lg" variant="outline" className="bg-transparent border-blue-400 text-blue-400 hover:bg-blue-400/10">
                <BookOpen className="h-5 w-5 mr-2" />
                View Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Program Highlights */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Advanced Training Features</h2>
          <p className="text-blue-200 max-w-2xl mx-auto">
            Our platform combines cutting-edge technology with professional aviation standards
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programHighlights.map((feature, index) => (
            <Card key={index} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="text-blue-400 mx-auto">{feature.icon}</div>
                <CardTitle className="text-lg text-white">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-200 text-sm text-center">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* License Levels */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">License Training Programs</h2>
          <p className="text-blue-200 max-w-2xl mx-auto">
            Structured progression from private pilot to airline transport pilot
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {licenseLevels.map((program, index) => (
            <Card key={index} className={`bg-slate-800/50 border-${program.color}-500/30 backdrop-blur-sm hover:border-${program.color}-500/60 transition-all duration-300`}>
              <CardHeader className="text-center border-b border-slate-700 pb-4">
                <Badge className={`w-fit mx-auto bg-${program.color}-500/20 text-${program.color}-300 border-${program.color}-400`}>
                  {program.level}
                </Badge>
                <CardTitle className="text-xl text-white mt-2">{program.title}</CardTitle>
                <CardDescription className="text-blue-200">{program.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-blue-200">Aircraft:</span>
                    <span className="text-white font-medium">{program.aircraft}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-200">Duration:</span>
                    <span className="text-white font-medium">{program.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-200">Focus:</span>
                    <span className="text-white font-medium">
                      {program.level === 'PPL' && 'VFR Operations'}
                      {program.level === 'CPL' && 'Multi-engine IFR'}
                      {program.level === 'ATPL' && 'Jet Operations'}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link to={`/flight-training/courses/${program.level.toLowerCase()}`} className="w-full">
                  <Button className={`w-full bg-${program.color}-500 hover:bg-${program.color}-600 text-white`}>
                    Explore {program.level} Program
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Security Features */}
      <section className="container mx-auto px-4 py-16">
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader className="text-center">
            <Shield className="h-12 w-12 text-green-400 mx-auto mb-4" />
            <CardTitle className="text-2xl text-white">Enterprise-Grade Security</CardTitle>
            <CardDescription className="text-blue-200 text-lg">
              Protected content with license key authentication and session management
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <Users className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <h4 className="font-semibold text-white">Single Session Enforcement</h4>
                <p className="text-blue-200 text-sm">One active session per license key</p>
              </div>
              <div>
                <Shield className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <h4 className="font-semibold text-white">Content Protection</h4>
                <p className="text-blue-200 text-sm">No copy, print, or export capabilities</p>
              </div>
              <div>
                <Clock className="h-8 w-8 text-amber-400 mx-auto mb-2" />
                <h4 className="font-semibold text-white">Session Tracking</h4>
                <p className="text-blue-200 text-sm">Real-time usage monitoring and logging</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}