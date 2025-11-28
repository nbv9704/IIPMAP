export interface NewsItem {
  id: number
  title: string
  image: string
  date: string
  excerpt?: string
  category?: string
}

export type NewsCategory = "qna" | "market" | "planning" | "activity"
