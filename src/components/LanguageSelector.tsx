/**
 * Language Selector Component
 * Provides language switching with geolocation-based auto-detection
 */
import React from 'react';
import { Button } from './ui/button';
import { Globe, ChevronDown } from 'lucide-react';
import { detectUserLanguage } from '../utils/languageDetection';

interface LanguageSelectorProps {
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
}

const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
  { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili' }
];

export default function LanguageSelector({ currentLanguage, onLanguageChange }: LanguageSelectorProps) {
  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];

  const handleAutoDetect = () => {
    const { language } = detectUserLanguage();
    onLanguageChange(language);
  };

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        size="sm"
        className="bg-transparent border-gray-300"
        onClick={handleAutoDetect}
      >
        <Globe className="h-4 w-4 mr-2" />
        Auto Detect
      </Button>
      
      <select
        value={currentLanguage}
        onChange={(e) => onLanguageChange(e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        {languages.map((language) => (
          <option key={language.code} value={language.code}>
            {language.nativeName} ({language.name})
          </option>
        ))}
      </select>
    </div>
  );
}