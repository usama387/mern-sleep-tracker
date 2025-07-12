import { setAuthLoading, userLoggedIn, userLoggedOut } from "@/redux/authSlice";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const backendUrl = import.meta.env.VITE_AUTH_BACKEND_URL;

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: backendUrl,
    credentials: "include",
    mode: "cors",
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (formData) => ({
        url: "/register",
        method: "POST",
        body: formData,
      }),
    }),
    loginUser: builder.mutation({
      query: (formData) => ({
        url: "/login",
        method: "POST",
        body: formData,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          dispatch(setAuthLoading(true));
          const { data } = await queryFulfilled;
          dispatch(userLoggedIn({ user: data.user }));
        } catch (error) {
          console.error("Login failed:", error);
          dispatch(setAuthLoading(false));
        } finally {
          dispatch(setAuthLoading(false));
        }
      },
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "logout",
        method: "GET",
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(userLoggedOut());
        } catch (error) {
          console.log(error);
        }
      },
    }),
    getUserProfileDetails: builder.query({
      query: () => ({
        url: "/getProfile",
        method: "GET",
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(userLoggedIn({ user: data.user }));
        } catch (error) {
          console.error("Failed to fetch user profile:", error);
        }
      },
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(userLoggedOut());
        } catch (error) {
          console.log(error);
        }
      },
    }),
    sendMessage: builder.mutation({
      query: (formData) => ({
        url: "/send-message",
        method: "POST",
        body: formData,
      }),
    }),
    getUserMessages: builder.query({
      query: () => ({
        url: "/get-messages",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useSendMessageMutation,
  useGetUserMessagesQuery,
} = authApi;
