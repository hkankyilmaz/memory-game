import { io } from "socket.io-client";

import { store } from "./store/store";
import { setRoom, setChat } from "./store/features/chat/chatSlice";
import {
  setPlayerTwoName,
  setPlayerOneName,
} from "./store/features/game/gameSlice";
import { setModal } from "./store/features/modal/modalSlice";

let socket = io("www.localhost:8080", {
  transports: ["websocket"],
});
export const init = () => {
  socket.on("connect", () => {
    console.log("Bağlantı gerçekleşti");
  });
};

export const sendMessage = (message: {
  text: string;
  fromMe: boolean;
  room: string;
  email: string;
}) => {
  if (!socket) return;
  socket.emit("Messages", message);
};

export const joinRoom = (user: { email?: string; name?: string }) => {
  socket.emit("chatRoom", user);
};

export const subscribeSeekGame = () => {
  socket.on(
    "chatRoom",
    (message: {
      text?: string;
      fromMe?: boolean;
      email?: string;
      name?: string;
      isSetGame?: boolean;
      room?: string;
    }) => {
      let state = store.getState();
      let userName = state.user.name;
      let email = state.user.email;
      console.log(message);
      console.log(
        message.name !== "",
        userName !== message.name,
        userName !== "Quest",
        state
      );
      if (message.isSetGame) {
        store.dispatch(setPlayerTwoName(message.name));
        store.dispatch(setModal(false));
        store.dispatch(setRoom(message.room));
        console.log("2 calistiii");
      }

      if (message.text && message.fromMe) {
        store.dispatch(
          setChat({
            text: message.text,
            fromMe: message.email == email ? true : false,
          })
        );
      }
    }
  );
};
subscribeSeekGame();

export const subscribeRoom = () => {
  socket.on(
    "ahmet@gmail.com",
    (message: {
      text?: string;
      fromMe?: boolean;
      email?: string;
      name?: string;
    }) => {
      console.log("deneme");
      if (message) {
        console.log(message);
      }
    }
  );
};
