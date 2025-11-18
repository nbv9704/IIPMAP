/* DÒNG NÀY RẤT QUAN TRỌNG */
"use client";

import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import UseSticky from "@/hooks/UseSticky";
import LoginModal from "@/modals/LoginModal";
import { useAuth } from "@/lib/auth/AuthContext";

import logo_1 from "@/assets/images/logo/image.png";
import flagCN from "@/assets/images/flag/TrungQuoc.png";
import flagEN from "@/assets/images/flag/Anh.png";
import flagVN from "@/assets/images/flag/VietNam.webp";

type LocaleCode = "vi" | "en" | "zh";

type NavItem = {
  href: string;
  key: "buy" | "video" | "news" | "service" | "contact" | "booking" | "hotline";
  variant?: "phone";
};

const NAV_ITEMS: NavItem[] = [
  { href: "/listing_01", key: "buy" },
  { href: "/video", key: "video" },
  { href: "/blog_01", key: "news" },
  { href: "/services", key: "service" },
  { href: "/contact", key: "contact" },
  { href: "/booking", key: "booking" },
  { href: "tel:1900888858", key: "hotline", variant: "phone" },
];

const FLAG_IMAGES: Record<LocaleCode, { src: StaticImageData; alt: string }> = {
  zh: { src: flagCN, alt: "中文" },
  en: { src: flagEN, alt: "English" },
  vi: { src: flagVN, alt: "Tiếng Việt" },
};

const LANG_ORDER: LocaleCode[] = ["zh", "en", "vi"];

const HeaderOne = () => {
  const { sticky } = UseSticky();
  const { t, i18n } = useTranslation("common");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const { user, isAuthenticated, logout } = useAuth();

  // chuẩn hoá current language về vi / en / zh
  const rawLang = i18n.language || "vi";
  const currentLang: LocaleCode =
    (["vi", "en", "zh"].find((l) => rawLang.startsWith(l)) as LocaleCode) ||
    "vi";

  const handleLocaleClick = (code: LocaleCode) => {
    i18n.changeLanguage(code);
  };

  const closeMenu = () => setIsMenuOpen(false);

  const displayName =
    user?.fullName?.trim().split(" ").slice(-1)[0] || user?.email || "";

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    toast.success("Đã đăng xuất", { position: "top-center" });
  };

  return (
    <>
      <header
        className={`theme-main-menu menu-style-one sticky-menu iip-header ${
          sticky ? "is-sticky" : ""
        }`}
      >
        <div className="inner-content">
          <div className="iip-header__inner">
            {/* LOGO */}
            <Link
              href="/listing_01"
              className="iip-header__logo"
              aria-label="Trang chủ"
            >
              <Image
                src={logo_1}
                alt="IIP"
                priority
                className="iip-header__logo-img"
              />
            </Link>

            {/* MENU DESKTOP */}
            <nav className="iip-header__nav d-none d-lg-block">
              <ul className="iip-header__nav-list">
                {NAV_ITEMS.map((item) =>
                  item.variant === "phone" ? (
                    <li key={item.key} className="nav-item">
                      <a
                        href={item.href}
                        className="nav-link iip-header__nav-link iip-header__nav-link--phone"
                      >
                        {t(`nav.${item.key}`)}
                      </a>
                    </li>
                  ) : (
                    <li key={item.key} className="nav-item">
                      <Link
                        href={item.href}
                        className="nav-link iip-header__nav-link"
                      >
                        {t(`nav.${item.key}`)}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </nav>

            {/* CỜ + ĐĂNG NHẬP / USER */}
            <div className="iip-header__actions">
              <div
                className="iip-header__language-group"
                aria-label="Language selection"
              >
                {LANG_ORDER.map((code) => {
                  const img = FLAG_IMAGES[code];
                  return (
                    <button
                      key={code}
                      type="button"
                      className={`iip-header__language-btn ${
                        currentLang === code ? "is-active" : ""
                      }`}
                      onClick={() => handleLocaleClick(code)}
                      aria-pressed={currentLang === code}
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

              {/* Nếu chưa login -> nút Đăng nhập.
                  Nếu đã login -> icon user + menu Logout */}
              {isAuthenticated ? (
                <div className="iip-header__user">
                  <button
                    type="button"
                    className="iip-header__user-btn"
                    onClick={() => setIsUserMenuOpen((v) => !v)}
                  >
                    <i className="bi bi-person-circle iip-header__user-icon" />
                    <span className="iip-header__user-name">{displayName}</span>
                  </button>
                  {isUserMenuOpen && (
                    <div className="iip-header__user-menu">
                      <button
                        type="button"
                        className="iip-header__user-menu-item"
                        onClick={handleLogout}
                      >
                        {t("header.logout") ?? "Đăng xuất"}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  type="button"
                  className="iip-header__login"
                  data-bs-toggle="modal"
                  data-bs-target="#loginModal"
                >
                  {t("header.login")}
                </button>
              )}

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
              <div key={item.key} className="iip-header__mobile-item">
                {item.variant === "phone" ? (
                  <a
                    href={item.href}
                    className="iip-header__mobile-link iip-header__mobile-link--phone"
                    onClick={closeMenu}
                  >
                    {t(`nav.${item.key}`)}
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className="iip-header__mobile-link"
                    onClick={closeMenu}
                  >
                    {t(`nav.${item.key}`)}
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

      {/* Modal Bootstrap dùng id="loginModal" */}
      <LoginModal />

      {/* STYLE riêng cho user menu (phần còn lại em giữ trong SCSS cũng được) */}
      <style jsx>{`
        .iip-header__user {
          position: relative;
        }

        .iip-header__user-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          border-radius: 999px;
          border: 1px solid rgba(148, 163, 184, 0.6);
          background: #ffffff;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          color: #0f172a;
        }

        .iip-header__user-icon {
          font-size: 18px;
          color: #2563eb;
        }

        .iip-header__user-name {
          max-width: 120px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .iip-header__user-menu {
          position: absolute;
          right: 0;
          top: calc(100% + 6px);
          min-width: 160px;
          background: #ffffff;
          border-radius: 12px;
          box-shadow: 0 12px 30px rgba(15, 23, 42, 0.18);
          padding: 6px 0;
          z-index: 100;
        }

        .iip-header__user-menu-item {
          width: 100%;
          padding: 8px 14px;
          border: none;
          background: transparent;
          text-align: left;
          font-size: 14px;
          color: #111827;
          cursor: pointer;
        }

        .iip-header__user-menu-item:hover {
          background: #eff6ff;
          color: #1d4ed8;
        }
      `}</style>
    </>
  );
};

export default HeaderOne;
