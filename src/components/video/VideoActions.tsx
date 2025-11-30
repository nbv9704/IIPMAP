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
      {/* Cột icon like/comment/share/bookmark + nút Xem bài viết */}
      <div className="video-actions-main">
        {/* Like button - full trắng, khi active full đỏ */}
        <button
          className={`action-btn action-btn-like ${liked ? "active" : ""}`}
          onClick={handleLike}
          type="button"
          title={liked ? "Bỏ thích" : "Thích"}
        >
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
            <path
              d="M22.6 4.6C20.7 2.8 17.9 2.8 16 4.6L13 7.6L10 4.6C8.1 2.8 5.3 2.8 3.4 4.6C1.1 6.9 1.1 10.7 3.4 13L13 22.6L22.6 13C24.9 10.7 24.9 6.9 22.6 4.6Z"
              fill={liked ? "#FF0000" : "#fff"}
              stroke={liked ? "#FF0000" : "#fff"}
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="action-count">{formatCount(likesCount)}</span>
        </button>

        {/* Comment button - khung trắng, gạch đen */}
        <button
          className="action-btn action-btn-comment"
          type="button"
          onClick={() => onOpenComments?.()}
          title="Bình luận"
        >
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
            <rect
              x="2"
              y="4"
              width="22"
              height="16"
              rx="2"
              stroke="#fff"
              fill="#fff"
              strokeWidth="1.3"
            />
            <path
              d="M8 20L13 23L18 20"
              stroke="#fff"
              fill="#fff"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M7 10H19" stroke="#141414" strokeWidth="1.3" strokeLinecap="round" />
            <path d="M7 14H15" stroke="#141414" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          <span className="action-count">
            {formatCount(video.comments)}
          </span>
        </button>

        {/* Bookmark button - full trắng, khi active full vàng */}
        <button
          className={`action-btn action-btn-bookmark ${bookmarked ? "active" : ""}`}
          onClick={() => {
            const next = !bookmarked
            setBookmarked(next)
            onBookmarkChange?.(next)
          }}
          type="button"
          title={bookmarked ? "Bỏ lưu" : "Lưu"}
        >
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
            <path
              d="M4 2.5C4 2.22386 4.22386 2 4.5 2H21.5C21.7761 2 22 2.22386 22 2.5V24L13 18.5L4 24V2.5Z"
              fill={bookmarked ? "#FFD700" : "#fff"}
              stroke={bookmarked ? "#FFD700" : "#fff"}
              strokeWidth="1.3"
            />
          </svg>
        </button>

        {/* Share button - mũi tên cong (forward arrow) */}
        <button className="action-btn action-btn-share" type="button" title="Chia sẻ">
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
            <path
              d="M15 4L22 11L15 18V14C10 14 6 15.5 3 20C4 15 7 10 15 9V4Z"
              fill="#fff"
              stroke="#fff"
              strokeWidth="1.3"
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
