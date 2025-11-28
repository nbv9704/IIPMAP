"use client"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

interface NewsItem {
  id: number
  title: string
  image: string
  date: string
  excerpt?: string
}

interface NewsListHorizontalProps {
  news: NewsItem[]
}

function NewsListHorizontal({ news }: NewsListHorizontalProps) {
  const [bookmarkedItems, setBookmarkedItems] = useState<number[]>([])

  const toggleBookmark = (id: number) => {
    setBookmarkedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  return (
    <div className="news-list-horizontal">
      {news.map(item => (
        <Link href={`/news/read/${item.id}`} key={item.id} className="news-item-horizontal">
          <div className="news-image">
            <Image 
              src={item.image} 
              alt={item.title}
              width={516}
              height={290}
            />
          </div>
          <div className="news-content">
            <h3>{item.title}</h3>
            {item.excerpt && <p className="news-excerpt">{item.excerpt}</p>}
            <div className="news-footer">
              <span className="news-date">{item.date}</span>
              <button 
                className={`bookmark-btn ${bookmarkedItems.includes(item.id) ? 'active' : ''}`}
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
  )
}

export default NewsListHorizontal
