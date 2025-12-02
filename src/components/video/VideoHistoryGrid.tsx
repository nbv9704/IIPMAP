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
}

// ============================================
// COMPONENT: VideoHistoryGrid
// ============================================
const VideoHistoryGrid = ({ videos, className = "" }: VideoHistoryGridProps) => {
   // ========== Computed Values ==========
   const containerClass = ["video-history-grid", className].filter(Boolean).join(" ")

   // ========== Render ==========
   return (
      <div className={containerClass}>
         {videos.map((video) => (
            <VideoCardItem key={video.id} {...video} />
         ))}
      </div>
   )
}

export default VideoHistoryGrid
