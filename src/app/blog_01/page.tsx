import Link from "next/link"
import Image from "next/image"

import {
  fetchFeaturedNews,
  fetchLatestNews,
  fetchMostViewedNews,
} from "@/lib/api/news"

import type { NewsListItem } from "@/types/news"


type Props = {
  searchParams?: {
    page?: string
    lang?: string
    category?: string
  }
}

const CATEGORY_TABS: { key: string; label: string }[] = [
  { key: "", label: "Tất cả" },
  { key: "Tin thị trường", label: "Tin thị trường" },
  { key: "Tin quy hoạch", label: "Tin quy hoạch" },
  { key: "Hoạt động IIP", label: "Hoạt động IIP" },
]

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString("vi-VN")
}

export default async function NewsListPage({ searchParams }: Props) {
  const lang = searchParams?.lang ?? "vi"
  const currentPage = Number(searchParams?.page ?? "0")
  const category = searchParams?.category ?? ""

  const [featured, latest, mostViewed] = await Promise.all([
    fetchFeaturedNews(lang),
    fetchLatestNews(lang, currentPage, 5, category || undefined),
    fetchMostViewedNews(lang, 0, 6),
  ])

  const totalPages = latest.totalPages

  return (
    <main className="iip-news">
      {/* BANNER BÀI NỔI BẬT */}
      {featured && (
        <section className="iip-news__hero">
          <div className="iip-news__hero-image-wrap">
            {featured.thumbnailUrl && (
              <Image
                src={featured.thumbnailUrl}
                alt={featured.title}
                fill
                priority
                className="iip-news__hero-image"
              />
            )}
          </div>
          <div className="iip-news__hero-overlay">
            <div className="iip-news__hero-content container">
              <p className="iip-news__hero-category">{featured.category}</p>
              <h1 className="iip-news__hero-title">
                <Link href={`/blog/${featured.slug}`}>{featured.title}</Link>
              </h1>
              <p className="iip-news__hero-meta">
                {formatDate(featured.publishedAt)}
              </p>
            </div>
          </div>
        </section>
      )}

      <div className="container iip-news__body">
        {/* BÀI VIẾT MỚI NHẤT */}
        <section className="iip-news__latest">
          <div className="iip-news__section-header">
            <h2>Bài viết mới nhất</h2>
          </div>

          {/* TAB CATEGORY + SEARCH (tạm UI thôi) */}
          <div className="iip-news__filters">
            <div className="iip-news__tabs">
              {CATEGORY_TABS.map((tab) => {
                const isActive = tab.key === category
                const params = new URLSearchParams()
                if (tab.key) params.set("category", tab.key)
                return (
                  <Link
                    key={tab.key || "all"}
                    href={`/blog_01?${params.toString()}`}
                    className={`iip-news__tab ${
                      isActive ? "is-active" : ""
                    }`}
                  >
                    {tab.label}
                  </Link>
                )
              })}
            </div>
            <div className="iip-news__search">
              <input
                type="text"
                placeholder="Tìm kiếm"
                className="iip-news__search-input"
              />
            </div>
          </div>

          {/* LIST BÀI */}
          <div className="iip-news__list">
            {latest.content.map((item: NewsListItem) => (
              <article key={item.id} className="iip-news__item">
                {item.thumbnailUrl && (
                  <div className="iip-news__item-thumb">
                    <Image
                      src={item.thumbnailUrl}
                      alt={item.title}
                      fill
                      className="iip-news__item-thumb-img"
                    />
                  </div>
                )}
                <div className="iip-news__item-body">
                  <p className="iip-news__item-category">{item.category}</p>
                  <h3 className="iip-news__item-title">
                    <Link href={`/blog/${item.slug}`}>{item.title}</Link>
                  </h3>
                  <p className="iip-news__item-date">
                    {formatDate(item.publishedAt)}
                  </p>
                </div>
                <button
                  type="button"
                  className="iip-news__bookmark"
                  aria-label="Bookmark"
                >
                  ▮
                </button>
              </article>
            ))}
          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="iip-news__pagination">
              {Array.from({ length: totalPages }).map((_, i) => (
                <Link
                  key={i}
                  href={`/blog_01?page=${i}`}
                  className={`iip-news__page-btn ${
                    i === currentPage ? "is-active" : ""
                  }`}
                >
                  {i + 1}
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* ĐƯỢC ĐỌC NHIỀU NHẤT */}
        <section className="iip-news__popular">
          <h2>Được đọc nhiều nhất</h2>
          <div className="iip-news__popular-grid">
            {mostViewed.content.map((item) => (
              <article key={item.id} className="iip-news__popular-card">
                {item.thumbnailUrl && (
                  <div className="iip-news__popular-thumb">
                    <Image
                      src={item.thumbnailUrl}
                      alt={item.title}
                      fill
                      className="iip-news__popular-thumb-img"
                    />
                  </div>
                )}
                <div className="iip-news__popular-body">
                  <p className="iip-news__popular-category">
                    {item.category}
                  </p>
                  <h3 className="iip-news__popular-title">
                    <Link href={`/blog/${item.slug}`}>{item.title}</Link>
                  </h3>
                  <p className="iip-news__popular-date">
                    {formatDate(item.publishedAt)}
                  </p>
                </div>
                <button
                  type="button"
                  className="iip-news__bookmark"
                  aria-label="Bookmark"
                >
                  ▮
                </button>
              </article>
            ))}
          </div>
        </section>
      </div>

    
    </main>
  )
}
