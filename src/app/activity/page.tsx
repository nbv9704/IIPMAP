"use client"
import { useEffect } from "react"
import NewsArea from "@/components/news/NewsArea"
import HeaderIIP from "@/layouts/headers/HeaderIIP"
import FooterIIP from "@/layouts/footers/FooterIIP"
import { useLanguage } from "@/hooks/useLanguage"
import { getTranslation } from "@/utils/translations"

export default function ActivityPage() {
  const { currentLang } = useLanguage()
  
  useEffect(() => {
    document.title = `${getTranslation(currentLang, 'pageTitle.activity')} - ${getTranslation(currentLang, 'pageTitle.siteName')}`;
  }, [currentLang]);
  
  return (
    <>
      <HeaderIIP />
      <NewsArea category="activity" />
      <FooterIIP />
    </>
  )
}
