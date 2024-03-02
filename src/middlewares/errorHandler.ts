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
  if (err.code === "P2002") {
    error.message = `Нэвтрэх нэр аль хэдийн үүсэн байна`;
  }

  if (error.code === "P1003") {
    error.message = "Бааз олдсонгүй";
  }

  if (error.name === "PrismaClientValidationError") {
    error.message = "ID зөвхөн тоон утга байна";
  }

  console.error("Алдаа : ", err);
  res.status(400).json({ success: false, error: error });
};

export default errorHandler;
