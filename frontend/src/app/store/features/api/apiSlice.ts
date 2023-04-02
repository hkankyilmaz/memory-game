import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface IMatchs {
  oppenent: string;
  score: string;
  isWin: boolean;
}

interface IUser {
  name: string;
  email: string;
  password: string;
  wins?: number;
  lose?: number;
  matchs?: IMatchs[];
}

export const apiSlice = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  endpoints: (builder) => ({
    getUsers: builder.query<IUser[], void>({
      query: () => `users`,
    }),
    getUser: builder.query<IUser, string>({
      query: (id) => `users`,
    }),
    registerUser: builder.mutation<IUser, IUser>({
      query: (user) => ({
        url: "/user-register",
        method: "POST",
        body: user,
      }),
    }),
    registerMatchResult: builder.mutation<
      IUser[],
      { idOne: string; idTwo: string }
    >({
      query: ({ idOne, idTwo }) => ({
        url: "/result-register",
        method: "POST",
        body: { idOne, idTwo },
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useRegisterUserMutation,
  useRegisterMatchResultMutation,
} = apiSlice;
