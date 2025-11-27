"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import Head from "next/head"
import { useLanguage } from "@/hooks/useLanguage"
import { getTranslation } from "@/utils/translations"
import HeaderIIP from "@/layouts/headers/HeaderIIP"
import FooterIIP from "@/layouts/footers/FooterIIP"
import CustomSelect from "@/components/common/CustomSelect"
import { getAllZones } from "@/data/ZonesDataMultilang"
import { HiOutlinePaperClip, HiSparkles, HiMicrophone } from "react-icons/hi2"
import { HiOutlineMapPin, HiOutlineMap, HiOutlineCurrencyDollar, HiOutlineClock, HiOutlineVideoCamera, HiOutlineShare } from "react-icons/hi2"
import { TbRulerMeasure } from "react-icons/tb"
import { MdOutlineLandscape } from "react-icons/md"

const getVideos = (currentLang: string) => [
  { id: 1, labelKey: "trend", views: "29k", creator: "@iip", image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=60" },
  { id: 2, labelKey: "hot", views: "25k", creator: "@iip", image: "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=400&q=60" },
  { id: 3, labelKey: "angelAI", views: "31k", creator: "@iip", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=60" },
  { id: 4, labelKey: "trend", views: "19k", creator: "@iip", image: "https://images.unsplash.com/photo-1502673530728-f79b4cab31b1?auto=format&fit=crop&w=400&q=60" },
  { id: 5, labelKey: "news", views: "11k", creator: "@iip", image: "https://images.unsplash.com/photo-1458938354258-3e66b81adf23?auto=format&fit=crop&w=400&q=60" },
]

const provinces = [
  "An Giang","B� R?a - Vung T�u","B?c Li�u","B?c Giang","B?c K?n","B?c Ninh","B?n Tre","B�nh Duong","B�nh D?nh","B�nh Phu?c","B�nh Thu?n",
  "C� Mau","Cao B?ng","C?n Tho","D� N?ng","D?k L?k","D?k N�ng","Di?n Bi�n","D?ng Nai","D?ng Th�p","Gia Lai","H� Giang","H� Nam","H� N?i",
  "H� Tinh","H?i Duong","H?i Ph�ng","H?u Giang","H�a B�nh","Hung Y�n","Kh�nh H�a","Ki�n Giang","Kon Tum","Lai Ch�u","L�m D?ng","L?ng Son",
  "L�o Cai","Long An","Nam D?nh","Ngh? An","Ninh B�nh","Ninh Thu?n","Ph� Th?","Ph� Y�n","Qu?ng B�nh","Qu?ng Nam","Qu?ng Ngai","Qu?ng Ninh",
  "Qu?ng Tr?","S�c Trang","Son La","T�y Ninh","Th�i B�nh","Th�i Nguy�n","Thanh H�a","Th?a Thi�n Hu?","Ti?n Giang","TP H? Ch� Minh","Tr� Vinh",
  "Tuy�n Quang","Vinh Long","Vinh Ph�c","Y�n B�i"
]

const areaOptions = [
  "< 500 m�",
  "500 - 1.000 m�",
  "1.000 - 3.000 m�",
  "3.000 - 6.000 m�",
  "6.000 - 10.000 m�",
  "> 10.000 m�",
]

const priceOptions = [
  "Th?a thu?n",
  "< 10 USD/m�",
  "10 - 20 USD/m�",
  "20 - 30 USD/m�",
  "30 - 40 USD/m�",
  "40 - 50 USD/m�",
  "50 - 60 USD/m�",
  "60 - 70 USD/m�",
  "70 - 80 USD/m�",
  "80 - 90 USD/m�",
  "90 - 100 USD/m�",
  "> 100 USD/m�",
]

export default function HomePageClient() {
  const { currentLang } = useLanguage()
  const [searchValue, setSearchValue] = useState("")
  const [activeZoneTab, setActiveZoneTab] = useState<"all" | "industrial" | "cluster">("all")

  const videos = getVideos(currentLang)
  const zones = getAllZones(currentLang)

  useEffect(() => {
    document.title = `${getTranslation(currentLang, 'pageTitle.home')} - ${getTranslation(currentLang, 'pageTitle.siteName')}`
  }, [currentLang])

  const heroStats = [
    { label: getTranslation(currentLang, 'home.stats.industrialParks'), value: "1.000" },
    { label: getTranslation(currentLang, 'home.stats.industrialClusters'), value: "800" },
    { label: getTranslation(currentLang, 'home.stats.landArea'), value: "5.000 ha" },
    { label: getTranslation(currentLang, 'home.stats.aiIntegration'), value: "Angel AI" },
  ]

  const aiPrompts = [
    getTranslation(currentLang, 'home.aiPrompts.recent'),
    getTranslation(currentLang, 'home.aiPrompts.components'),
    getTranslation(currentLang, 'home.aiPrompts.price'),
  ]

  return (
    <div className="homepage">
        <HeaderIIP />

      <main>
        <section className="hero-section">
          <div className="hero-inner">
            <div className="digital-badge">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Ng�i sao l?n - Violet */}
                <path fill="#a78bfa" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/>
                {/* Ng�i sao tr�n - Blue */}
                <path fill="#60a5fa" d="M18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"/>
                {/* Ng�i sao du?i - Blue */}
                <path fill="#60a5fa" d="M16.894 20.567L16.5 22.5l-.394-1.933a2.25 2.25 0 00-1.423-1.423L12.75 18.75l1.933-.394a2.25 2.25 0 001.423-1.423l.394-1.933.394 1.933a2.25 2.25 0 001.423 1.423l1.933.394-1.933.394a2.25 2.25 0 00-1.423 1.423z"/>
              </svg>
              {getTranslation(currentLang, 'home.hero.badge')}
            </div>
            <h1 className="hero-title">
              {getTranslation(currentLang, 'home.hero.title')}
            </h1>

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

        <section className="home-content">
          <section className="ai-search-section">
            <h2>IIPMap.AI</h2>
            <div className="ai-search-bar">
              <button className="ai-attach-btn" aria-label="Attach files">
                <HiOutlinePaperClip />
              </button>
              <div className="ai-search-input">
                <input
                  placeholder={getTranslation(currentLang, 'home.search.placeholder')}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <button className="ai-voice-btn" aria-label="Voice input">
                  <HiMicrophone />
                </button>
              </div>
              <button className="ai-search-btn">
                <HiSparkles /> Angel AI
              </button>
            </div>
            <div className="search-prompts">
              {aiPrompts.map((prompt) => (
                <button
                  type="button"
                  key={prompt}
                  className="prompt-card"
                  onClick={() => setSearchValue(prompt)}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </section>

          <section className="video-section">
            <header>
              <h2>{getTranslation(currentLang, 'home.video.title')}</h2>
              <button>
                {getTranslation(currentLang, 'home.video.viewMore')} <span></span>
              </button>
            </header>
            <div className="video-cards">
              {videos.map((video) => (
                <article key={video.id} className="video-card" style={{ backgroundImage: `url(${video.image})`, backgroundSize: "cover" }}>
                  <div className="video-label">{getTranslation(currentLang, `home.video.labels.${video.labelKey}`)}</div>
                  <div className="play-icon">?</div>
                  <div className="video-meta">
                    <span>{video.creator}</span>
                    <span>{video.views} {getTranslation(currentLang, 'home.video.views')}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="zones-section">
            <div className="zones-header">
              <div className="zones-tabs">
                <button 
                  className={`zone-tab ${activeZoneTab === "all" ? "active" : ""}`}
                  onClick={() => setActiveZoneTab("all")}
                >
                  {getTranslation(currentLang, 'home.zones.tabs.all')} <span>(840)</span>
                </button>
                <button 
                  className={`zone-tab ${activeZoneTab === "industrial" ? "active" : ""}`}
                  onClick={() => setActiveZoneTab("industrial")}
                >
                  {getTranslation(currentLang, 'home.zones.tabs.industrial')} <span>(800)</span>
                </button>
                <button 
                  className={`zone-tab ${activeZoneTab === "cluster" ? "active" : ""}`}
                  onClick={() => setActiveZoneTab("cluster")}
                >
                  {getTranslation(currentLang, 'home.zones.tabs.cluster')} <span>(40)</span>
                </button>
              </div>
              <div className="zones-filters">
                <CustomSelect
                  placeholder={getTranslation(currentLang, 'home.zones.filters.location')}
                  options={provinces}
                />
                <CustomSelect
                  placeholder={getTranslation(currentLang, 'home.zones.filters.scale')}
                  options={areaOptions}
                />
                <CustomSelect
                  placeholder={getTranslation(currentLang, 'home.zones.filters.price')}
                  options={priceOptions}
                />
              </div>
            </div>

            <div className="zones-content">
              <div className="zones-list">
                {zones.map((zone) => (
                  <div key={zone.slug} className="zone-card">
                    <div className="zone-card-image">
                      <Image src={zone.image} alt={zone.name} width={180} height={120} />
                    </div>
                    <div className="zone-card-content">
                      <Link href={`/zones/${zone.slug}`} className="zone-card-title">
                        <h3>{zone.name}</h3>
                      </Link>
                      <div className="zone-card-address">
                        <HiOutlineMapPin />
                        <span>{zone.address}</span>
                      </div>
                      <div className="zone-card-info">
                        <div className="zone-info-item">
                          <TbRulerMeasure />
                          <span>{zone.area}</span>
                        </div>
                        <div className="zone-info-item">
                          <MdOutlineLandscape />
                          <span>{zone.land}</span>
                        </div>
                        <div className="zone-info-item">
                          <HiOutlineCurrencyDollar />
                          <span>{zone.price}</span>
                        </div>
                        <div className="zone-info-item">
                          <HiOutlineClock />
                          <span>{zone.timeline}</span>
                        </div>
                      </div>
                    </div>
                    <div className="zone-card-actions">
                      <button className="zone-action-btn" aria-label="View location">
                        <HiOutlineMapPin />
                      </button>
                      <button className="zone-action-btn" aria-label="Watch video">
                        <HiOutlineVideoCamera />
                      </button>
                      <button className="zone-action-btn" aria-label="Share">
                        <HiOutlineShare />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="zones-map">
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Vietnam_relief_location_map.jpg"
                  alt="Vietnam Map"
                  width={620}
                  height={520}
                />
              </div>
            </div>
          </section>
        </section>
      </main>

        <FooterIIP />
    </div>
  )
}
