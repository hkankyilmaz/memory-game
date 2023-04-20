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

//listening the port
const server = app.listen(8080, () => {
  console.log("Hello Server");
});

//socket.io server
const io = new Server(server);

//regular middleware
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));

app.use(cookieParser());

//routes
app.use("/users", userRoutes);

//socket.io func
io.on("connection", (socket) => {
  console.log(socket.id);
  console.log("user connected");
});
