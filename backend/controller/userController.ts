import { prisma } from "../index";
import express, { Request, Response } from "express";

interface IuserObj {
  name: string;
  email: string;
  password: string;
}

export const userRegister = async (req, res) => {
  try {
    const data = req.body;
    const user = prisma.user.create({
      name: data.name,
      email: data.email,
      password: data.password,
    });
  } catch (error) {}
};
