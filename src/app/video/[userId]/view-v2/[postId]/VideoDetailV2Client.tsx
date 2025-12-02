// ============================================
// IMPORTS
// ============================================
"use client"

import { useParams } from "next/navigation"
import Wrapper from "@/layouts/Wrapper"
import VideoSidebar from "@/components/video/VideoSidebar"
import VideoActions from "@/components/video/VideoActions"
import VideoLeftActions from "@/components/video/VideoLeftActions"
import VideoPlayer from "@/components/video/VideoPlayer"
import { addSavedVideo, removeSavedVideo } from "@/utils/videoStorage"
import "@/styles/video.scss"

// ============================================
// COMPONENT: VideoDetailV2Client
// ============================================
export default function VideoDetailV2Client() {
  // ============================================
  // GET PARAMS
  // ============================================
  const params = useParams()
  const userId = params.userId as string
  const postId = params.postId as string

  // ============================================
  // DATA
  // ============================================
  const videoData = {
    postId,
    likes: 18000,
    comments: 18000,
    shares: 120,
    bookmarked: false,
  }

  // ============================================
  // HANDLERS
  // ============================================
  const handleBookmarkChange = (next: boolean) => {
    if (next) {
      addSavedVideo({
        id: parseInt(postId.slice(0, 10)),
        title: "Khu công nghiệp Tiên Sơn - Bắc Ninh",
        location: "Phường Đồng Nguyên, Bắc Ninh",
        thumbnail: "/assets/video/khucongnghiepthainguyen.mp4",
        badge: "Đã lưu",
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

  // ============================================
  // RENDER
  // ============================================
  return (
    <Wrapper>
      <section className="video-page">
        <div className="video-page-container">
          {/* Sidebar bên trái - giống explore */}
          <div className="video-sidebar-wrapper">
            <VideoSidebar activeSlug="video-detail" />
          </div>

          {/* Cột chính bên phải */}
          <div className="video-main-column">
            {/* Khung overall chứa video section và info section */}
            <div className="video-section video-detail-section">
              {/* Khung đen chứa video + actions + nav buttons */}
              <div className="video-player-area">
                {/* Nút chuyển video bên trái */}
                <button
                  className="video-nav-btn video-nav-prev"
                  onClick={handlePrev}
                  type="button"
                  aria-label="Video trước"
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
                  title="Khu công nghiệp Tiên Sơn - Bắc Ninh"
                />

                {/* Actions bên phải video (like, comment, bookmark, share) */}
                <VideoActions
                  video={{ ...videoData }}
                  onPrev={handlePrev}
                  onNext={handleNext}
                  onBookmarkChange={handleBookmarkChange}
                />

                {/* Actions bên trái video (avatar + email, chat, call, schedule) */}
                <VideoLeftActions
                  onEmail={handleEmail}
                  onChat={handleChat}
                  onCall={handleCall}
                  onSchedule={handleSchedule}
                  onViewProfile={handleViewProfile}
                  username="KCN Tiên Sơn - Bắc Ninh"
                  userId={`@${userId}`}
                  location="Phường Đồng Nguyên, xã Đại Đồng, phường Tam Sơn, tỉnh Bắc Ninh"
                />

                {/* Nút chuyển video bên phải */}
                <button
                  className="video-nav-btn video-nav-next"
                  onClick={handleNext}
                  type="button"
                  aria-label="Video tiếp theo"
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

