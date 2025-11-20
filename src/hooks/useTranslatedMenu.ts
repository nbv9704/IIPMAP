import { useEffect, useState } from 'react';
import { getTranslation } from '@/utils/translations';
import type { LanguageCode } from '@/hooks/useLanguage';

interface TranslatedMenuItem {
    id: number;
    title: string;
    link: string;
    has_dropdown: boolean;
}

export const useTranslatedMenu = () => {
    const [currentLang, setCurrentLang] = useState<LanguageCode>('vi');
    const [menuData, setMenuData] = useState<TranslatedMenuItem[]>([]);

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

    // Update menuData whenever currentLang changes
    useEffect(() => {
        const newMenuData: TranslatedMenuItem[] = [
            {
                id: 1,
                has_dropdown: false,
                title: getTranslation(currentLang, 'menu.home'),
                link: '/',
            },
            {
                id: 2,
                has_dropdown: false,
                title: getTranslation(currentLang, 'menu.listings'),
                link: '/listings',
            },
            {
                id: 3,
                has_dropdown: false,
                title: getTranslation(currentLang, 'menu.video'),
                link: '/video',
            },
            {
                id: 4,
                has_dropdown: false,
                title: getTranslation(currentLang, 'menu.news'),
                link: '/news',
            },
            {
                id: 5,
                has_dropdown: false,
                title: getTranslation(currentLang, 'menu.services'),
                link: '/services',
            },
            {
                id: 6,
                has_dropdown: false,
                title: getTranslation(currentLang, 'menu.contact'),
                link: '/contact-us',
            },
            {
                id: 7,
                has_dropdown: false,
                title: getTranslation(currentLang, 'menu.booking'),
                link: '/booking',
            },
        ];
        setMenuData(newMenuData);
    }, [currentLang]);

    return { menuData, currentLang };
};
