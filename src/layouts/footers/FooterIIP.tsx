"use client"
// ============================================
// IMPORTS
// ============================================
import Link from "next/link"
import { useTranslatedFooter } from "@/hooks/useTranslatedFooter"

// ============================================
// LOGO CONFIGURATION
// ============================================
// HƯỚNG DẪN THAY LOGO:
// Nếu muốn dùng image logo thay vì text, uncomment dòng import và sửa trong JSX
// import Image from "next/image"
// import iipLogo from "@/assets/images/logo/iip-logo-white.svg"

// ============================================
// COMPONENT: FooterIIP
// ============================================
const FooterIIP = () => {
   // ========== Hooks ==========
   const { footerData } = useTranslatedFooter();
   
   // ========== Render ==========
   return (
      <footer className="footer-iip">
         <div className="container">
            <div className="row">
               {/* Logo Column */}
               <div className="col-lg-4">
                  <Link href="/">
                     <h1 className="footer-logo-text-iip">IIPMap.AI</h1>
                     {/* Nếu dùng image logo: */}
                     {/* <Image src={iipLogo} alt="IIPMap.AI" width={205} height={49} /> */}
                  </Link>
               </div>

               {/* Content Columns */}
               <div className="col-lg-8">
                  {footerData.map((item) => (
                     <div key={item.id} className="footer-section">
                        <h5>{item.widget_title}</h5>
                        <ul>
                           {item.footer_link.map((link, i) => (
                              <li key={`${item.id}-${link.link}`}>
                                 <Link href={link.link}>{link.link_title}</Link>
                              </li>
                           ))}
                        </ul>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </footer>
   )
}

export default FooterIIP
