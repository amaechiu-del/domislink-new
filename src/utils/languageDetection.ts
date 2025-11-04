/**
 * Language Detection Utility
 * Detects user language and region based on browser settings and geolocation
 */

interface DetectionResult {
  language: string;
  region: string;
  countryCode?: string;
}

// Regional language mappings
const regionalLanguages: Record<string, string> = {
  // West Africa
  'NG': 'en', // Nigeria
  'GH': 'en', // Ghana
  'CI': 'fr', // Côte d'Ivoire
  'SN': 'fr', // Senegal
  
  // East Africa
  'KE': 'en', // Kenya
  'TZ': 'sw', // Tanzania
  'UG': 'en', // Uganda
  'ET': 'en', // Ethiopia
  
  // Southern Africa
  'ZA': 'en', // South Africa
  'BW': 'en', // Botswana
  'NA': 'en', // Namibia
  'ZW': 'en', // Zimbabwe
  
  // North Africa
  'EG': 'ar', // Egypt
  'DZ': 'ar', // Algeria
  'MA': 'ar', // Morocco
  'TN': 'ar', // Tunisia
  
  // Caribbean
  'JM': 'en', // Jamaica
  'TT': 'en', // Trinidad & Tobago
  'DO': 'es', // Dominican Republic
  'BS': 'en', // Bahamas
  
  // Asia
  'CN': 'zh', // China
  'IN': 'hi', // India
  'JP': 'ja', // Japan
  'PH': 'en', // Philippines
  
  // Middle East
  'AE': 'ar', // UAE
  'SA': 'ar', // Saudi Arabia
  'QA': 'ar', // Qatar
  'OM': 'ar', // Oman
  
  // Europe & Americas
  'US': 'en', // USA
  'GB': 'en', // UK
  'FR': 'fr', // France
  'ES': 'es', // Spain
  'PT': 'pt', // Portugal
  'BR': 'pt', // Brazil
  'MX': 'es', // Mexico
};

// Region mapping for display
const regionMapping: Record<string, string> = {
  // Africa
  'NG': 'West Africa', 'GH': 'West Africa', 'CI': 'West Africa', 'SN': 'West Africa',
  'KE': 'East Africa', 'TZ': 'East Africa', 'UG': 'East Africa', 'ET': 'East Africa',
  'ZA': 'Southern Africa', 'BW': 'Southern Africa', 'NA': 'Southern Africa', 'ZW': 'Southern Africa',
  'EG': 'North Africa', 'DZ': 'North Africa', 'MA': 'North Africa', 'TN': 'North Africa',
  
  // Caribbean
  'JM': 'Caribbean', 'TT': 'Caribbean', 'DO': 'Caribbean', 'BS': 'Caribbean',
  
  // Asia
  'CN': 'Asia', 'IN': 'Asia', 'JP': 'Asia', 'PH': 'Asia',
  
  // Middle East
  'AE': 'Middle East', 'SA': 'Middle East', 'QA': 'Middle East', 'OM': 'Middle East',
  
  // Default regions
  'US': 'North America', 'CA': 'North America',
  'GB': 'Europe', 'FR': 'Europe', 'ES': 'Europe', 'PT': 'Europe',
  'BR': 'South America', 'MX': 'Latin America',
};

export function detectUserLanguage(): DetectionResult {
  // Default fallback
  const defaultResult: DetectionResult = {
    language: 'en',
    region: 'International'
  };

  try {
    // Get browser language
    const browserLanguage = navigator.language || (navigator as any).userLanguage;
    const primaryLang = browserLanguage.split('-')[0];
    
    // Try to get country from browser language (e.g., en-US -> US)
    let countryCode = browserLanguage.split('-')[1]?.toUpperCase();
    
    // If no country code from language, try to get from timezone
    if (!countryCode) {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      // Extract country from timezone (e.g., "America/New_York" -> "US")
      const timezoneParts = timezone.split('/');
      if (timezoneParts.length > 1) {
        // Some timezones have city names, try to map to country
        const possibleCountry = timezoneParts[0];
        const countryMap: Record<string, string> = {
          'America': 'US', 'Europe': 'GB', 'Asia': 'CN', 'Africa': 'NG',
          'Australia': 'AU', 'Pacific': 'NZ'
        };
        countryCode = countryMap[possibleCountry] || 'US';
      }
    }
    
    // Determine language based on country code
    let detectedLanguage = regionalLanguages[countryCode] || primaryLang || 'en';
    
    // Validate detected language is in our supported list
    const supportedLanguages = ['en', 'fr', 'es', 'ar', 'pt', 'sw'];
    if (!supportedLanguages.includes(detectedLanguage)) {
      detectedLanguage = 'en'; // Fallback to English
    }
    
    // Get region for display
    const detectedRegion = regionMapping[countryCode] || 'International';
    
    return {
      language: detectedLanguage,
      region: detectedRegion,
      countryCode
    };
    
  } catch (error) {
    console.warn('Language detection failed, using defaults:', error);
    return defaultResult;
  }
}

// Function to get welcome message in detected language
export function getWelcomeMessage(language: string, region: string): string {
  const welcomeMessages: Record<string, string> = {
    en: `🌍 Welcome to DomisLink Aviation Academy - Serving ${region}`,
    fr: `🌍 Bienvenue à DomisLink Aviation Academy - Desservant ${region}`,
    es: `🌍 Bienvenido a DomisLink Aviation Academy - Sirviendo ${region}`,
    ar: `🌍 مرحبًا بكم في أكاديمية دوميسلينك للطيران - نخدم ${region}`,
    pt: `🌍 Bem-vindo à DomisLink Aviation Academy - Servindo ${region}`,
    sw: `🌍 Karibu kwenye DomisLink Aviation Academy - Tunahudumia ${region}`
  };
  
  return welcomeMessages[language] || welcomeMessages.en;
}