/**
 * General Aviation Courses Page for DomisLink Aviation Academy
 * Comprehensive 100% online ATPL, CPL, PPL courses with curated digital resources
 */
import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { 
  Plane, 
  BookOpen, 
  Clock, 
  Users, 
  CheckCircle, 
  Globe,
  Video,
  FileText,
  Target,
  Award,
  Brain,
  Shield
} from 'lucide-react';

export default function GeneralAviation() {
  const courses = [
    {
      title: "Airline Transport Pilot License (ATPL)",
      description: "Comprehensive airline pilot training program with advanced theoretical knowledge",
      duration: "12-18 Months",
      modules: 28,
      level: "Advanced",
      features: [
        "Advanced aerodynamics and performance",
        "Air law and operational procedures",
        "Meteorology and navigation systems",
        "Human performance and limitations",
        "Multi-crew cooperation training",
        "Threat and error management"
      ],
      icon: <Award className="h-8 w-8" />,
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Commercial Pilot License (CPL)",
      description: "Professional pilot training for commercial operations and charter services",
      duration: "8-12 Months",
      modules: 22,
      level: "Intermediate",
      features: [
        "Commercial flight operations",
        "Advanced navigation techniques",
        "Instrument flight rules (IFR)",
        "Commercial air law",
        "Aircraft performance calculations",
        "Emergency procedures"
      ],
      icon: <Plane className="h-8 w-8" />,
      color: "bg-green-100 text-green-600"
    },
    {
      title: "Private Pilot License (PPL)",
      description: "Foundational pilot training for private aircraft operation and personal flying",
      duration: "4-6 Months",
      modules: 16,
      level: "Beginner",
      features: [
        "Basic aircraft operations",
        "Air law and regulations",
        "Meteorology fundamentals",
        "Navigation and flight planning",
        "Human factors in aviation",
        "Radio telephony procedures"
      ],
      icon: <BookOpen className="h-8 w-8" />,
      color: "bg-purple-100 text-purple-600"
    }
  ];

  const learningResources = [
    {
      icon: <Video className="h-6 w-6" />,
      title: "Interactive Video Lessons",
      description: "High-quality instructional videos with 3D animations and real-world scenarios"
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Digital Textbooks & Manuals",
      description: "Comprehensive digital library with updated regulatory materials"
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Practice Exams & Quizzes",
      description: "AI-generated practice tests with detailed performance analytics"
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: "AI Learning Assistant",
      description: "Personalized learning paths with adaptive difficulty adjustment"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Virtual Instructor Support",
      description: "24/7 access to certified aviation instructors via digital platform"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Progress Certification",
      description: "Digital badges and certificates for completed modules and milestones"
    }
  ];

  const courseBenefits = [
    "100% Online - No physical attendance required",
    "AI-Powered Personalization - Adaptive learning paths",
    "Global Accessibility - Learn from anywhere in the world",
    "Industry-Validated Content - Approved by aviation authorities",
    "Flexible Scheduling - Study at your own pace",
    "Digital Certification - Recognized industry credentials"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
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
              <Link to="/general-aviation" className="text-blue-600 font-medium hover:text-blue-800">General Aviation Courses</Link>
              <Link to="/type-ratings" className="text-gray-600 hover:text-blue-600">Type Ratings</Link>
              <Link to="/platform" className="text-gray-600 hover:text-blue-600">Platform</Link>
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
          General Aviation <span className="text-blue-600">Courses</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          100% Online ATPL, CPL, and PPL Training Programs. 
          Comprehensive digital aviation education with AI-aided learning and expert validation.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
            View Course Catalog
          </Button>
          <Button size="lg" variant="outline" className="bg-transparent border-blue-600 text-blue-600 hover:bg-blue-50">
            Download Brochure
          </Button>
        </div>
      </section>

      {/* Course Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Professional Pilot Training Programs</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive 100% online courses designed to meet international aviation standards
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <Card key={index} className="border-blue-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${course.color}`}>
                    {course.icon}
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {course.level}
                    </span>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Clock className="h-4 w-4 mr-1" />
                      {course.duration}
                    </div>
                  </div>
                </div>
                <CardTitle className="text-2xl mb-2">{course.title}</CardTitle>
                <CardDescription className="text-gray-600 text-base">
                  {course.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Course Features:</h4>
                  <ul className="space-y-2">
                    {course.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-700">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>{course.modules} Modules</span>
                  <span>100% Online</span>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Enroll in Course
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Learning Resources */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Comprehensive Digital Learning Resources</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need for successful aviation training, delivered 100% online
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {learningResources.map((resource, index) => (
              <div key={index} className="flex items-start space-x-4 p-6 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                <div className="p-2 bg-blue-100 rounded-lg text-blue-600 flex-shrink-0">
                  {resource.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{resource.title}</h3>
                  <p className="text-gray-600 text-sm">{resource.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Why Choose Our Online Aviation Courses?</h2>
              <p className="text-blue-100 mb-8 text-lg">
                Experience the future of aviation education with our comprehensive digital platform that combines AI efficiency with human expertise.
              </p>
              <div className="space-y-4">
                {courseBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-blue-300 flex-shrink-0" />
                    <span className="text-blue-100">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-4">Platform Features</h3>
              <div className="space-y-4 text-blue-100">
                <div className="flex items-center justify-between">
                  <span>Interactive 3D Aircraft Models</span>
                  <CheckCircle className="h-5 w-5 text-green-400" />
                </div>
                <div className="flex items-center justify-between">
                  <span>Real-time Progress Tracking</span>
                  <CheckCircle className="h-5 w-5 text-green-400" />
                </div>
                <div className="flex items-center justify-between">
                  <span>Multi-language Support</span>
                  <CheckCircle className="h-5 w-5 text-green-400" />
                </div>
                <div className="flex items-center justify-between">
                  <span>Mobile Learning App</span>
                  <CheckCircle className="h-5 w-5 text-green-400" />
                </div>
                <div className="flex items-center justify-between">
                  <span>24/7 Instructor Access</span>
                  <CheckCircle className="h-5 w-5 text-green-400" />
                </div>
                <div className="flex items-center justify-between">
                  <span>Industry Certification</span>
                  <CheckCircle className="h-5 w-5 text-green-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Start Your Aviation Career Today</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of students worldwide who have chosen DomisLink for their aviation education. 
            Begin your journey to becoming a professional pilot with our 100% online courses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              Enroll Now
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-blue-600 text-blue-600 hover:bg-blue-50">
              Schedule Consultation
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-gray-600 text-gray-600 hover:bg-gray-50">
              Download Course Guide
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
              <h3 className="font-semibold mb-4">Courses</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/general-aviation" className="hover:text-white">General Aviation</Link></li>
                <li><Link to="/type-ratings" className="hover:text-white">Type Ratings</Link></li>
                <li><Link to="/platform" className="hover:text-white">Platform Features</Link></li>
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
                <li>Email: admissions@domislink.academy</li>
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