import { Socket } from "dgram";
import express, { Express, Request, Response, urlencoded } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";

import { Server } from "socket.io";
import { createServer } from "http";

export const prisma = new PrismaClient();

const app = express();
const httpServer = createServer(app);

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

// socket.io funcs
io.on("connection", (socket) => {
  console.log(socket.id);
  console.log("user connected");

  socket.on("newRoom", (user: { email: string; name: string }) => {
    if (users.length % 2 === 0) {
      let isUserExixst = users.find((item) => item.email === user.email);
      if (!isUserExixst) {
        let _user: { name: string; email: string; id: string };
        _user = { email: user.email, name: user.name, id: socket.id };
        socket.join(user.email);
        users.push(_user);
        socket.emit("newRoom", _user);
      }
    } else {
      socket.emit("newRoom", users.slice(-1));
      let _user: { name: string; email: string; id: string };
      _user = { email: user.email, name: user.name, id: socket.id };
      users.push(_user);
    }
    console.log("user", users);
  });

  socket.on("disconnect", () => {
    let whoIsDisconnect = users.filter((item) => socket.id == item.id);
    let filteredUsers = users.filter((item) => socket.id !== item.id);
    users = filteredUsers;

    socket.emit(
      whoIsDisconnect[0].email,
      "The Game is Finished Because one player disconnect...!"
    );

    console.log("User Disconnected");
    console.log("user", users);
  });
});

console.log(users);
