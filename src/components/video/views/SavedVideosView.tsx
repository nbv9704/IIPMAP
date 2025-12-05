"use client"

// ============================================
// IMPORTS
// ============================================
import { useState, useEffect, memo, useMemo } from "react"
import VideoHistoryGrid from "@/components/video/VideoHistoryGrid"
import { VideoCardItemProps } from "@/components/video/VideoCardItem"
import { readSavedVideos } from "@/utils/videoStorage"
import { generateSavedVideos } from "@/constants/video/mockData"
import { useGetSavedVideosQuery } from "@/redux/slice/videoApiSlice"

// ============================================
// TYPES
// ============================================
interface SavedVideosViewProps {
  section?: string
}

// ============================================
// COMPONENT
// ============================================
const SavedVideosView = ({ section }: SavedVideosViewProps) => {
  // ✅ RTK Query API call (following VNG004's pattern)
  const { data: apiSaved, error: errorSaved } = useGetSavedVideosQuery()
  
  // ✅ Mock data fallback (for testing phase)
  const mockSaved = useMemo(() => generateSavedVideos(), [])
  
  // ✅ Local storage fallback (existing logic)
  const [localSaved, setLocalSaved] = useState<VideoCardItemProps[]>([])
  
  useEffect(() => {
    const stored = readSavedVideos()
    if (stored.length) {
      setLocalSaved(stored)
    }
  }, [])
  
  // ✅ Determine data source (priority: API > LocalStorage > Mock)
  const USE_MOCK = !apiSaved || errorSaved
  
  // ✅ Transform API data (when backend ready)
  const transformApiToCard = (videos: typeof apiSaved): VideoCardItemProps[] => {
    if (!videos) return []
    return videos.map(v => ({
      id: parseInt(v.id) || 0,
      title: v.title,
      location: v.location || "",
      thumbnail: v.thumbnailUrl || v.videoUrl,
      badge: "Da luu",
      views: `${Math.floor(v.views / 1000)}k`,
      duration: `00:${v.duration.toString().padStart(2, "0")}`,
    }))
  }
  
  // ✅ Select data to display
  const savedVideos: VideoCardItemProps[] = USE_MOCK
    ? (localSaved.length > 0 ? localSaved : mockSaved)
    : transformApiToCard(apiSaved)
  
  // 🔍 Debug logging
  console.log("💾 SavedVideosView - Using:", 
    USE_MOCK ? (localSaved.length > 0 ? "📂 LocalStorage" : "📦 Mock") : "🌐 API"
  )

  return (
    <div className="video-section">
      <div className="video-section-scroll">
        <VideoHistoryGrid
          videos={savedVideos}
          className="video-history-grid--saved"
        />
      </div>
    </div>
  )
}

export default memo(SavedVideosView)
