import { IBottom, ICartPopulate, ITop } from "$/types/api";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the API service for Cart
export const cart = createApi({
  reducerPath: "cart",
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
  tagTypes: ["User", "Cart"],
  endpoints: (builder) => ({
    // GET /api/v1/cart - Get all cart items for logged-in user
    getCart: builder.query<
      {
        message: string;
        size: number;
        carts: ICartPopulate<IBottom | ITop>[];
      },
      void
    >({
      query: () => ({
        url: "cart",
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }),
      providesTags: ["Cart"],
    }),
    // POST /api/v1/cart - Add item to cart
    addToCart: builder.mutation({
      query: ({ itemId, quantity, color, size }) => ({
        url: "cart",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemId,
          quantity,
          color,
          size,
        }),
      }),
      invalidatesTags: ["Cart", "User"],
    }),
    // PUT /api/v1/cart - Update cart item quantity
    editCartItem: builder.mutation({
      query: ({ cartId, quantity }) => ({
        url: "cart",
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartId,
          quantity,
        }),
      }),
      invalidatesTags: ["Cart", "User"],
    }),
    // DELETE /api/v1/cart?cartId={cartId} - Remove item from cart
    removeFromCart: builder.mutation({
      query: (cartId) => ({
        url: "cart",
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        params: {
          cartId,
        },
      }),
      invalidatesTags: ["Cart", "User"],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useEditCartItemMutation,
  useGetCartQuery,
} = cart;
