"use client"

// ============================================
// IMPORTS
// ============================================
import { useState, useMemo, useEffect } from "react"
import { AiOutlineInfoCircle, AiOutlinePaperClip } from "react-icons/ai"
import { generateChatMessages } from "@/constants/video/mockChatData"
import { CHAT } from "@/constants/video/config"
import ChatHeader from "@/components/video/messages/ChatHeader"
import ChatMessages from "@/components/video/messages/ChatMessages"
import ChatInput from "@/components/video/messages/ChatInput"

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

      {/* TODO: Implement popups - Files, Media, Links, Pinned Messages */}
      {showFilesPopup && (
        <div>Files Popup - TODO: Implement</div>
      )}
      {showPinnedPopup && (
        <div>Pinned Messages Popup - TODO: Implement</div>
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
