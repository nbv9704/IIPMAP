// ============================================
// IMPORTS
// ============================================
import NewsDetailPageClient from "./NewsDetailPageClient";

// ============================================
// PAGE: NewsDetailPage (server)
// ============================================
const NewsDetailPage = ({ params }: { params: { id: string } }) => {
  return <NewsDetailPageClient id={params.id} />;
};

export default NewsDetailPage;
