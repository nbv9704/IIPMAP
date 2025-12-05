"use client"

// ============================================
// IMPORTS
// ============================================
import { useState } from "react"
import { useLanguage } from "@/hooks/useLanguage"
import { getTranslation } from "@/utils/translations"

// ============================================
// TYPES
// ============================================
interface Conversation {
  id: number
  user: string
  avatar: string
  lastMessage: string
  time: string
  unread: boolean
}

interface MessagesSidebarProps {
  conversations: Conversation[]
  selectedConversation: number | null
  onSelectConversation: (id: number) => void
}

// ============================================
// COMPONENT
// ============================================
const MessagesSidebar = ({
  conversations,
  selectedConversation,
  onSelectConversation,
}: MessagesSidebarProps) => {
  const { currentLang } = useLanguage()
  const [showMessagesMenu, setShowMessagesMenu] = useState(false)

  return (
    <div className="video-messages-sidebar">
      <div className="video-messages-sidebar-header">
        <h3>{getTranslation(currentLang, "video.messages")}</h3>
        <div className="video-messages-menu-wrapper">
          <button
            className="video-messages-menu-btn"
            onClick={() => setShowMessagesMenu(!showMessagesMenu)}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="4" cy="10" r="1.5" fill="currentColor" />
              <circle cx="10" cy="10" r="1.5" fill="currentColor" />
              <circle cx="16" cy="10" r="1.5" fill="currentColor" />
            </svg>
          </button>
          {showMessagesMenu && (
            <>
              <div
                className="video-messages-menu-backdrop"
                onClick={() => setShowMessagesMenu(false)}
              />
              <div className="video-messages-menu-dropdown">
                <button
                  onClick={() => {
                    console.log("Mark all as read")
                    setShowMessagesMenu(false)
                  }}
                >
                  {getTranslation(currentLang, "video.markAllAsRead")}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="video-messages-list">
        {conversations.map((conv) => (
          <div
            key={conv.id}
            className={`video-conversation-item ${
              selectedConversation === conv.id ? "active" : ""
            } ${conv.unread ? "unread" : ""}`}
            onClick={() => onSelectConversation(conv.id)}
          >
            <div className="video-conversation-avatar">{conv.avatar}</div>
            <div className="video-conversation-content">
              <div className="video-conversation-header">
                <span className="video-conversation-name">{conv.user}</span>
                <span className="video-conversation-time">{conv.time}</span>
              </div>
              <p className="video-conversation-message">{conv.lastMessage}</p>
            </div>
            {conv.unread && <div className="video-conversation-badge" />}
          </div>
        ))}
      </div>
    </div>
  )
}

export default MessagesSidebar
