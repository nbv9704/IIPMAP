// ============================================
// IMPORTS
// ============================================
'use client'
import "../styles/index.scss";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { LanguageProvider } from "@/contexts/LanguageContext";

// ============================================
// LAYOUT: RootLayout
// ============================================
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // ========== Environment & Routing ==========
  const isDev = process.env.NODE_ENV === 'development'
  const pathname = usePathname()

  // ========== Render ==========
  return (
    <html lang="vi" suppressHydrationWarning={isDev}>
      <head>
        <title>IIPVIETNAM.COM</title>
        <meta name="keywords" content="Industrial Parks, Investment, Vietnam, Khu công nghiệp" />
        <meta name="description" content="IIPVietnam - Kết nối các nhà đầu tư với các khu công nghiệp trọng điểm toàn quốc" />
        <meta property="og:site_name" content="IIPVIETNAM.COM" />
        <meta property="og:url" content="https://iipvietnam.com" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="IIPVIETNAM.COM - Kết nối đầu tư khu công nghiệp" />
        <meta name='og:image' content='/assets/images/fav-icon/icon.png' />
        {/* For IE  */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        {/* For Resposive Device */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* For Window Tab Color */}
        {/* Chrome, Firefox OS and Opera */}
        <meta name="theme-color" content="#0051CB" />
        {/* Windows Phone */}
        <meta name="msapplication-navbutton-color" content="#0051CB" />
        {/* iOS Safari */}
        <meta name="apple-mobile-web-app-status-bar-style" content="#0051CB" />
        <link rel="icon" href="/assets/images/fav-icon/icon.png" sizes="any" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,500&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap" />
      </head>
      <body suppressHydrationWarning={true}>
        <div className="main-page-wrapper">
          <LanguageProvider>
            <Provider store={store}>
              {children}
            </Provider>
          </LanguageProvider>
        </div>
      </body>
    </html>
  )
}
