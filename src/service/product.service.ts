import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createProduct = async (name: string, price: number) => {
  if (name && price) {
    const newProduct = await prisma.product.create({
      data: {
        name: name,
        price,
      },
    });
    return newProduct;
  }
  throw Error("Бүтээгдэхүүний нэр болон үнийг заавал оруулна уу");
};

const getProductsService = async () => {
  const products = await prisma.product.findMany();
  if (!products) {
    const error = new Error("Products not found");
    (error as any).code = "P2025";
    throw error;
  }
  return products;
};

const getProductService = async (productId: string) => {
  const product = await prisma.product.findUnique({
    where: { id: parseInt(productId) },
  });
  if (!product) {
    const error = new Error("Product not found");
    (error as any).code = "P2025";
    throw error;
  }
  return product;
};

const deleteProduct = async (productId: string) => {
  const product = await prisma.product.delete({
    where: { id: parseInt(productId) },
  });
  if (!product) {
    const error = new Error("Product not found");
    (error as any).code = "P2025";
    throw error;
  }
  return product;
};

const updateProduct = async (productId: string, data: {}) => {
  const product = await prisma.product.update({
    where: {
      id: parseInt(productId),
    },
    data,
  });
  if (!product) {
    const error = new Error("Product not found");
    (error as any).code = "P2025";
    throw error;
  }

  return product;
};

export {
  createProduct,
  getProductsService,
  getProductService,
  deleteProduct,
  updateProduct,
};
