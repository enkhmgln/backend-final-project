import { Request, Response, NextFunction } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import ProductService from "../service/Product.service";

class ProductController {
  createProduct = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { name, price } = req.body;
      const newProduct = await ProductService.createProduct(name, price);
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
      const sort = req.query.sort;
      const page = req.query.page;
      const limit = req.query.limit;

      // Pagination
      // Хэрвээ үзэх хуудасыг явуулаагүй бол 1-р хуудасыг авна..
      const pageNum = parseInt(page as string) || 1;
      // Хэрвээ хуудсанд байгаа category - ийн limit явуулаагүй бол нэг хуудсанд 30 category авна..
      const pageLimit = parseInt(limit as string) || 30;

      ["select", "limit", "page", "sort"].forEach(
        (element) => delete req.query[element]
      );
      const result = await ProductService.getProductsService(
        pageLimit,
        pageNum,
        sort as string,
        req.query as any
      );

      res.status(200).json({ success: true, result, error: null });
    }
  );
  getProduct = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { productId } = req.params;
      const product = await ProductService.getProductService(productId);
      res.status(200).json({ success: true, product, error: null });
    }
  );
  deleteProduct = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { productId } = req.params;
      const product = await ProductService.deleteProduct(productId);
      res.status(200).json({
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

      const product = await ProductService.updateProduct(productId, req.body);
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
