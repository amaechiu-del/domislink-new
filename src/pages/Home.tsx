/**
 * Home Page - Main Landing Page for DomisLink Aviation Academy
 * Multi-language support with comprehensive platform overview
 */
import React from 'react';
import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { 
  Plane, 
  Users, 
  BookOpen, 
  Shield, 
  Globe, 
  Download,
  Star,
  Award,
  Clock,
  CheckCircle2
} from 'lucide-react';

interface HomePageProps {
  language?: string;
}

export default function HomePage({ language = 'en' }: HomePageProps) {
  const content = {
    en: {
      hero: {
        title: "DomisLink Aviation Academy",
        subtitle: "Advanced Aviation Training Platform with AI-Powered Learning",
        description: "Transform your aviation career with our comprehensive training programs, cutting-edge simulation technology, and global certification standards.",
        ctaPrimary: "Start Learning",
        ctaSecondary: "Explore Courses"
      },
      features: {
        title: "Why Choose DomisLink?",
        items: [
          {
            icon: <Plane className="h-6 w-6" />,
            title: "Advanced Flight Training",
            description: "State-of-the-art simulators and real-world training scenarios"
          },
          {
            icon: <Users className="h-6 w-6" />,
            title: "Expert Instructors",
            description: "Learn from industry professionals with decades of experience"
          },
          {
            icon: <BookOpen className="h-6 w-6" />,
            title: "Comprehensive Curriculum",
            description: "From beginner to advanced pilot certifications"
          },
          {
            icon: <Shield className="h-6 w-6" />,
            title: "Global Compliance",
            description: "Meets NCAA and international aviation standards"
          }
        ]
      },
      stats: {
        title: "Our Impact",
        items: [
          { number: "5000+", label: "Students Trained" },
          { number: "98%", label: "Success Rate" },
          { number: "50+", label: "Countries Served" },
          { number: "24/7", label: "Support Available" }
        ]
      },
      platformFeatures: {
        title: "Platform Features",
        items: [
          {
            icon: <Globe className="h-6 w-6" />,
            title: "Multi-Language Support",
            description: "Learn in your preferred language with real-time translation"
          },
          {
            icon: <Award className="h-6 w-6" />,
            title: "Certification Ready",
            description: "All courses designed to meet global certification standards"
          },
          {
            icon: <Clock className="h-6 w-6" />,
            title: "Flexible Learning",
            description: "Self-paced courses with 24/7 access to learning materials"
          },
          {
            icon: <CheckCircle2 className="h-6 w-6" />,
            title: "Quality Assured",
            description: "Regular updates and quality checks on all training materials"
          }
        ]
      }
    },
    fr: {
      hero: {
        title: "Académie d'Aviation DomisLink",
        subtitle: "Plateforme de Formation Aéronautique Avancée avec Apprentissage IA",
        description: "Transformez votre carrière aéronautique avec nos programmes de formation complets, notre technologie de simulation de pointe et nos normes de certification mondiales.",
        ctaPrimary: "Commencer à Apprendre",
        ctaSecondary: "Explorer les Cours"
      },
      features: {
        title: "Pourquoi Choisir DomisLink?",
        items: [
          {
            icon: <Plane className="h-6 w-6" />,
            title: "Formation de Vol Avancée",
            description: "Simulateurs de pointe et scénarios de formation réels"
          },
          {
            icon: <Users className="h-6 w-6" />,
            title: "Instructeurs Experts",
            description: "Apprenez auprès de professionnels du secteur avec des décennies d'expérience"
          },
          {
            icon: <BookOpen className="h-6 w-6" />,
            title: "Curriculum Complet",
            description: "Des certifications de pilote débutant à avancé"
          },
          {
            icon: <Shield className="h-6 w-6" />,
            title: "Conformité Mondiale",
            description: "Répond aux normes aéronautiques NCAA et internationales"
          }
        ]
      },
      stats: {
        title: "Notre Impact",
        items: [
          { number: "5000+", label: "Étudiants Formés" },
          { number: "98%", label: "Taux de Réussite" },
          { number: "50+", label: "Pays Desservis" },
          { number: "24/7", label: "Support Disponible" }
        ]
      },
      platformFeatures: {
        title: "Fonctionnalités de la Plateforme",
        items: [
          {
            icon: <Globe className="h-6 w-6" />,
            title: "Support Multilingue",
            description: "Apprenez dans votre langue préférée avec traduction en temps réel"
          },
          {
            icon: <Award className="h-6 w-6" />,
            title: "Prêt pour Certification",
            description: "Tous les cours conçus pour répondre aux normes de certification mondiales"
          },
          {
            icon: <Clock className="h-6 w-6" />,
            title: "Apprentissage Flexible",
            description: "Cours à votre rythme avec accès 24/7 aux matériels d'apprentissage"
          },
          {
            icon: <CheckCircle2 className="h-6 w-6" />,
            title: "Qualité Garantie",
            description: "Mises à jour régulières et contrôles de qualité sur tous les matériels de formation"
          }
        ]
      }
    }
  };

  const currentContent = content[language as keyof typeof content] || content.en;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">{currentContent.hero.title}</h1>
          <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
            {currentContent.hero.subtitle}
          </p>
          <p className="text-lg mb-12 text-blue-200 max-w-2xl mx-auto">
            {currentContent.hero.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/platform">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                {currentContent.hero.ctaPrimary}
              </Button>
            </Link>
            <Link to="/general-aviation">
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600">
                {currentContent.hero.ctaSecondary}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {currentContent.stats.title}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {currentContent.stats.items.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {currentContent.features.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {currentContent.features.items.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="mx-auto p-3 bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4 text-blue-600">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {currentContent.platformFeatures.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {currentContent.platformFeatures.items.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto p-3 bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mb-4 text-green-600">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apps Download CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Learn Anywhere, Anytime</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Download our mobile apps for on-the-go learning or access our full web platform from any device.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/apps">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                <Download className="h-5 w-5 mr-2" />
                Download Apps
              </Button>
            </Link>
            <Link to="/platform">
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600">
                <Globe className="h-5 w-5 mr-2" />
                Use Web Platform
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}