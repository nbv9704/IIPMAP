// ============================================
// NEWS API TYPES
// ============================================
// Following VNG004's pattern for API types

export interface NewsDto {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  category: string;
  categorySlug?: string;
  author?: string;
  authorId?: string;
  thumbnail?: string;
  images?: string[];
  tags?: string[];
  views: number;
  likes: number;
  comments: number;
  isFeatured?: boolean;
  isPublished?: boolean;
  publishedAt: string;
  createdAt: string;
  updatedAt?: string;
}

export interface NewsCategoryDto {
  id: string;
  name: string;
  slug: string;
  description?: string;
  newsCount?: number;
}

export interface NewsCommentDto {
  id: string;
  newsId: string;
  userId: string;
  userName?: string;
  userAvatar?: string;
  content: string;
  likes: number;
  replies?: NewsCommentDto[];
  createdAt: string;
  updatedAt?: string;
}

// Query params
export interface NewsQueryParams {
  top?: number;
  skip?: number;
  page?: number;
  pageSize?: number;
  search?: string;
  category?: string;
  tags?: string[];
  featured?: boolean;
  sortBy?: "latest" | "popular" | "trending";
}

export interface PaginatedNewsResponse {
  data: NewsDto[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasMore: boolean;
}
