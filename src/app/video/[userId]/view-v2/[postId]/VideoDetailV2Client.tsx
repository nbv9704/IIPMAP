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
                      <button className="follow-btn-v2-tiktok" type="button">
                        Theo dõi
                      </button>
                    </div>
                  </div>
                  <div className="video-caption-v2">
                    <p className="caption-text-v2">
                      Khu công nghiệp Tiên Sơn - Bắc Ninh với diện tích 402.82 ha
                      <br />
                      <span style={{ color: '#4fb3ff' }}>#kcn #bacninh #investment #realestate</span>
                    </p>
                  </div>
                </div>

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

