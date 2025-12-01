// ============================================
// IMPORTS
// ============================================
"use client"
import VideoCardItem, { VideoCardItemProps } from "./VideoCardItem"

// ============================================
// TYPES
// ============================================
interface VideoHistoryGridProps {
   videos: VideoCardItemProps[]
   className?: string
   sectionSlug?: string
}

// ============================================
// COMPONENT: VideoHistoryGrid
// ============================================
const VideoHistoryGrid = ({ videos, className = "", sectionSlug = "explore" }: VideoHistoryGridProps) => {
   // ========== Computed Values ==========
   const containerClass = ["video-history-grid", className].filter(Boolean).join(" ")

   // ========== Render ==========
   return (
      <div className={containerClass}>
         {videos.map((video) => (
            <VideoCardItem key={video.id} {...video} sectionSlug={sectionSlug} />
         ))}
      </div>
   )
}

export default VideoHistoryGrid
