// ============================================
// IMPORTS
// ============================================
import "@/styles/index.scss"
import HomePageClient from "./HomePageClient"
import type { Metadata } from 'next'

// ============================================
// METADATA
// ============================================
export const metadata: Metadata = {
  title: 'Trang chủ',
  description: 'IIPVietnam - Kết nối các nhà đầu tư với các khu công nghiệp trọng điểm toàn quốc',
}

// ============================================
// PAGE: Home (Server Component)
// ============================================
export default function HomePage() {
  return <HomePageClient />
}
