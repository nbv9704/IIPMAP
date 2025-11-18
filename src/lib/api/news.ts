import type { NewsListItem, NewsDetail } from "@/types/news"

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL

if (!API_BASE) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined")
}

export async function fetchLatestNews(
  lang: string,
  page = 0,
  size = 10,
  category?: string
) {
  const params = new URLSearchParams({
    lang,
    page: String(page),
    size: String(size),
  })

  if (category) params.append("category", category)

  const res = await fetch(`${API_BASE}/api/news?${params.toString()}`, {
    cache: "no-store",
  })
  if (!res.ok) throw new Error("Failed to fetch news")
  return (await res.json()) as {
    content: NewsListItem[]
    totalElements: number
    totalPages: number
    number: number
  }
}

export async function fetchMostViewedNews(
  lang: string,
  page = 0,
  size = 8
) {
  const res = await fetch(
    `${API_BASE}/api/news/most-viewed?lang=${lang}&page=${page}&size=${size}`,
    { cache: "no-store" }
  )
  if (!res.ok) throw new Error("Failed to fetch news")
  return (await res.json()) as {
    content: NewsListItem[]
    totalElements: number
    totalPages: number
    number: number
  }
}

export async function fetchNewsDetail(slug: string, lang: string) {
  const res = await fetch(`${API_BASE}/api/news/${slug}?lang=${lang}`, {
    cache: "no-store",
  })
  if (!res.ok) throw new Error("Failed to fetch news detail")
  return (await res.json()) as NewsDetail | null
}

export async function fetchFeaturedNews(lang: string) {
  const res = await fetch(`${API_BASE}/api/news/featured?lang=${lang}`, {
    cache: "no-store",
  })
  if (!res.ok) throw new Error("Failed to fetch featured news")
  return (await res.json()) as NewsListItem | null
}
