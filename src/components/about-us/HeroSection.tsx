"use client"

import { STATS_DATA } from "@/constants"

function HeroSection() {
  return (
    <section className="about-hero-section">
      <div className="about-hero-overlay"></div>
      <div className="about-hero-content">
        <h1>XÚC TIẾN ĐẦU TƯ BẤT ĐỘNG SẢN CÔNG NGHIỆP CÔNG NGHỆ 4.0</h1>
      </div>
      
      <div className="about-stats">
        {STATS_DATA.map((stat, index) => (
          <div key={index} className="about-stat-item">
            <div className="stat-divider"></div>
            <span className="stat-label">{stat.label}</span>
            <h3 className="stat-number">{stat.number}</h3>
          </div>
        ))}
      </div>
    </section>
  )
}

export default HeroSection
