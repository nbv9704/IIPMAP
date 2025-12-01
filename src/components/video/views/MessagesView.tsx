"use client"

// ============================================
// IMPORTS
// ============================================
import { useState, useMemo } from "react"
import { generateConversations } from "@/constants/video/mockChatData"
import MessagesSidebar from "../messages/MessagesSidebar"
import ChatContainer from "../messages/ChatContainer"
import MessagesEmptyState from "../messages/MessagesEmptyState"

// ============================================
// COMPONENT
// ============================================
const MessagesView = () => {
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null)
  const conversations = useMemo(() => generateConversations(), [])

  const currentChat = useMemo(() => {
    if (!selectedConversation) return null
    return conversations.find((c) => c.id === selectedConversation)
  }, [selectedConversation, conversations])

  return (
    <div className="video-messages-layout">
      <MessagesSidebar
        conversations={conversations}
        selectedConversation={selectedConversation}
        onSelectConversation={setSelectedConversation}
      />

      <div className="video-messages-main">
        {selectedConversation && currentChat ? (
          <ChatContainer
            conversation={currentChat}
            conversationId={selectedConversation}
          />
        ) : (
          <MessagesEmptyState />
        )}
      </div>
    </div>
  )
}

export default MessagesView
