import { io } from "socket.io-client";

let socket = io("www.localhost:8080", {
  transports: ["websocket"],
});
export const init = () => {
  socket.on("connect", () => {
    console.log("Bağlantı gerçekleşti");
  });
};

export const sendMessage = (
  message: { text: string; fromMe: boolean },
  room: string
) => {
  if (!socket) return;

  socket.emit(room, message);
};

export const joinRoom = (user: { email: string; name: string }) => {
  socket.emit("newRoom", user);
  console.log("denem");
};

joinRoom({ name: "hakan", email: "hkankyilmaz" });

export const subscribeToMessages = (room: string, callback: any) => {
  socket.on(room, (message: { text: string; fromMe: boolean }) => {
    callback(message);
  });
};
