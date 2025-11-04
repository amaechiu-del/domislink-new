/**
 * Course Pathways Page - Displays structured training programs for PPL, CPL, ATPL
 * Provides detailed curricula, aircraft lineup, and training objectives
 */
import React, { useState } from 'react';
import { useParams, Link } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Progress } from '../components/ui/progress';
import { 
  Plane, 
  BookOpen, 
  Clock, 
  Target, 
  CheckCircle2, 
  PlayCircle,
  MapPin,
  Users,
  Cloud
} from 'lucide-react';
import { ProtectedContent } from '../components/FlightTraining/LicenseAuth';

interface CourseModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  objectives: string[];
  completed: boolean;
  type: 'theory' | 'simulation' | 'exam';
}

interface Aircraft {
  id: string;
  name: string;
  type: string;
  image: string;
  specs: {
    engines: string;
    maxSpeed: string;
    range: string;
    crew: string;
  };
}

interface LicenseCourse {
  level: 'ppl' | 'cpl' | 'atpl';
  title: string;
  description: string;
  totalHours: string;
  aircraft: Aircraft[];
  modules: CourseModule[];
  requirements: string[];
}

const courseData: Record<string, LicenseCourse> = {
  ppl: {
    level: 'ppl',
    title: 'Private Pilot License',
    description: 'Foundational training for single-engine aircraft operations under Visual Flight Rules',
    totalHours: '40-60 hours',
    aircraft: [
      {
        id: 'cessna-172',
        name: 'Cessna 172 Skyhawk',
        type: 'Single Engine Piston',
        image: 'https://pub-cdn.sider.ai/u/U0Y3HG1OZK0/web-coder/69088bf961d18d65760b5c96/resource/9879da94-b259-44d0-b25e-00d8336d4bbd.jpg',
        specs: {
          engines: '1 × Lycoming IO-360',
          maxSpeed: '126 knots',
          range: '640 nm',
          crew: '1 pilot + 3 passengers'
        }
      },
      {
        id: 'piper-warrior',
        name: 'Piper PA-28 Warrior',
        type: 'Single Engine Piston',
        image: 'https://pub-cdn.sider.ai/u/U0Y3HG1OZK0/web-coder/69088bf961d18d65760b5c96/resource/080a77bf-0a2d-45fb-97d0-872f0ebb6357.jpg',
        specs: {
          engines: '1 × Lycoming O-320',
          maxSpeed: '122 knots',
          range: '565 nm',
          crew: '1 pilot + 3 passengers'
        }
      }
    ],
    requirements: [
      'Minimum 17 years old',
      'Medical Certificate Class 1 or 2',
      'English language proficiency',
      '40 hours flight time minimum'
    ],
    modules: [
      {
        id: 'ppl-1',
        title: 'Aerodynamics & Principles of Flight',
        description: 'Understanding aircraft performance and flight characteristics',
        duration: '8 hours',
        type: 'theory',
        completed: true,
        objectives: [
          'Lift, weight, thrust, and drag relationships',
          'Stability and control surfaces',
          'Aircraft performance calculations',
          'Stall and spin recovery procedures'
        ]
      },
      {
        id: 'ppl-2',
        title: 'VFR Navigation & Chart Reading',
        description: 'Visual flight rules navigation techniques and chart interpretation',
        duration: '10 hours',
        type: 'theory',
        completed: true,
        objectives: [
          'VFR sectional chart interpretation',
          'Dead reckoning navigation',
          'Pilotage techniques',
          'Radio navigation aids'
        ]
      },
      {
        id: 'ppl-3',
        title: 'Basic Flight Maneuvers',
        description: 'Fundamental aircraft control and basic maneuvers',
        duration: '15 hours',
        type: 'simulation',
        completed: false,
        objectives: [
          'Straight and level flight',
          'Turns, climbs, and descents',
          'Slow flight and stalls',
          'Emergency procedures'
        ]
      },
      {
        id: 'ppl-4',
        title: 'Takeoff & Landing Procedures',
        description: 'Airport operations and landing techniques',
        duration: '12 hours',
        type: 'simulation',
        completed: false,
        objectives: [
          'Normal takeoff and landing',
          'Crosswind techniques',
          'Short field operations',
          'Go-around procedures'
        ]
      },
      {
        id: 'ppl-5',
        title: 'PPL Final Examination',
        description: 'Comprehensive practical and theoretical examination',
        duration: '4 hours',
        type: 'exam',
        completed: false,
        objectives: [
          'Written knowledge test',
          'Oral examination',
          'Practical flight test',
          'Emergency scenario assessment'
        ]
      }
    ]
  },
  cpl: {
    level: 'cpl',
    title: 'Commercial Pilot License',
    description: 'Advanced training for commercial operations with multi-engine and instrument ratings',
    totalHours: '150-200 hours',
    aircraft: [
      {
        id: 'beechcraft-baron',
        name: 'Beechcraft Baron 58',
        type: 'Multi Engine Piston',
        image: 'https://pub-cdn.sider.ai/u/U0Y3HG1OZK0/web-coder/69088bf961d18d65760b5c96/resource/b0fed37a-15f1-420b-b1f7-ec51f603b276.jpg',
        specs: {
          engines: '2 × Continental IO-520',
          maxSpeed: '202 knots',
          range: '1,200 nm',
          crew: '1 pilot + 5 passengers'
        }
      },
      {
        id: 'king-air-350',
        name: 'King Air 350',
        type: 'Turboprop',
        image: 'https://pub-cdn.sider.ai/u/U0Y3HG1OZK0/web-coder/69088bf961d18d65760b5c96/resource/b8cb63e5-7a62-4d55-94ad-f78698b196b2.jpg',
        specs: {
          engines: '2 × Pratt & Whitney PT6A',
          maxSpeed: '312 knots',
          range: '1,800 nm',
          crew: '2 pilots + 9 passengers'
        }
      }
    ],
    requirements: [
      'Valid PPL license',
      'Minimum 150 hours flight time',
      'Instrument rating',
      'Multi-engine rating'
    ],
    modules: [
      {
        id: 'cpl-1',
        title: 'Advanced Aerodynamics',
        description: 'Complex aircraft performance and high-altitude operations',
        duration: '12 hours',
        type: 'theory',
        completed: false,
        objectives: [
          'High-speed aerodynamics',
          'Jet engine principles',
          'Pressurization systems',
          'Performance planning'
        ]
      },
      {
        id: 'cpl-2',
        title: 'IFR Procedures & Instrument Flying',
        description: 'Instrument flight rules and precision approaches',
        duration: '25 hours',
        type: 'simulation',
        completed: false,
        objectives: [
          'Instrument scan techniques',
          'Holding patterns',
          'Precision approaches',
          'Partial panel flying'
        ]
      },
      {
        id: 'cpl-3',
        title: 'Multi-Engine Operations',
        description: 'Twin-engine aircraft systems and emergency procedures',
        duration: '20 hours',
        type: 'simulation',
        completed: false,
        objectives: [
          'Engine failure procedures',
          'VMC demonstration',
          'Single-engine operations',
          'System management'
        ]
      }
    ]
  },
  atpl: {
    level: 'atpl',
    title: 'Airline Transport Pilot License',
    description: 'Professional jet operations, multi-crew coordination, and airline procedures',
    totalHours: '1500+ hours',
    aircraft: [
      {
        id: 'boeing-737',
        name: 'Boeing 737-800',
        type: 'Narrow-body Jet',
        image: 'https://pub-cdn.sider.ai/u/U0Y3HG1OZK0/web-coder/69088bf961d18d65760b5c96/resource/c2015f26-bbb7-482b-87c8-ecd341c7c4ca.jpg',
        specs: {
          engines: '2 × CFM56-7B',
          maxSpeed: 'Mach 0.82',
          range: '2,935 nm',
          crew: '2 pilots + 4-6 cabin crew'
        }
      },
      {
        id: 'airbus-a320',
        name: 'Airbus A320',
        type: 'Narrow-body Jet',
        image: 'https://pub-cdn.sider.ai/u/U0Y3HG1OZK0/web-coder/69088bf961d18d65760b5c96/resource/65397ce5-899f-4559-86bf-d462e1d6525c.jpg',
        specs: {
          engines: '2 × CFM56 or IAE V2500',
          maxSpeed: 'Mach 0.82',
          range: '3,300 nm',
          crew: '2 pilots + 4-6 cabin crew'
        }
      }
    ],
    requirements: [
      'Valid CPL license',
      'Minimum 1500 hours total time',
      'Multi-crew cooperation course',
      'Type rating for specific aircraft'
    ],
    modules: [
      {
        id: 'atpl-1',
        title: 'Jet Aircraft Systems',
        description: 'Advanced aircraft systems and automation management',
        duration: '40 hours',
        type: 'theory',
        completed: false,
        objectives: [
          'Glass cockpit systems',
          'Flight management computer',
          'Autoflight systems',
          'Advanced warning systems'
        ]
      },
      {
        id: 'atpl-2',
        title: 'Multi-Crew Coordination',
        description: 'Crew resource management and standard operating procedures',
        duration: '30 hours',
        type: 'simulation',
        completed: false,
        objectives: [
          'CRM principles',
          'SOP development',
          'Threat and error management',
          'Communication protocols'
        ]
      },
      {
        id: 'atpl-3',
        title: 'Line Oriented Flight Training',
        description: 'Real-world airline operations and scenario-based training',
        duration: '50 hours',
        type: 'simulation',
        completed: false,
        objectives: [
          'Dispatch procedures',
          'Irregular operations',
          'Minimum equipment list',
          'Line operations simulation'
        ]
      }
    ]
  }
};

export default function CoursePathways() {
  const { licenseLevel } = useParams();
  const [activeTab, setActiveTab] = useState(licenseLevel || 'ppl');
  
  const course = courseData[activeTab as keyof typeof courseData];
  const completedModules = course.modules.filter(module => module.completed).length;
  const progress = (completedModules / course.modules.length) * 100;

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-blue-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
          <Link to="/flight-training/courses">
            <Button>Back to Courses</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <ProtectedContent>
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-blue-900 text-white">
        {/* Header */}
        <header className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link to="/flight-training">
                <Button variant="outline" className="bg-transparent border-blue-400 text-blue-400 hover:bg-blue-400/10">
                  ← Back to Home
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <Plane className="h-6 w-6 text-blue-400" />
                <h1 className="text-xl font-bold">Flight Training Courses</h1>
              </div>
            </div>
            <Badge className={`bg-${activeTab === 'ppl' ? 'blue' : activeTab === 'cpl' ? 'green' : 'purple'}-500/20 text-${activeTab === 'ppl' ? 'blue' : activeTab === 'cpl' ? 'green' : 'purple'}-300 border-${activeTab === 'ppl' ? 'blue' : activeTab === 'cpl' ? 'green' : 'purple'}-400`}>
              {course.title}
            </Badge>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          {/* Course Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 p-1">
              <TabsTrigger value="ppl" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                PPL
              </TabsTrigger>
              <TabsTrigger value="cpl" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
                CPL
              </TabsTrigger>
              <TabsTrigger value="atpl" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
                ATPL
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Course Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <Card className="lg:col-span-2 bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-white">{course.title}</CardTitle>
                <CardDescription className="text-blue-200 text-lg">
                  {course.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <Clock className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                    <div className="text-sm text-blue-200">Total Hours</div>
                    <div className="text-white font-semibold">{course.totalHours}</div>
                  </div>
                  <div className="text-center">
                    <BookOpen className="h-8 w-8 text-green-400 mx-auto mb-2" />
                    <div className="text-sm text-blue-200">Modules</div>
                    <div className="text-white font-semibold">{course.modules.length}</div>
                  </div>
                  <div className="text-center">
                    <Plane className="h-8 w-8 text-amber-400 mx-auto mb-2" />
                    <div className="text-sm text-blue-200">Aircraft</div>
                    <div className="text-white font-semibold">{course.aircraft.length}</div>
                  </div>
                  <div className="text-center">
                    <Target className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                    <div className="text-sm text-blue-200">Progress</div>
                    <div className="text-white font-semibold">{completedModules}/{course.modules.length}</div>
                  </div>
                </div>
                
                <Progress value={progress} className="h-2 mb-4" />
                
                <Link to={`/flight-training/simulator?course=${activeTab}`}>
                  <Button className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold">
                    <PlayCircle className="h-5 w-5 mr-2" />
                    Start Training Session
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <CheckCircle2 className="h-5 w-5 mr-2 text-green-400" />
                  Requirements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {course.requirements.map((req, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-blue-200">{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Aircraft Lineup */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Plane className="h-6 w-6 mr-2 text-blue-400" />
              Training Aircraft
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {course.aircraft.map((aircraft) => (
                <Card key={aircraft.id} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">{aircraft.name}</CardTitle>
                    <CardDescription className="text-blue-200">{aircraft.type}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-slate-700 rounded-lg mb-4 overflow-hidden">
                      <img 
                        src={aircraft.image} 
                        alt={aircraft.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-blue-200">Engines:</span>
                        <div className="text-white font-medium">{aircraft.specs.engines}</div>
                      </div>
                      <div>
                        <span className="text-blue-200">Max Speed:</span>
                        <div className="text-white font-medium">{aircraft.specs.maxSpeed}</div>
                      </div>
                      <div>
                        <span className="text-blue-200">Range:</span>
                        <div className="text-white font-medium">{aircraft.specs.range}</div>
                      </div>
                      <div>
                        <span className="text-blue-200">Crew:</span>
                        <div className="text-white font-medium">{aircraft.specs.crew}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Training Modules */}
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <BookOpen className="h-6 w-6 mr-2 text-green-400" />
              Training Curriculum
            </h2>
            <div className="space-y-4">
              {course.modules.map((module) => (
                <Card key={module.id} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <Badge className={
                            module.type === 'theory' ? 'bg-blue-500/20 text-blue-300 border-blue-400' :
                            module.type === 'simulation' ? 'bg-amber-500/20 text-amber-300 border-amber-400' :
                            'bg-red-500/20 text-red-300 border-red-400'
                          }>
                            {module.type.toUpperCase()}
                          </Badge>
                          {module.completed && (
                            <CheckCircle2 className="h-5 w-5 text-green-400" />
                          )}
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-1">{module.title}</h3>
                        <p className="text-blue-200 mb-3">{module.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-blue-300">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {module.duration}
                          </div>
                        </div>
                        <div className="mt-3">
                          <h4 className="text-sm font-semibold text-white mb-2">Learning Objectives:</h4>
                          <ul className="text-sm text-blue-200 space-y-1">
                            {module.objectives.map((objective, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <Target className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                                <span>{objective}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="ml-4">
                        <Link to={`/flight-training/simulator?module=${module.id}`}>
                          <Button 
                            size="sm" 
                            className={
                              module.completed ? 
                              'bg-green-500 hover:bg-green-600' : 
                              'bg-amber-500 hover:bg-amber-600 text-slate-900'
                            }
                          >
                            {module.completed ? 'Review' : 'Start'}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </div>
    </ProtectedContent>
  );
}