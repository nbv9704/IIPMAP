// ============================================
// IMPORTS
// ============================================
"use client"
import { useEffect } from "react";
import Wrapper from "@/layouts/Wrapper";
import { useLanguage } from "@/hooks/useLanguage";
import { getTranslation } from "@/utils/translations";

// ============================================
// PAGE: DichVuPage (Services)
// ============================================
const DichVuPage = () => {
   // ========== Hooks ==========
   const { currentLang } = useLanguage();
   
   // ========== Effects ==========
   useEffect(() => {
      document.title = `${getTranslation(currentLang, 'pageTitle.services')} - ${getTranslation(currentLang, 'pageTitle.siteName')}`;
   }, [currentLang]);
   
   // ========== Render ==========
   return (
      <Wrapper>
         <div style={{ 
            minHeight: 'calc(100vh - 260px)', 
            paddingTop: '100px',
            padding: '100px 20px 40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
         }}>
            <h1 style={{ 
               fontFamily: 'Montserrat, sans-serif',
               fontSize: '40px',
               fontWeight: 800,
               color: '#0051CB'
            }}>
               {getTranslation(currentLang, 'pageTitle.services')} - Coming Soon
            </h1>
         </div>
      </Wrapper>
   )
}

export default DichVuPage
