// ============================================
// IMPORTS
// ============================================
"use client"
import { useState, useEffect, useMemo } from "react"
import { getAllNews } from "@/data/NewsDataMultilang"
import { useLanguage } from "@/hooks/useLanguage"
import { getTranslation } from "@/utils/translations"
import HeroBanner from "./HeroBanner"
import NewsListHorizontal from "./NewsListHorizontal"
import MostReadSection from "./MostReadSection"
import { useGetFeaturedNewsQuery, useGetLatestNewsQuery, useGetMostReadNewsQuery } from "@/redux/slice/newsApiSlice"
import "@/styles/news.scss"
import "@/styles/news-detail.scss"

// ============================================
// TYPES
// ============================================
interface NewsAreaProps {
   category?: "qna" | "market" | "planning" | "activity"
}

// ============================================
// COMPONENT: NewsArea
// ============================================
const NewsArea = ({ category }: NewsAreaProps = {}) => {
   // ========== Hooks ==========
   const { currentLang } = useLanguage()
   
   // ✅ RTK Query API calls (following VNG004's pattern)
   const { data: apiFeatured, error: errorFeatured } = useGetFeaturedNewsQuery(3)
   const { data: apiMostRead, error: errorMostRead } = useGetMostReadNewsQuery(3)
   
   // ✅ Mock data fallback (for testing phase)
   const mockNews = useMemo(() => getAllNews(currentLang), [currentLang])
   
   // ✅ Determine data source
   const USE_MOCK_FEATURED = !apiFeatured || errorFeatured
   const USE_MOCK_MOST_READ = !apiMostRead || errorMostRead
   
   // ✅ Transform API data (when backend ready)
   const transformApiToNews = (news: typeof apiFeatured) => {
     if (!news) return []
     return news.map(n => ({
       id: parseInt(n.id) || 0,
       title: n.title,
       image: n.thumbnail || n.images?.[0] || "/assets/images/listing/img_01.jpg",
       date: new Date(n.publishedAt).toLocaleDateString('vi-VN'),
       excerpt: n.excerpt,
       category: n.category,
       likes: n.likes,
       comments: n.comments,
     }))
   }
   
   // ✅ Select data to display
   const news_data = mockNews // Use mock for main list (will be replaced with API pagination)
   const heroBannerNews = USE_MOCK_FEATURED ? mockNews.slice(0, 3) : transformApiToNews(apiFeatured)
   const mostReadNews = USE_MOCK_MOST_READ ? mockNews.slice(0, 3) : transformApiToNews(apiMostRead)
   
   // 🔍 Debug logging
   console.log("📰 NewsArea - Featured:", USE_MOCK_FEATURED ? "📦 Mock" : "🌐 API")
   console.log("📰 NewsArea - MostRead:", USE_MOCK_MOST_READ ? "📦 Mock" : "🌐 API")
   
   // ========== Constants ==========
   // Map category to filter ID
   const categoryToFilter: Record<string, string> = {
      qna: "hoi-dap",
      market: "tin-thi-truong",
      planning: "tin-quy-hoach",
      activity: "hoat-dong-iip"
   }
   
   // ========== State Management ==========
   const [currentPage, setCurrentPage] = useState(1)
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
   
   useEffect(() => {
      setCurrentPage(1)
   }, [searchQuery])
   
   return (
      <div className="news-area">
         <HeroBanner news={heroBannerNews} />

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
               <NewsListHorizontal news={currentNews} />
            )}

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

            <MostReadSection news={mostReadNews} />
         </div>
      </div>
   )
}

export default NewsArea
