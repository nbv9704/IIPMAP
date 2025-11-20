import { useEffect, useState } from 'react';

export type LanguageCode = 'vi' | 'en' | 'ja' | 'ko' | 'zh';

export const useLanguage = () => {
  const [currentLang, setCurrentLang] = useState<LanguageCode>('vi');
  const [isLoading, setIsLoading] = useState(true);

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLang = (localStorage.getItem('language') as LanguageCode) || 'vi';
    setCurrentLang(savedLang);
    document.documentElement.lang = savedLang;
    document.documentElement.dataset.lang = savedLang;
    setIsLoading(false);
  }, []);

  const setCurrentLanguage = (lang: LanguageCode) => {
    setCurrentLang(lang);
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
    document.documentElement.dataset.lang = lang;
    // Dispatch custom event for other components to listen to
    globalThis.dispatchEvent(new CustomEvent('languageChange', { detail: { lang } }));
  };

  return { currentLang, setCurrentLang: setCurrentLanguage, isLoading };
};
