"use client"

// ============================================
// COMPONENT
// ============================================
const MessagesEmptyState = () => {
  return (
    <div className="video-messages-empty-state">
      <div className="video-messages-empty-icon-large">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <circle cx="40" cy="40" r="35" stroke="currentColor" strokeWidth="3" />
          <path
            d="M40 20C30.06 20 22 28.06 22 38C22 42.29 23.45 46.23 25.85 49.37L23 58L31.63 55.15C34.77 57.55 38.71 59 43 59C52.94 59 61 50.94 61 41C61 31.06 52.94 23 43 23"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <h3>Tin nhắn của bạn</h3>
      <p>Chọn một cuộc trò chuyện để bắt đầu</p>
    </div>
  )
}

export default MessagesEmptyState
