// ============================================
// IMPORTS & TYPES
// ============================================
"use client"

interface VideoPlayerProps {
  videoUrl: string
  poster?: string
  title?: string
}

// ============================================
// COMPONENT: VideoPlayer
// ============================================
function VideoPlayer({ videoUrl, poster, title }: VideoPlayerProps) {
  // ========== Render ==========
  return (
    <div className="video-single-player-area">
      <video
        className="video-single-player"
        controls
        poster={poster || videoUrl}
        title={title}
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}

export default VideoPlayer
