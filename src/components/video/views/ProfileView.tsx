"use client"

// ============================================
// IMPORTS
// ============================================
import { useMemo } from "react"
import Image from "next/image"
import VideoHistoryGrid from "@/components/video/VideoHistoryGrid"
import { HiLocationMarker } from "react-icons/hi"
import { BiMoney, BiTimeFive } from "react-icons/bi"
import { TbRulerMeasure, TbMountain } from "react-icons/tb"
import { generateFeaturedVideos } from "@/constants/video/mockData"
import { useLanguage } from "@/hooks/useLanguage"
import { getTranslation } from "@/utils/translations"
import { useGetUserProfileQuery, useGetVideosByUserQuery } from "@/redux/slice/videoApiSlice"
import { VideoCardItemProps } from "@/components/video/VideoCardItem"

// ============================================
// TYPES
// ============================================
interface ProfileViewProps {
  section?: string
  isOwnProfile?: boolean
}

// ============================================
// COMPONENT
// ============================================
const ProfileView = ({ section, isOwnProfile = true }: ProfileViewProps) => {
  const { currentLang } = useLanguage()
  
  // ✅ RTK Query API calls (following VNG004's pattern)
  // TODO: Get actual userId from auth/context
  const userId = "current-user-id"
  const { data: apiProfile, error: errorProfile } = useGetUserProfileQuery(userId)
  const { data: apiVideos, error: errorVideos } = useGetVideosByUserQuery(userId)
  
  // ✅ Mock data fallback (for testing phase)
  const mockVideos = useMemo(() => generateFeaturedVideos(), [])
  
  // ✅ Determine data source
  const USE_MOCK_VIDEOS = !apiVideos || errorVideos
  
  // ✅ Transform API data (when backend ready)
  const transformApiToCard = (videos: typeof apiVideos): VideoCardItemProps[] => {
    if (!videos) return []
    return videos.map(v => ({
      id: parseInt(v.id) || 0,
      title: v.title,
      location: v.location || "",
      thumbnail: v.thumbnailUrl || v.videoUrl,
      badge: v.isFeatured ? "Xu huong" : "Moi",
      views: `${Math.floor(v.views / 1000)}k`,
      duration: `00:${v.duration.toString().padStart(2, "0")}`,
    }))
  }
  
  // ✅ Select data to display
  const featuredVideos = USE_MOCK_VIDEOS ? mockVideos : transformApiToCard(apiVideos)
  
  // 🔍 Debug logging
  console.log("👤 ProfileView - Using:", USE_MOCK_VIDEOS ? "📦 Mock" : "🌐 API")

  return (
    <div className="video-profile-layout">
      <div className="video-profile-hero">
        <div className="video-profile-avatar">
          <Image 
            src="/assets/video/avatar-placeholder.png" 
            alt="Profile"
            width={120}
            height={120}
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="video-profile-details">
          <h1>KHU CÔNG NGHIỆP TIÊN SƠN - BẮC NINH</h1>

          <div className="video-profile-actions">
            {isOwnProfile ? (
              <>
                <button type="button" className="video-primary-btn">
                  {getTranslation(currentLang, "video.editProfile")}
                </button>
                <button type="button" className="video-secondary-btn">
                  {getTranslation(currentLang, "video.viewPost")}
                </button>
                <button type="button" className="video-share-btn" aria-label="Share">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M16 6L18 8L16 10"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8 14L6 16L8 18"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M18 8H10C7.79086 8 6 9.79086 6 12V16"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </>
            ) : (
              <>
                <button type="button" className="video-primary-btn">
                  {getTranslation(currentLang, "video.followButton")}
                </button>
                <button type="button" className="video-secondary-btn">
                  {getTranslation(currentLang, "video.message")}
                </button>
                <button type="button" className="video-outline-btn">
                  {getTranslation(currentLang, "video.viewPost")}
                </button>
                <button type="button" className="video-share-btn" aria-label="Share">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M16 6L18 8L16 10"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8 14L6 16L8 18"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M18 8H10C7.79086 8 6 9.79086 6 12V16"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </>
            )}
          </div>

          <div className="video-profile-location">
            <HiLocationMarker />
            <span>Phường Đồng Nguyên, xã Đại Đồng, phường Tam Sơn, tỉnh Bắc Ninh</span>
          </div>

          <div className="video-profile-meta">
            <div className="video-profile-meta-item">
              <BiMoney />
              <span>115 USD/m²</span>
            </div>
            <div className="video-profile-meta-item">
              <TbRulerMeasure />
              <span>402.82 ha</span>
            </div>
            <div className="video-profile-meta-item">
              <TbMountain />
              <span>{getTranslation(currentLang, "video.landFund")}</span>
            </div>
            <div className="video-profile-meta-item">
              <BiTimeFive />
              <span>2019 - 2030</span>
            </div>
          </div>
        </div>
      </div>

      <div className="video-profile-feed">
        <VideoHistoryGrid
          videos={featuredVideos}
          className="video-history-grid--saved"
        />
      </div>
    </div>
  )
}

export default ProfileView
