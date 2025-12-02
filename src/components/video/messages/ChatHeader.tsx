"use client"

// ============================================
// IMPORTS
// ============================================
import { AiOutlineInfoCircle } from "react-icons/ai"

// ============================================
// TYPES
// ============================================
interface ChatHeaderProps {
  conversation: { user: string; avatar: string }
  showChatMenu: boolean
  setShowChatMenu: (show: boolean) => void
  pinnedMessage: any
  setShowPinnedPopup: (show: boolean) => void
  setShowFilesPopup: (show: boolean) => void
}

// ============================================
// COMPONENT
// ============================================
const ChatHeader = ({
  conversation,
  showChatMenu,
  setShowChatMenu,
  pinnedMessage,
  setShowPinnedPopup,
  setShowFilesPopup,
}: ChatHeaderProps) => {
  return (
    <div className="video-chat-header">
      <div className="video-chat-user">
        <div className="video-chat-avatar">{conversation.avatar}</div>
        <div className="video-chat-user-info">
          <h4>{conversation.user}</h4>
          <span>Đang hoạt động</span>
        </div>
      </div>
      <div className="video-chat-menu-wrapper">
        <button
          className="video-chat-menu-btn"
          onClick={() => setShowChatMenu(!showChatMenu)}
        >
          <AiOutlineInfoCircle size={22} />
        </button>
        {showChatMenu && (
          <>
            <div
              className="video-chat-menu-backdrop"
              onClick={() => setShowChatMenu(false)}
            />
            <div className="video-chat-menu-dropdown">
              <button
                onClick={() => {
                  console.log("View profile")
                  setShowChatMenu(false)
                }}
              >
                Xem trang cá nhân
              </button>
              <div className="video-chat-menu-divider" />
              {pinnedMessage && (
                <button
                  onClick={() => {
                    setShowPinnedPopup(true)
                    setShowChatMenu(false)
                  }}
                >
                  Xem tin nhắn đã ghim
                </button>
              )}
              <button
                onClick={() => {
                  setShowFilesPopup(true)
                  setShowChatMenu(false)
                }}
              >
                File, phương tiện và liên kết
              </button>
              <div className="video-chat-menu-divider" />
              <button
                onClick={() => {
                  console.log("Delete conversation")
                  setShowChatMenu(false)
                }}
                className="video-chat-menu-danger"
              >
                Xóa trò chuyện
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ChatHeader
