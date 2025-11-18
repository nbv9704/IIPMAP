export type NewsListItem = {
  id: number
  slug: string
  category: string
  title: string
  summary: string
  thumbnailUrl: string | null
  publishedAt: string
}

export type NewsDetail = {
  id: number
  slug: string
  category: string
  title: string
  summary: string
  content: string
  coverImageUrl: string | null
  publishedAt: string
  viewCount: number
}
