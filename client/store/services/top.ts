import { ITop } from "$/types/api";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: "api",
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
    getTops: builder.query<{ tops: ITop[]; size: number }, any>({
      query: (params) => {
        return {
          url: "tops",
          params,
        };
      },
    }),
    addTop: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "tops",
        method: "POST",
        body: formData,
      }),
    }),
    // Fetch a single Top by ID
    getTopById: builder.query<{ message: string; top: ITop }, string>({
      query: (id) => `tops/${id}`,
    }),
    // Update a Top by ID
    updateTop: builder.mutation<any, { id: string; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `tops/${id}`,
        method: "PUT",
        body: formData,
      }),
    }),
    // Delete a Top by ID
    deleteTop: builder.mutation<any, string>({
      query: (id) => ({
        url: `tops/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetTopsQuery,
  useAddTopMutation,
  useGetTopByIdQuery,
  useUpdateTopMutation,
  useDeleteTopMutation,
} = api;
