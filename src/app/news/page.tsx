// ============================================
// IMPORTS
// ============================================
"use client"
import { useEffect } from "react";
import Wrapper from "@/layouts/Wrapper";
import NewsArea from "@/components/news/NewsArea";
import { useLanguage } from "@/hooks/useLanguage";
import { getTranslation } from "@/utils/translations";

// ============================================
// PAGE: NewsPage
// ============================================
const NewsPage = () => {
   // ========== Hooks ==========
   const { currentLang } = useLanguage();
   
   // ========== Effects ==========
   useEffect(() => {
      document.title = `${getTranslation(currentLang, 'pageTitle.news')} - ${getTranslation(currentLang, 'pageTitle.siteName')}`;
   }, [currentLang]);
   
   // ========== Render ==========
   return (
      <Wrapper>
         <NewsArea />
      </Wrapper>
   )
}

export default NewsPage
