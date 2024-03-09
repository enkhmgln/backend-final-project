import { Request, Response, NextFunction } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import ProductService from "../service//Order.service";

class OrderController {
  createOrder = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const newOrder = await ProductService.createOrder(req.body.products);
      res.status(200).json({
        success: true,
        product: newOrder,
        message: "Амжилттай",
        error: null,
      });
    }
  );
}

export default new OrderController();
