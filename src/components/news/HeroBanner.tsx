// ============================================
// IMPORTS
// ============================================
"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useLanguage } from "@/hooks/useLanguage"
import { getTranslation } from "@/utils/translations"

// ============================================
// TYPES
// ============================================
interface HeroBannerProps {
  news: Array<{
    id: number
    title: string
    image: string
  }>
}

// ============================================
// COMPONENT: HeroBanner
// ============================================
function HeroBanner({ news }: HeroBannerProps) {
  // ========== Hooks ==========
  const { currentLang } = useLanguage()
  
  // ========== State Management ==========
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0)

  // ========== Effects ==========
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % news.length)
    }, 30000)
    
    return () => clearInterval(interval)
  }, [news.length])

  // ========== Render ==========
  return (
    <div className="hero-banner" style={{ backgroundImage: `url(${news[currentBannerIndex]?.image || '/assets/images/listing/img_large_01.jpg'})` }}>
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1>{news[currentBannerIndex]?.title || ''}</h1>
        <Link href={`/news/read/${news[currentBannerIndex]?.id || 2}`} className="btn-xem-them">
          {getTranslation(currentLang, 'news.readMore')}
          <i className="bi bi-arrow-right"></i>
        </Link>
      </div>
      <div className="carousel-indicators">
        {news.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentBannerIndex ? 'active' : ''}`}
            onClick={() => setCurrentBannerIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default HeroBanner
