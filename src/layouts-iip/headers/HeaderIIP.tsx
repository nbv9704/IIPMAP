"use client"
import NavMenuIIP from "./NavMenuIIP"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import UseSticky from "@/hooks/UseSticky"
import { useLanguage, type LanguageCode } from "@/hooks/useLanguage"
import { getTranslation } from "@/utils/translations"

// HƯỚNG DẪN THAY LOGO:
// 1. Đặt file logo của bạn vào thư mục: public/assets/images/logo/
//    Ví dụ: public/assets/images/logo/iip-logo.png hoặc iip-logo.svg
// 2. Sửa dòng import bên dưới, thay "logo_01.svg" bằng tên file logo của bạn:
import logo from "@/assets/images/fav-icon/icon.png";
// Ví dụ: import logo from "@/assets/images/logo/iip-logo.svg";

const HeaderIIP = () => {
   const { sticky } = UseSticky();
   const { currentLang, setCurrentLang } = useLanguage();
   const [isClient, setIsClient] = useState(false);

   useEffect(() => {
      setIsClient(true);
   }, []);

   const languages = [
      { code: "vi" as LanguageCode, name: "Tiếng Việt", flagCode: "vn" },
      { code: "en" as LanguageCode, name: "English", flagCode: "us" },
      { code: "ja" as LanguageCode, name: "日本語", flagCode: "jp" },
      { code: "ko" as LanguageCode, name: "한국어", flagCode: "kr" },
      { code: "zh" as LanguageCode, name: "中文", flagCode: "cn" },
   ];

   return (
      <header className={`header-iip ${sticky ? "sticky" : ""}`}>
         <div className="header-iip-container">
            {/* Logo */}
            <div className="logo-iip">
               <Link href="/">
                  <Image src={logo} alt="IIPMap.AI" width={30} height={29} />
               </Link>
            </div>

            {/* Navigation Menu */}
            <nav className="nav-iip">
               <NavMenuIIP />
            </nav>

            {/* Right Side: Language Switcher + Login Button */}
            <div className="header-iip-right">
               {/* Language Switcher */}
               <div className="language-switcher">
                  {isClient && languages.map((lang) => (
                     <button
                        key={lang.code}
                        className={`lang-btn ${currentLang === lang.code ? 'active' : ''}`}
                        onClick={() => setCurrentLang(lang.code)}
                        title={lang.name}
                        type="button"
                     >
                        <span 
                           className="flag-icon"
                           style={{
                              backgroundImage: `url(https://flagcdn.com/w40/${lang.flagCode}.png)`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                              width: '24px',
                              height: '24px',
                              display: 'block',
                              borderRadius: '50%'
                           }}
                        />
                     </button>
                  ))}
               </div>

               {/* Login Button */}
               <Link href="/login" className="btn-login-iip">
                  {isClient ? getTranslation(currentLang, 'header.login') : 'Đăng nhập'}
               </Link>
            </div>
         </div>
      </header>
   )
}

export default HeaderIIP
