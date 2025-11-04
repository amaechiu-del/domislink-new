/**
 * Platform Blueprint Page for DomisLink Aviation Academy
 * Comprehensive overview of the digital platform architecture and features
 */
import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { 
  Plane, 
  Cpu, 
  Database, 
  Globe, 
  Shield, 
  CreditCard,
  Users,
  Code,
  Server,
  GitBranch,
  Container
} from 'lucide-react';

import { useEffect, useState } from 'react';
import AdminLogin from '../components/AdminLogin';
import { Button } from '../components/ui/button';

export default function Platform() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if admin is already authenticated
    const authStatus = localStorage.getItem('adminAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (success: boolean) => {
    setIsAuthenticated(success);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }
  const platformComponents = [
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Aircraft Type Rating Portal",
      description: "Searchable rating list with detailed information and geolocation compliance",
      features: ["Searchable aircraft database", "Regional compliance selection", "User dashboard", "AI training integration"]
    },
    {
      icon: <Cpu className="h-8 w-8" />,
      title: "DomisLink AI University Backend",
      description: "Go-based backend with Gin framework for intelligent learning systems",
      features: ["Multilingual LLM endpoints", "Payment processing", "Instructor task handling", "Docker deployment"]
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: "Content Management System",
      description: "Dynamic course content delivery with AI-assisted personalization",
      features: ["Adaptive learning paths", "Real-time progress tracking", "Multimedia integration", "Performance analytics"]
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Security & Compliance",
      description: "Geolocation-based regulatory enforcement and data protection",
      features: ["Regional compliance", "Data encryption", "Secure authentication", "Privacy protection"]
    }
  ];

  const techStack = [
    {
      category: "Frontend",
      items: ["React 18", "TypeScript", "Tailwind CSS", "shadcn/ui", "React Router"]
    },
    {
      category: "Backend",
      items: ["Go (Gin Framework)", "Docker", "RESTful APIs", "PostgreSQL", "Redis"]
    },
    {
      category: "AI & ML",
      items: ["Multilingual LLM", "Adaptive Learning", "Progress Analytics", "Personalization Engine"]
    },
    {
      category: "Infrastructure",
      items: ["GitHub/GitLab", "Vercel/Docker", "CI/CD Pipelines", "Cloud Deployment", "Monitoring"]
    }
  ];

  const aiBehaviors = [
    {
      title: "Multilingual AI Language Model",
      description: "Supports queries in multiple languages with contextual responses"
    },
    {
      title: "AI-Assisted Training Content",
      description: "Dynamically generates and customizes training modules based on user progress"
    },
    {
      title: "Geolocation Compliance",
      description: "Automatically enforces regional regulatory requirements"
    },
    {
      title: "Intelligent Payment Processing",
      description: "Multi-gateway support with real-time transaction handling"
    },
    {
      title: "Instructor Task Automation",
      description: "AI-assisted routine task management and progress monitoring"
    },
    {
      title: "User Behavior Analytics",
      description: "Personalized learning paths based on interaction patterns"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-blue-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Plane className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-800">DomisLink Aviation Academy</span>
            </div>
            <div className="hidden md:flex space-x-6">
              <Link to="/" className="text-gray-600 hover:text-blue-600">Home</Link>
              <Link to="/general-aviation" className="text-gray-600 hover:text-blue-600">General Aviation</Link>
              <Link to="/type-ratings" className="text-gray-600 hover:text-blue-600">Type Ratings</Link>
              <Link to="/contact" className="text-gray-600 hover:text-blue-600">Contact</Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-green-600 font-medium">
                  {isAuthenticated ? 'CEO Access - Amaechi Ubadike' : 'Admin Mode'}
                </div>
                {isAuthenticated && (
                  <div className="text-xs text-gray-500">ceo@domislink.com | +2349049837474</div>
                )}
              </div>
              <Button 
                onClick={handleLogout}
                variant="outline" 
                className="bg-transparent border-red-600 text-red-600 hover:bg-red-50"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Platform <span className="text-blue-600">Blueprint</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Comprehensive technical overview of the DomisLink 100% online AI-aided aviation training platform
        </p>
      </section>

      {/* Platform Components */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Platform Architecture</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Modular, scalable system designed for global aviation education
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {platformComponents.map((component, index) => (
            <Card key={index} className="border-blue-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                    {component.icon}
                  </div>
                  <CardTitle className="text-2xl">{component.title}</CardTitle>
                </div>
                <CardDescription className="text-lg text-gray-600">
                  {component.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {component.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* AI Behaviors */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">AI Behavior Framework</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Intelligent systems designed to enhance learning while maintaining trust and compliance
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiBehaviors.map((behavior, index) => (
              <Card key={index} className="border-blue-100 hover:shadow-md transition-all">
                <CardHeader>
                  <CardTitle className="text-xl">{behavior.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {behavior.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Technology Stack</h2>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">
              Modern, scalable technology foundation for global aviation education
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {techStack.map((stack, index) => (
              <div key={index} className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-4 text-blue-100">{stack.category}</h3>
                <ul className="space-y-2">
                  {stack.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-blue-200 flex items-center">
                      <div className="w-1.5 h-1.5 bg-blue-300 rounded-full mr-3"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Development Workflow */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Development Workflow</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Professional development practices for scalable, maintainable platform growth
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center border-blue-200">
            <CardHeader>
              <div className="mx-auto p-3 bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Code className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle>Local Development</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600">
                VS Code environment with necessary extensions and local testing
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card className="text-center border-blue-200">
            <CardHeader>
              <div className="mx-auto p-3 bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <GitBranch className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle>Version Control</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600">
                GitHub/GitLab repositories with feature branching and code reviews
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card className="text-center border-blue-200">
            <CardHeader>
              <div className="mx-auto p-3 bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Server className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle>Deployment</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600">
                Vercel or Docker-based CI/CD pipelines for automated deployment
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Build the Future?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join us in revolutionizing aviation education with our comprehensive digital platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              Technical Documentation
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-blue-600 text-blue-600 hover:bg-blue-50">
              API Reference
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Plane className="h-6 w-6 text-blue-400" />
                <span className="text-xl font-bold">DomisLink Aviation Academy</span>
              </div>
              <p className="text-gray-400">
                100% Online AI-Aided Aviation Training Platform
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/platform" className="hover:text-white">Blueprint</Link></li>
                <li><Link to="/ai-features" className="hover:text-white">AI Features</Link></li>
                <li><Link to="/compliance" className="hover:text-white">Compliance</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Development</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/documentation" className="hover:text-white">Documentation</Link></li>
                <li><Link to="/api" className="hover:text-white">API Reference</Link></li>
                <li><Link to="/contact" className="hover:text-white">Technical Support</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Email: tech@domislink.academy</li>
                <li>GitHub: DomisLink-Academy</li>
                <li>Support: Developer Portal</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2024 DomisLink Aviation Academy. Comprehensive Digital Platform.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}