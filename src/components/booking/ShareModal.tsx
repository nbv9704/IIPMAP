"use client"

// ============================================
// IMPORTS
// ============================================
import { useState } from "react"
import { useLanguage } from "@/hooks/useLanguage"
import { getTranslation } from "@/utils/translations"

// ============================================
// TYPES
// ============================================
interface ShareModalProps {
  shareLink: string
  onClose: () => void
}

// ============================================
// COMPONENT
// ============================================
function ShareModal({ shareLink, onClose }: ShareModalProps) {
  // ============================================
  // STATE & HOOKS
  // ============================================
  const { currentLang } = useLanguage()
  const [searchUser, setSearchUser] = useState("")

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink)
  }

  return (
    <div className="share-modal-overlay" onClick={onClose}>
      <div className="share-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <i className="bi bi-x"></i>
        </button>

        <h2 className="modal-title">
          {getTranslation(currentLang, 'booking.share.title', 'Chia sẻ file này')}
        </h2>

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

        <div className="access-section">
          <h3>{getTranslation(currentLang, 'booking.share.peopleAccess', 'Người có quyền truy cập')}</h3>
          
          <div className="user-item">
            <div className="user-avatar">L</div>
            <div className="user-info">
              <span className="user-email">nguyenvana.iip</span>
            </div>
            <div className="user-role">
              {getTranslation(currentLang, 'booking.share.owner', 'Chủ sở hữu')}
            </div>
          </div>

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

        <div className="general-access-section">
          <h3>{getTranslation(currentLang, 'booking.share.generalAccess', 'Quyền truy cập chung')}</h3>
          
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
  )
}

export default ShareModal
