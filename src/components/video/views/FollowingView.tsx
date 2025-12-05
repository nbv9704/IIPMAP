"use client"

// ============================================
// IMPORTS
// ============================================
import { useMemo, memo } from "react"
import VideoHistoryGrid from "@/components/video/VideoHistoryGrid"
import { generateFollowingUsers } from "@/constants/video/mockData"
import { useLanguage } from "@/hooks/useLanguage"
import { getTranslation } from "@/utils/translations"
import { useGetFollowingUsersQuery } from "@/redux/slice/videoApiSlice"
import { VideoCardItemProps } from "@/components/video/VideoCardItem"

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
  
  // ✅ RTK Query API call (following VNG004's pattern)
  const { data: apiFollowing, error: errorFollowing } = useGetFollowingUsersQuery()
  
  // ✅ Mock data fallback (for testing phase)
  const mockFollowing = useMemo(() => generateFollowingUsers(), [])
  
  // ✅ Determine data source
  const USE_MOCK = !apiFollowing || errorFollowing
  
  // ✅ Transform API data (when backend ready)
  const transformApiToFollowing = (users: typeof apiFollowing) => {
    if (!users) return []
    return users.map(user => ({
      id: parseInt(user.id) || 0,
      username: user.username,
      displayName: user.displayName,
      avatar: user.avatar || user.displayName.charAt(0).toUpperCase(),
      videos: [] as VideoCardItemProps[], // Will be populated from separate API call
    }))
  }
  
  // ✅ Select data to display
  const followingUsers = USE_MOCK ? mockFollowing : transformApiToFollowing(apiFollowing)
  
  // 🔍 Debug logging
  console.log("👥 FollowingView - Using:", USE_MOCK ? "📦 Mock" : "🌐 API")

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
