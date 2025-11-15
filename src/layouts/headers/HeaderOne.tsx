/* DÒNG NÀY RẤT QUAN TRỌNG */
"use client";

import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import UseSticky from "@/hooks/UseSticky";
import LoginModal from "@/modals/LoginModal";

import logo_1 from "@/assets/images/logo/image.png";

// ảnh cờ
import flagCN from "@/assets/images/flag/TrungQuoc.png";
import flagEN from "@/assets/images/flag/Anh.png";
import flagVN from "@/assets/images/flag/VietNam.webp";

type LocaleCode = "zh" | "en" | "vi";

type NavItem = {
  href: string;
  label: string;
  variant?: "phone";
};

type HeaderOneProps = {
  initialLocale?: LocaleCode;
  onLanguageChange?: (locale: LocaleCode) => void;
};

/** MENU CHÍNH */
const NAV_ITEMS: NavItem[] = [
  { href: "/listing_01", label: "Tin mua bán" },
  { href: "/video", label: "Video" },
  { href: "/blog_01", label: "Tin tức" },
  { href: "/services", label: "Dịch vụ" },
  { href: "/contact", label: "Liên hệ" },
  { href: "/booking", label: "Đặt lịch" },
  { href: "tel:1900888858", label: "1900.8888.58", variant: "phone" },
];

// map locale -> ảnh cờ
const FLAG_IMAGES: Record<LocaleCode, { src: StaticImageData; alt: string }> = {
  zh: { src: flagCN, alt: "Tiếng Trung" },
  en: { src: flagEN, alt: "Tiếng Anh" },
  vi: { src: flagVN, alt: "Tiếng Việt" },
};

const HeaderOne = ({ initialLocale = "vi", onLanguageChange }: HeaderOneProps) => {
  const { sticky } = UseSticky();
  const [currentLocale, setCurrentLocale] = useState<LocaleCode>(initialLocale);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLocaleClick = (locale: LocaleCode) => {
    setCurrentLocale(locale);
    onLanguageChange?.(locale);
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header
        className={`theme-main-menu menu-style-one sticky-menu iip-header ${
          sticky ? "is-sticky" : ""
        }`}
      >
        <div className="inner-content">
          <div className="iip-header__inner">
            {/* LOGO sát trái */}
            <Link href="/listing_01" className="iip-header__logo" aria-label="Trang chủ">
              <Image src={logo_1} alt="IIP" priority className="iip-header__logo-img" />
            </Link>

            {/* MENU DESKTOP */}
            <nav className="iip-header__nav d-none d-lg-block">
              <ul className="iip-header__nav-list">
                {NAV_ITEMS.map((item) =>
                  item.variant === "phone" ? (
                    <li key={item.href} className="nav-item">
                      <a
                        href={item.href}
                        className="nav-link iip-header__nav-link iip-header__nav-link--phone"
                      >
                        {item.label}
                      </a>
                    </li>
                  ) : (
                    <li key={item.href} className="nav-item">
                      <Link href={item.href} className="nav-link iip-header__nav-link">
                        {item.label}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </nav>

            {/* CỜ + ĐĂNG NHẬP sát phải */}
            <div className="iip-header__actions">
              <div className="iip-header__language-group" aria-label="Language selection">
                {(["zh", "en", "vi"] as LocaleCode[]).map((locale) => {
                  const img = FLAG_IMAGES[locale];
                  return (
                    <button
                      key={locale}
                      type="button"
                      className={`iip-header__language-btn ${
                        currentLocale === locale ? "is-active" : ""
                      }`}
                      onClick={() => handleLocaleClick(locale)}
                      aria-pressed={currentLocale === locale}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        className="iip-header__flag-img"
                      />
                    </button>
                  );
                })}
              </div>

              {/* ĐĂNG NHẬP mở Bootstrap modal #loginModal */}
              <button
                type="button"
                className="iip-header__login"
                data-bs-toggle="modal"
                data-bs-target="#loginModal"
              >
                Đăng nhập
              </button>

              {/* HAMBURGER – mobile */}
              <button
                type="button"
                className="iip-header__nav-toggle d-lg-none"
                onClick={() => setIsMenuOpen((v) => !v)}
                aria-label="Mở menu"
                aria-expanded={isMenuOpen}
              >
                <span className="iip-header__nav-toggle-line" />
                <span className="iip-header__nav-toggle-line" />
                <span className="iip-header__nav-toggle-line" />
              </button>
            </div>
          </div>
        </div>

        {/* MENU MOBILE */}
        <aside
          className={`iip-header__mobile-drawer d-lg-none ${
            isMenuOpen ? "is-open" : ""
          }`}
        >
          <div className="iip-header__mobile-header">
            <Image src={logo_1} alt="IIP" className="iip-header__logo-img" />
            <button
              type="button"
              className="iip-header__nav-close"
              onClick={closeMenu}
              aria-label="Đóng menu"
            >
              ×
            </button>
          </div>

          <nav className="iip-header__mobile-nav">
            {NAV_ITEMS.map((item) => (
              <div key={item.href} className="iip-header__mobile-item">
                {item.variant === "phone" ? (
                  <a
                    href={item.href}
                    className="iip-header__mobile-link iip-header__mobile-link--phone"
                    onClick={closeMenu}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className="iip-header__mobile-link"
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </aside>

        {isMenuOpen && (
          <div
            className="iip-header__backdrop d-lg-none"
            onClick={closeMenu}
            aria-hidden="true"
          />
        )}
      </header>

      {/* Modal Bootstrap (dùng id="loginModal") */}
      <LoginModal />

      <style jsx>{`
        .iip-header {
          width: 100%;
          background: #ffffff;
          z-index: 50;
          transition: box-shadow 0.2s ease;
        }

        .iip-header.is-sticky {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          box-shadow: 0 4px 16px rgba(15, 23, 42, 0.08);
        }

        .inner-content {
          max-width: 100%;
          margin: 0 auto;
          padding: 0 12px;
        }

        .iip-header__inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          min-height: 52px;
        }

        .iip-header__logo-img {
          height: 34px;
          width: auto;
        }

        .iip-header__nav {
          flex: 1;
          margin-left: 32px;
        }

        .iip-header__nav-list {
          display: flex;
          align-items: center;
          gap: 32px;
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .iip-header__nav-link {
          font-size: 14px;
          font-weight: 400;
          color: #111827;
          text-decoration: none;
          text-transform: none;
          line-height: 1.4;
          white-space: nowrap;
        }

        .iip-header__nav-link:hover {
          color: #2563eb;
        }

        .iip-header__nav-link--phone {
          color: #d9480f;
          font-weight: 700;
          font-size: 16px;
        }

        .iip-header__actions {
          margin-left: auto;
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .iip-header__language-group {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .iip-header__language-btn {
          border: none;
          background: transparent;
          padding: 0;
          cursor: pointer;
        }

        .iip-header__flag-img {
          width: 40px;
          height: 26px;
          object-fit: cover;
          display: block;
        }

        .iip-header__login {
          padding: 8px 22px;
          border-radius: 999px;
          border: none;
          background: #2f7fdc;
          color: #ffffff;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          box-shadow: 0 4px 12px rgba(47, 127, 220, 0.4);
        }

        .iip-header__login:hover {
          background: #246ac0;
        }

        .iip-header__nav-toggle {
          display: none;
          flex-direction: column;
          justify-content: center;
          gap: 4px;
          width: 40px;
          height: 32px;
          border-radius: 4px;
          border: none;
          background: #2f7fdc;
          cursor: pointer;
        }

        .iip-header__nav-toggle-line {
          width: 20px;
          height: 2px;
          background: #ffffff;
          border-radius: 999px;
          margin: 0 auto;
        }

        .iip-header__mobile-drawer {
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          width: 78%;
          max-width: 360px;
          background: #ffffff;
          transform: translateX(-100%);
          transition: transform 0.25s ease;
          box-shadow: 4px 0 18px rgba(15, 23, 42, 0.15);
          z-index: 60;
          display: flex;
          flex-direction: column;
        }

        .iip-header__mobile-drawer.is-open {
          transform: translateX(0);
        }

        .iip-header__mobile-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          border-bottom: 1px solid #f3f4f6;
        }

        .iip-header__nav-close {
          width: 40px;
          height: 40px;
          border-radius: 6px;
          border: none;
          background: #2563eb;
          color: #ffffff;
          font-size: 26px;
          line-height: 1;
          cursor: pointer;
        }

        .iip-header__mobile-nav {
          padding: 8px 0 16px;
          overflow-y: auto;
          flex: 1;
          margin: 0;
        }

        .iip-header__mobile-item {
          border-bottom: 1px solid #f3f4f6;
          list-style: none;
        }

        .iip-header__mobile-link {
          display: block;
          padding: 12px 20px;
          font-size: 15px;
          color: #111827;
        }

        .iip-header__mobile-link--phone {
          color: #d9480f;
          font-weight: 700;
        }

        .iip-header__backdrop {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.35);
          z-index: 55;
        }

        @media (max-width: 991px) {
          .iip-header__inner {
            min-height: 56px;
          }

          .iip-header__nav {
            display: none;
          }

          .iip-header__nav-toggle {
            display: inline-flex;
          }
        }
      `}</style>
    </>
  );
};

export default HeaderOne;
