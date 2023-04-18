import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
type IPlayerGeneric<T> = {
  name: string;
  true: T;
  false: T;
  result: T;
};

interface IGame {
  pattern: string[];
  round: number;
  playerOne: IPlayerGeneric<string> | null;
  playerTwo: IPlayerGeneric<string> | null;
  win: number | null;
  lose: number | null;
  matchs: { rival: string; result: string; score: string }[];
}

const initialState: IGame = {
  pattern: [],
  round: 0,
  playerOne: null,
  playerTwo: null,
  win: 0,
  lose: 0,
  matchs: [],
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {},
});

//export const { whoIsUser } = userSlice.actions;

//export default userSlice.reducer;
