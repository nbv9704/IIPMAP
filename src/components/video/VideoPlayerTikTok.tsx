// ============================================
// IMPORTS & TYPES
// ============================================
"use client"

import { useRef, useState, useEffect } from "react"

interface VideoPlayerTikTokProps {
  videoUrl: string
  poster?: string
  title?: string
}

// ============================================
// COMPONENT: VideoPlayerTikTok - Custom TikTok Style
// ============================================
function VideoPlayerTikTok({ videoUrl, poster, title }: VideoPlayerTikTokProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(1)
  const [showVolumeSlider, setShowVolumeSlider] = useState(false)
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null)
  const volumeSliderRef = useRef<HTMLDivElement>(null)
  const [isDraggingVolume, setIsDraggingVolume] = useState(false)
  const [showTransitionIcon, setShowTransitionIcon] = useState(false)

  // Toggle play/pause
  const togglePlay = () => {
    if (videoRef.current) {
      // Show transition icon
      setShowTransitionIcon(true)
      
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
      
      // Hide icon after animation (longer duration)
      setTimeout(() => {
        setShowTransitionIcon(false)
      }, 800)
    }
  }

  // Toggle mute
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  // Custom volume slider handlers
  const handleVolumeSliderClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!volumeSliderRef.current) return
    const rect = volumeSliderRef.current.getBoundingClientRect()
    const clickY = e.clientY - rect.top
    const percentage = 1 - (clickY / rect.height) // Inverted because top = 100%
    const newVolume = Math.max(0, Math.min(1, percentage))
    
    setVolume(newVolume)
    if (videoRef.current) {
      videoRef.current.volume = newVolume
      if (newVolume === 0) {
        setIsMuted(true)
        videoRef.current.muted = true
      } else if (isMuted) {
        setIsMuted(false)
        videoRef.current.muted = false
      }
    }
  }

  const handleVolumeSliderMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDraggingVolume(true)
    handleVolumeSliderClick(e)
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingVolume || !volumeSliderRef.current) return
      
      const rect = volumeSliderRef.current.getBoundingClientRect()
      const clickY = e.clientY - rect.top
      const percentage = 1 - (clickY / rect.height)
      const newVolume = Math.max(0, Math.min(1, percentage))
      
      setVolume(newVolume)
      if (videoRef.current) {
        videoRef.current.volume = newVolume
        if (newVolume === 0) {
          setIsMuted(true)
          videoRef.current.muted = true
        } else if (isMuted) {
          setIsMuted(false)
          videoRef.current.muted = false
        }
      }
    }

    const handleMouseUp = () => {
      setIsDraggingVolume(false)
    }

    if (isDraggingVolume) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDraggingVolume, isMuted])

  // Context menu
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    setContextMenu({ x: e.clientX, y: e.clientY })
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setContextMenu(null)
    alert('Link copied!')
  }

  // Close context menu
  useEffect(() => {
    const handleClick = () => setContextMenu(null)
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  // Update progress
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime
      const total = videoRef.current.duration
      setCurrentTime(current)
      setProgress((current / total) * 100)
    }
  }

  // Set duration when loaded
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      const dur = videoRef.current.duration
      if (!isNaN(dur) && isFinite(dur)) {
        setDuration(dur)
      }
    }
  }

  // Also try to get duration on canplay
  const handleCanPlay = () => {
    if (videoRef.current && duration === 0) {
      const dur = videoRef.current.duration
      if (!isNaN(dur) && isFinite(dur)) {
        setDuration(dur)
      }
    }
  }

  // Seek video
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      const percentage = clickX / rect.width
      const newTime = percentage * videoRef.current.duration
      videoRef.current.currentTime = newTime
    }
  }

  // Format time (mm:ss)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Auto-play on mount
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().then(() => {
        setIsPlaying(true)
      }).catch(() => {
        // Auto-play blocked
        setIsPlaying(false)
      })
    }
  }, [])

  return (
    <div className="tiktok-video-player" onContextMenu={handleContextMenu}>
      <video
        ref={videoRef}
        className="tiktok-video"
        poster={poster || videoUrl}
        title={title}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onCanPlay={handleCanPlay}
        onEnded={() => setIsPlaying(false)}
        loop
        playsInline
      >
        <source src={videoUrl} type="video/mp4" />
      </video>

      {/* Context Menu */}
      {contextMenu && (
        <div 
          className="video-context-menu"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <button onClick={handleCopyLink}>📋 Copy Link</button>
        </div>
      )}

      {/* Tap to play/pause overlay */}
      <div className="tiktok-video-overlay" onClick={togglePlay}>
        {/* Transition icon - show OLD state then fade out */}
        {showTransitionIcon && (
          <div className="transition-icon">
            {!isPlaying ? (
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                <circle cx="32" cy="32" r="32" fill="rgba(255, 255, 255, 0.9)" />
                <path d="M26 20L44 32L26 44V20Z" fill="#000" />
              </svg>
            ) : (
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                <circle cx="32" cy="32" r="32" fill="rgba(255, 255, 255, 0.9)" />
                <rect x="24" y="20" width="6" height="24" rx="2" fill="#000" />
                <rect x="34" y="20" width="6" height="24" rx="2" fill="#000" />
              </svg>
            )}
          </div>
        )}
      </div>

      {/* Bottom controls */}
      <div className="tiktok-video-controls">
        {/* Progress bar */}
        <div className="progress-bar-container" onClick={handleProgressClick}>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Play/Pause + Time + Mute */}
        <div className="controls-bottom">
          <div className="controls-left">
            <button className="play-pause-btn" onClick={togglePlay} type="button">
              {isPlaying ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
            
            <span className="time-display">
              {formatTime(currentTime)} / {formatTime(duration || 0)}
            </span>
          </div>
          
          <div 
            className="volume-control"
            onMouseEnter={() => setShowVolumeSlider(true)}
            onMouseLeave={() => setShowVolumeSlider(false)}
          >
            <button className="mute-btn" onClick={toggleMute} type="button">
              {isMuted || volume === 0 ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                </svg>
              )}
            </button>
            
            {showVolumeSlider && (
              <div 
                ref={volumeSliderRef}
                className="volume-slider-container"
                onMouseDown={handleVolumeSliderMouseDown}
              >
                <div className="volume-slider-track">
                  <div 
                    className="volume-slider-fill" 
                    style={{ height: `${volume * 100}%` }}
                  />
                  <div 
                    className="volume-slider-thumb" 
                    style={{ bottom: `${volume * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoPlayerTikTok
