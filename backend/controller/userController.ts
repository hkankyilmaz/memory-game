import { prisma } from "../index";
import express, { Request, Response } from "express";

interface IuserObj {
  name: string;
  email: string;
  password: string;
}

export const userRegister = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    console.log(data);
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    });
    res.json({
      user,
    });
  } catch (error) {
    res.send(error);
  }
};
