import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./api/auth";

export const store = configureStore({
  reducer: {
    auth: authSlice, // Added auth reducer
  },
});