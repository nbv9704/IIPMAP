// ============================================
// IMPORTS
// ============================================
"use client"

import { useParams } from "next/navigation"
import Wrapper from "@/layouts/Wrapper"
import VideoSidebar from "@/components/video/VideoSidebar"
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
                {/* Top-right action buttons */}
                <div className="video-top-actions-v2">
                  <button className="top-action-btn-v2 email-btn-v2" type="button" title="Email">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M2 5L10 11L18 5M2 5V15C2 15.5523 2.44772 16 3 16H17C17.5523 16 18 15.5523 18 15V5M2 5C2 4.44772 2.44772 4 3 4H17C17.5523 4 18 4.44772 18 5Z" stroke="white" strokeWidth="1.5"/>
                    </svg>
                    <span>Email</span>
                  </button>
                  <button className="top-action-btn-v2 schedule-btn-v2" type="button" title="Đặt lịch khảo sát">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <rect x="3" y="4" width="14" height="13" rx="2" stroke="white" strokeWidth="1.5"/>
                      <path d="M3 8H17M7 2V4M13 2V4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    <span>Đặt lịch khảo sát</span>
                  </button>
                  <button className="top-action-btn-v2 chat-btn-v2" type="button" title="Chat">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="7" stroke="white" strokeWidth="1.5"/>
                      <circle cx="7" cy="10" r="1" fill="white"/>
                      <circle cx="10" cy="10" r="1" fill="white"/>
                      <circle cx="13" cy="10" r="1" fill="white"/>
                    </svg>
                    <span>Chat</span>
                  </button>
                  <button className="top-action-btn-v2 call-btn-v2" type="button" title="Call">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M3 4C3 3.44772 3.44772 3 4 3H6.5C6.77614 3 7 3.22386 7 3.5V7.5C7 7.77614 6.77614 8 6.5 8H4C3.44772 8 3 7.55228 3 7V4ZM17 16C17 16.5523 16.5523 17 16 17H13.5C13.2239 17 13 16.7761 13 16.5V12.5C13 12.2239 13.2239 12 13.5 12H16C16.5523 12 17 12.4477 17 13V16Z" stroke="white" strokeWidth="1.5"/>
                      <path d="M7 5C7 5 9 3 13 5M13 15C13 15 11 17 7 15" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    <span>Call</span>
                  </button>
                </div>

                {/* Navigation Up/Down buttons */}
                <button
                  className="video-nav-btn-v2 video-nav-up-v2"
                  onClick={handlePrev}
                  type="button"
                  aria-label="Video trước"
                >
                  <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
                    <path d="M8 1L14 7M8 1L2 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                {/* Video Player */}
                <VideoPlayer 
                  videoUrl="/assets/video/khucongnghiepthainguyen.mp4"
                  poster="/assets/video/khucongnghiepthainguyen.mp4"
                  title="Khu công nghiệp Tiên Sơn - Bắc Ninh"
                />

                {/* Actions bên phải video (like, comment, bookmark, share) - TikTok Style */}
                <div className="video-actions-right-v2">
                  <button
                    className={`action-btn-right-v2 like-btn-v2-tiktok ${videoData.bookmarked ? 'active' : ''}`}
                    type="button"
                    title="Thích"
                  >
                    <div className="action-icon-v2">
                      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <path
                          d="M24.6 5.6C22.7 3.8 19.9 3.8 18 5.6L14 9.6L10 5.6C8.1 3.8 5.3 3.8 3.4 5.6C1.1 7.9 1.1 11.7 3.4 14L14 24.6L24.6 14C26.9 11.7 26.9 7.9 24.6 5.6Z"
                        />
                      </svg>
                    </div>
                    <span className="action-count-v2">{(videoData.likes / 1000).toFixed(1)}k</span>
                  </button>

                  <button
                    className="action-btn-right-v2 comment-btn-v2-tiktok"
                    type="button"
                    title="Bình luận"
                  >
                    <div className="action-icon-v2">
                      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <path
                          d="M24 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H8L14 26L20 20H24C25.1 20 26 19.1 26 18V6C26 4.9 25.1 4 24 4Z"
                        />
                      </svg>
                    </div>
                    <span className="action-count-v2">{(videoData.comments / 1000).toFixed(1)}k</span>
                  </button>

                  <button
                    className={`action-btn-right-v2 bookmark-btn-v2-tiktok ${videoData.bookmarked ? 'active' : ''}`}
                    onClick={() => handleBookmarkChange(!videoData.bookmarked)}
                    type="button"
                    title="Lưu"
                  >
                    <div className="action-icon-v2">
                      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <path
                          d="M6 3C6 2.44772 6.44772 2 7 2H21C21.5523 2 22 2.44772 22 3V26L14 20L6 26V3Z"
                        />
                      </svg>
                    </div>
                  </button>

                  <button
                    className="action-btn-right-v2 share-btn-v2-tiktok"
                    type="button"
                    title="Chia sẻ"
                  >
                    <div className="action-icon-v2">
                      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <path
                          d="M17 4L24 11L17 18V14C12 14 8 15.5 5 20C6 15 9 10 17 9V4Z"
                        />
                      </svg>
                    </div>
                  </button>
                </div>

                {/* Video Info Overlay - Bottom Left (TikTok Style) */}
                <div className="video-info-overlay-v2">
                  <div className="video-author-info-v2">
                    <div className="author-avatar-v2-tiktok">
                      <div style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #0051cb 0%, #810cc4 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '20px',
                        fontWeight: 700,
                        color: '#fff'
                      }}>
                        V
                      </div>
                    </div>
                    <div className="author-details-v2">
                      <h3 className="author-name-v2-tiktok">KCN Tiên Sơn - Bắc Ninh</h3>
                    </div>
                  </div>
                  <div className="video-caption-v2">
                    <p className="caption-text-v2">
                      Khu công nghiệp Tiên Sơn - Bắc Ninh với diện tích 402.82 ha
                      <br />
                      <span style={{ color: '#4fb3ff' }}>#kcn #bacninh #investment #realestate</span>
                    </p>
                    <button className="view-post-btn-v2" type="button">
                      Xem bài viết
                    </button>
                  </div>
                </div>

                {/* Navigation Down button */}
                <button
                  className="video-nav-btn-v2 video-nav-down-v2"
                  onClick={handleNext}
                  type="button"
                  aria-label="Video tiếp theo"
                >
                  <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
                    <path d="M8 9L2 3M8 9L14 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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

