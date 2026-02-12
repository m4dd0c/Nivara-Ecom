import { IBottom, ITop } from "$/types/api";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the API service for Wishlist
export const wishlistApi = createApi({
  reducerPath: "wishlistApi",
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
    // POST /api/v1/wishlist - Fetch wishlist items by IDs
    fetchWishlist: builder.mutation<(ITop | IBottom)[], { ids: string[] }>({
      query: ({ ids }) => ({
        url: "wishlist",
        method: "POST",
        body: { ids },
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const { useFetchWishlistMutation } = wishlistApi;
