"use client"
import { useEffect } from "react"
import HeaderIIP from "@/layouts/headers/HeaderIIP"
import FooterIIP from "@/layouts/footers/FooterIIP"
import { useLanguage } from "@/hooks/useLanguage"
import { getTranslation } from "@/utils/translations"

const ListingsPageClient = () => {
  const { currentLang } = useLanguage()

  useEffect(() => {
    document.title = `${getTranslation(currentLang, "pageTitle.listings")} - ${getTranslation(currentLang, "pageTitle.siteName")}`
  }, [currentLang])

  return (
    <>
      <HeaderIIP />
      <div className="coming-soon-area pt-200 pb-200">
        <div className="container">
          <div className="text-center">
            <h2 className="mb-4">{getTranslation(currentLang, "menu.listings")}</h2>
            <p className="text-muted">Coming Soon - Đang phát triển</p>
          </div>
        </div>
      </div>
      <FooterIIP />
    </>
  )
}

export default ListingsPageClient
