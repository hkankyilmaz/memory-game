import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

type IMatchs = {
  oppenent: string;
  score: string;
  isWin: boolean;
};
interface IUser {
  name: string;
  email: string;
  password?: string;
  wins?: number | null;
  lose?: number | null;
  matchs?: IMatchs[] | [] | IMatchs;
}

const initialState: IUser = {
  name: "Quest",
  email: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    whoIsUser: (state, action: PayloadAction<IUser>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
  },
});

export const { whoIsUser } = userSlice.actions;

export default userSlice.reducer;
