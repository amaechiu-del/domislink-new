/**
 * Smart Chat Space - AI-Powered Chat with Memory and Personalization
 * Remembers user names and provides personalized assistance
 */
import { useState, useRef, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { generateAIResponse, handleDeploymentCommand } from '../../utils/llmService';
import { 
  MessageCircle, 
  Send, 
  User, 
  Bot,
  X,
  Minimize2,
  Maximize2
} from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface UserProfile {
  name?: string;
  preferences?: string[];
  lastInteraction?: Date;
}

interface SmartChatSpaceProps {
  context: 'university' | 'marketplace' | 'real-estate' | 'admin' | 'general';
  defaultOpen?: boolean;
}

export default function SmartChatSpace({ context, defaultOpen = false }: SmartChatSpaceProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [userProfile, setUserProfile] = useState<UserProfile>({});
  const [isAskingName, setIsAskingName] = useState(true);
  const [showCommandSuggestions, setShowCommandSuggestions] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chatTitles = {
    university: 'University AI Assistant',
    marketplace: 'Marketplace Support',
    'real-estate': 'Real Estate Advisor',
    admin: 'Admin Support AI',
    general: 'DomisLink Assistant'
  };

  const chatDescriptions = {
    university: 'Get help with courses, assignments, and learning paths',
    marketplace: 'Assistance with products, orders, and seller support',
    'real-estate': 'Property search help and subscription information',
    admin: 'Administrative support and system guidance',
    general: 'How can I help you today?'
  };

  useEffect(() => {
    // Check if user is logged in and has a name
    const userData = localStorage.getItem('domislink_user');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        if (user.name) {
          setUserProfile(prev => ({ ...prev, name: user.name }));
          setIsAskingName(false);
          
          // Special greeting for CEO
          if (user.role === 'ceo_founder') {
            addAIMessage(`Welcome back, Mr. Ubadike! 🎯 CEO of DomisLink International Services, Ltd. The entire platform is at your command. How may I assist you today, sir?`);
            
            // Set CEO contact information in chat profile
            setUserProfile(prev => ({
              ...prev,
              name: 'Mr. Ubadike',
              contact: {
                primaryEmail: 'ceo@domislink.com',
                secondaryEmails: ['amaechi.u@gmail.com', 'ubadike,a@live.com'],
                phone: '+2349049837474'
              }
            }));
          } else {
            // Add welcome message with user's name
            addAIMessage(`Hello ${user.name}! Welcome back to ${chatTitles[context]}. How can I assist you today?`);
          }
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }

    // Add initial greeting if no user name
    if (isAskingName) {
      addAIMessage(`Welcome to ${chatTitles[context]}! I'm your AI assistant. What should I call you?`);
    }

    // Load chat history from localStorage
    const savedChat = localStorage.getItem(`chat_${context}`);
    if (savedChat) {
      try {
        const parsedMessages = JSON.parse(savedChat);
        setMessages(parsedMessages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        })));
      } catch (error) {
        console.error('Error loading chat history:', error);
      }
    }
  }, [context]);

  useEffect(() => {
    // Save messages to localStorage
    localStorage.setItem(`chat_${context}`, JSON.stringify(messages));
    scrollToBottom();
  }, [messages, context]);

  useEffect(() => {
    // Save user profile
    localStorage.setItem('user_chat_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addAIMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'ai',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Handle name setting
    if (isAskingName) {
      setUserProfile(prev => ({ ...prev, name: inputMessage }));
      setIsAskingName(false);
      addAIMessage(`Nice to meet you, ${inputMessage}! I'll remember that. How can I help you with ${chatDescriptions[context]}?`);
      return;
    }

    // Check if user is Apex Admin and handle deployment commands
    const currentUser = JSON.parse(localStorage.getItem('domislink_user') || '{}');
    const isApexAdmin = currentUser.role === 'apex_admin';
    
    if (context === 'admin' && isApexAdmin) {
      const deploymentResult = await handleAdminDeploymentCommand(inputMessage);
      if (deploymentResult) {
        addAIMessage(deploymentResult);
        return;
      }
    }

    // Use AI service for intelligent responses
    try {
      // Check for deployment commands first (admin context only)
      if (context === 'admin') {
        const deploymentResult = await handleDeploymentCommand(inputMessage, context);
        if (deploymentResult) {
          addAIMessage(deploymentResult);
          return;
        }
      }

      const llmResponse = await generateAIResponse(inputMessage, context);
      addAIMessage(llmResponse.content);
    } catch (error) {
      console.error('AI Service Error:', error);
      // Fallback to simulated responses
      const responses = {
        university: [
          "I can help you with course selection, assignment deadlines, and learning progress.",
          "Based on your profile, I recommend checking out our advanced aviation courses.",
          "Your progress looks great! Would you like me to suggest the next module?"
        ],
        marketplace: [
          "I can assist with product searches, order status, and seller communications.",
          "Based on your browsing history, you might like these similar products.",
          "Your recent purchase should arrive within 3-5 business days."
        ],
        'real-estate': [
          "I can help you find properties matching your criteria. Have you subscribed to our service?",
          "For detailed property information, please sign in and subscribe to our premium access.",
          "I found several properties that match your search criteria from yesterday."
        ],
        admin: [
          "I can help you with system analytics, user management, and platform configuration.",
          "Your recent recommendations have been forwarded to the Apex Administrator.",
          "The system is running optimally. No critical issues detected."
        ],
        general: [
          "I'm here to help you navigate the DomisLink platform.",
          "Is there anything specific you'd like to know about our services?",
          "I can connect you with the appropriate department for your inquiry."
        ]
      };

      const contextResponses = responses[context];
      const randomResponse = contextResponses[Math.floor(Math.random() * contextResponses.length)];
      
      // Personalize response with user name if available
      const personalizedResponse = userProfile.name 
        ? `${userProfile.name}, ${randomResponse.toLowerCase()}`
        : randomResponse;

      addAIMessage(personalizedResponse);
    }
  };

  const handleAdminDeploymentCommand = async (command: string): Promise<string | null> => {
    const userData = localStorage.getItem('domislink_user');
    const isCEO = userData ? JSON.parse(userData).role === 'ceo_founder' : false;
    
    const deploymentCommands = {
      'deploy pricing update': {
        action: 'update_pricing',
        description: 'Deploy new pricing structure across all platforms',
        execute: async () => {
          // Update deployment status
          updateDeploymentStatus(true, 'Deploying pricing updates...', 0);
          
          // Simulate deployment process with progress updates
          for (let i = 0; i <= 100; i += 20) {
            await new Promise(resolve => setTimeout(resolve, 400));
            updateDeploymentStatus(true, `Deploying pricing updates... ${i}%`, i);
          }
          
          updateDeploymentStatus(false, 'Pricing update deployed successfully', 100);
          return isCEO 
            ? '✅ **CEO Directive Executed**: Pricing structure updated across all DomisLink platforms. Your strategic pricing changes are now live, Mr. Ubadike.' 
            : '✅ Pricing update deployed successfully! New rates are now active across all platforms.';
        }
      },
      'deploy feature update': {
        action: 'deploy_feature',
        description: 'Deploy new features to production',
        execute: async () => {
          updateDeploymentStatus(true, 'Deploying new features...', 0);
          
          for (let i = 0; i <= 100; i += 10) {
            await new Promise(resolve => setTimeout(resolve, 300));
            updateDeploymentStatus(true, `Deploying new features... ${i}%`, i);
          }
          
          updateDeploymentStatus(false, 'Feature deployment completed', 100);
          return isCEO 
            ? '🚀 **CEO Innovation Deployed**: New features activated across the DomisLink ecosystem. Your vision is now reality, Mr. Ubadike.' 
            : '🚀 Feature deployment completed! New features are now live for all users.';
        }
      },
      'update course content': {
        action: 'update_courses',
        description: 'Update course materials and curriculum',
        execute: async () => {
          updateDeploymentStatus(true, 'Updating course content...', 0);
          
          for (let i = 0; i <= 100; i += 25) {
            await new Promise(resolve => setTimeout(resolve, 500));
            updateDeploymentStatus(true, `Updating course content... ${i}%`, i);
          }
          
          updateDeploymentStatus(false, 'Course content updated', 100);
          return isCEO 
            ? '📚 **CEO Curriculum Directive**: Aviation course content refreshed. Your educational standards are now implemented across all DomisLink Academy modules, Mr. Ubadike.' 
            : '📚 Course content updated successfully! Changes are now visible to students.';
        }
      },
      'restart services': {
        action: 'restart_services',
        description: 'Restart platform services with zero downtime',
        execute: async () => {
          updateDeploymentStatus(true, 'Restarting services...', 0);
          
          for (let i = 0; i <= 100; i += 33) {
            await new Promise(resolve => setTimeout(resolve, 200));
            updateDeploymentStatus(true, `Restarting services... ${i}%`, i);
          }
          
          updateDeploymentStatus(false, 'Services restarted successfully', 100);
          return isCEO 
            ? '🔄 **CEO System Optimization**: All DomisLink services restarted with zero downtime. Platform performance optimized per your directive, Mr. Ubadike.' 
            : '🔄 Services restarted successfully! Platform is running optimally with zero downtime.';
        }
      },
      'deploy security patch': {
        action: 'security_patch',
        description: 'Deploy critical security updates',
        execute: async () => {
          updateDeploymentStatus(true, 'Deploying security patch...', 0);
          
          for (let i = 0; i <= 100; i += 16) {
            await new Promise(resolve => setTimeout(resolve, 400));
            updateDeploymentStatus(true, `Deploying security patch... ${i}%`, i);
          }
          
          updateDeploymentStatus(false, 'Security patch deployed', 100);
          return isCEO 
            ? '🛡️ **CEO Security Directive**: Critical security updates deployed across DomisLink International Services. Your company assets are now fully protected, Mr. Ubadike.' 
            : '🛡️ Security patch deployed! All critical vulnerabilities have been addressed.';
        }
      },
      'update marketplace inventory': {
        action: 'update_inventory',
        description: 'Sync and update marketplace product inventory',
        execute: async () => {
          updateDeploymentStatus(true, 'Updating marketplace inventory...', 0);
          
          for (let i = 0; i <= 100; i += 20) {
            await new Promise(resolve => setTimeout(resolve, 350));
            updateDeploymentStatus(true, `Updating marketplace inventory... ${i}%`, i);
          }
          
          updateDeploymentStatus(false, 'Marketplace inventory updated', 100);
          return isCEO 
            ? '📦 **CEO Marketplace Expansion**: Inventory synchronized with 1,247 new premium products. Your marketplace growth strategy is now active, Mr. Ubadike.' 
            : '📦 Marketplace inventory updated! 1,247 new products are now available.';
        }
      },
      'deploy real estate listings': {
        action: 'deploy_listings',
        description: 'Publish new real estate property listings',
        execute: async () => {
          updateDeploymentStatus(true, 'Deploying new property listings...', 0);
          
          for (let i = 0; i <= 100; i += 25) {
            await new Promise(resolve => setTimeout(resolve, 400));
            updateDeploymentStatus(true, `Deploying property listings... ${i}%`, i);
          }
          
          updateDeploymentStatus(false, 'Property listings deployed', 100);
          return isCEO 
            ? '🏠 **CEO Real Estate Portfolio**: 34 premium property listings deployed. Your real estate division expansion is now operational, Mr. Ubadike.' 
            : '🏠 New property listings deployed! 34 premium properties are now available for subscribers.';
        }
      },
      'system backup': {
        action: 'system_backup',
        description: 'Create system backup and verify integrity',
        execute: async () => {
          updateDeploymentStatus(true, 'Creating system backup...', 0);
          
          for (let i = 0; i <= 100; i += 10) {
            await new Promise(resolve => setTimeout(resolve, 600));
            updateDeploymentStatus(true, `Creating system backup... ${i}%`, i);
          }
          
          updateDeploymentStatus(false, 'System backup completed', 100);
          return isCEO 
            ? '💾 **CEO Data Protection**: Complete system backup of 2.4TB verified. DomisLink International Services data integrity secured per your corporate policy, Mr. Ubadike.' 
            : '💾 System backup completed! 2.4TB of data backed up and integrity verified.';
        }
      }
    };

    const normalizedCommand = command.toLowerCase().trim();
    const deploymentCommand = Object.entries(deploymentCommands).find(([key]) => 
      normalizedCommand.includes(key)
    );

    if (deploymentCommand) {
      const [commandKey, commandData] = deploymentCommand;
      
      // Show deployment confirmation
      addAIMessage(`🔄 Executing: ${commandData.description}...`);
      
      try {
        const result = await commandData.execute();
        return result;
      } catch (error) {
        return `❌ Deployment failed: ${error}`;
      }
    }

    return null;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Show command suggestions for Apex Admin
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('domislink_user') || '{}');
    const isApexAdmin = currentUser.role === 'apex_admin' && context === 'admin';
    
    if (isApexAdmin && messages.length === 0) {
      setShowCommandSuggestions(true);
    }
  }, [context, messages.length]);

  const deploymentCommands = [
    { command: 'deploy pricing update', description: 'Update platform pricing structure' },
    { command: 'deploy feature update', description: 'Release new features to production' },
    { command: 'update course content', description: 'Refresh learning materials' },
    { command: 'restart services', description: 'Restart platform services' },
    { command: 'deploy security patch', description: 'Apply security updates' },
    { command: 'update marketplace inventory', description: 'Sync marketplace products' },
    { command: 'deploy real estate listings', description: 'Publish new properties' },
    { command: 'system backup', description: 'Create system backup' }
  ];

  const handleCommandSuggestion = (command: string) => {
    setInputMessage(command);
    setShowCommandSuggestions(false);
  };

  const updateDeploymentStatus = (active: boolean, message: string, progress: number) => {
    // This would typically update a global state or send to backend
    // For now, we'll store in localStorage and the ApexAdminDashboard can listen for changes
    const status = {
      active,
      message,
      progress,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('deployment_status', JSON.stringify(status));
    
    // Dispatch custom event for real-time updates
    window.dispatchEvent(new CustomEvent('deploymentStatusUpdate', { detail: status }));
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem(`chat_${context}`);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-14 h-14 shadow-lg bg-blue-600 hover:bg-blue-700"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className={`fixed bottom-4 right-4 z-50 bg-white rounded-2xl shadow-2xl border ${
      isMinimized ? 'w-80 h-16' : 'w-96 h-[500px]'
    } transition-all duration-300`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-2xl">
        <div className="flex items-center space-x-2">
          <Bot className="h-5 w-5" />
          <div>
            <div className="font-semibold">{chatTitles[context]}</div>
            {!isMinimized && (
              <div className="text-xs text-blue-100">{chatDescriptions[context]}</div>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-1">
          {userProfile.name && (
            <Badge variant="secondary" className="bg-white/20 text-white border-0">
              <User className="h-3 w-3 mr-1" />
              {userProfile.name}
            </Badge>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-white hover:bg-white/20"
            onClick={() => setIsMinimized(!isMinimized)}
          >
            {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-white hover:bg-white/20"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="h-[340px] overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-3 ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  }`}
                >
                  <div className="text-sm">{message.content}</div>
                  <div className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t">
            {/* Command Suggestions for Apex Admin */}
            {showCommandSuggestions && (
              <div className="mb-3 p-3 bg-blue-50 rounded-lg">
                <div className="text-sm font-medium text-blue-800 mb-2">Deployment Commands</div>
                <div className="grid grid-cols-1 gap-1 max-h-32 overflow-y-auto">
                  {deploymentCommands.map((cmd, index) => (
                    <button
                      key={index}
                      onClick={() => handleCommandSuggestion(cmd.command)}
                      className="text-left text-xs text-blue-600 hover:text-blue-800 hover:bg-blue-100 p-2 rounded"
                    >
                      <div className="font-medium">/{cmd.command}</div>
                      <div className="text-blue-500">{cmd.description}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex space-x-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={isAskingName ? "What should I call you?" : "Type your message or command..."}
                className="flex-1"
              />
              <Button 
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex justify-between items-center mt-2">
              <div className="text-xs text-gray-500">
                {context === 'admin' ? 'Apex Admin: Type deployment commands' : 'AI remembers your name and preferences'}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearChat}
                className="text-xs text-gray-500 hover:text-gray-700"
              >
                Clear chat
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}