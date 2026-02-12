import { IBottom } from "$/types/api";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the API service for Bottoms
export const bottomsApi = createApi({
  reducerPath: "bottomsApi",
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
    // Fetch all Bottoms with optional filters
    getBottoms: builder.query<{ bottoms: IBottom[]; size: number }, any>({
      query: (params) => {
        return {
          url: "bottoms",
          params,
        };
      },
    }),
    // Fetch a single Bottom by ID
    getBottomById: builder.query<{ message: string; bottom: IBottom }, string>({
      query: (id) => `bottoms/${id}`,
    }),
    // Create a new Bottom
    addBottom: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "bottoms",
        method: "POST",
        body: formData,
      }),
    }),
    // Update an existing Bottom
    updateBottom: builder.mutation<any, { id: string; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `bottoms/${id}`,
        method: "PUT",
        body: formData,
      }),
    }),
    // Delete a Bottom by ID
    deleteBottom: builder.mutation<any, string>({
      query: (id) => ({
        url: `bottoms/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetBottomsQuery,
  useGetBottomByIdQuery,
  useAddBottomMutation,
  useUpdateBottomMutation,
  useDeleteBottomMutation,
} = bottomsApi;
