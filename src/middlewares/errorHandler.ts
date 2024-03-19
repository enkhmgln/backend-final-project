import { Request, Response, NextFunction } from "express";
const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = { ...err };
  if (err.code === "P2025") {
    error.message = `Бүтээгдэхүүн олдсонгүй`;
  }
  if (err.code === "P2002" && err.meta?.target.includes("name")) {
    error.message = `Нэвтрэх нэр аль хэдийн үүсэн байна.`;
  }
  if (err.code === "P2002" && err.meta?.target.includes("email")) {
    error.message = `Бүртгэлтэй и-мэйл байна.`;
  }

  if (error.code === "P1003") {
    error.message = "Бааз олдсонгүй";
  }
  if (error.code === "P1001") {
    error.message = "Сервертэй холбогдож чадсангүй";
  }
  if (err.message === "incorrect password") {
    error.message = "Нууц үг буруу байна";
  }
  if (err.message === "jwt expired") {
    error.message = "токены хугацаа дууссан байна";
  }

  if (err.message === "user not found") {
    error.message = "Хэрэглэгч олдсонгүй";
  }
  if (err.message === "jwt malformed") {
    error.message = "Хүчингүй токен!";
  }
  if (err.message === "token is missing") {
    error.message = "токен байхгүй байна!";
  }

  // if (error.name === "PrismaClientValidationError") {
  //   error.message = "Талбарын төрөл ";
  // }
  if (error.name === "PrismaClientInitializationError") {
    error.message = "Баазтай холбогдоход алдаа гарлаа";
  }

  console.error("Алдаа : ", err);
  res.status(400).json({ success: false, error: error });
};

export default errorHandler;
