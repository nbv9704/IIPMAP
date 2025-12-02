// ============================================
// IMPORTS
// ============================================
"use client"
import { useEffect, ReactNode } from "react"
import Wrapper from "@/layouts/Wrapper"
import HeaderIIP from "@/layouts/headers/HeaderIIP"
import FooterIIP from "@/layouts/footers/FooterIIP"
import NewsArea from "@/components/news/NewsArea"
import { useLanguage } from "@/hooks/useLanguage"
import { getTranslation } from "@/utils/translations"

// ============================================
// TYPES
// ============================================
interface NewsCategoryPageClientProps {
  category?: "qna" | "market" | "planning" | "activity"
  titleKey: string
  useWrapper?: boolean
}

// ============================================
// COMPONENT
// ============================================
const NewsCategoryPageClient = ({ category, titleKey, useWrapper = false }: NewsCategoryPageClientProps) => {
  // ========== Hooks ==========
  const { currentLang } = useLanguage()

  // ========== Effects ==========
  useEffect(() => {
    document.title = `${getTranslation(currentLang, titleKey)} - ${getTranslation(currentLang, "pageTitle.siteName")}`
  }, [currentLang, titleKey])

  // ========== Render ==========
  const content: ReactNode = <NewsArea category={category} />

  if (useWrapper) {
    return <Wrapper>{content}</Wrapper>
  }

  return (
    <>
      <HeaderIIP />
      {content}
      <FooterIIP />
    </>
  )
}

export default NewsCategoryPageClient
