"use client";
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type LanguageCode = 'vi' | 'en' | 'ja' | 'ko' | 'zh';

interface LanguageContextType {
  currentLang: LanguageCode;
  setCurrentLang: (lang: LanguageCode) => void;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLang, setCurrentLangState] = useState<LanguageCode>('vi');
  const [isLoading, setIsLoading] = useState(true);

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLang = (localStorage.getItem('language') as LanguageCode) || 'vi';
    setCurrentLangState(savedLang);
    document.documentElement.lang = savedLang;
    document.documentElement.dataset.lang = savedLang;
    setIsLoading(false);
  }, []);

  const setCurrentLang = (lang: LanguageCode) => {
    setCurrentLangState(lang);
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
    document.documentElement.dataset.lang = lang;
    
    // Dispatch custom event for other components to listen to
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('languageChange', { detail: { lang } }));
    }
  };

  return (
    <LanguageContext.Provider value={{ currentLang, setCurrentLang, isLoading }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use language context
export const useLanguageContext = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguageContext must be used within a LanguageProvider');
  }
  return context;
};
