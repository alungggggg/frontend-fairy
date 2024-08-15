import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./api/auth";
import pilganSlice from "./api/soalPilgan";
import dongengSlice from "./api/dongeng";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    soalPilihanGanda: pilganSlice,
    dongeng : dongengSlice
  },
});
