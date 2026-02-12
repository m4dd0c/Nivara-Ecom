import { IBottom, ITop } from "$/types/api";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the API service for Featured items
export const homeApi = createApi({
  reducerPath: "homeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5175/api/v1",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // GET /api/v1/featured - Get featured items
    getFeatured: builder.query<{ data: (ITop | IBottom)[] }, void>({
      query: () => ({
        url: "featured",
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetFeaturedQuery } = homeApi;
