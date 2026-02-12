import { IUser } from "$/types/api";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the API service for User/Auth
export const user = createApi({
  reducerPath: "user",
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
    // POST /api/v1/auth/send-otp?email={email} - Send OTP for registration
    sendOtp: builder.mutation<{ message: string }, { email: string }>({
      query: ({ email }) => ({
        url: `auth/send-otp?email=${email}`,
        method: "POST",
      }),
    }),

    // POST /api/v1/auth/verify-otp - Verify OTP
    verifyOtp: builder.mutation<
      { message: string },
      { otp: string; email: string }
    >({
      query: ({ otp, email }) => ({
        url: "auth/verify-otp",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp, email }),
      }),
    }),

    // POST /api/v1/auth/sign-up - Complete signup
    signUpForm: builder.mutation<
      { token: string; message: string },
      { name: string; email: string; password: string; phone: string }
    >({
      query: ({ name, email, password, phone }) => ({
        url: "auth/sign-up",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          phone,
        }),
      }),
      invalidatesTags: ["User"],
    }),

    // POST /api/v1/auth/sign-in - Sign in
    loginForm: builder.mutation<
      { token: string; message: string },
      { email: string; password: string }
    >({
      query: ({ email, password }) => ({
        url: "auth/sign-in",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      }),
      invalidatesTags: ["User"],
    }),

    // GET /api/v1/auth/me - Get logged-in user info
    getLoggedInUser: builder.query<IUser, void>({
      query: () => ({
        url: "auth/me",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    // POST /api/v1/auth/refresh-token - Refresh access token
    refreshToken: builder.mutation<{ accessToken: string }, void>({
      query: () => ({
        url: "auth/refresh-token",
        method: "POST",
      }),
    }),

    // POST /api/v1/auth/logout - Logout
    logOut: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["User"],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          console.log("Logged out successfully!");
          // Reset the API state to clear all cached data
          dispatch(user.util.resetApiState());
        } catch (error) {
          console.error("Error logging out:", error);
        }
      },
    }),
    // PUT /api/v1/user/update - Update user info
    updateUser: builder.mutation<IUser, any>({
      query: (body) => ({
        url: "auth/update",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetLoggedInUserQuery,
  useLogOutMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
  useSignUpFormMutation,
  useLoginFormMutation,
  useRefreshTokenMutation,
  useUpdateUserMutation,
} = user;
