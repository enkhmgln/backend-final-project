import { Request, Response, NextFunction } from "express";

const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(
    `METHOD : ${req.method}, PROTOCOL : ${req.protocol}, HOST : ${req.hostname}, URL : ${req.originalUrl}`
  );
  next();
};

export default logger;
