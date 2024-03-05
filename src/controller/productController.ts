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
  getProducts = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const products = await productService.getProductsService();
      res.status(200).json({ success: true, products, error: null });
    }
  );
  getProduct = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { productId } = req.params;
      const product = await productService.getProductService(productId);
      res.status(200).json({ success: true, product, error: null });
    }
  );
  deleteProduct = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { productId } = req.params;
      const product = await productService.deleteProduct(productId);
      res
        .status(200)
        .json({
          success: true,
          product,
          error: null,
          message: "`Бүтээгдэхүүнийг амжилттай устгалаа",
        });
    }
  );
  updateProduct = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { productId } = req.params;

      const product = await productService.updateProduct(productId, req.body);
      res.status(200).json({
        success: true,
        product,
        message: `Бүтээгдэхүүнийг амжилттай шинэчлэлээ`,
        error: null,
      });
    }
  );
}

export default new ProductController();
