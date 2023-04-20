import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IChat {
  text: string;
  fromMe: boolean;
}

const initialState: IChat[] | [] = [
  { text: "How are You ?", fromMe: true },
  { text: "Fine, you ?", fromMe: false },
];

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChat: (state, action: PayloadAction<IChat>) => {
      state = [...state, action.payload];
    },
  },
});

export const { setChat } = chatSlice.actions;

export default chatSlice.reducer;
