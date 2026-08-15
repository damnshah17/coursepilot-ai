import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const defaultApiBaseUrl = "http://localhost:4000/api";

const configuredApiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const apiBaseUrl =
  configuredApiBaseUrl && configuredApiBaseUrl.trim().length > 0
    ? configuredApiBaseUrl
    : defaultApiBaseUrl;

export const api = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: apiBaseUrl,
    credentials: "include",
  }),

  tagTypes: [
    "Auth",
    "Course",
    "Lesson",
    "Enrollment",
    "Exercise",
    "Progress",
    "Document",
  ],

  endpoints: () => ({}),
});
