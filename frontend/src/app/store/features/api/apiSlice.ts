import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface IMatchs {
  oppenent: string;
  score: string;
  isWin: boolean;
}

interface IUser {
  name?: string;
  email: string;
  password: string;
  wins?: number;
  lose?: number;
  matchs?: IMatchs[];
}

export const apiSlice = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080",
  }),
  endpoints: (builder) => ({
    getUsers: builder.query<IUser[], void>({
      query: () => `users`,
    }),
    getUser: builder.mutation<any, any>({
      query: (user) => ({
        url: "/users/login",
        method: "POST",
        body: user,
      }),
    }),
    registerUser: builder.mutation<any, any>({
      query: (user) => ({
        url: "/users/register",
        method: "POST",
        body: user,
      }),
    }),
    registerMatchResult: builder.mutation<
      IUser[],
      { idOne: string; idTwo: string }
    >({
      query: ({ idOne, idTwo }) => ({
        url: "/game-register",
        method: "POST",
        body: { idOne, idTwo },
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserMutation,
  useRegisterUserMutation,
  useRegisterMatchResultMutation,
} = apiSlice;
