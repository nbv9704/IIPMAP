// ============================================
// IMPORTS
// ============================================
"use client"
import React, { useState } from "react"
import { useLanguage } from "@/hooks/useLanguage"
import { getTranslation } from "@/utils/translations"
import ScheduleTable from "./ScheduleTable"
import ShareModal from "./ShareModal"

// ============================================
// TYPES
// ============================================
interface ScheduleItem {
  id: number;
  content: string;
  linkType: "article" | "video" | "";
  linkUrl: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  note: string;
}

// ============================================
// COMPONENT: BookingArea
// ============================================
const BookingArea = () => {
  // ========== Hooks ==========
  const { currentLang } = useLanguage();
  
  // ========== State Management ==========
  const [formName, setFormName] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const [showShareModal, setShowShareModal] = useState(false)
  const [shareLink, setShareLink] = useState("")
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([
    {
      id: 1,
      content: "Đón đoàn tại khách sạn trên phố",
      linkType: "article",
      linkUrl: "/news/read/1",
      startDate: "2025-11-12",
      startTime: "07:30",
      endDate: "2025-11-12",
      endTime: "08:00",
      note: "",
    },
  ]);

  // Pagination logic
  const totalPages = Math.ceil(scheduleItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = scheduleItems.slice(startIndex, endIndex);

  const addNewItem = () => {
    const newItem: ScheduleItem = {
      id: Date.now(),
      content: "",
      linkType: "",
      linkUrl: "",
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
      note: "",
    };
    setScheduleItems([...scheduleItems, newItem]);
  };

  const deleteItem = (id: number) => {
    setScheduleItems(scheduleItems.filter((item) => item.id !== id));
  };

  const updateItem = (id: number, field: keyof ScheduleItem, value: string) => {
    setScheduleItems(
      scheduleItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleShare = () => {
    const link = `${window.location.origin}/booking/shared/${Date.now()}`
    setShareLink(link)
    setShowShareModal(true)
  }

  const closeModal = () => {
    setShowShareModal(false)
  }

  return (
    <div className="booking-area">
      {/* Hero Banner */}
      <div className="booking-hero">
        <h1>{getTranslation(currentLang, 'booking.title')}</h1>
      </div>

      <div className="booking-container">
        {/* Form Name Input */}
        <div className="form-name-section">
          <label>{getTranslation(currentLang, 'booking.formName')}</label>
          <div className="form-name-input">
            <input
              type="text"
              placeholder={getTranslation(currentLang, 'booking.formPlaceholder')}
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
            />
            <i className="bi bi-search"></i>
          </div>
        </div>

        <ScheduleTable 
          items={currentItems}
          startIndex={startIndex}
          onUpdate={updateItem}
          onDelete={deleteItem}
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination-wrapper">
            <button
              className="page-btn"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              {"<"}
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`page-btn ${currentPage === page ? "active" : ""}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
            <button
              className="page-btn"
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              {">"}
            </button>
          </div>
        )}

        {/* Action Buttons */}
        <div className="action-buttons">
          <button className="btn-add" onClick={addNewItem}>
            {getTranslation(currentLang, 'booking.buttons.add')}
          </button>
          <button className="btn-export">
            {getTranslation(currentLang, 'booking.buttons.export')}
          </button>
          <button className="btn-share" onClick={handleShare}>
            <i className="bi bi-share"></i>
          </button>
        </div>

        {/* Map Placeholder */}
        <div className="map-section">
          <div className="map-placeholder">
            <p>{getTranslation(currentLang, 'booking.map.placeholder')}</p>
            <p className="text-muted">{getTranslation(currentLang, 'booking.map.description')}</p>
          </div>
        </div>

        {showShareModal && (
          <ShareModal shareLink={shareLink} onClose={closeModal} />
        )}
      </div>
    </div>
  );
};

export default BookingArea;
