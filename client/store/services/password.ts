import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the API service for Password Management
export const passwordApi = createApi({
  reducerPath: "passwordApi",
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
    // PUT /api/v1/password/change - Change password for authenticated user
    changePassword: builder.mutation<
      { message: string },
      { newPassword: string; currPassword: string }
    >({
      query: ({ newPassword, currPassword }) => ({
        url: "password/change",
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword, currPassword }),
      }),
    }),

    // PUT /api/v1/password/forget - Send OTP for password reset
    forgetPassword: builder.mutation<{ message: string }, { email: string }>({
      query: ({ email }) => ({
        url: "password/forget",
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }),
    }),

    // PUT /api/v1/password/reset/{otp} - Reset password using OTP
    resetPassword: builder.mutation<
      { message: string },
      { otp: string; password: string }
    >({
      query: ({ otp, password }) => ({
        url: `password/reset/${otp}`,
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useChangePasswordMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
} = passwordApi;
