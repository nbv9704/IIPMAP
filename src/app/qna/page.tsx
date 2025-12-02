// ============================================
// IMPORTS
// ============================================
import NewsCategoryPageClient from "../news/NewsCategoryPageClient"

// ============================================
// PAGE: QnAPage (server)
// ============================================
export default function QnAPage() {
  return <NewsCategoryPageClient category="qna" titleKey="pageTitle.qna" />
}
