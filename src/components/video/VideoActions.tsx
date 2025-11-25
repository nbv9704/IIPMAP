"use client"
import { useState } from "react"

interface VideoActionsProps {
  video: {
    likes: number
    comments: number
    shares: number
    bookmarked: boolean
  }
  onPrev: () => void
  onNext: () => void
  onViewProfile?: () => void
  onOpenComments?: () => void
  onOpenChat?: () => void
  onBookmarkChange?: (bookmarked: boolean) => void
}

const VideoActions = ({
  video,
  onPrev,
  onNext,
  onViewProfile,
  onOpenComments,
  onOpenChat,
  onBookmarkChange,
}: VideoActionsProps) => {
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(video.bookmarked)
  const [likesCount, setLikesCount] = useState(video.likes)

  const handleLike = () => {
    setLiked((prev) => !prev)
    setLikesCount((prev) => (liked ? prev - 1 : prev + 1))
  }

  const formatCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`
    }
    return count.toString()
  }

  return (
    <div className="video-actions">
      {/* Cột avatar + icon like/comment/share/bookmark + nút Xem bài viết */}
      <div className="video-actions-main">
        <button
          className="video-user-avatar"
          type="button"
          onClick={onViewProfile}
        >
          <div className="avatar-circle">V</div>
        </button>

        <button
          className={`action-btn ${liked ? "active" : ""}`}
          onClick={handleLike}
          type="button"
        >
          <svg width="26" height="23" viewBox="0 0 26 23" fill="none">
            <path
              d="M22.6 2.6C20.7 0.8 17.9 0.8 16 2.6L13 5.6L10 2.6C8.1 0.8 5.3 0.8 3.4 2.6C1.1 4.9 1.1 8.7 3.4 11L13 20.6L22.6 11C24.9 8.7 24.9 4.9 22.6 2.6Z"
              fill={liked ? "#FF0000" : "none"}
              stroke={liked ? "#FF0000" : "#000"}
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="action-count">{formatCount(likesCount)}</span>
        </button>

        <button
          className="action-btn"
          type="button"
          onClick={() => onOpenComments?.()}
        >
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
            <rect
              x="1"
              y="1"
              width="24"
              height="18"
              rx="2"
              stroke="#000"
              strokeWidth="1.3"
            />
            <path d="M8 19L13 24L18 19" stroke="#000" strokeWidth="1.3" />
          </svg>
          <span className="action-count">
            {formatCount(video.comments)}
          </span>
        </button>

        <button
          className="action-btn"
          type="button"
          onClick={() => onOpenChat?.()}
        >
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
            <rect
              x="1"
              y="1"
              width="24"
              height="18"
              rx="2"
              stroke="#000"
              strokeWidth="1.3"
            />
            <path d="M8 19L13 24L18 19" stroke="#000" strokeWidth="1.3" />
          </svg>
        </button>

        <button className="action-btn" type="button">
          <svg width="26" height="14" viewBox="0 0 26 14" fill="none">
            <path
              d="M1 7H20M20 7L14 1M20 7L14 13"
              stroke="#000"
              strokeWidth="1.33"
            />
          </svg>
        </button>

        <button
          className={`action-btn ${bookmarked ? "active" : ""}`}
          onClick={() => {
            const next = !bookmarked
            setBookmarked(next)
            onBookmarkChange?.(next)
          }}
          type="button"
        >
          <svg width="23" height="23" viewBox="0 0 23 23" fill="none">
            <path
              d="M2 1.5C2 1.22386 2.22386 1 2.5 1H20.5C20.7761 1 21 1.22386 21 1.5V22L11.5 16.5L2 22V1.5Z"
              fill={bookmarked ? "#000" : "none"}
              stroke="#000"
              strokeWidth="1.3"
            />
          </svg>
        </button>

        <button className="view-post-btn" type="button">
          Xem bài viết
        </button>
      </div>

      {/* Nút trượt video kiểu TikTok – cố định mép phải màn hình */}
      <div className="video-scroll-nav">
        {/* Nút LÊN */}
        <button
          className="video-scroll-btn up"
          onClick={onPrev}
          type="button"
          aria-label="Video trước"
        >
          <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
            <path
              d="M4 8L9 3L14 8"
              stroke="#FFFFFF"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Nút XUỐNG */}
        <button
          className="video-scroll-btn down"
          onClick={onNext}
          type="button"
          aria-label="Video tiếp theo"
        >
          <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
            <path
              d="M4 4L9 9L14 4"
              stroke="#FFFFFF"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default VideoActions
