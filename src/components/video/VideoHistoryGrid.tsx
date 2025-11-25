"use client"
import VideoCardItem, { VideoCardItemProps } from "./VideoCardItem"

interface VideoHistoryGridProps {
   videos: VideoCardItemProps[]
   className?: string
   sectionSlug?: string
}

const VideoHistoryGrid = ({ videos, className = "", sectionSlug = "kham-pha" }: VideoHistoryGridProps) => {
   const containerClass = ["video-history-grid", className].filter(Boolean).join(" ")

   return (
      <div className={containerClass}>
         {videos.map((video) => (
            <VideoCardItem key={video.id} {...video} sectionSlug={sectionSlug} />
         ))}
      </div>
   )
}

export default VideoHistoryGrid
