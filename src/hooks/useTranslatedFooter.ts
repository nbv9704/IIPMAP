// ============================================
// IMPORTS
// ============================================
import { useEffect, useState } from 'react';
import { footerTranslations } from '@/utils/translations';
import type { LanguageCode } from '@/hooks/useLanguage';

// ============================================
// TYPES
// ============================================
interface FooterLink {
  link: string;
  link_title: string;
}

interface FooterDataType {
  id: number;
  widget_title: string;
  widget_class: string;
  footer_link: FooterLink[];
}

// ============================================
// HOOK: useTranslatedFooter
// ============================================
export const useTranslatedFooter = () => {
  // ========== State ==========
  const [currentLang, setCurrentLang] = useState<LanguageCode>('vi');
  const [footerData, setFooterData] = useState<FooterDataType[]>([]);

  // ========== Effects ==========
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

  // Update footerData whenever currentLang changes
  useEffect(() => {
    const newFooterData: FooterDataType[] = [
      {
        id: 1,
        widget_title: (footerTranslations as any)[currentLang]?.ecosystem || 'HỆ SINH THÁI IIP',
        widget_class: 'col-lg-3',
        footer_link: [
          { link: '/', link_title: (footerTranslations as any)[currentLang]?.iipMap || 'IIPMap.AI' },
          { link: 'https://iipvietnam.com', link_title: (footerTranslations as any)[currentLang]?.iipVietnam || 'IIPVietnam.com' },
          { link: 'https://cvlam.com', link_title: (footerTranslations as any)[currentLang]?.cvLam || 'CVLam.com' },
        ]
      },
      {
        id: 2,
        widget_title: (footerTranslations as any)[currentLang]?.address || 'ĐỊA CHỈ',
        widget_class: 'col-lg-3',
        footer_link: [
          {
            link: '#',
            link_title: (footerTranslations as any)[currentLang]?.addressText || 'Lô 7, Khu nhà thấp tầng, Khu Ngoại giao đoàn, Phường Xuân Đỉnh, Quận Bắc Từ Liêm, Hà Nội'
          },
        ]
      },
      {
        id: 3,
        widget_title: (footerTranslations as any)[currentLang]?.contact || 'LIÊN LẠC',
        widget_class: 'col-lg-3',
        footer_link: [
          { link: 'tel:1900888858', link_title: (footerTranslations as any)[currentLang]?.phone || '1900.8888.58' },
          { link: 'mailto:info@iipvietnam.com', link_title: (footerTranslations as any)[currentLang]?.email || 'info@iipvietnam.com' },
        ]
      },
      {
        id: 4,
        widget_title: (footerTranslations as any)[currentLang]?.social || 'MẠNG XÃ HỘI',
        widget_class: 'col-lg-3',
        footer_link: [
          { link: 'https://facebook.com', link_title: (footerTranslations as any)[currentLang]?.facebook || 'Facebook' },
          { link: 'https://youtube.com', link_title: (footerTranslations as any)[currentLang]?.youtube || 'Youtube' },
          { link: 'https://linkedin.com', link_title: (footerTranslations as any)[currentLang]?.linkedin || 'Linkedin' },
        ]
      },
    ];
    setFooterData(newFooterData);
  }, [currentLang]);

  return { footerData, currentLang };
};
