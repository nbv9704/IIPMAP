"use client"

import { useEffect, useState } from 'react';
import { getTranslation } from '@/utils/translations';
import type { LanguageCode } from '@/hooks/useLanguage';

interface TranslationProps {
  keyPath: string;
  defaultValue?: string;
}

export const Trans = ({ keyPath, defaultValue = '' }: TranslationProps) => {
  const [currentLang, setCurrentLang] = useState<LanguageCode>('vi');

  useEffect(() => {
    const savedLang = (localStorage.getItem('language') as LanguageCode) || 'vi';
    setCurrentLang(savedLang);

    const handleLanguageChange = (event: any) => {
      setCurrentLang(event.detail.lang);
    };

    globalThis.addEventListener('languageChange', handleLanguageChange);

    return () => {
      globalThis.removeEventListener('languageChange', handleLanguageChange);
    };
  }, []);

  return getTranslation(currentLang, keyPath, defaultValue);
};
