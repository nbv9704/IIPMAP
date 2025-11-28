"use client"
import { useEffect } from "react"
import { useLanguage } from "@/hooks/useLanguage"
import { getTranslation } from "@/utils/translations"
import HeaderIIP from "@/layouts/headers/HeaderIIP"
import FooterIIP from "@/layouts/footers/FooterIIP"
import HeroSection from "@/components/home/HeroSection"
import AISearchSection from "@/components/home/AISearchSection"
import VideoSectionHome from "@/components/home/VideoSectionHome"
import ZonesSection from "@/components/home/ZonesSection"
import "@/styles/video.scss"

export default function HomePageClient() {
  const { currentLang } = useLanguage()

  useEffect(() => {
    document.title = `${getTranslation(currentLang, 'pageTitle.home')} - ${getTranslation(currentLang, 'pageTitle.siteName')}`
  }, [currentLang])

  return (
    <div className="homepage">
      <HeaderIIP />
      <main>
        <HeroSection />
        <section className="home-content">
          <AISearchSection />
          <VideoSectionHome />
          <ZonesSection />
        </section>
      </main>
      <FooterIIP />
    </div>
  )
}
