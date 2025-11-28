"use client"

import { PARTNERS_DATA } from "@/constants"

function PartnersSection() {
  return (
    <section className="about-partners-section">
      <div className="container">
        <h2 className="section-title">Đối tác</h2>
        <div className="partners-slider">
          <div className="partners-track">
            {[...PARTNERS_DATA, ...PARTNERS_DATA, ...PARTNERS_DATA].map((partner, index) => (
              <div key={index} className="partner-logo">
                <div className="partner-placeholder">{partner.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default PartnersSection
