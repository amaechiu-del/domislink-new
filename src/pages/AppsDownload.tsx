/**
 * Apps Download & Online Use Page
 * Central hub for mobile apps, desktop applications, and web platform access
 */
import React from 'react';
import { Link } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { 
  Smartphone, 
  Laptop, 
  Globe, 
  Download, 
  Play, 
  Cloud, 
  Shield, 
  Zap,
  Users,
  BarChart3,
  MessageSquare,
  CheckCircle2,
  Star
} from 'lucide-react';

interface AppsDownloadProps {
  language?: string;
}

export default function AppsDownload({ language = 'en' }: AppsDownloadProps) {
  const content = {
    en: {
      title: "Apps & Platform Access",
      subtitle: "Download our mobile apps or use our web platform - Your aviation training, anywhere",
      mobile: {
        title: "Mobile Apps",
        subtitle: "Learn on the go with our native mobile applications",
        features: [
          "Offline course access",
          "Mobile-optimized lessons",
          "Push notifications",
          "Progress synchronization"
        ]
      },
      desktop: {
        title: "Desktop Applications", 
        subtitle: "Full-featured desktop experience for advanced training",
        features: [
          "High-performance simulation",
          "Multi-monitor support",
          "Advanced analytics",
          "Local data storage"
        ]
      },
      web: {
        title: "Web Platform",
        subtitle: "Instant access through any modern browser",
        features: [
          "No installation required",
          "Always up-to-date",
          "Cross-platform compatibility",
          "Real-time collaboration"
        ]
      },
      download: "Download Now",
      useOnline: "Use Online",
      comingSoon: "Coming Soon",
      available: "Available Now",
      features: {
        title: "Why Choose Our Platform?",
        items: [
          {
            icon: <Shield className="h-6 w-6" />,
            title: "Enterprise Security",
            description: "Military-grade encryption and compliance with aviation security standards"
          },
          {
            icon: <Zap className="h-6 w-6" />,
            title: "Lightning Fast",
            description: "Optimized performance for smooth training experience across all devices"
          },
          {
            icon: <Users className="h-6 w-6" />,
            title: "Multi-User Ready",
            description: "Support for individual learners, flight schools, and enterprise teams"
          },
          {
            icon: <BarChart3 className="h-6 w-6" />,
            title: "Advanced Analytics",
            description: "Real-time progress tracking and performance insights"
          }
        ]
      },
      testimonials: {
        title: "Trusted by Aviation Professionals",
        items: [
          {
            name: "Captain Sarah M.",
            role: "Flight Instructor",
            rating: 5,
            comment: "The mobile app revolutionized how I conduct ground school sessions with my students."
          },
          {
            name: "First Officer James K.",
            role: "Regional Airlines",
            rating: 5,
            comment: "Seamless transition between desktop and mobile - my progress is always synced."
          },
          {
            name: "Aviation School Director",
            role: "West Africa Training Center",
            rating: 5,
            comment: "Our entire academy runs on DomisLink platform. The web access is perfect for our computer labs."
          }
        ]
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          {
            question: "Do I need to download the app to use the platform?",
            answer: "No! Our web platform offers full functionality without any downloads. Mobile and desktop apps provide enhanced offline capabilities."
          },
          {
            question: "Is my progress synced across devices?",
            answer: "Yes, all your progress, certificates, and learning data are automatically synced across web, mobile, and desktop platforms."
          },
          {
            question: "What are the system requirements?",
            answer: "Web: Any modern browser. Mobile: iOS 13+ or Android 8+. Desktop: Windows 10+, macOS 10.14+, or Linux Ubuntu 18.04+."
          },
          {
            question: "Is offline learning supported?",
            answer: "Yes, our mobile and desktop apps support full offline functionality. Download courses and continue learning without internet."
          }
        ]
      }
    },
    fr: {
      title: "Applications & Accès Plateforme",
      subtitle: "Téléchargez nos applications mobiles ou utilisez notre plateforme web - Votre formation aéronautique, partout",
      mobile: {
        title: "Applications Mobiles",
        subtitle: "Apprenez en déplacement avec nos applications mobiles natives",
        features: [
          "Accès aux cours hors ligne",
          "Leçons optimisées mobile",
          "Notifications push",
          "Synchronisation de progression"
        ]
      },
      desktop: {
        title: "Applications Bureau",
        subtitle: "Expérience bureau complète pour la formation avancée",
        features: [
          "Simulation haute performance",
          "Support multi-écrans",
          "Analyses avancées",
          "Stockage local des données"
        ]
      },
      web: {
        title: "Plateforme Web",
        subtitle: "Accès instantané via tout navigateur moderne",
        features: [
          "Aucune installation requise",
          "Toujours à jour",
          "Compatibilité multiplateforme",
          "Collaboration en temps réel"
        ]
      },
      download: "Télécharger Maintenant",
      useOnline: "Utiliser en Ligne",
      comingSoon: "Bientôt Disponible",
      available: "Disponible Maintenant",
      features: {
        title: "Pourquoi Choisir Notre Plateforme?",
        items: [
          {
            icon: <Shield className="h-6 w-6" />,
            title: "Sécurité Entreprise",
            description: "Chiffrement de niveau militaire et conformité aux normes de sécurité aéronautique"
          },
          {
            icon: <Zap className="h-6 w-6" />,
            title: "Ultra Rapide",
            description: "Performance optimisée pour une expérience de formation fluide sur tous les appareils"
          },
          {
            icon: <Users className="h-6 w-6" />,
            title: "Prêt Multi-utilisateurs",
            description: "Support pour apprenants individuels, écoles de pilotage et équipes entreprises"
          },
          {
            icon: <BarChart3 className="h-6 w-6" />,
            title: "Analyses Avancées",
            description: "Suivi de progression en temps réel et insights de performance"
          }
        ]
      },
      testimonials: {
        title: "Approuvé par les Professionnels de l'Aviation",
        items: [
          {
            name: "Capitaine Sarah M.",
            role: "Instructrice de Vol",
            rating: 5,
            comment: "L'application mobile a révolutionné la façon dont je conduis les sessions de sol avec mes étudiants."
          },
          {
            name: "Premier Officier James K.",
            role: "Compagnies Aériennes Régionales",
            rating: 5,
            comment: "Transition transparente entre bureau et mobile - ma progression est toujours synchronisée."
          },
          {
            name: "Directeur d'École d'Aviation",
            role: "Centre de Formation Afrique de l'Ouest",
            rating: 5,
            comment: "Notre académie entière fonctionne sur la plateforme DomisLink. L'accès web est parfait pour nos salles informatiques."
          }
        ]
      },
      faq: {
        title: "Questions Fréquemment Posées",
        items: [
          {
            question: "Dois-je télécharger l'application pour utiliser la plateforme?",
            answer: "Non! Notre plateforme web offre une fonctionnalité complète sans aucun téléchargement. Les applications mobiles et bureau offrent des capacités hors ligne améliorées."
          },
          {
            question: "Ma progression est-elle synchronisée entre les appareils?",
            answer: "Oui, toute votre progression, certificats et données d'apprentissage sont automatiquement synchronisés entre les plateformes web, mobile et bureau."
          },
          {
            question: "Quelles sont les exigences système?",
            answer: "Web: Tout navigateur moderne. Mobile: iOS 13+ ou Android 8+. Bureau: Windows 10+, macOS 10.14+, ou Linux Ubuntu 18.04+."
          },
          {
            question: "L'apprentissage hors ligne est-il pris en charge?",
            answer: "Oui, nos applications mobiles et bureau prennent en charge la fonctionnalité hors ligne complète. Téléchargez les cours et continuez à apprendre sans internet."
          }
        ]
      }
    }
  };

  const currentContent = content[language as keyof typeof content] || content.en;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8">
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

        {/* Platform Options Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Mobile Apps */}
          <Card className="relative overflow-hidden border-2 border-blue-200 hover:border-blue-400 transition-all duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Smartphone className="h-8 w-8 text-blue-600" />
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {currentContent.available}
                </Badge>
              </div>
              <CardTitle className="text-2xl">{currentContent.mobile.title}</CardTitle>
              <CardDescription className="text-lg">
                {currentContent.mobile.subtitle}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                {currentContent.mobile.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="space-y-3">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Download className="h-4 w-4 mr-2" />
                  iOS App
                </Button>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <Download className="h-4 w-4 mr-2" />
                  Android App
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Desktop Applications */}
          <Card className="relative overflow-hidden border-2 border-purple-200 hover:border-purple-400 transition-all duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-100 rounded-full">
                  <Laptop className="h-8 w-8 text-purple-600" />
                </div>
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                  {currentContent.comingSoon}
                </Badge>
              </div>
              <CardTitle className="text-2xl">{currentContent.desktop.title}</CardTitle>
              <CardDescription className="text-lg">
                {currentContent.desktop.subtitle}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                {currentContent.desktop.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <CheckCircle2 className="h-5 w-5 text-purple-500" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="space-y-3">
                <Button className="w-full bg-purple-600 hover:bg-purple-700" disabled>
                  <Download className="h-4 w-4 mr-2" />
                  Windows
                </Button>
                <Button className="w-full bg-gray-800 hover:bg-gray-900" disabled>
                  <Download className="h-4 w-4 mr-2" />
                  macOS
                </Button>
                <Button className="w-full bg-orange-600 hover:bg-orange-700" disabled>
                  <Download className="h-4 w-4 mr-2" />
                  Linux
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Web Platform */}
          <Card className="relative overflow-hidden border-2 border-green-200 hover:border-green-400 transition-all duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <Globe className="h-8 w-8 text-green-600" />
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {currentContent.available}
                </Badge>
              </div>
              <CardTitle className="text-2xl">{currentContent.web.title}</CardTitle>
              <CardDescription className="text-lg">
                {currentContent.web.subtitle}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                {currentContent.web.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="space-y-3">
                <Link to="/platform">
                  <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                    <Play className="h-4 w-4 mr-2" />
                    {currentContent.useOnline}
                  </Button>
                </Link>
                <Button variant="outline" className="w-full bg-transparent border-gray-300">
                  <Cloud className="h-4 w-4 mr-2" />
                  Demo Tour
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {currentContent.features.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

        {/* Testimonials */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {currentContent.testimonials.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentContent.testimonials.items.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow duration-300">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="flex mr-3">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.comment}"</p>
                  <div className="border-t pt-4">
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {currentContent.faq.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentContent.faq.items.map((item, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{item.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-700">
                    {item.answer}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center">
          <CardContent className="pt-12 pb-12">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Start Your Aviation Journey?
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Join thousands of aviation professionals who trust DomisLink for their training needs. 
              Start with our web platform instantly or download our mobile apps for on-the-go learning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/platform">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                  <Play className="h-4 w-4 mr-2" />
                  Start Learning Now
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600">
                <MessageSquare className="h-4 w-4 mr-2" />
                Contact Sales
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}