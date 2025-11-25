"use client"
import { useEffect, useState } from "react"

const comments = Array(5).fill(null).map((_, idx) => ({
  id: idx + 1,
  user: `User${idx + 1}`,
  content: "Perfect for watching",
  date: "11/10/2025"
}))

const chats = [
  { id: 1, mine: false, text: "Perfect for watching" },
  { id: 2, mine: true, text: "Perfect for watching" },
  { id: 3, mine: false, text: "Perfect for watching" },
  { id: 4, mine: true, text: "Perfect for watching" },
  { id: 5, mine: false, text: "Cho tôi hỏi thông tin về khu đất này" }
]

interface VideoCommentChatProps {
  mode: "comment" | "chat";
  onClose: () => void;
}

const VideoCommentChat = ({ mode, onClose }: VideoCommentChatProps) => {
  const [activeTab, setActiveTab] = useState<"comment" | "chat">(mode)
  const [message, setMessage] = useState("")

  useEffect(() => {
    setActiveTab(mode)
  }, [mode])

  return (
    <div className="video-comment-panel">
      <div className="panel-tabs">
        <button
          type="button"
          className={activeTab === "comment" ? "active" : ""}
          onClick={() => setActiveTab("comment")}
        >
          Comment (45k)
        </button>
        <button
          type="button"
          className={activeTab === "chat" ? "active" : ""}
          onClick={() => setActiveTab("chat")}
        >
          Chat
        </button>
        <button type="button" className="close-panel" onClick={onClose}>×</button>
      </div>

      {activeTab === "comment" ? (
        <div className="comment-list">
          {comments.map(comment => (
            <div className="comment-item" key={comment.id}>
              <div className="comment-avatar">U</div>
              <div className="comment-content">
                <div className="comment-header">
                  <span className="comment-user">{comment.user}</span>
                  <span className="comment-date">{comment.date}</span>
                </div>
                <p>{comment.content}</p>
                <button type="button" className="reply-btn">Reply</button>
              </div>
              <div className="comment-actions">
                <span className="heart">♡</span>
                <button type="button">
                  <svg width="16" height="4" viewBox="0 0 16 4" fill="none">
                    <circle cx="2" cy="2" r="2" fill="#000"/>
                    <circle cx="8" cy="2" r="2" fill="#000"/>
                    <circle cx="14" cy="2" r="2" fill="#000"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="chat-content">
          <div className="chat-list">
            {chats.map(chat => (
              <div
                key={chat.id}
                className={`chat-bubble ${chat.mine ? "mine" : ""}`}
              >
                <span>{chat.text}</span>
                <div className="chat-avatar">U</div>
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              placeholder="Nhập tin nhắn..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="chat-tools">
              <button type="button">📎</button>
              <button type="button">😊</button>
              <button type="button">➤</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default VideoCommentChat
