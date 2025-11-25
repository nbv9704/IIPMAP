"use client";
import React, { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { getTranslation } from "@/utils/translations";

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

const BookingArea = () => {
  const { currentLang } = useLanguage();
  const [formName, setFormName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareLink, setShareLink] = useState("");
  const [searchUser, setSearchUser] = useState("");
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
    const link = `${window.location.origin}/booking/shared/${Date.now()}`;
    setShareLink(link);
    setShowShareModal(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink);
  };

  const closeModal = () => {
    setShowShareModal(false);
    setSearchUser("");
  };

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

        {/* Schedule Table */}
        <div className="schedule-table">
          {/* Table Header */}
          <div className="table-header">
            <div className="col-stt">{getTranslation(currentLang, 'booking.table.stt')}</div>
            <div className="col-content">{getTranslation(currentLang, 'booking.table.content')}</div>
            <div className="col-link">{getTranslation(currentLang, 'booking.table.link')}</div>
            <div className="col-start">{getTranslation(currentLang, 'booking.table.start')}</div>
            <div className="col-end">{getTranslation(currentLang, 'booking.table.end')}</div>
            <div className="col-note">{getTranslation(currentLang, 'booking.table.note')}</div>
          </div>

          {/* Table Body */}
          {currentItems.map((item, index) => (
            <div key={item.id} className="table-row">
              <div className="col-stt">{startIndex + index + 1}</div>
              
              <div className="col-content">
                <input
                  type="text"
                  value={item.content}
                  onChange={(e) => updateItem(item.id, "content", e.target.value)}
                  placeholder={getTranslation(currentLang, 'booking.placeholders.content')}
                />
              </div>

              <div className="col-link">
                <select
                  value={item.linkType}
                  onChange={(e) => updateItem(item.id, "linkType", e.target.value)}
                >
                  <option value="">{getTranslation(currentLang, 'booking.linkTypes.choose')}</option>
                  <option value="article">{getTranslation(currentLang, 'booking.linkTypes.article')}</option>
                  <option value="video">{getTranslation(currentLang, 'booking.linkTypes.video')}</option>
                </select>
                {item.linkType && (
                  <input
                    type="text"
                    value={item.linkUrl}
                    onChange={(e) => updateItem(item.id, "linkUrl", e.target.value)}
                    placeholder={getTranslation(currentLang, 'booking.placeholders.url')}
                    className="link-url-input"
                  />
                )}
              </div>

              <div className="col-start">
                <input
                  type="time"
                  value={item.startTime}
                  onChange={(e) => updateItem(item.id, "startTime", e.target.value)}
                />
                <input
                  type="date"
                  value={item.startDate}
                  onChange={(e) => updateItem(item.id, "startDate", e.target.value)}
                />
              </div>

              <div className="col-end">
                <button className="time-picker-btn">
                  <i className="bi bi-clock"></i>
                </button>
              </div>

              <div className="col-note">
                <button className="note-btn">
                  <i className="bi bi-pencil"></i>
                </button>
                <button className="bookmark-btn">
                  <i className="bi bi-bookmark"></i>
                </button>
                <button className="delete-btn" onClick={() => deleteItem(item.id)}>
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            </div>
          ))}
        </div>

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

        {/* Share Modal */}
        {showShareModal && (
          <div className="share-modal-overlay" onClick={closeModal}>
            <div className="share-modal" onClick={(e) => e.stopPropagation()}>
              {/* Close button */}
              <button className="modal-close" onClick={closeModal}>
                <i className="bi bi-x"></i>
              </button>

              {/* Modal header */}
              <h2 className="modal-title">
                {getTranslation(currentLang, 'booking.share.title', 'Chia sẻ file này')}
              </h2>

              {/* Copy link section */}
              <div className="share-link-section">
                <div className="share-link-input">
                  <input type="text" value={shareLink} readOnly />
                  <button className="copy-btn" onClick={copyToClipboard}>
                    <i className="bi bi-files"></i>
                  </button>
                </div>
                <span className="copy-text">
                  {getTranslation(currentLang, 'booking.share.copyLink', 'Copy link')}
                </span>
              </div>

              <div className="modal-divider"></div>

              {/* People with access */}
              <div className="access-section">
                <h3>{getTranslation(currentLang, 'booking.share.peopleAccess', 'Người có quyền truy cập')}</h3>
                
                {/* Owner */}
                <div className="user-item">
                  <div className="user-avatar">L</div>
                  <div className="user-info">
                    <span className="user-email">nguyenvana.iip</span>
                  </div>
                  <div className="user-role">
                    {getTranslation(currentLang, 'booking.share.owner', 'Chủ sở hữu')}
                  </div>
                </div>

                {/* Other users */}
                <div className="user-item">
                  <div className="user-avatar">L</div>
                  <div className="user-info">
                    <span className="user-email">nguyenvanb.iip</span>
                  </div>
                  <div className="user-role-dropdown">
                    <select>
                      <option>{getTranslation(currentLang, 'booking.share.viewer', 'Người xem')}</option>
                      <option>{getTranslation(currentLang, 'booking.share.commenter', 'Người nhận xét')}</option>
                      <option>{getTranslation(currentLang, 'booking.share.editor', 'Người chỉnh sửa')}</option>
                    </select>
                  </div>
                </div>

                <div className="user-item">
                  <div className="user-avatar">L</div>
                  <div className="user-info">
                    <span className="user-email">nguyenvanc.iip</span>
                  </div>
                  <div className="user-role-dropdown">
                    <select>
                      <option>{getTranslation(currentLang, 'booking.share.commenter', 'Người nhận xét')}</option>
                      <option>{getTranslation(currentLang, 'booking.share.viewer', 'Người xem')}</option>
                      <option>{getTranslation(currentLang, 'booking.share.editor', 'Người chỉnh sửa')}</option>
                    </select>
                  </div>
                </div>

                <div className="user-item">
                  <div className="user-avatar">L</div>
                  <div className="user-info">
                    <span className="user-email">nguyenthia.iip</span>
                  </div>
                  <div className="user-role-dropdown">
                    <select>
                      <option>{getTranslation(currentLang, 'booking.share.editor', 'Người chỉnh sửa')}</option>
                      <option>{getTranslation(currentLang, 'booking.share.viewer', 'Người xem')}</option>
                      <option>{getTranslation(currentLang, 'booking.share.commenter', 'Người nhận xét')}</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* General access */}
              <div className="general-access-section">
                <h3>{getTranslation(currentLang, 'booking.share.generalAccess', 'Quyền truy cập chung')}</h3>
                
                {/* Add user search */}
                <div className="add-user-section">
                  <div className="search-input">
                    <input
                      type="text"
                      placeholder={getTranslation(currentLang, 'booking.share.searchPlaceholder', 'Nhập tên để mời thêm vào')}
                      value={searchUser}
                      onChange={(e) => setSearchUser(e.target.value)}
                    />
                    <button className="search-btn">
                      {getTranslation(currentLang, 'booking.share.invite', 'Mời')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingArea;
