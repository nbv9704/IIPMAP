"use client"

// ============================================
// IMPORTS
// ============================================
import { useMemo, memo } from "react"
import VideoHistoryGrid from "@/components/video/VideoHistoryGrid"
import { generateFollowingUsers } from "@/constants/video/mockData"
import { useLanguage } from "@/hooks/useLanguage"
import { getTranslation } from "@/utils/translations"

// ============================================
// TYPES
// ============================================
interface FollowingViewProps {
  section?: string
}

// ============================================
// COMPONENT
// ============================================
const FollowingView = ({ section }: FollowingViewProps) => {
  const { currentLang } = useLanguage()
  const followingUsers = useMemo(() => generateFollowingUsers(), [])

  return (
    <>
      {followingUsers.map((user) => (
        <div key={user.id} className="video-section video-section--following">
          <div className="video-section-header">
            <div className="video-section-heading video-section-heading--following">
              <div className="video-following-user-header">
                <div className="video-following-avatar">{user.avatar}</div>
                <div className="video-following-info">
                  <h2>{user.displayName}</h2>
                  <span className="video-following-username">{user.username}</span>
                </div>
              </div>
            </div>
            <button className="video-section-badge">{getTranslation(currentLang, "video.viewAll")} →</button>
          </div>
          <div className="video-following-cards">
            <VideoHistoryGrid
              videos={user.videos}
              className="video-history-grid--following"
            />
          </div>
        </div>
      ))}
    </>
  )
}

export default memo(FollowingView)
