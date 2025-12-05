// ============================================
// VIDEO API SLICE
// ============================================
// Following VNG004's RTK Query pattern

import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/components/api";
import {
  VideoDto,
  UserDto,
  CommentDto,
  NotificationDto,
  MessageDto,
  ConversationDto,
  VideoQueryParams,
  PaginatedResponse,
} from "@/types/video.api.types";

export const videoApiSlice = createApi({
  reducerPath: "videoApi",
  baseQuery: baseQuery,
  tagTypes: ["Video", "User", "Comment", "Notification", "Message"],
  endpoints: (builder) => ({
    // ============================================
    // VIDEO ENDPOINTS
    // ============================================
    
    // Get featured videos (for explore page)
    getFeaturedVideos: builder.query<VideoDto[], number>({
      query: (top = 10) => ({
        url: `/app/video-public/featured?top=${top}`,
        method: "GET",
      }),
      providesTags: ["Video"],
    }),

    // Get daily videos
    getDailyVideos: builder.query<VideoDto[], number>({
      query: (top = 12) => ({
        url: `/app/video-public/daily?top=${top}`,
        method: "GET",
      }),
      providesTags: ["Video"],
    }),

    // Get video by ID
    getVideoById: builder.query<VideoDto, string>({
      query: (id) => ({
        url: `/app/video-public/${id}`,
        method: "GET",
      }),
      providesTags: ["Video"],
    }),

    // Get videos by user
    getVideosByUser: builder.query<VideoDto[], string>({
      query: (userId) => ({
        url: `/app/video-public/user/${userId}`,
        method: "GET",
      }),
      providesTags: ["Video"],
    }),

    // Search videos
    searchVideos: builder.query<PaginatedResponse<VideoDto>, VideoQueryParams>({
      query: (params) => ({
        url: `/app/video-public/search`,
        method: "GET",
        params,
      }),
      providesTags: ["Video"],
    }),

    // ============================================
    // USER ENDPOINTS
    // ============================================

    // Get user profile
    getUserProfile: builder.query<UserDto, string>({
      query: (userId) => ({
        url: `/app/user-public/${userId}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    // Get following users
    getFollowingUsers: builder.query<UserDto[], void>({
      query: () => ({
        url: `/app/user/following`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    // ============================================
    // SAVED VIDEOS ENDPOINTS
    // ============================================

    // Get saved videos
    getSavedVideos: builder.query<VideoDto[], void>({
      query: () => ({
        url: `/app/video/saved`,
        method: "GET",
      }),
      providesTags: ["Video"],
    }),

    // ============================================
    // NOTIFICATION ENDPOINTS
    // ============================================

    // Get notifications
    getNotifications: builder.query<NotificationDto[], number>({
      query: (top = 50) => ({
        url: `/app/notification?top=${top}`,
        method: "GET",
      }),
      providesTags: ["Notification"],
    }),

    // Mark notification as read
    markNotificationRead: builder.mutation<void, string>({
      query: (id) => ({
        url: `/app/notification/${id}/read`,
        method: "PUT",
      }),
      invalidatesTags: ["Notification"],
    }),

    // ============================================
    // MESSAGE ENDPOINTS
    // ============================================

    // Get conversations
    getConversations: builder.query<ConversationDto[], void>({
      query: () => ({
        url: `/app/message/conversations`,
        method: "GET",
      }),
      providesTags: ["Message"],
    }),

    // Get messages by conversation
    getMessages: builder.query<MessageDto[], string>({
      query: (conversationId) => ({
        url: `/app/message/conversation/${conversationId}`,
        method: "GET",
      }),
      providesTags: ["Message"],
    }),

    // Send message
    sendMessage: builder.mutation<MessageDto, { receiverId: string; content: string }>({
      query: (body) => ({
        url: `/app/message/send`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Message"],
    }),

    // ============================================
    // COMMENT ENDPOINTS
    // ============================================

    // Get comments by video
    getComments: builder.query<CommentDto[], string>({
      query: (videoId) => ({
        url: `/app/comment/video/${videoId}`,
        method: "GET",
      }),
      providesTags: ["Comment"],
    }),

    // Add comment
    addComment: builder.mutation<CommentDto, { videoId: string; content: string }>({
      query: (body) => ({
        url: `/app/comment`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Comment"],
    }),
  }),
});

// Export hooks for usage in components
export const {
  // Video hooks
  useGetFeaturedVideosQuery,
  useGetDailyVideosQuery,
  useGetVideoByIdQuery,
  useGetVideosByUserQuery,
  useSearchVideosQuery,
  
  // User hooks
  useGetUserProfileQuery,
  useGetFollowingUsersQuery,
  
  // Saved videos hooks
  useGetSavedVideosQuery,
  
  // Notification hooks
  useGetNotificationsQuery,
  useMarkNotificationReadMutation,
  
  // Message hooks
  useGetConversationsQuery,
  useGetMessagesQuery,
  useSendMessageMutation,
  
  // Comment hooks
  useGetCommentsQuery,
  useAddCommentMutation,
} = videoApiSlice;
