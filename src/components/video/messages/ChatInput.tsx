"use client"

// ============================================
// IMPORTS
// ============================================
import { AiOutlinePaperClip } from "react-icons/ai"

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

interface ChatInputProps {
  messageInput: string
  setMessageInput: (value: string) => void
  replyingTo: ChatMessage | null
  setReplyingTo: (msg: ChatMessage | null) => void
  conversation: { user: string }
  onSendMessage: () => void
}

// ============================================
// COMPONENT
// ============================================
const ChatInput = ({
  messageInput,
  setMessageInput,
  replyingTo,
  setReplyingTo,
  conversation,
  onSendMessage,
}: ChatInputProps) => {
  return (
    <div className="video-chat-input-wrapper">
      {replyingTo && (
        <div className="video-chat-reply-preview">
          <div className="video-chat-reply-content">
            <div className="video-chat-reply-header">
              <span className="video-chat-reply-label">
                Đang trả lời{" "}
                {replyingTo.sender === "me" ? "chính mình" : conversation.user}
              </span>
            </div>
            <p className="video-chat-reply-text">{replyingTo.text}</p>
          </div>
          <button
            className="video-chat-reply-close"
            onClick={() => setReplyingTo(null)}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M12 4L4 12M4 4L12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      )}
      <div className="video-chat-input-container">
        <button
          type="button"
          className="video-chat-pin-btn"
          onClick={() => console.log("Pin attachment")}
        >
          <AiOutlinePaperClip size={20} />
        </button>
        <input
          type="text"
          placeholder="Nhập tin nhắn..."
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              onSendMessage()
            }
          }}
        />
        <button
          type="button"
          className="video-chat-send-btn"
          onClick={onSendMessage}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M18 2L9 11M18 2L12 18L9 11M18 2L2 8L9 11"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default ChatInput
