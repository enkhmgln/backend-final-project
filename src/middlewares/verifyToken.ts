import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) throw Error("token is missing");

  jwt.verify(
    token.split(" ")[1],
    process.env.SECRET_KEY || "",
    (err: any, decoded) => {
      if (err) throw err;
      else {
        (req as any).user = decoded;
        next();
      }
    }
  );
};

export default verifyToken;
