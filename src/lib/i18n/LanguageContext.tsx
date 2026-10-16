import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, Translations, translations } from './translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  isNorwegian: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // 1. Check saved preference
    const saved = localStorage.getItem('atlas_language');
    if (saved === 'no' || saved === 'en') {
      return saved;
    }
    // 2. Check browser language (Norway auto-detect)
    if (typeof navigator !== 'undefined' && navigator.language) {
      const navLang = navigator.language.toLowerCase();
      if (navLang.startsWith('no') || navLang.startsWith('nb') || navLang.startsWith('nn')) {
        return 'no';
      }
    }
    // Default to USD / English
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('atlas_language', lang);
    } catch {
      // localStorage may be disabled or in private mode
    }
  };

  useEffect(() => {
    // Set document lang attribute
    document.documentElement.lang = language === 'no' ? 'no' : 'en';
  }, [language]);

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language],
    isNorwegian: language === 'no',
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
