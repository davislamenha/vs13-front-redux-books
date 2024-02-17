import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi/authApi";
import { cartReducer } from "@/redux/reducers/cart";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    cart: cartReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
