"use client"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import UseSticky from "@/hooks/UseSticky"
import LoginModal from "@/modals/LoginModal"

import logo_1 from "@/assets/images/logo/image.png"

type LocaleCode = "zh" | "en" | "vi"

type NavItem = {
   href: string
   label: string
   variant?: "phone"
}

type HeaderOneProps = {
   style?: unknown
   initialLocale?: LocaleCode
   onLanguageChange?: (locale: LocaleCode) => void
}

const NAV_ITEMS: NavItem[] = [
   { href: "/listing_01", label: "Tin mua bán" },
   { href: "/video", label: "Video" },
   { href: "/blog_01", label: "Tin tức" },
   { href: "/services", label: "Dịch vụ" },
   { href: "/contact", label: "Liên hệ" },
   { href: "/booking", label: "Đặt lịch" },
   { href: "tel:1900888858", label: "1900.8888.58", variant: "phone" },
]

const LANGUAGE_OPTIONS: LocaleCode[] = ["zh", "en", "vi"]

const STAR_PATH = "M 0.000 -10.000 L 2.245 -3.090 L 9.511 -3.090 L 3.633 1.180 L 5.878 8.090 L 0.000 3.820 L -5.878 8.090 L -3.633 1.180 L -9.511 -3.090 L -2.245 -3.090 Z"

const FlagIcon = ({ locale }: { locale: LocaleCode }) => {
   switch (locale) {
      case "zh":
         return (
            <svg viewBox="0 0 48 32" aria-hidden="true" focusable="false" className="iip-header__flag">
               <rect width="48" height="32" fill="#DE2910" />
               <path d={STAR_PATH} fill="#FFDE00" transform="translate(15 13) scale(0.7)" />
               <path d={STAR_PATH} fill="#FFDE00" transform="translate(24 7) scale(0.25) rotate(25)" />
               <path d={STAR_PATH} fill="#FFDE00" transform="translate(28 11) scale(0.22) rotate(5)" />
               <path d={STAR_PATH} fill="#FFDE00" transform="translate(28 17) scale(0.22) rotate(-10)" />
               <path d={STAR_PATH} fill="#FFDE00" transform="translate(24 21) scale(0.25) rotate(-30)" />
            </svg>
         )
      case "vi":
         return (
            <svg viewBox="0 0 48 32" aria-hidden="true" focusable="false" className="iip-header__flag">
               <rect width="48" height="32" fill="#DA251D" />
               <path d={STAR_PATH} fill="#FFFF00" transform="translate(24 16) scale(0.65)" />
            </svg>
         )
      case "en":
      default:
         return (
            <svg viewBox="0 0 48 32" aria-hidden="true" focusable="false" className="iip-header__flag">
               <rect width="48" height="32" fill="#012169" />
               <path fill="#FFFFFF" d="M0 0 L8 0 L48 26 L48 32 L40 32 L0 6 Z" />
               <path fill="#FFFFFF" d="M48 0 L40 0 L0 26 L0 32 L8 32 L48 6 Z" />
               <path fill="#C8102E" d="M0 0 L5 0 L48 28 L48 32 L43 32 L0 4 Z" />
               <path fill="#C8102E" d="M48 0 L43 0 L0 28 L0 32 L5 32 L48 4 Z" />
               <rect x="0" y="12.5" width="48" height="7" fill="#FFFFFF" />
               <rect x="20.5" y="0" width="7" height="32" fill="#FFFFFF" />
               <rect x="0" y="14.5" width="48" height="3" fill="#C8102E" />
               <rect x="22.5" y="0" width="3" height="32" fill="#C8102E" />
            </svg>
         )
   }
}

const HeaderOne = ({ style: _style, initialLocale = "vi", onLanguageChange }: HeaderOneProps) => {
   const { sticky } = UseSticky()
   const [currentLocale, setCurrentLocale] = useState<LocaleCode>(initialLocale)

   const handleLocaleClick = (locale: LocaleCode) => {
      setCurrentLocale(locale)
      onLanguageChange?.(locale)
   }

   return (
      <>
         <header className={`theme-main-menu menu-style-one sticky-menu iip-header ${sticky ? "fixed" : ""}`}>
            <div className="inner-content">
               <div className="iip-header__inner">
                  <Link href="/" className="iip-header__logo" aria-label="Trang chủ">
                     <Image src={logo_1} alt="IIP" priority className="iip-header__logo-img" />
                  </Link>

                  <nav className="iip-header__nav" aria-label="Điều hướng chính">
                     {NAV_ITEMS.map((item) => (
                        item.variant === "phone" ? (
                           <a key={item.href} href={item.href} className="iip-header__nav-link iip-header__nav-link--phone">
                              {item.label}
                           </a>
                        ) : (
                           <Link key={item.href} href={item.href} className="iip-header__nav-link">
                              {item.label}
                           </Link>
                        )
                     ))}
                  </nav>

                  <div className="iip-header__actions">
                     <div className="iip-header__language-group" role="group" aria-label="Language selection">
                        {LANGUAGE_OPTIONS.map((locale) => (
                           <button
                              key={locale}
                              type="button"
                              className={`iip-header__language-btn ${currentLocale === locale ? "is-active" : ""}`}
                              onClick={() => handleLocaleClick(locale)}
                              aria-pressed={currentLocale === locale}
                           >
                              <FlagIcon locale={locale} />
                           </button>
                        ))}
                     </div>
                     <Link
                        href="#"
                        data-bs-toggle="modal"
                        data-bs-target="#loginModal"
                        className="iip-header__login"
                     >
                        Đăng nhập
                     </Link>
                  </div>
               </div>
            </div>
            <div className="iip-header__divider" aria-hidden="true"></div>
         </header>
         <LoginModal />
      </>
   )
}

export default HeaderOne
