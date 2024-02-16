import { configureStore } from "@reduxjs/toolkit";
import { reqresApi } from "./api/reqresApi/reqresApi";

export const store = configureStore({
  reducer: {
    [reqresApi.reducerPath]: reqresApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(reqresApi.middleware),
});
