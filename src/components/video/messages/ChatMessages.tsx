"use client"

// ============================================
// IMPORTS
// ============================================
import { useState } from "react"
import { BiReply } from "react-icons/bi"
import { AiOutlineSmile } from "react-icons/ai"

// ============================================
// TYPES
// ============================================
interface ChatMessage {
  id: number
  sender: "me" | "other"
  text: string
  timestamp: Date
  pinned: boolean
  replyTo: number | null
}

interface ChatMessagesProps {
  messagesWithTimestamps: Array<{ type: "message" | "timestamp"; data: any }>
  chatMessages: ChatMessage[]
  conversation: { user: string; avatar: string }
  setReplyingTo: (msg: ChatMessage | null) => void
}

// ============================================
// COMPONENT
// ============================================
const ChatMessages = ({
  messagesWithTimestamps,
  chatMessages,
  conversation,
  setReplyingTo,
}: ChatMessagesProps) => {
  const [hoveredMessage, setHoveredMessage] = useState<number | null>(null)
  const [showMessageMenu, setShowMessageMenu] = useState<number | null>(null)
  const [showEmojiPicker, setShowEmojiPicker] = useState<number | null>(null)

  return (
    <div className="video-chat-messages">
      {messagesWithTimestamps.map((item, index) =>
        item.type === "timestamp" ? (
          <div key={`timestamp-${index}`} className="video-chat-timestamp">
            {item.data}
          </div>
        ) : (
          (() => {
            const msg = item.data as ChatMessage
            return (
              <div
                id={`message-${msg.id}`}
                key={msg.id}
                className={`video-chat-message ${
                  msg.sender === "me" ? "sent" : "received"
                }`}
                onMouseEnter={() => setHoveredMessage(msg.id)}
                onMouseLeave={() => setHoveredMessage(null)}
              >
                {msg.sender === "other" && (
                  <div className="video-chat-message-avatar">{conversation.avatar}</div>
                )}
                <div className="video-chat-message-content">
                  <div className="video-chat-message-bubble">
                    {msg.pinned && (
                      <div className="video-message-pin-badge">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path
                            d="M6 1.5L7.5 4.5L10.5 5.5L7.5 6.5L6 9.5L4.5 6.5L1.5 5.5L4.5 4.5L6 1.5Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                    )}
                    {msg.replyTo && (() => {
                      const repliedMsg = chatMessages.find((m) => m.id === msg.replyTo)
                      if (repliedMsg) {
                        return (
                          <div
                            className="video-message-reply-quote"
                            onClick={() => {
                              const element = document.getElementById(`message-${repliedMsg.id}`)
                              element?.scrollIntoView({ behavior: "smooth", block: "center" })
                            }}
                          >
                            <div className="video-message-reply-quote-header">
                              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <path
                                  d="M7 3L3 7L7 11M3 7H11"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <span>
                                {msg.sender === "me"
                                  ? repliedMsg.sender === "me"
                                    ? "Bạn đã trả lời chính mình"
                                    : conversation.user
                                  : repliedMsg.sender === "me"
                                  ? "Bạn"
                                  : `${conversation.user} đã trả lời chính họ`}
                              </span>
                            </div>
                            <p>{repliedMsg.text}</p>
                          </div>
                        )
                      }
                      return null
                    })()}
                    <p>{msg.text}</p>
                  </div>
                  {hoveredMessage === msg.id && (
                    <div
                      className={`video-chat-message-actions ${
                        msg.sender === "me" ? "sent" : "received"
                      }`}
                    >
                      <button
                        className="video-message-action-btn"
                        onClick={() => setShowEmojiPicker(msg.id)}
                        title="Biểu cảm"
                      >
                        <AiOutlineSmile size={18} />
                      </button>
                      <button
                        className="video-message-action-btn"
                        onClick={() => setReplyingTo(msg)}
                        title="Trả lời"
                      >
                        <BiReply size={18} />
                      </button>
                      <button
                        className="video-message-action-btn"
                        onClick={() => setShowMessageMenu(msg.id)}
                        title="Thêm"
                      >
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                          <circle cx="3" cy="9" r="1.5" fill="currentColor" />
                          <circle cx="9" cy="9" r="1.5" fill="currentColor" />
                          <circle cx="15" cy="9" r="1.5" fill="currentColor" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )
          })()
        )
      )}
    </div>
  )
}

export default ChatMessages
