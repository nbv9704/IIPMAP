// ============================================
// IMPORTS
// ============================================
"use client"
import { useEffect } from "react"
import NewsArea from "@/components/news/NewsArea"
import HeaderIIP from "@/layouts/headers/HeaderIIP"
import FooterIIP from "@/layouts/footers/FooterIIP"
import { useLanguage } from "@/hooks/useLanguage"
import { getTranslation } from "@/utils/translations"

// ============================================
// PAGE: QnAPage
// ============================================
export default function QnAPage() {
  // ========== Hooks ==========
  const { currentLang } = useLanguage()

  // ========== Effects ==========
  useEffect(() => {
    document.title = `${getTranslation(currentLang, 'pageTitle.qna')} - ${getTranslation(currentLang, 'pageTitle.siteName')}`;
  }, [currentLang]);

  // ========== Render ==========
  return (
    <>
      <HeaderIIP />
      <NewsArea category="qna" />
      <FooterIIP />
    </>
  )
}
