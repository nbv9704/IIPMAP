// ============================================
// IMPORTS
// ============================================
"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Wrapper from "@/layouts/Wrapper"
import VideoSidebar from "@/components/video/VideoSidebar"
import VideoPlayerTikTok from "@/components/video/VideoPlayerTikTok"
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
  // STATE
  // ============================================
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [likesCount, setLikesCount] = useState(18000)
  const [isFollowing, setIsFollowing] = useState(false)
  const [showProfileCard, setShowProfileCard] = useState(false)
  const [showCommentSidebar, setShowCommentSidebar] = useState(false)
  const [activeTab, setActiveTab] = useState<'comment' | 'chat'>('comment')
  const [isFollowAnimating, setIsFollowAnimating] = useState(false)

  // ============================================
  // HANDLERS
  // ============================================
  const handleLike = () => {
    setLiked((prev) => !prev)
    setLikesCount((prev) => (liked ? prev - 1 : prev + 1))
  }

  const handleBookmark = () => {
    const next = !bookmarked
    setBookmarked(next)
    
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

  const handleFollowToggle = () => {
    if (isFollowAnimating) return // Prevent click during animation
    
    setIsFollowAnimating(true)
    
    // Wait for animation to complete before changing state
    setTimeout(() => {
      setIsFollowing(!isFollowing)
      setIsFollowAnimating(false)
    }, 400) // Match animation duration
  }

  const toggleCommentSidebar = () => {
    setShowCommentSidebar(!showCommentSidebar)
  }

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const sidebar = document.querySelector('.comment-chat-sidebar-v2')
      if (showCommentSidebar && sidebar && !sidebar.contains(e.target as Node)) {
        setShowCommentSidebar(false)
      }
    }

    if (showCommentSidebar) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showCommentSidebar])

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
            {/* Video container - KHÔNG có background đen */}
            <div className="video-player-container-v2">
              {/* Top-right action buttons - Absolute position */}
              <div className="video-top-actions-v2">
                <button className="top-action-btn-v2 email-btn-v2" type="button" title="Email">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                  <span>Email</span>
                </button>
                <button className="top-action-btn-v2 schedule-btn-v2" type="button" title="Đặt lịch khảo sát">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
                    <line x1="16" x2="16" y1="2" y2="6"/>
                    <line x1="8" x2="8" y1="2" y2="6"/>
                    <line x1="3" x2="21" y1="10" y2="10"/>
                  </svg>
                  <span>Đặt lịch khảo sát</span>
                </button>
                <button 
                  className="top-action-btn-v2 chat-btn-v2" 
                  onClick={() => {
                    setShowCommentSidebar(true)
                    setActiveTab('chat')
                  }}
                  type="button" 
                  title="Chat"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                  <span>Chat</span>
                </button>
                <button className="top-action-btn-v2 call-btn-v2" type="button" title="Call">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  <span>Call</span>
                </button>
              </div>

                {/* Video Player - TikTok Style */}
                <div className="video-player-wrapper-v2">
                  <VideoPlayerTikTok 
                    videoUrl="/assets/video/khucongnghiepthainguyen.mp4"
                    poster="/assets/video/khucongnghiepthainguyen.mp4"
                    title="Khu công nghiệp Tiên Sơn - Bắc Ninh"
                  />
                  
                  {/* Icon lượt xem - Góc dưới trái video */}
                  <div className="video-views-badge-v2">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8 3C4.5 3 1.73 5.11 1 8C1.73 10.89 4.5 13 8 13C11.5 13 14.27 10.89 15 8C14.27 5.11 11.5 3 8 3Z" stroke="white" strokeWidth="1.5"/>
                      <circle cx="8" cy="8" r="2" stroke="white" strokeWidth="1.5"/>
                    </svg>
                    <span>119</span>
                  </div>
                </div>

                {/* Actions bên phải video */}
                <div className="video-actions-right-v2">
                  {/* Avatar with hover card */}
                  <div 
                    className="action-avatar-wrapper-v2"
                    onMouseEnter={() => setShowProfileCard(true)}
                    onMouseLeave={() => setShowProfileCard(false)}
                  >
                    <div className="action-avatar-v2">
                      <div style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        background: '#E74C3C',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '16px',
                        fontWeight: 700,
                        color: '#fff'
                      }}>
                        V
                      </div>
                      
                      {/* Follow button on avatar */}
                      <button 
                        className={`avatar-follow-btn-v2 ${isFollowing ? 'following' : ''} ${isFollowAnimating ? 'animating' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleFollowToggle()
                        }}
                        onMouseEnter={(e) => e.stopPropagation()}
                        type="button"
                        disabled={isFollowAnimating}
                      >
                        {isFollowing ? '✓' : '+'}
                      </button>
                    </div>

                    {/* Profile hover card */}
                    {showProfileCard && (
                      <div className="profile-hover-card-v2">
                        <div className="profile-card-header-v2">
                          <div className="profile-card-avatar-v2">V</div>
                          <div className="profile-card-info-v2">
                            <h4>Vendor Name</h4>
                            <p>@vendorname</p>
                          </div>
                        </div>
                        <div className="profile-card-stats-v2">
                          <div className="stat-item-v2">
                            <strong>1.2M</strong>
                            <span>Followers</span>
                          </div>
                          <div className="stat-item-v2">
                            <strong>245</strong>
                            <span>Following</span>
                          </div>
                          <div className="stat-item-v2">
                            <strong>18.5M</strong>
                            <span>Likes</span>
                          </div>
                        </div>
                        <p className="profile-card-bio-v2">
                          Industrial parks and real estate solutions 🏭
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Like - Filled với conditional color + stroke */}
                  <button
                    className={`action-btn-right-v2 like-btn-v2-tiktok ${liked ? 'active' : ''}`}
                    onClick={handleLike}
                    type="button"
                    title="Thích"
                  >
                    <div className="action-icon-v2">
                      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                        <path
                          d="M13 23.5L11.5 22.15C6.5 17.6 3 14.4 3 10.5C3 7.3 5.3 5 8.5 5C10.24 5 11.91 5.81 13 7.09C14.09 5.81 15.76 5 17.5 5C20.7 5 23 7.3 23 10.5C23 14.4 19.5 17.6 14.5 22.15L13 23.5Z"
                          fill={liked ? "#FE2C55" : "#141414"}
                          stroke={liked ? "#FE2C55" : "#141414"}
                          strokeWidth="1.5"
                        />
                      </svg>
                    </div>
                    <span className="action-count-v2">{likesCount.toLocaleString()}</span>
                  </button>

                  {/* Chat - Bubble tròn với 2 gạch trắng */}
                  <button
                    className="action-btn-right-v2 chat-btn-v2-tiktok"
                    onClick={toggleCommentSidebar}
                    type="button"
                    title="Chat"
                  >
                    <div className="action-icon-v2">
                      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                        <path
                          d="M13 2C6.92 2 2 6.48 2 12C2 13.54 2.43 14.98 3.17 16.22L2 22L7.78 20.83C9.02 21.57 10.46 22 12 22H13C19.08 22 24 17.52 24 12C24 6.48 19.08 2 13 2Z"
                          fill="#141414"
                        />
                        <path d="M8 10H18" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                        <path d="M8 14H14" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <span className="action-count-v2">18k</span>
                  </button>

                  {/* Bookmark - Filled với conditional color + stroke */}
                  <button
                    className={`action-btn-right-v2 bookmark-btn-v2-tiktok ${bookmarked ? 'active' : ''}`}
                    onClick={handleBookmark}
                    type="button"
                    title="Lưu"
                  >
                    <div className="action-icon-v2">
                      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                        <path
                          d="M19 21L13 17L7 21V5C7 4.46957 7.21071 3.96086 7.58579 3.58579C7.96086 3.21071 8.46957 3 9 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z"
                          fill={bookmarked ? "#FFC107" : "#141414"}
                          stroke={bookmarked ? "#FFC107" : "#141414"}
                          strokeWidth="1.5"
                        />
                      </svg>
                    </div>
                  </button>

                  {/* Share - Filled đen */}
                  <button
                    className="action-btn-right-v2 share-btn-v2-tiktok"
                    type="button"
                    title="Chia sẻ"
                  >
                    <div className="action-icon-v2">
                      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                        <path
                          d="M16 3L23 10L16 17V13C11 13 7 14.5 4 19C5 14 8 9 16 8V3Z"
                          fill="#141414"
                        />
                      </svg>
                    </div>
                  </button>

                  {/* Xem bài viết - Lucide FileText */}
                  <button className="action-btn-right-v2 view-post-btn-v2-action" type="button" title="Xem bài viết">
                    <div className="action-icon-v2">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                        <polyline points="14 2 14 8 20 8"/>
                        <line x1="16" x2="8" y1="13" y2="13"/>
                        <line x1="16" x2="8" y1="17" y2="17"/>
                        <line x1="10" x2="8" y1="9" y2="9"/>
                      </svg>
                    </div>
                  </button>
                </div>

                {/* Navigation Up/Down buttons - Mép phải */}
                <button
                  className="video-nav-btn-v2 video-nav-up-v2"
                  onClick={handlePrev}
                  type="button"
                  aria-label="Video trước"
                >
                  <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
                    <path d="M8 1L14 7M8 1L2 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                <button
                  className="video-nav-btn-v2 video-nav-down-v2"
                  onClick={handleNext}
                  type="button"
                  aria-label="Video tiếp theo"
                >
                  <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
                    <path d="M8 9L2 3M8 9L14 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>

          </div>
        </div>

        {/* Comment/Chat Sidebar */}
        <div className={`comment-chat-sidebar-v2 ${showCommentSidebar ? 'open' : ''}`}>
          {/* Header with tabs */}
          <div className="sidebar-header-v2">
            <button 
              className={`tab-btn-v2 ${activeTab === 'comment' ? 'active' : ''}`}
              onClick={() => setActiveTab('comment')}
            >
              Comment (45k)
            </button>
            <button 
              className={`tab-btn-v2 ${activeTab === 'chat' ? 'active' : ''}`}
              onClick={() => setActiveTab('chat')}
            >
              Chat
            </button>
            <button className="close-sidebar-btn-v2" onClick={toggleCommentSidebar}>
              ✕
            </button>
          </div>

          {/* Content */}
          <div className="sidebar-content-v2">
            {activeTab === 'comment' ? (
              <div className="comments-list-v2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="comment-item-v2">
                    <div className="comment-avatar-v2">U</div>
                    <div className="comment-body-v2">
                      <div className="comment-header-v2">
                        <strong>User{i}</strong>
                        <span className="comment-date-v2">11/10/2025</span>
                      </div>
                      <p className="comment-text-v2">Perfect for watching</p>
                      <button className="comment-reply-btn-v2">Reply</button>
                    </div>
                    <div className="comment-actions-v2">
                      <button>⋯</button>
                      <button>♡<span>2</span></button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="chat-view-v2">
                <p style={{ textAlign: 'center', padding: '20px', color: '#999' }}>
                  Chat feature coming soon...
                </p>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="sidebar-input-v2">
            <button className="attach-btn-v2" title="Attach file">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
              </svg>
            </button>
            <input type="text" placeholder={activeTab === 'comment' ? 'Add a comment...' : 'Type a message...'} />
            <button className="emoji-btn-v2" title="Add emoji">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                <line x1="9" y1="9" x2="9.01" y2="9"/>
                <line x1="15" y1="9" x2="15.01" y2="9"/>
              </svg>
            </button>
            <button className="send-btn-v2" title="Send">➤</button>
          </div>
        </div>


      </section>
    </Wrapper>
  )
}

