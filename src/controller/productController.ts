import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import asyncHandler from "../middlewares/asyncHandler";

const prisma = new PrismaClient();

const createProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, price } = req.body;

    if (name && price) {
      const newProduct = await prisma.product.create({
        data: {
          name: name,
          price,
        },
      });
      res.status(200).json({
        success: true,
        product: newProduct,
        message: "Амжилттай",
        error: null,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Бүтээгдэхүүний нэр болон үнийг заавал оруулна уу",
      });
    }
  }
);

const getProducts = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const products = await prisma.product.findMany();
    if (!products) {
      throw Error("Бүтээгдэхүүн олдсонгүй");
    }
    res.status(200).json({ success: true, products, error: null });
  }
);

const getProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { productId } = req.params;

    const product = await prisma.product.findUnique({
      where: { id: parseInt(productId) },
    });
    if (!product) {
      throw Error("Бүтээгдэхүүн олдсонгүй");
    }
    res.status(200).json({ success: true, product, error: null });
  }
);

const deleteProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { productId } = req.params;
    const product = await prisma.product.delete({
      where: { id: parseInt(productId) },
    });
    if (!product) {
      throw Error("Бүтээгдэхүүн олдсонгүй.");
    }
    res.status(200).json({ success: true, product, error: null });
  }
);

const updateProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { productId } = req.params;

    const product = await prisma.product.update({
      where: {
        id: parseInt(productId),
      },
      data: req.body,
    });
    if (!product) {
      throw Error("Бүтээгдэхүүн олдсонгүй");
    }
    res
      .status(200)
      .json({
        success: true,
        product,
        message: `Бүтээгдэхүүнийг амжилттай шинэчлэлээ`,
        error: null,
      });
  }
);

export { getProducts, getProduct, deleteProduct, updateProduct, createProduct };
