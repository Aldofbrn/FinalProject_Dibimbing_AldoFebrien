import { configureStore } from "@reduxjs/toolkit";
import bannerReducer from "./bannerSlice";

export const store = configureStore({
  reducer: {
    banner: bannerReducer,
  },
});
