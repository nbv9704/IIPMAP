"use client"

// ============================================
// IMPORTS
// ============================================
import { useState, useMemo, useEffect } from "react"
import { generateChatMessages } from "@/constants/video/mockChatData"
import { CHAT } from "@/constants/video/config"
import ChatHeader from "@/components/video/messages/ChatHeader"
import ChatMessages from "@/components/video/messages/ChatMessages"
import ChatInput from "@/components/video/messages/ChatInput"
import { useLanguage } from "@/hooks/useLanguage"
import { getTranslation } from "@/utils/translations"

// ============================================
// TYPES
// ============================================
interface Conversation {
  id: number
  user: string
  avatar: string
}

interface ChatContainerProps {
  conversation: Conversation
  conversationId: number
}

interface ChatMessage {
  id: number
  sender: "me" | "other"
  text: string
  timestamp: Date
  pinned: boolean
  replyTo: number | null
}

// ============================================
// COMPONENT
// ============================================
const ChatContainer = ({ conversation, conversationId }: ChatContainerProps) => {
  const { currentLang } = useLanguage()
  const [messageInput, setMessageInput] = useState("")
  const [replyingTo, setReplyingTo] = useState<ChatMessage | null>(null)
  const [showChatMenu, setShowChatMenu] = useState(false)
  const [showFilesPopup, setShowFilesPopup] = useState(false)
  const [filesPopupTab, setFilesPopupTab] = useState<"files" | "media" | "links">("files")
  const [showPinnedPopup, setShowPinnedPopup] = useState(false)

  const chatMessages = useMemo(
    () => generateChatMessages(conversationId),
    [conversationId]
  )

  const pinnedMessage = useMemo(() => {
    return chatMessages.find((msg) => msg.pinned)
  }, [chatMessages])

  const messagesWithTimestamps = useMemo(() => {
    const result: Array<{ type: "message" | "timestamp"; data: any }> = []
    let lastTimestamp: Date | null = null

    chatMessages.forEach((msg) => {
      const shouldShowTimestamp =
        !lastTimestamp ||
        (msg.timestamp.getTime() - lastTimestamp.getTime()) / (1000 * 60) >
          CHAT.TIMESTAMP_THRESHOLD_MINUTES

      if (shouldShowTimestamp) {
        result.push({
          type: "timestamp",
          data: msg.timestamp.toLocaleTimeString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        })
        lastTimestamp = msg.timestamp
      }

      result.push({ type: "message", data: msg })
    })

    return result
  }, [chatMessages])

  useEffect(() => {
    const messagesContainer = document.querySelector(".video-chat-messages")
    if (messagesContainer) {
      setTimeout(() => {
        messagesContainer.scrollTop = messagesContainer.scrollHeight
      }, CHAT.AUTO_SCROLL_DELAY_MS)
    }
  }, [conversationId, messagesWithTimestamps, replyingTo])

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      console.log("Send:", messageInput, "Reply to:", replyingTo?.id)
      setMessageInput("")
      setReplyingTo(null)
    }
  }

  return (
    <div className="video-chat-container">
      <ChatHeader
        conversation={conversation}
        showChatMenu={showChatMenu}
        setShowChatMenu={setShowChatMenu}
        pinnedMessage={pinnedMessage}
        setShowPinnedPopup={setShowPinnedPopup}
        setShowFilesPopup={setShowFilesPopup}
      />

      {/* Files/Media/Links Popup */}
      {showFilesPopup && (
        <>
          <div className="video-popup-overlay" onClick={() => setShowFilesPopup(false)} />
          <div className="video-files-popup">
            <div className="video-popup-header">
              <h3>{getTranslation(currentLang, "video.filesMediaLinks")}</h3>
              <button onClick={() => setShowFilesPopup(false)}>✕</button>
            </div>
            <div className="video-popup-tabs">
              <button 
                className={filesPopupTab === 'files' ? 'active' : ''}
                onClick={() => setFilesPopupTab('files')}
              >
                {getTranslation(currentLang, "video.files")}
              </button>
              <button 
                className={filesPopupTab === 'media' ? 'active' : ''}
                onClick={() => setFilesPopupTab('media')}
              >
                {getTranslation(currentLang, "video.media")}
              </button>
              <button 
                className={filesPopupTab === 'links' ? 'active' : ''}
                onClick={() => setFilesPopupTab('links')}
              >
                {getTranslation(currentLang, "video.links")}
              </button>
            </div>
            <div className="video-popup-content">
              <p style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
                {filesPopupTab === 'files' && getTranslation(currentLang, "video.noFiles")}
                {filesPopupTab === 'media' && getTranslation(currentLang, "video.noMedia")}
                {filesPopupTab === 'links' && getTranslation(currentLang, "video.noLinks")}
              </p>
            </div>
          </div>
        </>
      )}
      
      {/* Pinned Messages Popup */}
      {showPinnedPopup && (
        <>
          <div className="video-popup-overlay" onClick={() => setShowPinnedPopup(false)} />
          <div className="video-pinned-popup">
            <div className="video-popup-header">
              <h3>{getTranslation(currentLang, "video.pinnedMessages")}</h3>
              <button onClick={() => setShowPinnedPopup(false)}>✕</button>
            </div>
            <div className="video-popup-content">
              {pinnedMessage ? (
                <div className="video-pinned-message-item">
                  <div className="video-chat-message-bubble">
                    <p>{pinnedMessage.text}</p>
                    <span className="video-chat-message-time">
                      {pinnedMessage.timestamp.toLocaleTimeString("vi-VN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              ) : (
                <p style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
                  {getTranslation(currentLang, "video.noPinnedMessages")}
                </p>
              )}
            </div>
          </div>
        </>
      )}

      <ChatMessages
        messagesWithTimestamps={messagesWithTimestamps}
        chatMessages={chatMessages}
        conversation={conversation}
        setReplyingTo={setReplyingTo}
      />

      <ChatInput
        messageInput={messageInput}
        setMessageInput={setMessageInput}
        replyingTo={replyingTo}
        setReplyingTo={setReplyingTo}
        conversation={conversation}
        onSendMessage={handleSendMessage}
      />
    </div>
  )
}

export default ChatContainer
