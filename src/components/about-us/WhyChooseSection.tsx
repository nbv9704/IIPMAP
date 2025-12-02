// ============================================
// IMPORTS
// ============================================
"use client"

import { WHY_CHOOSE_DATA } from "@/constants"

// ============================================
// COMPONENT: WhyChooseSection
// ============================================
function WhyChooseSection() {
  // ========== Render ==========
  return (
    <section className="about-why-section">
      <div className="container">
        <h2 className="section-title">Tại sao nên chọn IIP</h2>
        <div className="why-grid">
          {WHY_CHOOSE_DATA.map((item) => (
            <div key={item.id} className="why-card">
              <div className="why-circle">
                <div className="why-image-placeholder"></div>
              </div>
              <h4>{item.title}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseSection
