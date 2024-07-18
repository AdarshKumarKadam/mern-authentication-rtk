import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  // baseUrl: 'https://mern-authentication-rtk-server.vercel.app/api',
  baseUrl:  import.meta.env.VITE_API_BASE_URL,
  credentials: 'include', 
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User'],
  endpoints: (builder) => ({}),
});
