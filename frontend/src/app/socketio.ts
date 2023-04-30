import { Socket } from "dgram";
import { io } from "socket.io-client";

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
}) => {
  if (!socket) return;
  socket.emit("Messages", message);
};

export const joinRoom = (user: { email?: string; name?: string }) => {
  socket.emit("chatRoom", user);
};
// setTimeout(() => {
//   joinRoom({ name: "hakan", email: "hkankyilmaz" });
// }, 5000);

export const subscribeSeekGame = (callback: any) => {
  socket.on(
    "chatRoom",
    (message: {
      text?: string;
      fromMe?: boolean;
      email?: string;
      name?: string;
    }) => {
      if (message.email) {
        callback(message);
        console.log(message);
      }
    }
  );
};

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

//subscribeToMessages("chatRoom");
