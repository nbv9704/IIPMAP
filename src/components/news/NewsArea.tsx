"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { getAllNews } from "@/data-iip/NewsDataMultilang"
import { useLanguage } from "@/hooks/useLanguage"
import { getTranslation } from "@/utils/translations"
import "@/styles-iip/news.scss"
import "@/styles-iip/news-detail.scss"

interface NewsAreaProps {
   category?: "qna" | "market" | "planning" | "activity"
}

const NewsArea = ({ category }: NewsAreaProps = {}) => {
   const { currentLang } = useLanguage()
   const news_data = getAllNews(currentLang)
   
   // Map category to filter ID
   const categoryToFilter: Record<string, string> = {
      qna: "hoi-dap",
      market: "tin-thi-truong",
      planning: "tin-quy-hoach",
      activity: "hoat-dong-iip"
   }
   
   const [bookmarkedItems, setBookmarkedItems] = useState<number[]>([])
   const [currentPage, setCurrentPage] = useState(1)
   const [currentBannerIndex, setCurrentBannerIndex] = useState(0)
   const [searchQuery, setSearchQuery] = useState("")
   
   // Filter news based on search query
   const filteredNews = searchQuery.trim() === "" 
      ? news_data 
      : news_data.filter(item => 
           item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           item.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
   
   // Pagination settings
   const ITEMS_PER_PAGE = 10
   const totalPages = Math.ceil(filteredNews.length / ITEMS_PER_PAGE)
   const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
   const endIndex = startIndex + ITEMS_PER_PAGE
   const currentNews = filteredNews.slice(startIndex, endIndex)
   
   // Reset to page 1 when search query changes
   useEffect(() => {
      setCurrentPage(1)
   }, [searchQuery])
   
   // Hero banner carousel - 3 tin đầu, auto-rotate mỗi 30s
   const heroBannerNews = news_data.slice(0, 3)
   
   useEffect(() => {
      const interval = setInterval(() => {
         setCurrentBannerIndex((prev) => (prev + 1) % heroBannerNews.length)
      }, 30000) // 30 seconds
      
      return () => clearInterval(interval)
   }, [heroBannerNews.length])

   const toggleBookmark = (id: number) => {
      setBookmarkedItems(prev => 
         prev.includes(id) 
            ? prev.filter(item => item !== id)
            : [...prev, id]
      )
   }

   return (
      <div className="news-area">
         {/* Hero Banner Carousel */}
         <div className="hero-banner" style={{ backgroundImage: `url(${heroBannerNews[currentBannerIndex]?.image || '/assets/images/listing/img_large_01.jpg'})` }}>
            <div className="hero-overlay"></div>
            <div className="hero-content">
               <h1>{heroBannerNews[currentBannerIndex]?.title || ''}</h1>
               <Link href={`/news/read/${heroBannerNews[currentBannerIndex]?.id || 2}`} className="btn-xem-them">
                  {getTranslation(currentLang, 'news.readMore')}
                  <i className="bi bi-arrow-right"></i>
               </Link>
            </div>
            {/* Carousel indicators - Moved outside hero-content */}
            <div className="carousel-indicators">
               {heroBannerNews.map((_, index) => (
                  <button
                     key={index}
                     className={`indicator ${index === currentBannerIndex ? 'active' : ''}`}
                     onClick={() => setCurrentBannerIndex(index)}
                     aria-label={`Go to slide ${index + 1}`}
                  />
               ))}
            </div>
         </div>

         <div className="container">
            {/* Search Section with Title */}
            <div className="search-section">
               <div className="section-title">
                  <h2>{getTranslation(currentLang, 'news.latest')}</h2>
               </div>
               <div className="search-box">
                  <input 
                     type="text" 
                     placeholder={getTranslation(currentLang, 'common.search')}
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <i className="bi bi-search"></i>
               </div>
            </div>

            <div className="news-list-horizontal">
               {currentNews.length === 0 ? (
                  <div style={{ 
                     textAlign: 'center', 
                     padding: '60px 20px',
                     color: '#6b7280',
                     fontSize: '16px'
                  }}>
                     {getTranslation(currentLang, 'common.noResults') || 'Không tìm thấy kết quả phù hợp'}
                  </div>
               ) : (
                  currentNews.map(item => (
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
                                 e.preventDefault();
                                 toggleBookmark(item.id);
                              }}
                           >
                              <i className={`bi ${bookmarkedItems.includes(item.id) ? 'bi-bookmark-fill' : 'bi-bookmark'}`}></i>
                           </button>
                        </div>
                     </div>
                  </Link>
                  ))
               )}
            </div>

            {/* Pagination - Dynamic */}
            <div className="pagination-wrapper">
               <button 
                  className="page-btn" 
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
               >
                  {'<'}
               </button>
               {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button 
                     key={page}
                     className={`page-btn ${currentPage === page ? 'active' : ''}`}
                     onClick={() => setCurrentPage(page)}
                  >
                     {page}
                  </button>
               ))}
               <button 
                  className="page-btn"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
               >
                  {'>'}
               </button>
            </div>

            {/* Được đọc nhiều nhất - Using related news card style */}
            <div className="section-title">
               <h2>{getTranslation(currentLang, 'news.mostRead')}</h2>
            </div>

            <div className="related-news-grid">
               {news_data.slice(0, 3).map(item => (
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
                                 e.preventDefault();
                                 toggleBookmark(item.id);
                              }}
                           >
                              <i className={`bi ${bookmarkedItems.includes(item.id) ? 'bi-bookmark-fill' : 'bi-bookmark'}`}></i>
                           </button>
                        </div>
                     </div>
                  </Link>
               ))}
            </div>
         </div>
      </div>
   )
}

export default NewsArea
