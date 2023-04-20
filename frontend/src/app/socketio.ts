import { io } from "socket.io-client";

let socket: any;
export const init = () => {
  socket = io("www.localhost:8080", {
    transports: ["websocket"],
  });

  socket.on("connect", () => {
    console.log("Bağlantı gerçekleşti");
  });
};

export const sendMessage = (message: { text: string; fromMe: boolean }) => {
  if (!socket) return;

  socket.emit("new-message", message);
};

export const subscribeToMessages = (callback: any) => {
  socket.on("receive-message", (message: { text: string; fromMe: boolean }) => {
    console.log("New Message", message);
    callback(message);
  });
};
