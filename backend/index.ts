import express, { Express, Request, Response, urlencoded } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import cookieParser from "cookie-parser";
import userController from "./controller/userController.ts";

export const prisma = new PrismaClient();

const app = express();

//regular middleware
app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use(cookieParser());

//routes

app.use("/users", userController);

app.listen(8080, () => {
  console.log("Hello Server");
});
