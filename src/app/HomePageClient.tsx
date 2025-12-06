// ============================================
// IMPORTS
// ============================================
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
import SplineHero from '@/components/home/SplineHero';

import "@/styles/video.scss"

// ============================================
// COMPONENT: HomePageClient
// ============================================
export default function HomePageClient() {
  // ========== Hooks ==========
  const { currentLang } = useLanguage()

  // Note: Title is now handled by metadata in page.tsx

  // ========== Render ==========
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
           <SplineHero />
    </div>
  )
}
