"use client"

// ============================================
// IMPORTS
// ============================================
import { useState } from "react"
import { SERVICE_OPTIONS } from "@/constants"

// ============================================
// COMPONENT
// ============================================
function ContactSection() {
  // ============================================
  // STATE
  // ============================================
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    service: "",
  })
  const [showServiceDropdown, setShowServiceDropdown] = useState(false)

  // ============================================
  // HANDLERS
  // ============================================
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleServiceSelect = (service: string) => {
    setFormData((prev) => ({ ...prev, service }))
    setShowServiceDropdown(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  return (
    <section className="about-contact-section">
      <div className="container">
        <h2 className="section-title">Liên hệ</h2>
        <div className="contact-form-wrapper">
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <div className="form-left">
                <div className="form-group">
                  <label>Họ và tên</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Nguyễn Văn A"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="abc123@gmail.com"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <label>Số điện thoại</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="012345789"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <label>Dịch vụ</label>
                  <div className="custom-dropdown">
                    <button
                      type="button"
                      className="dropdown-trigger"
                      onClick={() => setShowServiceDropdown(!showServiceDropdown)}
                    >
                      <span>{formData.service || "Chọn dịch vụ"}</span>
                      <svg width="12" height="6" viewBox="0 0 12 6" fill="none">
                        <path d="M1 1L6 5L11 1" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </button>
                    {showServiceDropdown && (
                      <div className="dropdown-menu">
                        {SERVICE_OPTIONS.map((service, idx) => (
                          <button
                            key={idx}
                            type="button"
                            className={`dropdown-item ${formData.service === service ? 'selected' : ''}`}
                            onClick={() => handleServiceSelect(service)}
                          >
                            {service}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="form-right">
                <div className="form-group form-group-message">
                  <label>Để lại lời nhắn cho chúng tôi</label>
                  <textarea
                    name="message"
                    placeholder="Nhập nội dung..."
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={8}
                  />
                </div>
              </div>
            </div>
            
            <div className="form-submit">
              <button type="submit" className="btn-submit">
                Gửi
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
