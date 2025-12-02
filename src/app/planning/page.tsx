// ============================================
// IMPORTS
// ============================================
import NewsCategoryPageClient from "../news/NewsCategoryPageClient"

// ============================================
// PAGE: PlanningNewsPage (server)
// ============================================
export default function PlanningNewsPage() {
  return <NewsCategoryPageClient category="planning" titleKey="pageTitle.planning" />
}
