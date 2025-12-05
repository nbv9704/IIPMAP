"use client"

// ============================================
// IMPORTS
// ============================================
import VideoHistoryGrid from "@/components/video/VideoHistoryGrid"
import { VideoCardItemProps } from "@/components/video/VideoCardItem"
import { generateFeaturedVideos, generateDailyVideos } from "@/constants/video/mockData"
import { useMemo, memo } from "react"
import { useLanguage } from "@/hooks/useLanguage"
import { getTranslation } from "@/utils/translations"

// ============================================
// TYPES
// ============================================
interface ExploreViewProps {
  section?: string
}

// ============================================
// COMPONENT
// ============================================
const ExploreView = ({ section }: ExploreViewProps) => {
  const { currentLang } = useLanguage()
  const featuredVideos = useMemo(() => generateFeaturedVideos(), [])
  const dailyVideos = useMemo(() => generateDailyVideos(), [])

  return (
    <>
      <div className="video-section">
        <div className="video-section-header">
          <div>
            <p className="video-section-label" style={{ visibility: "hidden" }}>
              &nbsp;
            </p>
            <h2 className="video-section-title">{getTranslation(currentLang, "video.featuredVideos")}</h2>
          </div>
          <button className="video-section-badge">{getTranslation(currentLang, "video.viewAll")} →</button>
        </div>

        <div className="video-section-scroll">
          <VideoHistoryGrid videos={featuredVideos} />
        </div>
      </div>

      <div className="video-section video-section--accent">
        <div className="video-section-header">
          <div>
            <p className="video-section-label" style={{ visibility: "hidden" }}>
              &nbsp;
            </p>
            <h2 className="video-section-title">{getTranslation(currentLang, "video.dailyVideos")}</h2>
          </div>
          <button className="video-section-badge">{getTranslation(currentLang, "video.viewAll")} →</button>
        </div>

        <div className="video-section-scroll">
          <VideoHistoryGrid
            videos={dailyVideos}
            className="video-history-grid--compact"
          />
        </div>
      </div>
    </>
  )
}

export default memo(ExploreView)
