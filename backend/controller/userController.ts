import { prisma } from "../index";
import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";

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
  } catch (error: any) {
    if (error.code === "P2002") {
      res.send({
        code: "P2002",
        message: "User e-mail Already Exist...",
      });
    }
    res.send(error);
  }
};

export const LoginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      if (user.password == password) {
        const token = jwt.sign(user.id, `${process.env.JWT_SECRET}`, {
          expiresIn: "2h",
        });
        res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24,
        });
      }
    } else {
      res.status(401).json({
        succeded: false,
        error: "There is no such user",
      });
      res.send("Cookie has been sended");
    }
  } catch (error) {
    res.status(500).json({
      succeded: false,
      error,
    });
  }
};
