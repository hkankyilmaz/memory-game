import { prisma } from "../index";
import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { VerifyErrors } from "jsonwebtoken";

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
    res.status(200).json({
      user,
      succeded: true,
      message: "Register Succesfully",
    });
  } catch (error: any) {
    if (error.code === "P2002") {
      res.status(400).json({
        code: "P2002",
        succeded: false,
        message: "User e-mail Already Exist...",
      });
    } else {
      console.log(error);
      res.status(500).json({
        succeded: false,
        message: "Oh no, There is a Problem...",
        error,
      });
    }
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
        const token = jwt.sign({ name: user.id }, `${process.env.JWT_SECRET}`, {
          expiresIn: "1d",
        });

        res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24,
        });
        res.status(200).json({
          user,
          token,
          succeded: true,
          message: "Login Succesfully",
        });
      }
    } else {
      res.status(401).json({
        succeded: false,
        message: "There is no such user",
      });
    }
  } catch (error) {
    res.status(500).json({
      succeded: false,
      message: "Oh no, There is a Problem...",
      error,
    });
  }
};

export const loginWithToken = async (req: Request, res: Response) => {
  try {
    const token = req.body;
    console.log("token", token);

    jwt.verify(
      token,
      `${process.env.JWT_SECRET}`,
      undefined,
      async function (error, decoded) {
        if (error) {
          res.status(401).json({
            succeded: false,
            message: "Oh no, There is a Error...",
            error,
          });
        } else {
          const user = await prisma.user.findUnique({
            where: {
              id: decoded?.toString(),
            },
          });

          console.log(user);
          res.status(200).json({
            succeded: true,
            message: "User Check Succesfully...",
            user,
          });
        }
      }
    );
  } catch (error) {
    res.status(500).json({
      succeded: false,
      message: "Oh no, There is a Problem...",
      error,
    });
  }
};
