"use client"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import news_data_iip from "@/data-iip/NewsDataIIP"

const NewsArea = () => {
   const [activeFilter, setActiveFilter] = useState("tin-thi-truong")
   const [bookmarkedItems, setBookmarkedItems] = useState<number[]>([])
   const [currentPage, setCurrentPage] = useState(1)

   const toggleBookmark = (id: number) => {
      setBookmarkedItems(prev => 
         prev.includes(id) 
            ? prev.filter(item => item !== id)
            : [...prev, id]
      )
   }

   const filters = [
      { id: "tin-thi-truong", label: "Tin thị trường" },
      { id: "tin-quy-hoach", label: "Tin quy hoạch" },
      { id: "hoat-dong-iip", label: "Hoạt động IIP" }
   ]

   return (
      <div className="news-area">
         {/* Hero Banner */}
         <div className="hero-banner">
            <div className="hero-overlay"></div>
            <div className="hero-content">
               <h1>Nam Định: Chấp thuận chủ trương đầu tư khu công nghiệp Hải Long giai đoạn 1</h1>
               <Link href="#" className="btn-xem-them">
                  Xem thêm
                  <i className="bi bi-arrow-right"></i>
               </Link>
            </div>
         </div>

         <div className="container">
            {/* Filter Section */}
            <div className="filter-section">
               <div className="filter-buttons">
                  {filters.map(filter => (
                     <button
                        key={filter.id}
                        className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
                        onClick={() => setActiveFilter(filter.id)}
                     >
                        {filter.label}
                     </button>
                  ))}
               </div>
               <div className="search-box">
                  <input type="text" placeholder="Tìm kiếm" />
                  <i className="bi bi-search"></i>
               </div>
            </div>

            {/* Bài viết mới nhất */}
            <div className="section-title">
               <h2>Bài viết mới nhất</h2>
            </div>

            <div className="news-list-horizontal">
               {news_data_iip.slice(0, 4).map(item => (
                  <div key={item.id} className="news-item-horizontal">
                     <div className="news-image">
                        <Image 
                           src={item.image} 
                           alt={item.title}
                           width={516}
                           height={290}
                        />
                     </div>
                     <div className="news-content">
                        <span className="news-category">{item.category}</span>
                        <h3>{item.title}</h3>
                        <div className="news-footer">
                           <span className="news-date">{item.date}</span>
                           <button 
                              className={`bookmark-btn ${bookmarkedItems.includes(item.id) ? 'active' : ''}`}
                              onClick={() => toggleBookmark(item.id)}
                           >
                              <i className={`bi ${bookmarkedItems.includes(item.id) ? 'bi-bookmark-fill' : 'bi-bookmark'}`}></i>
                           </button>
                        </div>
                     </div>
                  </div>
               ))}
            </div>

            {/* Pagination */}
            <div className="pagination-wrapper">
               <button 
                  className="page-btn" 
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
               >
                  {'<'}
               </button>
               <button 
                  className={`page-btn ${currentPage === 1 ? 'active' : ''}`}
                  onClick={() => setCurrentPage(1)}
               >
                  1
               </button>
               <button 
                  className={`page-btn ${currentPage === 2 ? 'active' : ''}`}
                  onClick={() => setCurrentPage(2)}
               >
                  2
               </button>
               <button 
                  className={`page-btn ${currentPage === 3 ? 'active' : ''}`}
                  onClick={() => setCurrentPage(3)}
               >
                  3
               </button>
               <button 
                  className="page-btn"
                  onClick={() => setCurrentPage(prev => Math.min(3, prev + 1))}
                  disabled={currentPage === 3}
               >
                  {'>'}
               </button>
            </div>

            {/* Được đọc nhiều nhất */}
            <div className="section-title">
               <h2>Được đọc nhiều nhất</h2>
            </div>

            <div className="news-grid-vertical">
               {news_data_iip.slice(0, 6).map(item => (
                  <div key={item.id} className="news-item-vertical">
                     <div className="news-image">
                        <Image 
                           src={item.image} 
                           alt={item.title}
                           width={318}
                           height={179}
                        />
                     </div>
                     <div className="news-content">
                        <span className="news-category">{item.category}</span>
                        <h4>{item.title}</h4>
                        <div className="news-footer">
                           <span className="news-date">{item.date}</span>
                           <button 
                              className={`bookmark-btn ${bookmarkedItems.includes(item.id) ? 'active' : ''}`}
                              onClick={() => toggleBookmark(item.id)}
                           >
                              <i className={`bi ${bookmarkedItems.includes(item.id) ? 'bi-bookmark-fill' : 'bi-bookmark'}`}></i>
                           </button>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   )
}

export default NewsArea
