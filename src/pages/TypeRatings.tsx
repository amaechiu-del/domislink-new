/**
 * Type Ratings Page for DomisLink Aviation Academy
 * Aircraft-specific type rating certification programs
 */
import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { 
  Plane, 
  Clock, 
  Users, 
  CheckCircle, 
  ArrowRight,
  Target,
  Award,
  BookOpen
} from 'lucide-react';

export default function TypeRatings() {
  const typeRatings = [
    {
      aircraft: "Boeing 737",
      variants: ["737-700", "737-800", "737-900"],
      duration: "6-8 Weeks",
      level: "Advanced",
      features: [
        "Systems and procedures training",
        "Simulator sessions",
        "Line oriented flight training",
        "Recurrent training available"
      ],
      icon: <Plane className="h-8 w-8" />,
      color: "bg-blue-100 text-blue-600"
    },
    {
      aircraft: "Airbus A320",
      variants: ["A318", "A319", "A320", "A321"],
      duration: "6-8 Weeks",
      level: "Advanced",
      features: [
        "FBW systems training",
        "Normal and abnormal procedures",
        "MCDU programming",
        "Type-specific emergencies"
      ],
      icon: <Plane className="h-8 w-8" />,
      color: "bg-green-100 text-green-600"
    },
    {
      aircraft: "Bombardier CRJ",
      variants: ["CRJ-200", "CRJ-700", "CRJ-900"],
      duration: "4-6 Weeks",
      level: "Intermediate",
      features: [
        "Regional jet operations",
        "Systems integration",
        "Performance calculations",
        "Recurrent training"
      ],
      icon: <Plane className="h-8 w-8" />,
      color: "bg-purple-100 text-purple-600"
    },
    {
      aircraft: "Embraer E-Jets",
      variants: ["E170", "E175", "E190", "E195"],
      duration: "4-6 Weeks",
      level: "Intermediate",
      features: [
        "Advanced avionics training",
        "Cross-crew qualification",
        "Line operations simulation",
        "Type conversion available"
      ],
      icon: <Plane className="h-8 w-8" />,
      color: "bg-orange-100 text-orange-600"
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Application & Assessment",
      description: "Submit your application and complete initial assessment"
    },
    {
      step: "2",
      title: "Theoretical Training",
      description: "Complete aircraft systems and procedures training"
    },
    {
      step: "3",
      title: "Simulator Sessions",
      description: "Practical training in advanced flight simulators"
    },
    {
      step: "4",
      title: "Certification",
      description: "Receive your type rating certification"
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
              <Link to="/general-aviation" className="text-gray-600 hover:text-blue-600">General Aviation Courses</Link>
              <Link to="/type-ratings" className="text-blue-600 font-medium hover:text-blue-800">Type Ratings</Link>
              <Link to="/contact" className="text-gray-600 hover:text-blue-600">Contact</Link>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Enroll Now
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Aircraft <span className="text-blue-600">Type Ratings</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Specialized certification programs for specific aircraft types. 
          Advance your career with industry-recognized type ratings.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
            Browse Type Ratings
          </Button>
          <Button size="lg" variant="outline" className="bg-transparent border-blue-600 text-blue-600 hover:bg-blue-50">
            Download Catalog
          </Button>
        </div>
      </section>

      {/* Type Ratings Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Available Type Ratings</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive training programs for popular commercial aircraft
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {typeRatings.map((rating, index) => (
            <Card key={index} className="border-blue-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${rating.color}`}>
                    {rating.icon}
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {rating.level}
                    </span>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Clock className="h-4 w-4 mr-1" />
                      {rating.duration}
                    </div>
                  </div>
                </div>
                <CardTitle className="text-2xl mb-2">{rating.aircraft}</CardTitle>
                <CardDescription className="text-gray-600 text-base">
                  Variants: {rating.variants.join(", ")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Training Features:</h4>
                  <ul className="space-y-2">
                    {rating.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-700">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  View Program Details <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Type Rating Process</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Step-by-step journey to obtaining your aircraft type rating
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Get Type Rated with DomisLink?</h2>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">
              Advanced training methodology combined with industry expertise
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Target className="h-12 w-12 text-blue-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Industry Recognition</h3>
              <p className="text-blue-200">Certifications recognized by major airlines worldwide</p>
            </div>
            <div className="text-center">
              <Award className="h-12 w-12 text-blue-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Expert Instructors</h3>
              <p className="text-blue-200">Current line pilots with extensive type experience</p>
            </div>
            <div className="text-center">
              <BookOpen className="h-12 w-12 text-blue-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Flexible Scheduling</h3>
              <p className="text-blue-200">Adapt training to your schedule with online modules</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Start Your Type Rating Today</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Advance your aviation career with specialized aircraft certification. 
          Join thousands of pilots who have achieved their type ratings with DomisLink.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
            Enroll in Type Rating
          </Button>
          <Button size="lg" variant="outline" className="bg-transparent border-blue-600 text-blue-600 hover:bg-blue-50">
            Schedule Consultation
          </Button>
          <Button size="lg" variant="outline" className="bg-transparent border-gray-600 text-gray-600 hover:bg-gray-50">
            Download Program Guide
          </Button>
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
              <h3 className="font-semibold mb-4">Courses</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/general-aviation" className="hover:text-white">General Aviation</Link></li>
                <li><Link to="/type-ratings" className="hover:text-white">Type Ratings</Link></li>
                <li><Link to="/platform" className="hover:text-white">Platform</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/course-catalog" className="hover:text-white">Course Catalog</Link></li>
                <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
                <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Email: type-ratings@domislink.academy</li>
                <li>Support: 24/7 Platform Access</li>
                <li>Global: Multi-language Support</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2024 DomisLink Aviation Academy. 100% Online Digital Platform.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}