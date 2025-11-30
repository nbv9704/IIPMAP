"use client"

import { useState } from "react"

interface VideoLeftActionsProps {
  onEmail?: () => void
  onChat?: () => void
  onCall?: () => void
  onSchedule?: () => void
  onViewProfile?: () => void
  username?: string
  userId?: string
  location?: string
  postTitle?: string
  postTags?: string[]
}

function VideoLeftActions({
  onEmail,
  onChat,
  onCall,
  onSchedule,
  onViewProfile,
  username = "KCN Tiên Sơn - Bắc Ninh",
  userId = "@kcn_tien_son",
  location = "Phường Đồng Nguyên, Bắc Ninh",
  postTitle = "Khu công nghiệp Tiên Sơn - Bắc Ninh với diện tích 402.82 ha",
  postTags = ["#kcn", "#bacninh", "#investment", "#realestate"],
}: VideoLeftActionsProps) {
  const [showHoverCard, setShowHoverCard] = useState(false)
  const [showFullTitle, setShowFullTitle] = useState(false)

  return (
    <div className="video-left-actions">
      {/* Avatar + Post info ở góc trái trên */}
      <div className="video-post-header">
        <div
          className="video-user-avatar-wrapper"
          onMouseEnter={() => setShowHoverCard(true)}
          onMouseLeave={() => setShowHoverCard(false)}
        >
          <button
            className="video-user-avatar"
            type="button"
            onClick={onViewProfile}
          >
            <div className="avatar-circle">V</div>
          </button>

          {showHoverCard && (
            <div className="video-user-hover-card">
              <button
                className="video-hover-follow-btn"
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  console.log("Follow clicked")
                }}
              >
                Theo dõi
              </button>
              <div className="video-hover-card-content">
                <div className="video-hover-avatar">
                  <div className="avatar-circle">V</div>
                </div>
                <div className="video-hover-user-info">
                  <div className="video-hover-username">{username}</div>
                  <div className="video-hover-userid">{userId}</div>
                </div>
                <div className="video-hover-location">{location}</div>
                <div className="video-hover-stats">
                  <div className="video-hover-stat">
                    <span className="video-hover-stat-number">2.468</span>
                    <span className="video-hover-stat-label">Đang theo dõi</span>
                  </div>
                  <div className="video-hover-stat">
                    <span className="video-hover-stat-number">3.175</span>
                    <span className="video-hover-stat-label">Người theo dõi</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Post title và tags */}
        <div className="video-post-info">
          <button 
            className={`video-post-title ${showFullTitle ? "expanded" : ""}`}
            type="button"
            onClick={() => setShowFullTitle(!showFullTitle)}
            title={postTitle}
          >
            {postTitle}
          </button>
          <div className="video-post-tags">
            {postTags.map((tag, index) => (
              <span key={index} className="video-post-tag">{tag}</span>
            ))}
          </div>
        </div>
      </div>

      {/* 4 button ở góc trái dưới - giống style bên phải */}
      <div className="video-actions-main">
        {/* Email button - full trắng */}
        <button className="action-btn" type="button" onClick={onEmail} title="Email">
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
            <rect x="3" y="7" width="20" height="14" rx="2" fill="#fff" stroke="#fff" strokeWidth="1.3" />
            <path
              d="M3 9L13 15L23 9"
              stroke="#141414"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Chat button - full trắng */}
        <button className="action-btn" type="button" onClick={onChat} title="Chat">
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
            <circle cx="13" cy="13" r="9" fill="#fff" stroke="#fff" strokeWidth="1.3" />
            <circle cx="9" cy="13" r="1.2" fill="#141414" />
            <circle cx="13" cy="13" r="1.2" fill="#141414" />
            <circle cx="17" cy="13" r="1.2" fill="#141414" />
            <path d="M8 20L13 16" stroke="#fff" fill="#fff" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
        </button>

        {/* Call button - full trắng */}
        <button className="action-btn" type="button" onClick={onCall} title="Call">
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
            <path
              d="M5 7C5 5.89543 5.89543 5 7 5H10.2792C10.7097 5 11.0918 5.27543 11.2279 5.68377L12.7257 10.1772C12.8831 10.6493 12.6694 11.1653 12.2243 11.3879L9.96701 12.5165C11.0693 14.9612 13.0388 16.9308 15.4835 18.033L16.6121 15.7757C16.8347 15.3306 17.3507 15.1169 17.8228 15.2743L22.3162 16.7721C22.7246 16.9082 23 17.2903 23 17.7208V21C23 22.1046 22.1046 23 21 23H20C11.7157 23 5 16.2843 5 8V7Z"
              fill="#fff"
              stroke="#fff"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Schedule button - full trắng */}
        <button className="action-btn" type="button" onClick={onSchedule} title="Đặt lịch khảo sát">
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
            <rect x="4" y="6" width="18" height="16" rx="2" fill="#fff" stroke="#fff" strokeWidth="1.3" />
            <path d="M4 10H22" stroke="#141414" strokeWidth="1.3" />
            <path d="M8 4V6" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" />
            <path d="M18 4V6" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" />
            <circle cx="9" cy="15" r="1" fill="#141414" />
            <circle cx="13" cy="15" r="1" fill="#141414" />
            <circle cx="17" cy="15" r="1" fill="#141414" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default VideoLeftActions
