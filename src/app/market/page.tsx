// ============================================
// IMPORTS
// ============================================
import NewsCategoryPageClient from "../news/NewsCategoryPageClient"

// ============================================
// PAGE: MarketNewsPage (server)
// ============================================
export default function MarketNewsPage() {
  return <NewsCategoryPageClient category="market" titleKey="pageTitle.market" />
}
