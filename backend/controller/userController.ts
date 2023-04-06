import { prisma } from "../index";
import express, { Request, Response } from "express";

//Types

/**
 * We extends interfaces with Request and Response type because
 * There is no type in Request and Response type that we will be
 * use for user info
 */

export interface IuserObjRequest extends Request {
  body: {
    name?: string;
    email?: string;
    password?: string;
  };
}

interface IUser {
  name?: string;
  email?: string;
  password?: string;
}
// export interface IuserObjResponce extends Response {
//   ResBody: {
//     id?: string;
//     name?: string;
//     email?: string;
//     password?: string;
//   };
// }
export const userRegister = async (
  req: IuserObjRequest,
  res: IuserObjRequest
) => {
  try {
    const data: IUser = req.body;
    const user = prisma.user.create({
      name: data.name,
      email: data.email,
      password: data.password,
    });
    res.status(200).json({ user: user });
  } catch (error) {
    console.log(error);
  }
};
