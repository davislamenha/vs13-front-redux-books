import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  RegisterUserResponse,
  RegisterUserRequest,
  LoginUserResponse,
  LoginUserRequest,
} from "./types";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://auth-api.cyclic.app/" }),
  endpoints: (builder) => ({
    register: builder.mutation<RegisterUserResponse, RegisterUserRequest>({
      query: (body) => ({
        url: "register",
        method: "POST",
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
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
