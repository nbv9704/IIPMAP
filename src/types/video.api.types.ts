// ============================================
// VIDEO API TYPES
// ============================================
// Following VNG004's pattern for API types

export interface VideoDto {
  id: string;
  title: string;
  description?: string;
  videoUrl: string;
  thumbnailUrl?: string;
  duration: number; // in seconds
  views: number;
  likes: number;
  comments: number;
  shares: number;
  location?: string;
  tags?: string[];
  createdAt: string;
  updatedAt?: string;
  userId: string;
  user?: UserDto;
  isFeatured?: boolean;
  isPublic?: boolean;
}

export interface UserDto {
  id: string;
  username: string;
  displayName: string;
  avatar?: string;
  bio?: string;
  followersCount?: number;
  followingCount?: number;
  videosCount?: number;
  isVerified?: boolean;
}

export interface CommentDto {
  id: string;
  videoId: string;
  userId: string;
  user?: UserDto;
  content: string;
  likes: number;
  replies?: CommentDto[];
  createdAt: string;
  updatedAt?: string;
}

export interface NotificationDto {
  id: string;
  userId: string;
  type: "like" | "comment" | "follow" | "message";
  fromUser?: UserDto;
  videoId?: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface MessageDto {
  id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  content: string;
  isRead: boolean;
  createdAt: string;
}

export interface ConversationDto {
  id: string;
  participants: UserDto[];
  lastMessage?: MessageDto;
  unreadCount: number;
  updatedAt: string;
}

// Query params
export interface VideoQueryParams {
  top?: number;
  skip?: number;
  search?: string;
  tags?: string[];
  userId?: string;
  featured?: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}
