import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import { userApiSlice } from "./features/api/userApiSlice";
import chatReducer from "./features/chat/chatSlice";
import modalSlice from "./features/modal/modalSlice";
import gameSlice from "./features/game/gameSlice";
import { setupListeners } from "@reduxjs/toolkit/query";

// ...

export const store = configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer,
    modal: modalSlice,
    game: gameSlice,
    [userApiSlice.reducerPath]: userApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApiSlice.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
