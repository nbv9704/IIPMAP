// ============================================
// NEWS API SLICE
// ============================================
// Following VNG004's RTK Query pattern

import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/components/api";
import {
  NewsDto,
  NewsCategoryDto,
  NewsCommentDto,
  NewsQueryParams,
  PaginatedNewsResponse,
} from "@/types/news.api.types";

export const newsApiSlice = createApi({
  reducerPath: "newsApi",
  baseQuery: baseQuery,
  tagTypes: ["News", "NewsCategory", "NewsComment"],
  endpoints: (builder) => ({
    // ============================================
    // NEWS ENDPOINTS
    // ============================================

    // Get featured news (for hero banner)
    getFeaturedNews: builder.query<NewsDto[], number>({
      query: (top = 3) => ({
        url: `/app/news-public/featured?top=${top}`,
        method: "GET",
      }),
      providesTags: ["News"],
    }),

    // Get latest news with pagination
    getLatestNews: builder.query<PaginatedNewsResponse, NewsQueryParams>({
      query: (params) => ({
        url: `/app/news-public/latest`,
        method: "GET",
        params: {
          page: params.page || 1,
          pageSize: params.pageSize || 10,
          search: params.search,
          category: params.category,
        },
      }),
      providesTags: ["News"],
    }),

    // Get most read news
    getMostReadNews: builder.query<NewsDto[], number>({
      query: (top = 5) => ({
        url: `/app/news-public/most-read?top=${top}`,
        method: "GET",
      }),
      providesTags: ["News"],
    }),

    // Get news by ID
    getNewsById: builder.query<NewsDto, string>({
      query: (id) => ({
        url: `/app/news-public/${id}`,
        method: "GET",
      }),
      providesTags: ["News"],
    }),

    // Get news by slug
    getNewsBySlug: builder.query<NewsDto, string>({
      query: (slug) => ({
        url: `/app/news-public/slug/${slug}`,
        method: "GET",
      }),
      providesTags: ["News"],
    }),

    // Get news by category
    getNewsByCategory: builder.query<PaginatedNewsResponse, { category: string } & NewsQueryParams>({
      query: ({ category, ...params }) => ({
        url: `/app/news-public/category/${category}`,
        method: "GET",
        params: {
          page: params.page || 1,
          pageSize: params.pageSize || 10,
        },
      }),
      providesTags: ["News"],
    }),

    // Search news
    searchNews: builder.query<PaginatedNewsResponse, NewsQueryParams>({
      query: (params) => ({
        url: `/app/news-public/search`,
        method: "GET",
        params,
      }),
      providesTags: ["News"],
    }),

    // Get related news
    getRelatedNews: builder.query<NewsDto[], { newsId: string; top?: number }>({
      query: ({ newsId, top = 3 }) => ({
        url: `/app/news-public/${newsId}/related?top=${top}`,
        method: "GET",
      }),
      providesTags: ["News"],
    }),

    // ============================================
    // CATEGORY ENDPOINTS
    // ============================================

    // Get all categories
    getNewsCategories: builder.query<NewsCategoryDto[], void>({
      query: () => ({
        url: `/app/news-category-public`,
        method: "GET",
      }),
      providesTags: ["NewsCategory"],
    }),

    // ============================================
    // COMMENT ENDPOINTS
    // ============================================

    // Get comments by news ID
    getNewsComments: builder.query<NewsCommentDto[], string>({
      query: (newsId) => ({
        url: `/app/news-comment/news/${newsId}`,
        method: "GET",
      }),
      providesTags: ["NewsComment"],
    }),

    // Add comment
    addNewsComment: builder.mutation<NewsCommentDto, { newsId: string; content: string }>({
      query: (body) => ({
        url: `/app/news-comment`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["NewsComment"],
    }),

    // ============================================
    // INTERACTION ENDPOINTS
    // ============================================

    // Like news
    likeNews: builder.mutation<void, string>({
      query: (newsId) => ({
        url: `/app/news/${newsId}/like`,
        method: "POST",
      }),
      invalidatesTags: ["News"],
    }),

    // View news (increment view count)
    viewNews: builder.mutation<void, string>({
      query: (newsId) => ({
        url: `/app/news/${newsId}/view`,
        method: "POST",
      }),
      invalidatesTags: ["News"],
    }),
  }),
});

// Export hooks for usage in components
export const {
  // News hooks
  useGetFeaturedNewsQuery,
  useGetLatestNewsQuery,
  useGetMostReadNewsQuery,
  useGetNewsByIdQuery,
  useGetNewsBySlugQuery,
  useGetNewsByCategoryQuery,
  useSearchNewsQuery,
  useGetRelatedNewsQuery,

  // Category hooks
  useGetNewsCategoriesQuery,

  // Comment hooks
  useGetNewsCommentsQuery,
  useAddNewsCommentMutation,

  // Interaction hooks
  useLikeNewsMutation,
  useViewNewsMutation,
} = newsApiSlice;
