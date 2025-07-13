import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const backendUrl = import.meta.env.VITE_SLEEP_BACKEND_URL;

export const sleepApi = createApi({
  reducerPath: "sleepApi",
  baseQuery: fetchBaseQuery({
    baseUrl: backendUrl,
    credentials: "include",
    mode: "cors",
  }),
  tagTypes: ["SleepRecords"],
  endpoints: (builder) => ({
    addSleepRecord: builder.mutation({
      query: (sleepData) => ({
        url: "/add-record",
        method: "POST",
        body: sleepData,
      }),
      invalidatesTags: ["SleepRecords"],
    }),
    getSleepRecords: builder.query({
      query: () => ({
        url: "/get-user-record",
        method: "GET",
      }),
      providesTags: ["SleepRecords"],
    }),
    getAllUsersSleepRecords: builder.query({
      query: () => ({
        url: "/all-users-record",
        method: "GET",
      }),
      providesTags: ["SleepRecords"],
    }),
  }),
});

export const {
  useAddSleepRecordMutation,
  useGetSleepRecordsQuery,
  useGetAllUsersSleepRecordsQuery,
} = sleepApi;
