import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

// Define a type for the slice state
interface IUser {
  name: string;
  email: string;
  password: string;
  wins?: number;
  lose?: number;
  matchs?: {
    oppenent: string;
    score: string;
    isWin: boolean;
  };
}

// Define the initial state using that type
const initialState: IUser = {
  name: "",
  email: "",
  password: "",
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    register: (state, action: PayloadAction<IUser>) => {
      state = {
        name: action.payload.name,
        email: action.payload.email,
        password: action.payload.password,
      };
    },
  },
});

export const { register } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
