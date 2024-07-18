import { apiSlice } from './apiSlice';

// const USERS_URL = 'https://mern-authentication-rtk-server.vercel.app/api/user';
const USERS_URL = `${import.meta.env.VITE_API_BASE_URL}/user`;

console.log(USERS_URL)

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: 'PATCH',
        body: data,
        credentials : 'include'
      }),
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/forgotPassword`,
        method: 'POST',
        body: data,
        credentials : 'include'
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/resetPassword`,
        method: 'POST',
        body: data,
        credentials : 'include'
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
useRegisterMutation,  
  useUpdateUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation
} = userApiSlice;
