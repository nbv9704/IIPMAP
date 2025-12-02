// ============================================
// IMPORTS
// ============================================
import "../styles/index.scss";
import ClientProviders from "@/components/providers/ClientProviders";
import type { Metadata, Viewport } from 'next';

// ============================================
// METADATA
// ============================================
export const metadata: Metadata = {
  metadataBase: new URL('https://iipvietnam.com'),
  title: {
    default: 'IIPVIETNAM.COM',
    template: '%s - IIPVIETNAM.COM'
  },
  description: 'IIPVietnam - Kết nối các nhà đầu tư với các khu công nghiệp trọng điểm toàn quốc',
  keywords: ['Industrial Parks', 'Investment', 'Vietnam', 'Khu công nghiệp'],
  openGraph: {
    siteName: 'IIPVIETNAM.COM',
    url: 'https://iipvietnam.com',
    type: 'website',
    title: 'IIPVIETNAM.COM - Kết nối đầu tư khu công nghiệp',
    images: ['/assets/images/fav-icon/icon.png'],
  },
  icons: {
    icon: '/assets/images/fav-icon/icon.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0051CB',
};

// ============================================
// LAYOUT: RootLayout (Server Component)
// ============================================
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="msapplication-navbutton-color" content="#0051CB" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#0051CB" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,500&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap" />
      </head>
      <body>
        <div className="main-page-wrapper">
          <ClientProviders>
            {children}
          </ClientProviders>
        </div>
      </body>
    </html>
  )
}
