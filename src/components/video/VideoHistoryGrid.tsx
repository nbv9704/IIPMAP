// ============================================
// IMPORTS
// ============================================
"use client"
import { memo, useMemo } from "react"
import VideoCardItem, { VideoCardItemProps } from "./VideoCardItem"

// ============================================
// TYPES
// ============================================
interface VideoHistoryGridProps {
   videos: VideoCardItemProps[]
   className?: string
}

// ============================================
// COMPONENT: VideoHistoryGrid
// ============================================
const VideoHistoryGrid = ({ videos, className = "" }: VideoHistoryGridProps) => {
   // ========== Computed Values ==========
   const containerClass = useMemo(
      () => ["video-history-grid", className].filter(Boolean).join(" "),
      [className]
   )

   // ========== Render ==========
   return (
      <div className={containerClass}>
         {videos.map((video) => (
            <VideoCardItem key={video.id} {...video} />
         ))}
      </div>
   )
}

export default memo(VideoHistoryGrid)
