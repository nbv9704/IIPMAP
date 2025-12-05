import { IndustrialAreaCardDto } from "@/types/industrilaArea";
import { baseQuery } from "./../../components/api/index";
import { createApi } from "@reduxjs/toolkit/query/react";

export const industrialAreaApiSlice = createApi({
  reducerPath: "industrialAreaApi",
  baseQuery: baseQuery,
  tagTypes: ["industrialArea"],
  endpoints: (builder) => ({
    getIndustrialArea: builder.query<IndustrialAreaCardDto[], Number>({
      query: (top) => ({
        url: `/app/industrial-area-public/public-featured?top=${top}`,
        method: "GET",
      }),
      providesTags: ["industrialArea"],
    }),
  }),
});

export const { useGetIndustrialAreaQuery } = industrialAreaApiSlice;