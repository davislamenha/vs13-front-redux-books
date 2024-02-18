import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  RegisterUserResponse,
  RegisterUserRequest,
  LoginUserResponse,
  LoginUserRequest,
  FavoritesRequest,
  FavoritesResponse,
  DeleteFavoriteRequest,
} from "./types";

export const authApi = createApi({
  reducerPath: "authApi",
  tagTypes: ["Favorites"],
  baseQuery: fetchBaseQuery({ baseUrl: "https://auth-api.cyclic.app/" }),
  endpoints: (builder) => ({
    register: builder.mutation<RegisterUserResponse, RegisterUserRequest>({
      query: (body) => ({
        url: "register",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      }),
    }),
    login: builder.mutation<LoginUserResponse, LoginUserRequest>({
      query: (body) => ({
        url: "login",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      }),
    }),
    addToFavorites: builder.mutation<FavoritesResponse, FavoritesRequest>({
      query: (body) => ({
        url: "favorites",
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body,
      }),
      invalidatesTags: ["Favorites"],
    }),
    deleteFavorite: builder.mutation<void, DeleteFavoriteRequest>({
      query: ({ id }) => ({
        url: `favorites/${id}`,
        method: "DELETE",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: ["Favorites"],
    }),
    getFavorites: builder.query<FavoritesResponse[], void>({
      query: () => ({
        url: "favorites",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      providesTags: ["Favorites"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useAddToFavoritesMutation,
  useGetFavoritesQuery,
  useDeleteFavoriteMutation,
  useLazyGetFavoritesQuery,
} = authApi;
