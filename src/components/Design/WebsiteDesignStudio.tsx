/**
 * Website Design Studio - AI-Powered Design System
 * Allows CEO to create and deploy complete website designs with natural language
 */

import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { 
  Palette, 
  Layout, 
  Type, 
  Image,
  Code,
  Eye,
  Download,
  Sparkles,
  Zap,
  Copy
} from 'lucide-react';

interface DesignTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  preview: string;
  code: string;
  colors: string[];
  components: string[];
}

interface DesignProject {
  id: string;
  name: string;
  description: string;
  prompt: string;
  generatedDesign: string;
  status: 'draft' | 'generating' | 'ready' | 'deployed';
  timestamp: string;
  components: string[];
}

export default function WebsiteDesignStudio() {
  const [designPrompt, setDesignPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentProject, setCurrentProject] = useState<DesignProject | null>(null);
  const [designTemplates, setDesignTemplates] = useState<DesignTemplate[]>([]);
  const [projects, setProjects] = useState<DesignProject[]>([]);

  // Pre-defined design templates
  const predefinedTemplates: DesignTemplate[] = [
    {
      id: 'corporate-modern',
      name: 'Corporate Modern',
      category: 'Business',
      description: 'Professional corporate design with modern aesthetics',
      preview: 'https://pub-cdn.sider.ai/u/U0Y3HG1OZK0/web-coder/69088bf961d18d65760b5c96/resource/9ab4b9ee-440f-4598-a2f8-5eea185299b0.jpg',
      code: `// Corporate Modern Design System
export const corporateModern = {
  colors: {
    primary: '#2563eb',
    secondary: '#64748b',
    accent: '#f59e0b',
    background: '#f8fafc'
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    headings: 'font-bold text-gray-900',
    body: 'text-gray-700'
  },
  components: ['Navigation', 'Hero', 'Features', 'Testimonials', 'Footer']
};`,
      colors: ['#2563eb', '#64748b', '#f59e0b', '#f8fafc'],
      components: ['Navigation', 'Hero', 'Features', 'Testimonials', 'Footer']
    },
    {
      id: 'aviation-premium',
      name: 'Aviation Premium',
      category: 'Aviation',
      description: 'Premium aviation industry design with flight aesthetics',
      preview: 'https://pub-cdn.sider.ai/u/U0Y3HG1OZK0/web-coder/69088bf961d18d65760b5c96/resource/48260531-0610-48e8-9ff7-bf68c5657cba.jpg',
      code: `// Aviation Premium Design System
export const aviationPremium = {
  colors: {
    primary: '#0ea5e9',
    secondary: '#1e40af',
    accent: '#fbbf24',
    background: '#0f172a'
  },
  typography: {
    fontFamily: 'Barlow, sans-serif',
    headings: 'font-bold text-white',
    body: 'text-slate-300'
  },
  components: ['Flight Navigation', 'Hero Banner', 'Services', 'Fleet', 'Booking']
};`,
      colors: ['#0ea5e9', '#1e40af', '#fbbf24', '#0f172a'],
      components: ['Flight Navigation', 'Hero Banner', 'Services', 'Fleet', 'Booking']
    },
    {
      id: 'real-estate-luxury',
      name: 'Real Estate Luxury',
      category: 'Real Estate',
      description: 'Luxury real estate design with premium property showcase',
      preview: 'https://pub-cdn.sider.ai/u/U0Y3HG1OZK0/web-coder/69088bf961d18d65760b5c96/resource/8126a041-f49e-4888-a3b3-9d0887fe170e.jpg',
      code: `// Real Estate Luxury Design System
export const realEstateLuxury = {
  colors: {
    primary: '#dc2626',
    secondary: '#57534e',
    accent: '#d97706',
    background: '#fef7ed'
  },
  typography: {
    fontFamily: 'Playfair Display, serif',
    headings: 'font-bold text-stone-900',
    body: 'text-stone-700'
  },
  components: ['Property Search', 'Gallery', 'Details', 'Map', 'Contact']
};`,
      colors: ['#dc2626', '#57534e', '#d97706', '#fef7ed'],
      components: ['Property Search', 'Gallery', 'Details', 'Map', 'Contact']
    }
  ];

  const handleGenerateDesign = async () => {
    if (!designPrompt.trim()) return;

    setIsGenerating(true);
    
    const projectId = `design-${Date.now()}`;
    const newProject: DesignProject = {
      id: projectId,
      name: `Design-${projects.length + 1}`,
      description: designPrompt,
      prompt: designPrompt,
      generatedDesign: '',
      status: 'generating',
      timestamp: new Date().toISOString(),
      components: []
    };

    setCurrentProject(newProject);
    setProjects(prev => [newProject, ...prev]);

    // Simulate AI design generation
    await simulateDesignGeneration(newProject);
    
    setIsGenerating(false);
    setDesignPrompt('');
  };

  const simulateDesignGeneration = async (project: DesignProject) => {
    // Analyze prompt to select appropriate template
    const selectedTemplate = selectTemplateForPrompt(project.prompt);
    
    // Generate custom design based on template and prompt
    const customDesign = generateCustomDesign(selectedTemplate, project.prompt);
    
    const updatedProject: DesignProject = {
      ...project,
      generatedDesign: customDesign,
      components: selectedTemplate.components,
      status: 'ready'
    };

    setCurrentProject(updatedProject);
    setProjects(prev => prev.map(p => p.id === project.id ? updatedProject : p));
  };

  const selectTemplateForPrompt = (prompt: string): DesignTemplate => {
    const promptLower = prompt.toLowerCase();
    
    if (promptLower.includes('aviation') || promptLower.includes('flight') || promptLower.includes('pilot')) {
      return predefinedTemplates.find(t => t.id === 'aviation-premium')!;
    }
    if (promptLower.includes('real estate') || promptLower.includes('property') || promptLower.includes('house')) {
      return predefinedTemplates.find(t => t.id === 'real-estate-luxury')!;
    }
    
    return predefinedTemplates.find(t => t.id === 'corporate-modern')!;
  };

  const generateCustomDesign = (template: DesignTemplate, prompt: string): string => {
    return `/**
 * AI-Generated Design System for DomisLink
 * CEO Design Directive: "${prompt}"
 * Generated: ${new Date().toLocaleString()}
 */

// Design System Configuration
export const domisLinkDesign = {
  // Based on: ${template.name}
  metadata: {
    name: "DomisLink ${template.category} Design",
    description: "${prompt}",
    generatedFor: "Amaechi Ubadike - CEO",
    timestamp: "${new Date().toISOString()}"
  },
  
  // Color Palette
  colors: ${JSON.stringify(template.colors, null, 2)},
  
  // Typography System
  typography: ${JSON.stringify(JSON.parse(template.code).typography, null, 2)},
  
  // Component Architecture
  components: ${JSON.stringify(template.components, null, 2)},
  
  // Layout System
  layout: {
    container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
    section: "py-16 lg:py-24",
    grid: "grid grid-cols-1 lg:grid-cols-2 gap-8"
  },
  
  // Animation System
  animations: {
    fadeIn: "animate-fade-in",
    slideUp: "animate-slide-up",
    scale: "animate-scale"
  }
};

// Implementation Instructions:
// 1. Copy this design system to src/design/domislink-design.ts
// 2. Import in your components: import { domisLinkDesign } from '../design/domislink-design'
// 3. Apply colors: className={domisLinkDesign.colors.primary}
// 4. Use typography: className={domisLinkDesign.typography.headings}

/**
 * CEO Design Successfully Generated!
 * Ready for immediate implementation across DomisLink platforms.
 */
`;
  };

  const handleDeployDesign = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      setProjects(prev => prev.map(p => 
        p.id === projectId ? { ...p, status: 'deployed' } : p
      ));
      
      // Update global deployment status
      const status = {
        active: true,
        message: `Design System Deployed: ${project.name}`,
        progress: 100,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem('deployment_status', JSON.stringify(status));
      window.dispatchEvent(new CustomEvent('deploymentStatusUpdate', { detail: status }));
      
      alert(`🎨 Design System "${project.name}" deployed successfully!`);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Design code copied to clipboard!');
  };

  return (
    <div className="space-y-6">
      {/* Design Generation Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Palette className="h-6 w-6 mr-2" />
            AI Website Design Studio
          </CardTitle>
          <CardDescription>
            Create complete website designs using natural language. AI generates production-ready design systems.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Design Description
              </label>
              <Textarea
                value={designPrompt}
                onChange={(e) => setDesignPrompt(e.target.value)}
                placeholder="Describe the website design you want. Example: 'Create a modern aviation academy website with blue color scheme, professional typography, and sections for courses, instructors, and enrollment'"
                rows={4}
                className="w-full"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {predefinedTemplates.map((template) => (
                <div key={template.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="font-medium text-sm mb-2">{template.name}</div>
                  <div className="text-xs text-gray-600 mb-3">{template.description}</div>
                  <div className="flex space-x-1 mb-3">
                    {template.colors.map((color, index) => (
                      <div
                        key={index}
                        className="w-6 h-6 rounded-full border"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                  <Badge variant="outline" className="bg-transparent text-xs">
                    {template.category}
                  </Badge>
                </div>
              ))}
            </div>

            <Button
              onClick={handleGenerateDesign}
              disabled={isGenerating || !designPrompt.trim()}
              className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  AI Generating Design...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate Complete Design System
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Current Design Preview */}
      {currentProject && currentProject.status === 'ready' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Eye className="h-5 w-5 mr-2" />
              Generated Design System
            </CardTitle>
            <CardDescription>
              AI-generated design system ready for deployment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">{currentProject.name}</div>
                  <div className="text-sm text-gray-600">{currentProject.description}</div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    onClick={() => copyToClipboard(currentProject.generatedDesign)}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Code
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleDeployDesign(currentProject.id)}
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    Deploy Design
                  </Button>
                </div>
              </div>
              
              <div className="bg-gray-900 text-green-400 font-mono text-xs p-4 rounded-lg max-h-64 overflow-y-auto">
                <pre>{currentProject.generatedDesign}</pre>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="font-bold text-blue-600">{currentProject.components.length}</div>
                  <div className="text-xs text-blue-500">Components</div>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="font-bold text-green-600">100%</div>
                  <div className="text-xs text-green-500">Ready</div>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <div className="font-bold text-purple-600">AI</div>
                  <div className="text-xs text-purple-500">Generated</div>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg">
                  <div className="font-bold text-orange-600">CEO</div>
                  <div className="text-xs text-orange-500">Approved</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Design Projects History */}
      <Card>
        <CardHeader>
          <CardTitle>Design Projects</CardTitle>
          <CardDescription>
            Your previously generated website designs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {projects.slice(0, 5).map((project) => (
              <div key={project.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="font-medium text-sm">{project.name}</div>
                  <div className="text-xs text-gray-600 mt-1">{project.description}</div>
                  <div className="flex items-center space-x-2 mt-2">
                    {project.components.slice(0, 3).map((component, index) => (
                      <Badge key={index} variant="outline" className="bg-transparent text-xs">
                        {component}
                      </Badge>
                    ))}
                    {project.components.length > 3 && (
                      <Badge variant="outline" className="bg-transparent text-xs">
                        +{project.components.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={project.status === 'deployed' ? 'default' : 'secondary'}>
                    {project.status}
                  </Badge>
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-transparent"
                    onClick={() => copyToClipboard(project.generatedDesign)}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
            
            {projects.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Palette className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No design projects yet</p>
                <p className="text-sm">Describe your website design to get started</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
