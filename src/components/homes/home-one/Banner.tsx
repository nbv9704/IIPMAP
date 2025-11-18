"use client";

import { useTranslation } from "react-i18next";

type HeroStat = {
  label: string;
  value: string;
  textOnly?: boolean;
};

const Banner = () => {
  const { t } = useTranslation("common");

  const heroStats = t("hero.stats", {
    returnObjects: true,
  }) as HeroStat[];

  return (
    <>
      <section className="iip-hero">
        <div className="iip-hero__bg" aria-hidden={true} />

        <div className="container iip-hero__container">
          <div className="iip-hero__content">
            {/* Pill Bản đồ số hóa */}
            <div className="iip-hero__pill">
              <span className="iip-hero__pill-icon">✨</span>
              <span>{t("hero.pill")}</span>
            </div>

            {/* TIÊU ĐỀ 2 DÒNG */}
            <h1 className="iip-hero__title">
              {t("hero.titleLine1")}
              <br />
              {t("hero.titleLine2")}
            </h1>

            {/* 4 Ô STATS 1 HÀNG TRÊN DESKTOP */}
            <div className="iip-hero__stats">
              {heroStats.map((item) => {
                const isTextOnly = item.textOnly;
                const displayValue = item.value || item.label;

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
                );
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
          padding: 56px 16px 64px;
          color: #ffffff;
          background:
            radial-gradient(
              circle at 20% 0%,
              #3e7bf0 0%,
              #214fca 35%,
              #10188a 70%
            ),
            radial-gradient(circle at 100% 50%, #2fb3ff 0%, #06134e 55%);
          min-height: 50vh;
          display: flex;
          align-items: center;
        }

        @media (max-width: 991px) {
          .iip-hero {
            min-height: auto;
            padding: 48px 16px 56px;
          }
        }

        .iip-hero__bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          mix-blend-mode: screen;
          opacity: 0.9;
          background-image:
            radial-gradient(
              circle at 10% 20%,
              rgba(255, 255, 255, 0.1) 0%,
              transparent 50%
            ),
            radial-gradient(
              circle at 90% 80%,
              rgba(255, 255, 255, 0.05) 0%,
              transparent 50%
            );
        }

        .iip-hero__container {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }

        .iip-hero__content {
          width: 100%;
          max-width: 900px; /* rộng hơn -> text chỉ 2 dòng */
          text-align: left;
        }

        @media (min-width: 992px) {
          .iip-hero__content {
            margin-left: 40px; /* lệch trái giống thiết kế */
          }
        }

        @media (max-width: 767px) {
          .iip-hero__content {
            max-width: 100%;
            margin: 0 auto;
            text-align: center;
          }
        }

        /* ===== PILL TRÊN CÙNG ===== */
        .iip-hero__pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 22px;
          border-radius: 999px;
          background: #ffffff;
          color: #1b2a8f;
          font-size: 0.85rem;
          font-weight: 600;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
          margin-bottom: 20px;
          position: relative;
          z-index: 2;
        }

        .iip-hero__pill-icon {
          font-size: 1rem;
        }

        /* ===== TITLE 2 DÒNG, FONT SERIF ===== */
        .iip-hero__title {
          max-width: 900px;
          margin: 0 0 28px 0;
          font-family: "Times New Roman", Times, serif;
          font-weight: 700;
          line-height: 1.2;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          position: relative;
          z-index: 2;
        }

        @media (min-width: 1200px) {
          .iip-hero__title {
            font-size: 2.1rem;
          }
        }

        @media (min-width: 768px) and (max-width: 1199px) {
          .iip-hero__title {
            font-size: 1.8rem;
          }
        }

        @media (max-width: 767px) {
          .iip-hero__title {
            max-width: 100%;
            margin: 0 auto 24px;
            font-size: 1.4rem;
            line-height: 1.3;
          }
        }

        /* ===== STATS ===== */
        .iip-hero__stats {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-start;
          gap: 18px;
          position: relative;
          z-index: 2;
        }

        /* Desktop: 4 ô 1 hàng, không wrap */
        @media (min-width: 992px) {
          .iip-hero__stats {
            flex-wrap: nowrap;
          }
        }

        @media (max-width: 767px) {
          .iip-hero__stats {
            justify-content: center;
          }
        }

        .iip-hero__stat-wrapper {
          position: relative;
          flex: 0 1 210px;
          max-width: 210px;
        }

        .iip-hero__stat-card {
          position: relative;
          border-radius: 18px;
          padding: 10px 24px 16px;
          background:
            radial-gradient(
              circle at 0% 100%,
              rgba(255, 255, 255, 0.95) 0%,
              rgba(255, 255, 255, 0.22) 26%,
              rgba(255, 255, 255, 0) 55%
            ),
            linear-gradient(135deg, #3d63e6 0%, #1b2a8f 100%);
          border: 0.8px solid rgba(255, 255, 255, 0.55);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.4);
          z-index: 1;
          backdrop-filter: blur(8px);
          transition: transform 0.3s ease;
        }

        .iip-hero__stat-card:hover {
          transform: translateY(-4px);
        }

        .iip-hero__stat-wrapper::before {
          content: "";
          position: absolute;
          width: 60px;
          height: 60px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.8);
          box-shadow: 0 8px 18px rgba(0, 0, 0, 0.3);
          left: -16px;
          bottom: -30px;
          z-index: 0;
          opacity: 0.9;
        }

        .iip-hero__stat-wrapper::after {
          content: "";
          position: absolute;
          width: 26px;
          height: 26px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.7);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
          right: -14px;
          top: -14px;
          z-index: 0;
          opacity: 0.8;
        }

        .iip-hero__stat-label {
          display: block;
          font-size: 0.8rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-bottom: 4px;
          color: rgba(255, 255, 255, 0.9);
        }

        .iip-hero__stat-value {
          display: block;
          font-size: 1.4rem;
          font-weight: 800;
          color: #ffffff;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          font-family: "Times New Roman", Times, serif;
        }

        @media (max-width: 991px) {
          .iip-hero__stats {
            gap: 16px;
          }

          .iip-hero__stat-wrapper {
            flex: 1 1 calc(50% - 16px);
            max-width: none;
          }

          .iip-hero__stat-wrapper::before {
            width: 52px;
            height: 52px;
            left: -12px;
            bottom: -24px;
          }

          .iip-hero__stat-wrapper::after {
            width: 22px;
            height: 22px;
            right: -10px;
            top: -10px;
          }
        }

        @media (max-width: 575px) {
          .iip-hero {
            padding: 40px 12px 48px;
          }

          .iip-hero__pill {
            padding: 5px 18px;
            font-size: 0.8rem;
            margin-bottom: 18px;
          }

          .iip-hero__title {
            font-size: 1.3rem;
            margin-bottom: 24px;
          }

          .iip-hero__stats {
            gap: 14px;
            flex-direction: column;
            align-items: center;
          }

          .iip-hero__stat-wrapper {
            flex: 1 1 100%;
            max-width: 260px;
            width: 100%;
          }

          .iip-hero__stat-card {
            padding: 9px 20px 14px;
            border-radius: 16px;
          }

          .iip-hero__stat-value {
            font-size: 1.3rem;
          }
        }

        @media (max-width: 375px) {
          .iip-hero {
            padding: 32px 8px 40px;
          }

          .iip-hero__title {
            font-size: 1.2rem;
          }

          .iip-hero__stat-card {
            padding: 8px 16px 12px;
          }

          .iip-hero__stat-value {
            font-size: 1.2rem;
          }
        }

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
  );
};

export default Banner;
