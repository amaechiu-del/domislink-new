/**
 * DomisLink Apps & Software - Official Product Portfolio & Monetization Platform
 * Showcases all applications, software products, and revenue streams with professional branding
 */
import React, { useState } from 'react';
import { Link } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  Smartphone, 
  Laptop, 
  Cloud, 
  DollarSign, 
  Shield, 
  Users,
  BookOpen,
  Plane,
  Building,
  Download,
  Play,
  Crown,
  Sparkles,
  Zap,
  Globe,
  Code,
  Video,
  Award,
  TrendingUp
} from 'lucide-react';

interface SoftwareProduct {
  id: string;
  name: string;
  category: 'simulator' | 'dashboard' | 'education' | 'enterprise';
  description: string;
  status: 'released' | 'beta' | 'development';
  platforms: ('web' | 'mobile' | 'desktop')[];
  pricing: {
    model: 'free' | 'subscription' | 'one-time' | 'enterprise';
    tiers: {
      name: string;
      price: string;
      features: string[];
    }[];
  };
  technologies: string[];
  revenueStreams: string[];
}

export default function AppsSoftware() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'simulator' | 'dashboard' | 'education' | 'enterprise'>('all');

  const softwareProducts: SoftwareProduct[] = [
    {
      id: 'crj900-fms-simulator',
      name: 'CRJ900 FMS Pro Simulator',
      category: 'simulator',
      description: 'Professional Flight Management System training simulator with realistic 3D cockpit and AI instructor',
      status: 'released',
      platforms: ['web', 'desktop'],
      pricing: {
        model: 'one-time',
        tiers: [
          {
            name: 'Student Edition',
            price: '$49',
            features: ['Basic FMS Training', '5 Training Scenarios', 'Community Support']
          },
          {
            name: 'Instructor Edition',
            price: '$299',
            features: ['Full FMS Training', 'Unlimited Scenarios', 'AI Instructor', 'Priority Support']
          },
          {
            name: 'Enterprise Edition',
            price: '$999+',
            features: ['Multi-seat License', 'White-label Option', 'Custom Training', 'Dedicated Support']
          }
        ]
      },
      technologies: ['Unity WebGL', 'React', 'Three.js', 'Node.js'],
      revenueStreams: ['Direct Sales', 'Enterprise Licensing', 'Training Partnerships']
    },
    {
      id: 'flight-training-platform',
      name: 'DomisLink Flight Academy',
      category: 'simulator',
      description: 'AI-powered flight training platform with PPL, CPL, ATPL programs and instrument recurrency',
      status: 'released',
      platforms: ['web', 'mobile'],
      pricing: {
        model: 'subscription',
        tiers: [
          {
            name: 'Basic',
            price: '$5/month',
            features: ['Limited Training Modules', 'Community Access', 'Basic Support']
          },
          {
            name: 'Professional',
            price: '$15/month',
            features: ['All Training Modules', 'AI Instructor', 'Progress Tracking', 'Priority Support']
          },
          {
            name: 'Enterprise',
            price: 'Custom',
            features: ['Multi-user Management', 'White-label Dashboard', 'Custom Content', 'Dedicated Support']
          }
        ]
      },
      technologies: ['React', 'Tailwind CSS', 'Node.js', 'AWS', 'AI/ML'],
      revenueStreams: ['Subscription', 'Enterprise SaaS', 'Certification Fees']
    },
    {
      id: 'ai-chief-accountant',
      name: 'AI Chief Accountant',
      category: 'dashboard',
      description: 'Enterprise financial management dashboard with AI-powered analytics and automated reporting',
      status: 'released',
      platforms: ['web'],
      pricing: {
        model: 'subscription',
        tiers: [
          {
            name: 'Startup',
            price: '$29/month',
            features: ['Basic Analytics', 'Automated Reports', 'Email Support']
          },
          {
            name: 'Business',
            price: '$99/month',
            features: ['Advanced Analytics', 'Custom Reports', 'API Access', 'Priority Support']
          },
          {
            name: 'Enterprise',
            price: '$299/month',
            features: ['Unlimited Users', 'White-label', 'Custom Development', '24/7 Support']
          }
        ]
      },
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Machine Learning'],
      revenueStreams: ['SaaS Subscriptions', 'Enterprise Contracts', 'API Access Fees']
    },
    {
      id: 'real-estate-ai',
      name: 'Real Estate AI Platform',
      category: 'dashboard',
      description: 'Intelligent property management and investment analysis with predictive market insights',
      status: 'beta',
      platforms: ['web', 'mobile'],
      pricing: {
        model: 'subscription',
        tiers: [
          {
            name: 'Basic',
            price: '$19/month',
            features: ['Property Listings', 'Basic Analytics', 'Market Trends']
          },
          {
            name: 'Professional',
            price: '$49/month',
            features: ['Advanced Analytics', 'Investment Scoring', 'AI Recommendations']
          }
        ]
      },
      technologies: ['React Native', 'Python', 'TensorFlow', 'Google Maps API'],
      revenueStreams: ['Subscription Fees', 'Transaction Commissions', 'Premium Listings']
    },
    {
      id: 'ai-handbook-platform',
      name: 'AI Educational Handbook',
      category: 'education',
      description: 'Interactive learning platform with AI-powered content and certification programs',
      status: 'released',
      platforms: ['web', 'mobile'],
      pricing: {
        model: 'one-time',
        tiers: [
          {
            name: 'Digital Edition',
            price: '$29',
            features: ['PDF Handbook', 'Basic Quizzes', 'Community Access']
          },
          {
            name: 'Premium Edition',
            price: '$99',
            features: ['Interactive Content', 'Video Tutorials', 'Certificate', 'Lifetime Updates']
          }
        ]
      },
      technologies: ['React', 'PDF.js', 'Video Streaming', 'Quiz Engine'],
      revenueStreams: ['Digital Sales', 'Certification Fees', 'Bulk Educational Licenses']
    },
    {
      id: 'university-hub',
      name: 'University AI Hub',
      category: 'education',
      description: 'Comprehensive educational platform for universities with AI-powered learning management',
      status: 'development',
      platforms: ['web'],
      pricing: {
        model: 'enterprise',
        tiers: [
          {
            name: 'Institutional License',
            price: '$5,000/year',
            features: ['Unlimited Students', 'Custom Branding', 'API Integration', 'Dedicated Support']
          }
        ]
      },
      technologies: ['React', 'MongoDB', 'AI Chat', 'LMS Integration'],
      revenueStreams: ['Institutional Licensing', 'Custom Development', 'Support Contracts']
    }
  ];

  const monetizationStreams = [
    {
      icon: <DollarSign className="h-6 w-6" />,
      title: "Direct Sales & Licensing",
      description: "One-time purchases and perpetual licenses for software products",
      revenue: "High margin, immediate cash flow"
    },
    {
      icon: <Cloud className="h-6 w-6" />,
      title: "Subscription Services",
      description: "Recurring revenue from cloud-based SaaS platforms",
      revenue: "Predictable monthly income"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Ad-Integrated Platforms",
      description: "Free versions with Google AdSense and premium upgrades",
      revenue: "Passive income from user traffic"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Affiliate Partnerships",
      description: "Revenue sharing with aviation schools and training centers",
      revenue: "Commission-based earnings"
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Content Licensing",
      description: "Digital handbooks, courses, and certification programs",
      revenue: "High-margin educational products"
    },
    {
      icon: <Building className="h-6 w-6" />,
      title: "Enterprise White-labeling",
      description: "Custom branded solutions for corporations and institutions",
      revenue: "High-value contracts"
    }
  ];

  const filteredProducts = activeCategory === 'all' 
    ? softwareProducts 
    : softwareProducts.filter(product => product.category === activeCategory);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'released': return 'bg-green-500/20 text-green-300 border-green-400';
      case 'beta': return 'bg-amber-500/20 text-amber-300 border-amber-400';
      case 'development': return 'bg-blue-500/20 text-blue-300 border-blue-400';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-400';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'simulator': return <Plane className="h-5 w-5" />;
      case 'dashboard': return <Zap className="h-5 w-5" />;
      case 'education': return <BookOpen className="h-5 w-5" />;
      case 'enterprise': return <Building className="h-5 w-5" />;
      default: return <Code className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-blue-900 text-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-cyan-600 to-blue-800">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-white/20 text-white border-white/30 backdrop-blur-sm">
            OFFICIAL SOFTWARE PORTFOLIO
          </Badge>
          <h1 className="text-5xl font-bold mb-6">
            DomisLink Apps & Software
          </h1>
          <p className="text-xl text-cyan-100 mb-8 max-w-3xl mx-auto">
            Professional software solutions powered by DomisLink International Business Services Ltd, Lagos, Nigeria
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-cyan-600 hover:bg-cyan-50 font-semibold">
              <Download className="h-5 w-5 mr-2" />
              Download Catalog
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-cyan-600">
              <Play className="h-5 w-5 mr-2" />
              View Demos
            </Button>
          </div>
        </div>
      </section>

      {/* Ownership Declaration */}
      <section className="py-16 bg-slate-800/50">
        <div className="container mx-auto px-4">
          <Card className="bg-slate-800/70 border-cyan-500/30 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-white flex items-center justify-center">
                <Shield className="h-6 w-6 mr-2 text-cyan-400" />
                DECLARATION OF BUILD OWNERSHIP
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="max-w-4xl mx-auto space-y-4 text-cyan-100">
                <p className="text-lg">
                  <strong>Project:</strong> DOMISLINK APPS & SOFTWARE<br />
                  <strong>Parent Entity:</strong> Domislink International Business Services Ltd, Lagos, Nigeria<br />
                  <strong>Founder:</strong> Amaechi Ubadike
                </p>
                <p>
                  All design systems, source code, UX structure, and software architecture related to Domislink Apps & Software 
                  are wholly owned, controlled, and licensed under Domislink International Business Services Ltd.
                </p>
                <div className="bg-cyan-500/10 border border-cyan-400/30 rounded-lg p-4 mt-4">
                  <p className="font-semibold text-cyan-300">
                    "Powered by Domislink Apps & Software — A Division of Domislink International Business Services Ltd, Lagos, Nigeria."
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Software Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Software Portfolio</h2>
            <p className="text-cyan-200 max-w-2xl mx-auto">
              Professional-grade software solutions across multiple industries and platforms
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <Button
              variant={activeCategory === 'all' ? 'default' : 'outline'}
              className={activeCategory === 'all' ? 'bg-cyan-600' : 'bg-transparent border-cyan-400 text-cyan-400'}
              onClick={() => setActiveCategory('all')}
            >
              All Products
            </Button>
            <Button
              variant={activeCategory === 'simulator' ? 'default' : 'outline'}
              className={activeCategory === 'simulator' ? 'bg-cyan-600' : 'bg-transparent border-cyan-400 text-cyan-400'}
              onClick={() => setActiveCategory('simulator')}
            >
              <Plane className="h-4 w-4 mr-2" />
              Simulators
            </Button>
            <Button
              variant={activeCategory === 'dashboard' ? 'default' : 'outline'}
              className={activeCategory === 'dashboard' ? 'bg-cyan-600' : 'bg-transparent border-cyan-400 text-cyan-400'}
              onClick={() => setActiveCategory('dashboard')}
            >
              <Zap className="h-4 w-4 mr-2" />
              Dashboards
            </Button>
            <Button
              variant={activeCategory === 'education' ? 'default' : 'outline'}
              className={activeCategory === 'education' ? 'bg-cyan-600' : 'bg-transparent border-cyan-400 text-cyan-400'}
              onClick={() => setActiveCategory('education')}
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Education
            </Button>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:border-cyan-500/50 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getCategoryIcon(product.category)}
                      <CardTitle className="text-white">{product.name}</CardTitle>
                    </div>
                    <Badge className={getStatusColor(product.status)}>
                      {product.status.toUpperCase()}
                    </Badge>
                  </div>
                  <CardDescription className="text-cyan-200">
                    {product.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Platforms */}
                  <div>
                    <div className="text-sm text-cyan-300 mb-2">Platforms</div>
                    <div className="flex space-x-2">
                      {product.platforms.map((platform) => (
                        <Badge key={platform} variant="outline" className="bg-slate-700/50 text-cyan-200 border-cyan-400/30">
                          {platform === 'web' && <Globe className="h-3 w-3 mr-1" />}
                          {platform === 'mobile' && <Smartphone className="h-3 w-3 mr-1" />}
                          {platform === 'desktop' && <Laptop className="h-3 w-3 mr-1" />}
                          {platform}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Pricing */}
                  <div>
                    <div className="text-sm text-cyan-300 mb-2">Pricing</div>
                    <div className="space-y-2">
                      {product.pricing.tiers.slice(0, 2).map((tier, index) => (
                        <div key={index} className="flex justify-between items-center text-sm">
                          <span className="text-cyan-100">{tier.name}</span>
                          <span className="text-white font-semibold">{tier.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div>
                    <div className="text-sm text-cyan-300 mb-2">Technologies</div>
                    <div className="flex flex-wrap gap-1">
                      {product.technologies.slice(0, 3).map((tech, index) => (
                        <Badge key={index} variant="secondary" className="bg-slate-700/50 text-cyan-200 text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {product.technologies.length > 3 && (
                        <Badge variant="secondary" className="bg-slate-700/50 text-cyan-200 text-xs">
                          +{product.technologies.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-cyan-600 hover:bg-cyan-700">
                    <Play className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Monetization Blueprint */}
      <section className="py-16 bg-slate-800/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Monetization Blueprint</h2>
            <p className="text-cyan-200 max-w-2xl mx-auto">
              Multi-stream revenue model ensuring sustainable growth and profitability
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {monetizationStreams.map((stream, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <div className="text-cyan-400 mx-auto mb-4">
                    {stream.icon}
                  </div>
                  <CardTitle className="text-white text-center text-lg">
                    {stream.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-cyan-200 text-sm mb-3">
                    {stream.description}
                  </p>
                  <Badge className="bg-green-500/20 text-green-300 border-green-400">
                    {stream.revenue}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Scope */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-white">
                TECHNICAL SCOPE & DEPLOYMENT
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                  <Plane className="h-8 w-8 text-cyan-400 mx-auto mb-3" />
                  <h4 className="text-white font-semibold mb-2">3D Simulators</h4>
                  <p className="text-cyan-200 text-sm">
                    Unity, Unreal, WebGL for realistic training simulations
                  </p>
                </div>
                <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                  <Zap className="h-8 w-8 text-cyan-400 mx-auto mb-3" />
                  <h4 className="text-white font-semibold mb-2">Web Dashboards</h4>
                  <p className="text-cyan-200 text-sm">
                    React + Canvas/Three.js for interactive browser applications
                  </p>
                </div>
                <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                  <Cloud className="h-8 w-8 text-cyan-400 mx-auto mb-3" />
                  <h4 className="text-white font-semibold mb-2">AI Dashboards</h4>
                  <p className="text-cyan-200 text-sm">
                    Node.js + Next.js with backend AI services integration
                  </p>
                </div>
                <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                  <BookOpen className="h-8 w-8 text-cyan-400 mx-auto mb-3" />
                  <h4 className="text-white font-semibold mb-2">Educational Platforms</h4>
                  <p className="text-cyan-200 text-sm">
                    eBooks + video tutorials with integrated certification
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Legal Footer */}
      <section className="py-12 bg-slate-900 border-t border-slate-700">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-4">
              DOMISLINK APPS & SOFTWARE
            </h3>
            <p className="text-cyan-200 mb-4">
              © 2025 Domislink International Business Services Ltd. All Rights Reserved.<br />
              Contact Support: Domislink International Business Services Ltd, Lagos, Nigeria.
            </p>
            <p className="text-amber-200 text-sm">
              Unauthorized copying, redistribution, or modification is prohibited.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}