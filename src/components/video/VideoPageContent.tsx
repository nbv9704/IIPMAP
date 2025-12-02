"use client"

// ============================================
// IMPORTS
// ============================================
import { useEffect } from "react"
import Wrapper from "@/layouts/Wrapper"
import VideoSidebar from "@/components/video/VideoSidebar"
import ExploreSearchBar from "@/components/video/ExploreSearchBar"
import ExploreView from "@/components/video/views/ExploreView"
import SavedVideosView from "@/components/video/views/SavedVideosView"
import FollowingView from "@/components/video/views/FollowingView"
import NotificationsView from "@/components/video/views/NotificationsView"
import ProfileView from "@/components/video/views/ProfileView"
import MessagesView from "@/components/video/views/MessagesView"
import { useLanguage } from "@/hooks/useLanguage"
import { getTranslation } from "@/utils/translations"
import "@/styles/video.scss"

// ============================================
// TYPES
// ============================================
interface VideoPageContentProps {
  section?: string
  userId?: string
}

const DEFAULT_SECTION = "explore"

// ============================================
// COMPONENT
// ============================================
const VideoPageContent = ({ section = DEFAULT_SECTION, userId }: VideoPageContentProps) => {
  const { currentLang } = useLanguage()

  useEffect(() => {
    document.title = `${getTranslation(currentLang, "pageTitle.video")} - ${getTranslation(
      currentLang,
      "pageTitle.siteName"
    )}`
  }, [currentLang])

  const renderView = () => {
    switch (section) {
      case "saved":
        return <SavedVideosView section={section} />
      case "profile":
        return <ProfileView section={section} isOwnProfile={true} />
      case "notifications":
        return <NotificationsView />
      case "messages":
        return <MessagesView />
      case "following":
        return <FollowingView section={section} />
      case "explore":
      default:
        return <ExploreView section={section} />
    }
  }

  return (
    <Wrapper>
      <section className="video-page">
        <div className="video-page-container">
          <div className="video-sidebar-wrapper">
            <VideoSidebar activeSlug={section} />
          </div>

          <div className="video-main-column">
            {section === "explore" && <ExploreSearchBar />}
            {renderView()}
          </div>
        </div>
      </section>
    </Wrapper>
  )
}

export default VideoPageContent
