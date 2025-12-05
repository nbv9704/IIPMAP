"use client"

// ============================================
// IMPORTS
// ============================================
import { useState, useMemo } from "react"
import { generateConversations } from "@/constants/video/mockChatData"
import MessagesSidebar from "../messages/MessagesSidebar"
import ChatContainer from "../messages/ChatContainer"
import MessagesEmptyState from "../messages/MessagesEmptyState"
import { useGetConversationsQuery } from "@/redux/slice/videoApiSlice"

// ============================================
// COMPONENT
// ============================================
const MessagesView = () => {
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null)
  
  // ✅ RTK Query API call (following VNG004's pattern)
  const { data: apiConversations, error: errorConversations } = useGetConversationsQuery()
  
  // ✅ Mock data fallback (for testing phase)
  const mockConversations = useMemo(() => generateConversations(), [])
  
  // ✅ Determine data source
  const USE_MOCK = !apiConversations || errorConversations
  
  // ✅ Transform API data (when backend ready)
  const transformApiToConversation = (convs: typeof apiConversations) => {
    if (!convs) return []
    return convs.map(c => ({
      id: parseInt(c.id) || 0,
      user: c.participants[0]?.displayName || "User",
      avatar: c.participants[0]?.avatar || c.participants[0]?.displayName.charAt(0) || "U",
      lastMessage: c.lastMessage?.content || "",
      time: "1h",
      unread: c.unreadCount > 0, // Convert number to boolean
      online: false,
    }))
  }
  
  // ✅ Select data to display
  const conversations = USE_MOCK ? mockConversations : transformApiToConversation(apiConversations)
  
  // 🔍 Debug logging
  console.log("💬 MessagesView - Using:", USE_MOCK ? "📦 Mock" : "🌐 API")

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
