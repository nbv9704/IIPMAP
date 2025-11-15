"use client"

const HERO_STATS = [
  { label: "Khu công nghiệp", value: "1.000" },
  { label: "Cụm công nghiệp", value: "800" },
  { label: "Quy mô quỹ đất", value: "5.000 ha" },
  { label: "Tích hợp AI", value: "Tích hợp AI" },
]

const Banner = () => {
  return (
    <>
      <section className="iip-hero">
        <div className="iip-hero__bg" aria-hidden="true" />

        <div className="container iip-hero__container">
          <div className="iip-hero__content">
            {/* Pill Bản đồ số hóa */}
            <div className="iip-hero__pill">
              <span className="iip-hero__pill-icon">✨</span>
              <span>Bản đồ số hóa</span>
            </div>

            <h1 className="iip-hero__title">
              Kết nối các nhà đầu tư với các
              <br className="d-none d-md-block" /> khu công nghiệp trọng điểm
              toàn quốc
            </h1>

            <div className="iip-hero__stats">
              {HERO_STATS.map((item, index) => {
                const isTextOnly = item.label === "Tích hợp AI"
                const displayValue = item.value || item.label

                return (
                  <div key={item.label} className="iip-hero__stat-wrapper">
                    <div className="iip-hero__stat-card">
                      {!isTextOnly && (
                        <span className="iip-hero__stat-label">
                          {item.label}
                        </span>
                      )}
                      <strong className="iip-hero__stat-value">
                        {displayValue}
                      </strong>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        /* ===== HERO ===== */
        .iip-hero {
          position: relative;
          overflow: hidden;
          padding: 80px 16px 90px;
          color: #ffffff;
          background:
            radial-gradient(
              circle at 20% 0%,
              #3e7bf0 0%,
              #214fca 35%,
              #10188a 70%
            ),
            radial-gradient(circle at 100% 50%, #2fb3ff 0%, #06134e 55%);
          min-height: 100vh;
          display: flex;
          align-items: center;
        }

        .iip-hero__bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          mix-blend-mode: screen;
          opacity: 0.9;
          background-image: 
            radial-gradient(circle at 10% 20%, rgba(255,255,255,0.1) 0%, transparent 50%),
            radial-gradient(circle at 90% 80%, rgba(255,255,255,0.05) 0%, transparent 50%);
        }

        .iip-hero__container {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }

        .iip-hero__content {
          text-align: center;
          width: 100%;
        }

        /* ===== PILL TRÊN CÙNG ===== */
        .iip-hero__pill {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 28px;
          border-radius: 999px;
          background: #ffffff;
          color: #1b2a8f;
          font-size: 0.9rem;
          font-weight: 600;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.35);
          margin-bottom: 28px;
          position: relative;
          z-index: 2;
        }

       

        /* ===== TITLE ===== */
        .iip-hero__title {
          max-width: 800px;
          margin: 0 auto 36px;
          font-weight: 800;
          line-height: 1.25;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          position: relative;
          z-index: 2;
        }

        @media (min-width: 1200px) {
          .iip-hero__title {
            font-size: 2.4rem;
          }
        }

        @media (min-width: 768px) and (max-width: 1199px) {
          .iip-hero__title {
            font-size: 2rem;
          }
        }

        @media (max-width: 767px) {
          .iip-hero__title {
            font-size: 1.6rem;
            line-height: 1.3;
          }
        }

        /* ===== STATS ===== */
        .iip-hero__stats {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 24px;
          position: relative;
          z-index: 2;
        }

        .iip-hero__stat-wrapper {
          position: relative;
          flex: 0 1 240px;
          max-width: 240px;
        }

        .iip-hero__stat-card {
          position: relative;
          border-radius: 22px;
          padding: 14px 34px 20px;
          background:
            radial-gradient(
              circle at 0% 100%,
              rgba(255, 255, 255, 0.95) 0%,
              rgba(255, 255, 255, 0.22) 26%,
              rgba(255, 255, 255, 0) 55%
            ),
            linear-gradient(135deg, #3d63e6 0%, #1b2a8f 100%);
          border: 0.8px solid rgba(255, 255, 255, 0.55);
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.45);
          z-index: 1;
          backdrop-filter: blur(10px);
          transition: transform 0.3s ease;
        }

        .iip-hero__stat-card:hover {
          transform: translateY(-5px);
        }

        /* Vòng tròn trắng lớn dưới bên trái */
        .iip-hero__stat-wrapper::before {
          content: "";
          position: absolute;
          width: 74px;
          height: 74px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.8);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
          left: -18px;
          bottom: -34px;
          z-index: 0;
          opacity: 0.9;
        }

        /* Vòng tròn trắng nhỏ trên bên phải */
        .iip-hero__stat-wrapper::after {
          content: "";
          position: absolute;
          width: 30px;
          height: 30px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.7);
          box-shadow: 0 8px 18px rgba(0, 0, 0, 0.3);
          right: -16px;
          top: -16px;
          z-index: 0;
          opacity: 0.8;
        }

        .iip-hero__stat-label {
          display: block;
          font-size: 0.85rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-bottom: 6px;
          color: rgba(255, 255, 255, 0.9);
        }

        .iip-hero__stat-value {
          display: block;
          font-size: 1.7rem;
          font-weight: 800;
          color: #ffffff;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        /* Laptop/Desktop: 4 items in row */
        @media (min-width: 992px) {
          .iip-hero__stats {
            gap: 32px;
          }

          .iip-hero__stat-wrapper {
            flex: 0 1 220px;
          }
        }

        /* Tablet: 2 items per row */
        @media (max-width: 991px) {
          .iip-hero {
            padding: 64px 16px 80px;
          }

          .iip-hero__stats {
            gap: 20px;
          }

          .iip-hero__stat-wrapper {
            flex: 1 1 calc(50% - 20px);
            max-width: none;
          }

          .iip-hero__stat-wrapper::before {
            width: 60px;
            height: 60px;
            left: -15px;
            bottom: -30px;
          }

          .iip-hero__stat-wrapper::after {
            width: 25px;
            height: 25px;
            right: -12px;
            top: -12px;
          }
        }

        /* Mobile: 1 item per row, stack vertically */
        @media (max-width: 575px) {
          .iip-hero {
            padding: 56px 12px 64px;
            min-height: auto;
          }

          .iip-hero__pill {
            padding: 6px 24px;
            font-size: 0.85rem;
            margin-bottom: 24px;
          }

          .iip-hero__title {
            font-size: 1.4rem;
            margin-bottom: 32px;
          }

          .iip-hero__stats {
            gap: 16px;
            flex-direction: column;
            align-items: center;
          }

          .iip-hero__stat-wrapper {
            flex: 1 1 100%;
            max-width: 280px;
            width: 100%;
          }

          .iip-hero__stat-card {
            padding: 12px 26px 18px;
            border-radius: 18px;
          }

          .iip-hero__stat-value {
            font-size: 1.5rem;
          }

          .iip-hero__stat-wrapper::before {
            width: 56px;
            height: 56px;
            left: -12px;
            bottom: -26px;
          }

          .iip-hero__stat-wrapper::after {
            width: 24px;
            height: 24px;
            right: -10px;
            top: -12px;
          }
        }

        /* Extra small mobile */
        @media (max-width: 375px) {
          .iip-hero {
            padding: 48px 8px 56px;
          }

          .iip-hero__title {
            font-size: 1.3rem;
          }

          .iip-hero__stat-card {
            padding: 10px 20px 16px;
          }

          .iip-hero__stat-value {
            font-size: 1.4rem;
          }
        }

        /* Ensure container padding on small screens */
        .container {
          padding: 0 16px;
        }

        @media (min-width: 1200px) {
          .container {
            padding: 0;
          }
        }
      `}</style>
    </>
  )
}

export default Banner