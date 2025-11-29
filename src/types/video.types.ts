export interface VideoItem {
  id: number
  badge: string
  views: string
  location: string
  thumbnail: string
  title: string
  duration: string
}

export interface VideoCardItemProps {
  id: number
  title: string
  location: string
  thumbnail: string
  badge: string
  views: string
  duration: string
  author?: string
  authorAvatar?: string
  className?: string
  sectionSlug?: string
}

export interface VideoPost {
  postId: string
  userId: string
  title: string
  description?: string
  videoUrl: string
  thumbnail: string
  duration: string
  views: number
  likes: number
  comments: number
  shares: number
  createdAt: Date
  updatedAt: Date
}

export interface UserProfile {
  userId: string // @kcn_tien (tối đa 10 ký tự sau @)
  displayName: string // KCN Tiên Sơn
  avatar?: string
  bio?: string
  followers: number
  following: number
  totalVideos: number
  totalLikes: number
}
