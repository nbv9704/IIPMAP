"use client"

// ============================================
// IMPORTS
// ============================================
import { useState, useCallback, useMemo } from "react"
import Link from "next/link"
import { useLanguage } from "@/hooks/useLanguage"
import { getTranslation } from "@/utils/translations"
import VideoCardItem from "@/components/video/VideoCardItem"
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2"
import { VIDEO_DATA, VIDEOS_PER_PAGE } from "@/constants"

// ============================================
// COMPONENT
// ============================================
function VideoSectionHome() {
  // ============================================
  // STATE & HOOKS
  // ============================================
  const { currentLang } = useLanguage()
  const [videoPage, setVideoPage] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("right")

  const videos = VIDEO_DATA
  const videosPerPage = VIDEOS_PER_PAGE
  const totalPages = useMemo(() => Math.ceil(videos.length / videosPerPage), [videos.length, videosPerPage])
  const currentVideos = useMemo(
    () => videos.slice(videoPage * videosPerPage, (videoPage + 1) * videosPerPage),
    [videos, videoPage, videosPerPage]
  )

  const handleVideoPageChange = useCallback((direction: "prev" | "next") => {
    if (isAnimating) return
    setIsAnimating(true)
    setSlideDirection(direction === "next" ? "right" : "left")
    
    setTimeout(() => {
      if (direction === "next") {
        setVideoPage((prev) => (prev + 1) % totalPages)
      } else {
        setVideoPage((prev) => (prev - 1 + totalPages) % totalPages)
      }
      setIsAnimating(false)
    }, 300)
  }, [isAnimating, totalPages])

  return (
    <section className="video-section-home">
      <header className="video-section-home-header">
        <h2>{getTranslation(currentLang, 'home.video.title')}</h2>
        <Link href="/video" className="video-section-home-link">
          {getTranslation(currentLang, 'home.video.viewMore')} →
        </Link>
      </header>
      <div className="video-carousel-wrapper">
        <button 
          className="video-carousel-btn video-carousel-btn--prev" 
          onClick={() => handleVideoPageChange("prev")}
          aria-label="Previous page"
        >
          <HiChevronLeft />
        </button>
        <div className={`video-cards-home ${isAnimating ? `slide-out-${slideDirection}` : "slide-in"}`}>
          {currentVideos.map((video) => (
            <VideoCardItem
              key={video.id}
              id={video.id}
              title={video.title}
              location={video.location}
              thumbnail={video.thumbnail}
              badge={video.badge}
              views={video.views}
              duration={video.duration}
              author={video.title}
            />
          ))}
        </div>
        <button 
          className="video-carousel-btn video-carousel-btn--next" 
          onClick={() => handleVideoPageChange("next")}
          aria-label="Next page"
        >
          <HiChevronRight />
        </button>
      </div>
      <div className="video-carousel-dots">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            className={`video-carousel-dot ${videoPage === index ? "active" : ""}`}
            onClick={() => {
              if (!isAnimating) {
                setSlideDirection(index > videoPage ? "right" : "left")
                setIsAnimating(true)
                setTimeout(() => {
                  setVideoPage(index)
                  setIsAnimating(false)
                }, 300)
              }
            }}
            aria-label={`Go to page ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

export default VideoSectionHome
