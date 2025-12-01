"use client"

// ============================================
// IMPORTS
// ============================================
import { useState, useEffect } from "react"
import VideoHistoryGrid from "@/components/video/VideoHistoryGrid"
import { VideoCardItemProps } from "@/components/video/VideoCardItem"
import { readSavedVideos } from "@/utils/videoStorage"
import { generateSavedVideos } from "@/constants/video/mockData"

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
  const [savedVideos, setSavedVideos] = useState<VideoCardItemProps[]>([])

  useEffect(() => {
    const stored = readSavedVideos()
    if (stored.length) {
      setSavedVideos(stored)
    } else {
      setSavedVideos(generateSavedVideos())
    }
  }, [])

  return (
    <div className="video-section">
      <div className="video-section-scroll">
        <VideoHistoryGrid
          videos={savedVideos}
          className="video-history-grid--saved"
          sectionSlug={section}
        />
      </div>
    </div>
  )
}

export default SavedVideosView
