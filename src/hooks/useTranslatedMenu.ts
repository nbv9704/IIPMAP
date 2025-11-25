import { useEffect, useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { getTranslation } from '@/utils/translations';

interface SubMenuItem {
    title: string;
    link: string;
}

interface TranslatedMenuItem {
    id: number;
    title: string;
    link: string;
    has_dropdown: boolean;
    sub_menus?: SubMenuItem[];
}

export const useTranslatedMenu = () => {
    const { currentLang } = useLanguage();
    const [menuData, setMenuData] = useState<TranslatedMenuItem[]>([]);

    // Update menuData whenever currentLang changes
    useEffect(() => {
        const newMenuData: TranslatedMenuItem[] = [
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
                has_dropdown: true,
                title: getTranslation(currentLang, 'menu.qna'),
                link: '/qna',
                sub_menus: [
                    {
                        title: getTranslation(currentLang, 'qna.categories.qna'),
                        link: '/qna',
                    },
                    {
                        title: getTranslation(currentLang, 'qna.categories.market'),
                        link: '/market',
                    },
                    {
                        title: getTranslation(currentLang, 'qna.categories.planning'),
                        link: '/planning',
                    },
                    {
                        title: getTranslation(currentLang, 'qna.categories.activity'),
                        link: '/activity',
                    },
                ],
            },
            {
                id: 7,
                has_dropdown: false,
                title: getTranslation(currentLang, 'menu.booking'),
                link: '/booking',
            },
            {
                id: 5,
                has_dropdown: false,
                title: getTranslation(currentLang, 'menu.servicesContact'),
                link: '/services',
            },
        ];
        setMenuData(newMenuData);
    }, [currentLang]);

    return { menuData, currentLang };
};
