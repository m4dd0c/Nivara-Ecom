import { IPopulateOrder, tColors, tSizes } from "$/types/api";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",
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
    createOrder: builder.mutation<
      any,
      {
        products: {
          cartId: string;
          id: string;
          quantity: number;
          size: tSizes;
          color: tColors;
        }[];
        receiverName?: string;
        mobileNumber?: string;
        email?: string;
        address: string;
      }
    >({
      query: ({ products, receiverName, mobileNumber, email, address }) => ({
        url: "checkout",
        method: "POST",
        body: { products, receiverName, mobileNumber, email, address },
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    // Get User Orders
    getUserOrders: builder.query<{ orders: IPopulateOrder[] }, void>({
      query: () => ({
        url: `/checkout`, // Assuming you send the userId as a query parameter
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    // Get Order By Id
    getOrderById: builder.query<{ order: IPopulateOrder }, string>({
      query: (id) => ({
        url: `/checkout/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetUserOrdersQuery,
  useGetOrderByIdQuery,
} = orderApi;
