/**
 * License Authentication System - Protects access to flight training content
 * Manages license keys, session tracking, and access control
 */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Alert, AlertDescription } from '../ui/alert';
import { Shield, Key, AlertCircle, CheckCircle2 } from 'lucide-react';

interface LicenseAuthContextType {
  isAuthenticated: boolean;
  licenseKey: string | null;
  sessionActive: boolean;
  login: (key: string) => Promise<boolean>;
  logout: () => void;
  checkSession: () => boolean;
}

const LicenseAuthContext = createContext<LicenseAuthContextType | undefined>(undefined);

export const useLicenseAuth = () => {
  const context = useContext(LicenseAuthContext);
  if (context === undefined) {
    throw new Error('useLicenseAuth must be used within a LicenseAuthProvider');
  }
  return context;
};

interface LicenseAuthProviderProps {
  children: React.ReactNode;
}

/**
 * Mock license validation - In production, this would call a secure API
 */
const validateLicenseKey = async (key: string): Promise<{ valid: boolean; message: string }> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock validation logic
  const validKeys = [
    'DOMIS-PPL-2024-001',
    'DOMIS-CPL-2024-001', 
    'DOMIS-ATPL-2024-001',
    'DOMIS-DEMO-2024-001'
  ];
  
  if (validKeys.includes(key.toUpperCase())) {
    return { valid: true, message: 'License key validated successfully' };
  }
  
  return { valid: false, message: 'Invalid license key' };
};

export const LicenseAuthProvider: React.FC<LicenseAuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [licenseKey, setLicenseKey] = useState<string | null>(null);
  const [sessionActive, setSessionActive] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check for existing session on component mount
    const savedSession = localStorage.getItem('flightTrainingSession');
    if (savedSession) {
      const session = JSON.parse(savedSession);
      if (session.expires > Date.now()) {
        setIsAuthenticated(true);
        setLicenseKey(session.licenseKey);
        setSessionActive(true);
      } else {
        localStorage.removeItem('flightTrainingSession');
      }
    }
  }, []);

  const login = async (key: string): Promise<boolean> => {
    setLoading(true);
    try {
      const result = await validateLicenseKey(key);
      
      if (result.valid) {
        // Check for existing sessions
        const existingSession = localStorage.getItem('flightTrainingSession');
        if (existingSession) {
          const session = JSON.parse(existingSession);
          if (session.expires > Date.now() && session.licenseKey !== key.toUpperCase()) {
            // Another session is active
            return false;
          }
        }

        // Create new session
        const session = {
          licenseKey: key.toUpperCase(),
          expires: Date.now() + (4 * 60 * 60 * 1000), // 4 hours
          started: Date.now()
        };
        
        localStorage.setItem('flightTrainingSession', JSON.stringify(session));
        setIsAuthenticated(true);
        setLicenseKey(key.toUpperCase());
        setSessionActive(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('flightTrainingSession');
    setIsAuthenticated(false);
    setLicenseKey(null);
    setSessionActive(false);
  };

  const checkSession = (): boolean => {
    const savedSession = localStorage.getItem('flightTrainingSession');
    if (!savedSession) {
      logout();
      return false;
    }

    const session = JSON.parse(savedSession);
    if (session.expires <= Date.now()) {
      logout();
      return false;
    }

    return true;
  };

  return (
    <LicenseAuthContext.Provider value={{
      isAuthenticated,
      licenseKey,
      sessionActive,
      login,
      logout,
      checkSession
    }}>
      {children}
    </LicenseAuthContext.Provider>
  );
};

/**
 * License Login Component
 */
interface LicenseLoginProps {
  onSuccess?: () => void;
}

export const LicenseLogin: React.FC<LicenseLoginProps> = ({ onSuccess }) => {
  const [licenseKey, setLicenseKey] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useLicenseAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const success = await login(licenseKey);
    if (success) {
      onSuccess?.();
    } else {
      setError('Invalid license key or session already active');
    }
    setLoading(false);
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center mb-4">
          <Shield className="h-8 w-8 text-blue-400 mr-2" />
          <Key className="h-8 w-8 text-amber-400" />
        </div>
        <CardTitle className="text-white">License Authentication</CardTitle>
        <CardDescription className="text-blue-200">
          Enter your flight training license key to access the platform
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="licenseKey" className="text-white">License Key</Label>
            <Input
              id="licenseKey"
              type="text"
              value={licenseKey}
              onChange={(e) => setLicenseKey(e.target.value)}
              placeholder="DOMIS-XXX-2024-001"
              className="bg-slate-700 border-slate-600 text-white"
              required
            />
          </div>
          
          {error && (
            <Alert variant="destructive" className="bg-red-500/20 border-red-500/50">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-red-200">{error}</AlertDescription>
            </Alert>
          )}

          <Button 
            type="submit" 
            className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold"
            disabled={loading}
          >
            {loading ? 'Validating...' : 'Authenticate License'}
          </Button>
        </form>

        <div className="mt-6 p-4 bg-slate-700/50 rounded-lg">
          <h4 className="text-sm font-semibold text-white mb-2">Demo License Keys:</h4>
          <div className="text-xs text-blue-200 space-y-1">
            <div>PPL: DOMIS-PPL-2024-001</div>
            <div>CPL: DOMIS-CPL-2024-001</div>
            <div>ATPL: DOMIS-ATPL-2024-001</div>
            <div>Demo: DOMIS-DEMO-2024-001</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

/**
 * Protected Content Wrapper
 */
interface ProtectedContentProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const ProtectedContent: React.FC<ProtectedContentProps> = ({ 
  children, 
  fallback = <LicenseLogin /> 
}) => {
  const { isAuthenticated, checkSession } = useLicenseAuth();

  useEffect(() => {
    // Check session validity periodically
    const interval = setInterval(() => {
      checkSession();
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [checkSession]);

  if (!isAuthenticated) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

/**
 * Session Status Indicator
 */
export const SessionStatus: React.FC = () => {
  const { licenseKey, sessionActive, logout } = useLicenseAuth();
  const [timeRemaining, setTimeRemaining] = useState<string>('');

  useEffect(() => {
    const updateTimeRemaining = () => {
      const savedSession = localStorage.getItem('flightTrainingSession');
      if (savedSession) {
        const session = JSON.parse(savedSession);
        const remaining = session.expires - Date.now();
        const hours = Math.floor(remaining / (1000 * 60 * 60));
        const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
        setTimeRemaining(`${hours}h ${minutes}m`);
      }
    };

    updateTimeRemaining();
    const interval = setInterval(updateTimeRemaining, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  if (!sessionActive) return null;

  return (
    <div className="fixed top-4 right-4 z-50">
      <Card className="bg-slate-800/90 border-green-500/50 backdrop-blur-sm">
        <CardContent className="p-3">
          <div className="flex items-center space-x-2 text-sm">
            <CheckCircle2 className="h-4 w-4 text-green-400" />
            <span className="text-white font-medium">{licenseKey}</span>
            <span className="text-green-400">•</span>
            <span className="text-blue-300">{timeRemaining}</span>
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-transparent border-red-400/50 text-red-400 hover:bg-red-400/10 h-6 text-xs"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};