// ============================================
// IMPORTS & TYPES
// ============================================
"use client"

import { useLanguageContext } from "@/contexts/LanguageContext"
import { getTranslation } from "@/utils/translations"
import { getBadgeTranslationKey, getBadgeClass } from "@/utils/badgeHelpers"

interface CreatorVideo {
  id: number;
  title: string;
  thumbnail: string;
  views: string;
  badge: string;
}

interface VideoCreatorProfileProps {
  videos: CreatorVideo[];
  creator: {
    name: string;
    location: string;
    price: string;
    area: string;
    land: string;
    term: string;
  };
}

// ============================================
// COMPONENT: VideoCreatorProfile
// ============================================
const VideoCreatorProfile = ({ videos, creator }: VideoCreatorProfileProps) => {
  const { currentLang } = useLanguageContext()
  
  // ========== Stats Data ==========
  const stats = [
    { key: "price", label: creator.price, icon: <MoneyIcon /> },
    { key: "area", label: creator.area, icon: <AreaIcon /> },
    { key: "land", label: creator.land, icon: <LandIcon /> },
    { key: "term", label: creator.term, icon: <CalendarIcon /> }
  ]

  return (
    <div className="creator-page">
      <div className="creator-header">
        <div className="creator-avatar">
          <PersonIcon />
        </div>
        <div className="creator-info">
          <div className="creator-title-row">
            <h1>{creator.name}</h1>
            <button type="button" className="share-btn" aria-label="Chia sẻ">
              <ShareIcon />
            </button>
          </div>
          <div className="creator-actions">
            <button type="button" className="primary">Follow</button>
            <button type="button" className="outline">Message</button>
            <button type="button" className="outline strong">Xem bài viết</button>
          </div>
          <div className="creator-location">
            <span className="location-icon" aria-hidden="true">
              <LocationIcon />
            </span>
            <p>{creator.location}</p>
          </div>
          <div className="creator-stats">
            {stats.map((stat) => (
              <div className="stat-item" key={stat.key}>
                <span className="stat-icon" aria-hidden="true">{stat.icon}</span>
                <span className="stat-text">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="creator-grid-section">
        <div className="creator-grid-header">
        </div>
        <div className="video-history-grid creator-grid">
          {videos.map((video) => {
            const badgeKey = getBadgeTranslationKey(video.badge)
            const badgeClass = getBadgeClass(video.badge)
            const translatedBadge = getTranslation(currentLang, badgeKey, video.badge)
            
            return (
            <div className="video-card" key={video.id}>
              <div className="video-card-media">
                <span className={`video-card-badge video-card-badge--${badgeClass}`}>{translatedBadge}</span>
                <video className="video-card-element" poster={video.thumbnail}>
                  <source src={video.thumbnail} type="video/mp4" />
                </video>
                <button className="video-card-play" type="button" aria-label="Phát video nổi bật">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="24" r="24" fill="rgba(255,255,255,0.5)" />
                    <path d="M19 15L33 24L19 33V15Z" fill="#000" />
                  </svg>
                </button>
                <div className="video-card-stats">
                  <svg width="18" height="12" viewBox="0 0 18 12" fill="none" aria-hidden="true">
                    <path d="M1 6C1 6 4 1 9 1C14 1 17 6 17 6C17 6 14 11 9 11C4 11 1 6 1 6Z" stroke="#fff" strokeWidth="1" />
                    <circle cx="9" cy="6" r="2" stroke="#fff" strokeWidth="1" />
                  </svg>
                  <span>{video.views}</span>
                </div>
              </div>
            </div>
          )}
          )}
        </div>
      </div>
    </div>
  )
}

export default VideoCreatorProfile

const ShareIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M7 5L11 1V17L7 13" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M11 9H1" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const LocationIcon = () => (
  <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
    <path d="M8 19s6-6.375 6-11A6 6 0 0 0 2 8c0 4.625 6 11 6 11Z" stroke="#0051CB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="8" cy="8" r="2.5" stroke="#0051CB" strokeWidth="1.5"/>
  </svg>
)

const MoneyIcon = () => (
  <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
    <rect x="1" y="1" width="18" height="14" rx="3" stroke="#292524" strokeWidth="1.2"/>
    <circle cx="10" cy="8" r="2.5" stroke="#292524" strokeWidth="1.2"/>
    <path d="M5 4H6.5M13.5 12H15" stroke="#292524" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
)

const AreaIcon = () => (
  <svg width="20" height="18" viewBox="0 0 20 18" fill="none">
    <rect x="1" y="4" width="18" height="12" rx="2" stroke="#292524" strokeWidth="1.2"/>
    <path d="M3 2H17" stroke="#292524" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M8 9H12" stroke="#292524" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
)

const LandIcon = () => (
  <svg width="20" height="18" viewBox="0 0 20 18" fill="none">
    <path d="M1.5 12L18.5 6" stroke="#292524" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M1.5 16L18.5 10" stroke="#292524" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4 7.5C4 5.567 5.567 4 7.5 4C9.433 4 11 5.567 11 7.5V11" stroke="#292524" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
)

const CalendarIcon = () => (
  <svg width="20" height="18" viewBox="0 0 20 18" fill="none">
    <rect x="1" y="3" width="18" height="14" rx="2" stroke="#292524" strokeWidth="1.2"/>
    <path d="M5 1V5" stroke="#292524" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M15 1V5" stroke="#292524" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M1 7H19" stroke="#292524" strokeWidth="1.2"/>
    <rect x="6" y="10" width="3" height="3" rx="0.5" fill="#292524"/>
    <rect x="11" y="10" width="3" height="3" rx="0.5" fill="#292524"/>
  </svg>
)

const PersonIcon = () => (
  <svg width="110" height="110" viewBox="0 0 110 110" fill="none" aria-hidden="true">
    <circle cx="55" cy="36" r="20" fill="#FBD7D7"/>
    <path d="M55 58C37.879 58 24 71.879 24 89H86C86 71.879 72.121 58 55 58Z" fill="#F3B607"/>
    <path d="M70 34C70 41.18 64.18 47 57 47H53C45.82 47 40 41.18 40 34" stroke="#3E3E3F" strokeWidth="4" strokeLinecap="round"/>
  </svg>
)
