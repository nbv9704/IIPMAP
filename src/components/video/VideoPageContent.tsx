"use client"

import { useMemo, useState, useEffect } from "react"
import Wrapper from "@/layouts/Wrapper"
import VideoSidebar from "@/components/video/VideoSidebar"
import VideoHistoryGrid from "@/components/video/VideoHistoryGrid"
import { VideoCardItemProps } from "@/components/video/VideoCardItem"
import { useLanguage } from "@/hooks/useLanguage"
import { getTranslation } from "@/utils/translations"
import { readSavedVideos } from "@/utils/videoStorage"
import "@/styles-iip/video.scss"

const formatDuration = (seconds: number) => `00:${seconds.toString().padStart(2, "0")}`

interface VideoPageContentProps {
  section?: string
}

const DEFAULT_SECTION = "explore"

const VideoPageContent = ({ section = DEFAULT_SECTION }: VideoPageContentProps) => {
  const { currentLang } = useLanguage()
  const [heroSearch, setHeroSearch] = useState("")
  const viewMode =
    section === "saved"
      ? "saved"
      : section === "profile"
      ? "profile"
      : "default"

  useEffect(() => {
    document.title = `${getTranslation(currentLang, "pageTitle.video")} - ${getTranslation(
      currentLang,
      "pageTitle.siteName",
    )}`
  }, [currentLang])

  // fake data
  const featuredVideos: VideoCardItemProps[] = useMemo(
    () =>
      Array.from({ length: 8 }, (_, idx) => ({
        id: idx + 1,
        title: "Khu công nghiệp Tiên Sơn - Bắc Ninh",
        location: idx % 2 === 0 ? "Bắc Ninh" : "Hà Nội",
        thumbnail: "/assets/video/khucongnghiepthainguyen.mp4",
        badge: idx === 0 ? "Xu hướng" : "Mới",
        views: `${28 + idx}k`,
        duration: formatDuration(14 + idx),
      })),
    [],
  )

  const dailyVideos: VideoCardItemProps[] = useMemo(
    () =>
      Array.from({ length: 12 }, (_, idx) => ({
        id: 101 + idx,
        title: "Video mới từ IIPMap.AI",
        location: idx % 2 === 0 ? "Hà Nội" : "Bắc Giang",
        thumbnail: "/assets/video/khucongnghiepthainguyen.mp4",
        badge: idx % 3 === 0 ? "Hot" : "Hàng ngày",
        views: `${12 + idx}k`,
        duration: formatDuration(9 + idx),
      })),
    [],
  )

  const savedVideosDefault: VideoCardItemProps[] = useMemo(
    () =>
      Array.from({ length: 18 }, (_, idx) => ({
        id: 201 + idx,
        title: "Khu công nghiệp Tiên Sơn - Bắc Ninh",
        location: idx % 2 === 0 ? "Bắc Ninh" : "Hải Dương",
        thumbnail: "/assets/video/khucongnghiepthainguyen.mp4",
        badge: "Đã lưu",
        views: `${22 + idx}k`,
        duration: formatDuration(12 + idx),
      })),
    [],
  )

  const [savedVideos, setSavedVideos] = useState<VideoCardItemProps[]>(savedVideosDefault)

  useEffect(() => {
    const stored = readSavedVideos()
    if (stored.length) {
      setSavedVideos(stored)
    }
  }, [])

  return (
    <Wrapper>
      <section className="video-page">
        <div className="video-page-container">
          {/* sidebar bên trái */}
          <div className="video-sidebar-wrapper">
            <VideoSidebar activeSlug={section} />
          </div>

          {/* cột chính bên phải */}
          <div className="video-main-column">
            {viewMode === "saved" ? (
              /* VIEW: Video đã lưu */
              <div className="video-saved-layout">
                <div className="video-saved-header">
                  <div>
                    <p className="video-section-label">Bộ sưu tập cá nhân</p>
                    <h2 className="video-section-title">Video đã lưu</h2>
                  </div>
                </div>

                {/* scroll riêng cho phần "Đã lưu" nếu bạn muốn, có thể bọc thêm video-section-scroll */}
                <VideoHistoryGrid
                  videos={savedVideos}
                  className="video-history-grid--saved"
                  sectionSlug={section}
                />
              </div>
            ) : viewMode === "profile" ? (
              /* VIEW: Hồ sơ cá nhân */
              <div className="video-profile-layout">
                <div className="video-profile-hero">
                  <div className="video-profile-avatar">
                    <span>V</span>
                  </div>
                  <div className="video-profile-details">
                    <h1>KHU CÔNG NGHIỆP TIÊN SƠN - BẮC NINH</h1>
                    <p>Phường Đồng Nguyên, xã Đại Đồng, phường Tam Sơn, tỉnh Bắc Ninh</p>
                    <div className="video-profile-meta">
                      <span>115 USD/m²</span>
                      <span>402.82 ha</span>
                      <span>Quỹ đất: Còn</span>
                      <span>2019 - 2030</span>
                    </div>
                    <div className="video-profile-actions">
                      <button type="button" className="video-primary-btn">
                        Follow
                      </button>
                      <button type="button" className="video-secondary-btn">
                        Message
                      </button>
                      <button type="button" className="video-outline-btn">
                        Xem bài viết
                      </button>
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
            ) : (
              /* VIEW: Default – giống Figma: search + 2 block, mỗi block có scrollbar riêng */
              <>
                {/* THANH TÌM KIẾM CHUNG */}
                <div className="video-main-search">
                  <div className="video-main-search-box">
                    <input
                      type="text"
                      placeholder="Tìm kiếm"
                      value={heroSearch}
                      onChange={(e) => setHeroSearch(e.target.value)}
                    />
                    <button type="button" aria-label="Tìm kiếm">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <circle
                          cx="8"
                          cy="8"
                          r="5.5"
                          stroke="#9CA3AF"
                          strokeWidth="1.5"
                        />
                        <line
                          x1="12"
                          y1="12"
                          x2="16"
                          y2="16"
                          stroke="#9CA3AF"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* VIDEO NỔI BẬT – có thanh scroll riêng */}
                <div className="video-section">
                  <div className="video-section-header">
                    <div>
                      <p className="video-section-label" style={{ visibility: "hidden" }}>
                        &nbsp;
                      </p>
                      <h2 className="video-section-title">Video nổi bật</h2>
                    </div>
                  </div>

                  <div className="video-section-scroll">
                    <VideoHistoryGrid videos={featuredVideos} sectionSlug={section} />
                  </div>
                </div>

                {/* VIDEO HẰNG NGÀY – thanh scroll riêng thứ 2 */}
                <div className="video-section video-section--accent">
                  <div className="video-section-header">
                    <div>
                      <p className="video-section-label" style={{ visibility: "hidden" }}>
                        &nbsp;
                      </p>
                      <h2 className="video-section-title">Video hàng ngày</h2>
                    </div>
                  </div>

                  <div className="video-section-scroll">
                    <VideoHistoryGrid
                      videos={dailyVideos}
                      className="video-history-grid--compact"
                      sectionSlug={section}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </Wrapper>
  )
}

export default VideoPageContent
