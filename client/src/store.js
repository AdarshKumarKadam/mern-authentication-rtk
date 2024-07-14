// import { configureStore } from '@reduxjs/toolkit';
// import { apiSlice } from './slices/apiSlice';
// import authReducer from './slices/authSlice';

// const store = configureStore({
//     reducer: {
//         [apiSlice.reducerPath]: apiSlice.reducer,
//         auth: authReducer,
//     },
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware().concat(apiSlice.middleware),
// });

// export default store;


import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import { apiSlice } from './slices/apiSlice'; // Assuming you have an API slice

const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer, // If using RTK Query
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // If using RTK Query
});

export default store;
