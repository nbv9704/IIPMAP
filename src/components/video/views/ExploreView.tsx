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
import { useGetFeaturedVideosQuery, useGetDailyVideosQuery } from "@/redux/slice/videoApiSlice"

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
  
  // ✅ RTK Query API calls (following VNG004's pattern)
  const { data: apiFeatured, error: errorFeatured } = useGetFeaturedVideosQuery(8)
  const { data: apiDaily, error: errorDaily } = useGetDailyVideosQuery(12)
  
  // ✅ Mock data fallback (for testing phase)
  const mockFeatured = useMemo(() => generateFeaturedVideos(), [])
  const mockDaily = useMemo(() => generateDailyVideos(), [])
  
  // ✅ Determine data source
  const USE_MOCK_FEATURED = !apiFeatured || errorFeatured
  const USE_MOCK_DAILY = !apiDaily || errorDaily
  
  // ✅ Transform API data to VideoCardItemProps format (when backend ready)
  const transformApiToCard = (videos: typeof apiFeatured): VideoCardItemProps[] => {
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
  const featuredVideos: VideoCardItemProps[] = USE_MOCK_FEATURED 
    ? mockFeatured 
    : transformApiToCard(apiFeatured)
  const dailyVideos: VideoCardItemProps[] = USE_MOCK_DAILY 
    ? mockDaily 
    : transformApiToCard(apiDaily)
  
  // 🔍 Debug logging
  console.log("🎬 ExploreView - Featured:", USE_MOCK_FEATURED ? "📦 Mock" : "🌐 API")
  console.log("🎬 ExploreView - Daily:", USE_MOCK_DAILY ? "📦 Mock" : "🌐 API")

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
