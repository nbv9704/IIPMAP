// ============================================
// IMPORTS
// ============================================
import NewsDetailPageClient from "./NewsDetailPageClient";
import type { Metadata } from 'next';

// ============================================
// ISR CONFIGURATION
// ============================================
// Revalidate every hour (3600 seconds)
export const revalidate = 3600;

// ============================================
// METADATA
// ============================================
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  return {
    title: `Tin tức - IIPMap.AI`,
    description: 'Tin tức về khu công nghiệp và đầu tư',
  };
}

// ============================================
// PAGE: NewsDetailPage (server with ISR)
// ============================================
const NewsDetailPage = ({ params }: { params: { id: string } }) => {
  return <NewsDetailPageClient id={params.id} />;
};

export default NewsDetailPage;
