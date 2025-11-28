"use client"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/hooks/useLanguage"
import { getTranslation } from "@/utils/translations"

interface NewsItem {
  id: number
  title: string
  image: string
  date: string
  excerpt?: string
}

interface MostReadSectionProps {
  news: NewsItem[]
}

function MostReadSection({ news }: MostReadSectionProps) {
  const { currentLang } = useLanguage()
  const [bookmarkedItems, setBookmarkedItems] = useState<number[]>([])

  const toggleBookmark = (id: number) => {
    setBookmarkedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  return (
    <>
      <div className="section-title">
        <h2>{getTranslation(currentLang, 'news.mostRead')}</h2>
      </div>

      <div className="related-news-grid">
        {news.map(item => (
          <Link href={`/news/read/${item.id}`} key={item.id} className="related-news-card">
            <div className="related-news-image">
              <Image 
                src={item.image} 
                alt={item.title}
                width={318}
                height={179}
                style={{ width: "100%", height: "auto" }}
              />
            </div>
            <div className="related-news-info">
              <h3 className="related-news-title-text">{item.title}</h3>
              {item.excerpt && <p className="related-news-excerpt">{item.excerpt}</p>}
              <div className="related-news-footer">
                <span className="related-news-date">{item.date}</span>
                <button 
                  className={`related-news-bookmark ${bookmarkedItems.includes(item.id) ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault()
                    toggleBookmark(item.id)
                  }}
                >
                  <i className={`bi ${bookmarkedItems.includes(item.id) ? 'bi-bookmark-fill' : 'bi-bookmark'}`}></i>
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}

export default MostReadSection
