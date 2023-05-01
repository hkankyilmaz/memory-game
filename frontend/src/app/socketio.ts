import { io } from "socket.io-client";

import { store } from "./store/store";
import { setRoom, setChat } from "./store/features/chat/chatSlice";
import {
  setPlayerTwoName,
  setPlayerOneName,
} from "./store/features/game/gameSlice";

let state = store.getState();
let userName = state.user.name;
let email = state.user.email;

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
    }) => {
      if (message.email && !message.text) {
        store.dispatch(setRoom(message.email));
        //subscribeRoom();
      }
      if (message.name && userName !== message.name && userName !== "Quest") {
        store.dispatch(setPlayerTwoName(message.name));
      } else {
        store.dispatch(setPlayerOneName(userName));
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
    "hkankyilmazz@gmail.com",
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
