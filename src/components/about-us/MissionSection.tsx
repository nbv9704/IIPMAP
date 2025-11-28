"use client"

function MissionSection() {
  return (
    <section className="about-mission-section">
      <div className="mission-content">
        <h2 className="section-title-white">Sứ mệnh</h2>
        
        <div className="mission-circle-container">
          <div className="mission-main-circle">
            <div className="mission-center-content">
              <h3>Tìm kiếm nhà đầu tư</h3>
              <p>
                Đối với doanh nghiệp trong nước có nhu cầu cần tài trợ vốn, 
                ngoài việc tư vấn phương án, thủ tục pháp lý, các chuyên gia 
                của IIP VIETNAM còn phải thể hiện vai trò lớn hơn là tìm kiếm 
                nhà đầu tư phù hợp để tham gia vào mỗi thương vụ.
              </p>
            </div>
          </div>
          
          <div className="curved-text curved-text-1">Tư vấn đầu tư</div>
          <div className="curved-text curved-text-2">Tìm kiếm nhà đầu tư</div>
          <div className="curved-text curved-text-3">Cầu nối các bên</div>
          <div className="curved-text curved-text-4">Cung cấp thông tin</div>
          
          <div className="mission-dot mission-dot-1"></div>
          <div className="mission-dot mission-dot-2"></div>
        </div>
        
        <button className="mission-nav-btn mission-nav-prev">
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path d="M7 1L1 5.5L7 10" stroke="white" strokeWidth="2"/>
          </svg>
        </button>
        <button className="mission-nav-btn mission-nav-next">
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path d="M4 1L10 5.5L4 10" stroke="white" strokeWidth="2"/>
          </svg>
        </button>
      </div>
    </section>
  )
}

export default MissionSection
