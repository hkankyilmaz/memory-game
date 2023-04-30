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
  isActive: boolean;
  pattern: string[] | [];
  round: number;
  playerOne: IPlayerGeneric<string>;
  playerTwo: IPlayerGeneric<string>;
  win: number | null;
  lose: number | null;
  matchs: { rival: string; result: string; score: string }[] | [];
}

const initialState: IGame = {
  isActive: false,
  pattern: [],
  round: 0,
  playerOne: {
    name: "",
    true: "",
    false: "",
    result: "",
  },
  playerTwo: {
    name: "",
    true: "",
    false: "",
    result: "",
  },
  win: 0,
  lose: 0,
  matchs: [],
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setPlayerTwoName: (state, action: PayloadAction<string>) => {
      state.playerTwo.name = action.payload;
    },
    setPlayerOneName: (state, action: PayloadAction<string>) => {
      state.playerOne.name = action.payload;
    },
  },
});

export const { setPlayerTwoName, setPlayerOneName } = gameSlice.actions;

export default gameSlice.reducer;
