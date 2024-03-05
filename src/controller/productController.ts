import { Request, Response, NextFunction } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import * as productService from "../service/product.service";

class ProductController {
  createProduct = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { name, price } = req.body;
      const newProduct = await productService.createProduct(name, price);
      res.status(200).json({
        success: true,
        product: newProduct,
        message: "Амжилттай",
        error: null,
      });
    }
  );
}

export default new ProductController();
