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
