import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ITop, IBottom } from "$/types/api";

// Define the API service for Recommendations
export const recommendationApi = createApi({
  reducerPath: "recommendationApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5175/api/v1" }),
  endpoints: (builder) => ({
    // GET /api/v1/recommendation/{id}?sortBy=newest - Get recommended items
    getRecommendations: builder.query<
      { size: number; data: (ITop | IBottom)[] },
      { id: string; sortBy?: string }
    >({
      query: ({ id, sortBy = "newest" }) => ({
        url: `recommendation/${id}`,
        params: { sortBy },
      }),
    }),
  }),
});

export const { useGetRecommendationsQuery } = recommendationApi;
