import { Request, Response, NextFunction } from "express";

const asyncHandler = (functions: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await functions(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export default asyncHandler;
