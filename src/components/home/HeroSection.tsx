"use client"
import { useLanguage } from "@/hooks/useLanguage"
import { getTranslation } from "@/utils/translations"

function HeroSection() {
  const { currentLang } = useLanguage()

  const heroStats = [
    { label: getTranslation(currentLang, 'home.stats.industrialParks'), value: "1.000" },
    { label: getTranslation(currentLang, 'home.stats.industrialClusters'), value: "800" },
    { label: getTranslation(currentLang, 'home.stats.landArea'), value: "5.000 ha" },
    { label: getTranslation(currentLang, 'home.stats.aiIntegration'), value: "Angel AI" },
  ]

  return (
    <section className="hero-section">
      <div className="hero-inner">
        <div className="digital-badge">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill="#a78bfa" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/>
            <path fill="#60a5fa" d="M18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"/>
            <path fill="#60a5fa" d="M16.894 20.567L16.5 22.5l-.394-1.933a2.25 2.25 0 00-1.423-1.423L12.75 18.75l1.933-.394a2.25 2.25 0 001.423-1.423l.394-1.933.394 1.933a2.25 2.25 0 001.423 1.423l1.933.394-1.933.394a2.25 2.25 0 00-1.423 1.423z"/>
          </svg>
          {getTranslation(currentLang, 'home.hero.badge')}
        </div>
        <h1 className="hero-title">{getTranslation(currentLang, 'home.hero.title')}</h1>
        <div className="hero-stats">
          {heroStats.map((stat, index) => (
            <div key={stat.label} className={`stat-card-wrapper stat-card-${index + 1}`}>
              <div className="stat-card-circles">
                <div className="circle circle-1"></div>
                <div className="circle circle-2"></div>
              </div>
              <div className="stat-card-blur"></div>
              <div className="stat-card-content">
                <span>{stat.label}</span>
                <h3>{stat.value}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HeroSection
