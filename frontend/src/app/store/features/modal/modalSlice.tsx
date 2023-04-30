import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

const initialState: { isOpen: boolean; useCase: string } = {
  isOpen: false,
  useCase: "",
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModal: (state, action: PayloadAction<boolean>) => {
      if (action.payload === true) {
        state.isOpen = action.payload;
      } else if (action.payload === false) {
        state.isOpen = action.payload;
      }
    },
    setUseCase: (state, action: PayloadAction<string>) => {
      state.useCase = action.payload;
    },
  },
});

export const { setModal, setUseCase } = modalSlice.actions;

export default modalSlice.reducer;
