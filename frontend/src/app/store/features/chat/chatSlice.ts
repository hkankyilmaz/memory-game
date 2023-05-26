import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IMessages {
  text: string;
  fromMe: boolean;
}

interface IChat {
  isActive: boolean;
  chat: IMessages[];
  room: string;
}

const initialState: IChat = {
  isActive: false,
  chat: [],
  room: "",
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChat: (state, action: PayloadAction<IMessages>) => {
      state.chat = [...state.chat, action.payload];
    },
    setRoom: (state, action: PayloadAction<string>) => {
      state.room = action.payload;
    },
  },
});

export const { setChat, setRoom } = chatSlice.actions;

export default chatSlice.reducer;
