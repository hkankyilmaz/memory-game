import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

// Define a type for the slice state

type IMatchs = {
  oppenent: string;
  score: string;
  isWin: boolean;
};
interface IUser {
  name: string;
  email: string;
  password: string;
  wins?: number | null;
  lose?: number | null;
  matchs?: IMatchs[] | [] | IMatchs;
}

// Define the initial state using that type
const initialState: IUser = {
  name: "",
  email: "",
  password: "",
  wins: 0,
  lose: 0,
  matchs: [],
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    whoIsUser: (state, action: PayloadAction<IUser>) => {
      state = {
        name: action.payload.name,
        email: action.payload.email,
        password: action.payload.password,
        //   wins: action.payload.wins,
        //   lose: action.payload.lose,
        //   matchs: action.payload.matchs,
      };
    },
  },
});

export const { whoIsUser } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
