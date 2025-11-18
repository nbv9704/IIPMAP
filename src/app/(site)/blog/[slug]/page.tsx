import Image from "next/image"
import Link from "next/link"
import { fetchMostViewedNews, fetchNewsDetail } from "@/lib/api/news"
import type { NewsListItem } from "@/types/news"

type Props = {
  params: { slug: string }
  searchParams?: { lang?: string }
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString("vi-VN")
}

export default async function NewsDetailPage({ params, searchParams }: Props) {
  const lang = searchParams?.lang ?? "vi"
  const slug = params.slug

  const [detail, mostViewed] = await Promise.all([
    fetchNewsDetail(slug, lang),
    fetchMostViewedNews(lang, 0, 4),
  ])

  if (!detail) {
    return (
      <main className="container" style={{ padding: "40px 0" }}>
        <p>Không tìm thấy bài viết.</p>
      </main>
    )
  }

  const contentParagraphs = detail.content
    ? detail.content.split(/\n\s*\n/)
    : []

  return (
    <main className="iip-news-detail">
      <div className="container iip-news-detail__body">
        <div className="iip-news-detail__main">
          <Link href="/blog_01" className="iip-news-detail__back">
            ← Quay lại danh sách
          </Link>

          <p className="iip-news-detail__category">{detail.category}</p>
          <h1 className="iip-news-detail__title">{detail.title}</h1>
          <p className="iip-news-detail__meta">
            {formatDate(detail.publishedAt)} · {detail.viewCount} lượt xem
          </p>

          {detail.coverImageUrl && (
            <div className="iip-news-detail__cover">
              <Image
                src={detail.coverImageUrl}
                alt={detail.title}
                fill
                className="iip-news-detail__cover-img"
              />
            </div>
          )}

          <div className="iip-news-detail__content">
            {contentParagraphs.length === 0 ? (
              <p>{detail.content}</p>
            ) : (
              contentParagraphs.map((p, i) => (
                <p key={i} className="iip-news-detail__paragraph">
                  {p.trim()}
                </p>
              ))
            )}
          </div>

          {/* Bình luận – tạm thời static */}
          <section className="iip-news-detail__comments">
            <h2>Bình luận</h2>
            <div className="iip-news-detail__comment-list">
              <div className="iip-news-detail__comment">
                <div className="iip-news-detail__comment-avatar">U</div>
                <div className="iip-news-detail__comment-body">
                  <p className="iip-news-detail__comment-name">User1</p>
                  <p className="iip-news-detail__comment-text">
                    Perfect for watching
                  </p>
                  <p className="iip-news-detail__comment-meta">11/10/2025 · reply</p>
                </div>
              </div>
            </div>
            <form className="iip-news-detail__comment-form">
              <textarea
                className="iip-news-detail__comment-input"
                placeholder="Nhập bình luận..."
              />
              <button type="submit" className="iip-news-detail__comment-submit">
                Gửi
              </button>
            </form>
          </section>

          {/* LIÊN QUAN */}
          <section className="iip-news-detail__related">
            <h2>Các bài viết liên quan</h2>
            <div className="iip-news-detail__related-grid">
              {mostViewed.content.map((item: NewsListItem) => (
                <article
                  key={item.id}
                  className="iip-news-detail__related-card"
                >
                  {item.thumbnailUrl && (
                    <div className="iip-news-detail__related-thumb">
                      <Image
                        src={item.thumbnailUrl}
                        alt={item.title}
                        fill
                        className="iip-news-detail__related-thumb-img"
                      />
                    </div>
                  )}
                  <div className="iip-news-detail__related-body">
                    <p className="iip-news-detail__related-category">
                      {item.category}
                    </p>
                    <h3 className="iip-news-detail__related-title">
                      <Link href={`/blog/${item.slug}`}>{item.title}</Link>
                    </h3>
                    <p className="iip-news-detail__related-date">
                      {formatDate(item.publishedAt)}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>

      <style jsx>{`
        .iip-news-detail__body {
          padding: 32px 0 60px;
        }
        .iip-news-detail__main {
          max-width: 760px;
          margin: 0 auto;
        }
        .iip-news-detail__back {
          display: inline-block;
          font-size: 14px;
          color: #2563eb;
          margin-bottom: 8px;
        }
        .iip-news-detail__category {
          font-size: 14px;
          color: #6b7280;
          margin-bottom: 4px;
        }
        .iip-news-detail__title {
          font-size: 24px;
          margin: 0 0 8px 0;
        }
        .iip-news-detail__meta {
          font-size: 13px;
          color: #6b7280;
          margin-bottom: 16px;
        }
        .iip-news-detail__cover {
          position: relative;
          width: 100%;
          padding-top: 60%;
          margin-bottom: 12px;
        }
        .iip-news-detail__cover-img {
          object-fit: cover;
          position: absolute;
          inset: 0;
        }
        .iip-news-detail__content {
          font-size: 15px;
          line-height: 1.7;
          color: #111827;
          margin-top: 8px;
        }
        .iip-news-detail__paragraph + .iip-news-detail__paragraph {
          margin-top: 10px;
        }
        .iip-news-detail__comments {
          margin-top: 32px;
        }
        .iip-news-detail__comments h2 {
          font-size: 18px;
          margin-bottom: 12px;
        }
        .iip-news-detail__comment-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 16px;
        }
        .iip-news-detail__comment {
          display: flex;
          gap: 10px;
        }
        .iip-news-detail__comment-avatar {
          width: 32px;
          height: 32px;
          border-radius: 999px;
          background: #ef4444;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
        }
        .iip-news-detail__comment-name {
          font-size: 14px;
          font-weight: 600;
        }
        .iip-news-detail__comment-text {
          font-size: 14px;
          margin: 2px 0;
        }
        .iip-news-detail__comment-meta {
          font-size: 12px;
          color: #6b7280;
        }
        .iip-news-detail__comment-form {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .iip-news-detail__comment-input {
          border-radius: 8px;
          border: 1px solid #d1d5db;
          padding: 8px 10px;
          min-height: 80px;
          font-size: 14px;
        }
        .iip-news-detail__comment-submit {
          align-self: flex-end;
          padding: 8px 18px;
          border-radius: 999px;
          border: none;
          background: #2563eb;
          color: #fff;
          font-size: 14px;
          cursor: pointer;
        }
        .iip-news-detail__related {
          margin-top: 36px;
        }
        .iip-news-detail__related-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
        }
        @media (min-width: 992px) {
          .iip-news-detail__related-grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }
        }
        .iip-news-detail__related-card {
          border-radius: 8px;
          border: 1px solid #e5e7eb;
          overflow: hidden;
          background: #fff;
        }
        .iip-news-detail__related-thumb {
          position: relative;
          width: 100%;
          padding-top: 66%;
        }
        .iip-news-detail__related-thumb-img {
          object-fit: cover;
          position: absolute;
          inset: 0;
        }
        .iip-news-detail__related-body {
          padding: 8px 10px 10px;
        }
        .iip-news-detail__related-category {
          font-size: 12px;
          color: #6b7280;
          margin-bottom: 4px;
        }
        .iip-news-detail__related-title {
          font-size: 14px;
          margin: 0 0 4px 0;
        }
        .iip-news-detail__related-date {
          font-size: 12px;
          color: #6b7280;
        }
      `}</style>
    </main>
  )
}
