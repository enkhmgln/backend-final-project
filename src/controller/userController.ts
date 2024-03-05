import { Response, Request, NextFunction } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import UserService from "../service/user.service";

class userController {
  getUsers = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const users = await UserService.getUsersService();
      res.status(200).json({ users, error: null });
    }
  );

  createUser = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { name, password } = req.body;

      const user = await UserService.createUserService(name, password);

      res.status(201).json({
        message: "User registered successfully",
        user,
        error: null,
      });
    }
  );

  loginUser = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { name, password } = req.body;
      const user = await UserService.loginService(name, password);
      res.status(200).json({ user, message: "Амжилттай" });
    }
  );
}
export default new userController();
