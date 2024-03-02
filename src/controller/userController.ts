import { Response, Request, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import asyncHandler from "../middlewares/asyncHandler";
import { error } from "console";

const prisma = new PrismaClient();

const secretKey = crypto.randomBytes(32).toString("hex");
// console.log("secret_key : ", secretKey);

const getUsers = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await prisma.user.findMany({
      select: {
        name: true,
      },
    });
    res.status(200).json({ users, error: null });
    if (!users) {
      throw Error("Хэрэглэгч байхгүй байна");
    }
  }
);

const createUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name: username,
        password: hashedPassword,
      },
    });
    res
      .status(201)
      .json({ message: "User registered successfully", user, error: null });

    console.log("Нууц үг : ", password);
    console.log("Нууц үг hashed : ", hashedPassword);
  }
);

const loginUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({
      where: { name: username },
    });
    if (!user) {
      throw Error("Authentication failed: User not found");
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw Error("Authentication failed: Incorrect password");
    }
    const token = jwt.sign({ userId: user.id }, secretKey, {
      expiresIn: "1h",
    });
    res.status(200).json({ token, message: "Амжилттай" });
  }
);

export { getUsers, createUser, loginUser };
