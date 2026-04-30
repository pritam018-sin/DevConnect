import { configureStore } from '@reduxjs/toolkit';
// import the slice reducer as default export
import counterReducer from './feature/counterSlice.js';
import authReducer from './feature/auth/authSlice.js';
import { apiSlice } from './api/apiSlice.js';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});