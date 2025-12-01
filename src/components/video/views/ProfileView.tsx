"use client"

// ============================================
// IMPORTS
// ============================================
import { useMemo } from "react"
import VideoHistoryGrid from "@/components/video/VideoHistoryGrid"
import { HiLocationMarker } from "react-icons/hi"
import { BiMoney, BiTimeFive } from "react-icons/bi"
import { TbRulerMeasure, TbMountain } from "react-icons/tb"
import { generateFeaturedVideos } from "@/constants/video/mockData"

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
  const featuredVideos = useMemo(() => generateFeaturedVideos(), [])

  return (
    <div className="video-profile-layout">
      <div className="video-profile-hero">
        <div className="video-profile-avatar">
          <img src="/assets/video/avatar-placeholder.png" alt="Profile" />
        </div>
        <div className="video-profile-details">
          <h1>KHU CÔNG NGHIỆP TIÊN SƠN - BẮC NINH</h1>

          <div className="video-profile-actions">
            {isOwnProfile ? (
              <>
                <button type="button" className="video-primary-btn">
                  Chỉnh sửa trang cá nhân
                </button>
                <button type="button" className="video-secondary-btn">
                  Xem bài viết
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
                  Follow
                </button>
                <button type="button" className="video-secondary-btn">
                  Message
                </button>
                <button type="button" className="video-outline-btn">
                  Xem bài viết
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
              <span>Quỹ đất: Còn</span>
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
          sectionSlug={section}
        />
      </div>
    </div>
  )
}

export default ProfileView
