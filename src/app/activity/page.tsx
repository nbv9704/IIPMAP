// ============================================
// IMPORTS
// ============================================
import NewsCategoryPageClient from "../news/NewsCategoryPageClient"

// ============================================
// PAGE: ActivityPage (server)
// ============================================
export default function ActivityPage() {
  return <NewsCategoryPageClient category="activity" titleKey="pageTitle.activity" />
}
