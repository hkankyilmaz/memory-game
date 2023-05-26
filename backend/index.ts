import express, { Express, Request, Response, urlencoded } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";

import { Server } from "socket.io";

export const prisma = new PrismaClient();

const app = express();

// listening the port
const server = app.listen(8080, () => {
  console.log("Hello Server");
});

// socket.io server
const io = new Server(server);

// regular middleware
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));

app.use(cookieParser());

// routes
app.use("/users", userRoutes);

// socket.io

// online-users
let users: { name: string; email: string; id: string }[] = [];
let rooms: string[] = [];

// socket.io funcs
io.on("connection", (socket) => {
  console.log("user connected...!");

  socket.on(
    "Messages",
    (message: { text: string; fromMe: boolean; room: string }) => {
      let _room = rooms.filter((item) => item == message.room);
      socket.in(_room[0]).emit("chatRoom", message);
      console.log("Message Kanalına Mesaj Geldi");
    }
  );

  socket.on("chatRoom", async (user: { email: string; name: string }) => {
    let isUserExixst = users.find((item) => item.email === user.email);
    console.log(user);
    if (!isUserExixst) {
      if (users.length % 2 === 0) {
        let _user: {
          name: string;
          email: string;
          id: string;
          isSetGame: boolean;
          room: string;
        };
        _user = {
          email: user.email,
          name: user.name,
          id: socket.id,
          isSetGame: true,
          room: user.email,
        };

        users.push(_user);
        rooms.push(user.email);
      } else {
        let _user: {
          name: string;
          email: string;
          id: string;
          isSetGame: boolean;
          room: string;
        };
        _user = {
          email: user.email,
          name: user.name,
          id: socket.id,
          isSetGame: true,
          room: users.slice(-1)[0].email,
        };
        users.push(_user);

        const sockets = await io.fetchSockets();
        console.log(sockets.slice(-2));
        sockets.slice(-2).map((item) => {
          item.join(users.slice(-2)[0].email);
        });

        socket.to(users.slice(-2)[0].id).emit("chatRoom", users.slice(-2)[1]);
        socket.emit("chatRoom", users.slice(-2)[0]);
      }
    }
    console.log(users, rooms);
    console.log(io.sockets.adapter.rooms);
  });

  socket.on("disconnect", () => {
    let whoIsDisconnect = users.filter((item) => socket.id == item.id);
    let filteredUsers = users.filter((item) => socket.id !== item.id);
    users = filteredUsers;
    console.log("deneme", socket.id, whoIsDisconnect);
    // socket.emit(
    //   whoIsDisconnect[0].email,
    //   "The Game is Finished Because one player disconnect...!"
    // );

    console.log("User Disconnected");
  });
});

console.log(users);
