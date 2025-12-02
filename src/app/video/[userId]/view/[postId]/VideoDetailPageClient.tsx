// ============================================
// IMPORTS
// ============================================
"use client"

import Wrapper from "@/layouts/Wrapper"
import VideoSidebar from "@/components/video/VideoSidebar"
import VideoActions from "@/components/video/VideoActions"
import VideoLeftActions from "@/components/video/VideoLeftActions"
import VideoPlayer from "@/components/video/VideoPlayer"
import { addSavedVideo, removeSavedVideo } from "@/utils/videoStorage"
import "@/styles/video.scss"

// ============================================
// TYPES
// ============================================
interface VideoDetailPageClientProps {
  userId: string
  postId: string
}

// ============================================
// HELPER FUNCTIONS
// ============================================
const createVideoData = (postId: string) => ({
  postId,
  likes: 18000,
  comments: 18000,
  shares: 120,
  bookmarked: false,
})

// ============================================
// COMPONENT: VideoDetailPageClient
// ============================================
export default function VideoDetailPageClient({ userId, postId }: VideoDetailPageClientProps) {
  // ========== Params & Data ==========
  const videoData = createVideoData(postId)

  // ========== Handlers ==========
  const handleBookmarkChange = (next: boolean) => {
    if (next) {
      addSavedVideo({
        id: parseInt(postId.slice(0, 10)),
        title: "Khu c�ng nghi?p Ti�n Son - B?c Ninh",
        location: "Phu?ng D?ng Nguy�n, B?c Ninh",
        thumbnail: "/assets/video/khucongnghiepthainguyen.mp4",
        badge: "Da luu",
        views: "18k",
        duration: "00:47",
      })
    } else {
      removeSavedVideo(parseInt(postId.slice(0, 10)))
    }
  }

  const handlePrev = () => {
    console.log("Previous video")
  }

  const handleNext = () => {
    console.log("Next video")
  }

  const handleEmail = () => {
    console.log("Email clicked")
  }

  const handleChat = () => {
    console.log("Chat clicked")
  }

  const handleCall = () => {
    console.log("Call clicked")
  }

  const handleSchedule = () => {
    console.log("Schedule clicked")
  }

  const handleViewProfile = () => {
    console.log("View profile clicked")
  }

  // ========== Render ==========
  return (
    <Wrapper>
      <section className="video-page">
        <div className="video-page-container">
          {/* Sidebar b�n tr�i - gi?ng explore */}
          <div className="video-sidebar-wrapper">
            <VideoSidebar activeSlug="video-detail" />
          </div>

          {/* C?t ch�nh b�n ph?i */}
          <div className="video-main-column">
            {/* Khung overall ch?a video section v� info section */}
            <div className="video-section video-detail-section">
              {/* Khung den ch?a video + actions + nav buttons */}
              <div className="video-player-area">
                {/* N�t chuy?n video b�n tr�i */}
                <button
                  className="video-nav-btn video-nav-prev"
                  onClick={handlePrev}
                  type="button"
                  aria-label="Video tru?c"
                >
                  <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
                    <path
                      d="M14 6L4 6M4 6L9 1M4 6L9 11"
                      stroke="#FFFFFF"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {/* Video Player */}
                <VideoPlayer
                  videoUrl="/assets/video/khucongnghiepthainguyen.mp4"
                  poster="/assets/video/khucongnghiepthainguyen.mp4"
                  title="Khu c�ng nghi?p Ti�n Son - B?c Ninh"
                />

                {/* Actions b�n ph?i video (like, comment, bookmark, share) */}
                <VideoActions
                  video={{ ...videoData }}
                  onPrev={handlePrev}
                  onNext={handleNext}
                  onBookmarkChange={handleBookmarkChange}
                />

                {/* Actions b�n tr�i video (avatar + email, chat, call, schedule) */}
                <VideoLeftActions
                  onEmail={handleEmail}
                  onChat={handleChat}
                  onCall={handleCall}
                  onSchedule={handleSchedule}
                  onViewProfile={handleViewProfile}
                  username="KCN Ti�n Son - B?c Ninh"
                  userId={`@${userId}`}
                  location="Phu?ng D?ng Nguy�n, xa D?i D?ng, phu?ng Tam Son, t?nh B?c Ninh"
                />

                {/* N�t chuy?n video b�n ph?i */}
                <button
                  className="video-nav-btn video-nav-next"
                  onClick={handleNext}
                  type="button"
                  aria-label="Video ti?p theo"
                >
                  <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
                    <path
                      d="M4 6L14 6M14 6L9 1M14 6L9 11"
                      stroke="#FFFFFF"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Wrapper>
  )
}
