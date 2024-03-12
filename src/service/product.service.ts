import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class ProductService {
  createProduct = async (name: string, price: number) => {
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
  getProductsService = async (
    limit: number,
    page: number,
    sort: string,
    queryFilter?: any
  ) => {
    const { name, gtePrice, ltePrice } = queryFilter;
    let result = {
      total: 0,
      products: [] as any,
      pageCount: 0,
      start: 0,
      end: 0,
      defaultLimit: 0,
      nextPage: 0,
      previousPage: 0,
    };

    const products = await prisma.product.findMany({
      where: {
        name: {
          contains: name,
        },
        price: {
          lte: parseInt(ltePrice),
          gte: parseInt(gtePrice),
        },
      },
      take: limit,
      skip: page * limit - limit,
      orderBy: {
        [sort]: "asc",
      },
    });

    if (!products) {
      const error = new Error("Products not found");
      (error as any).code = "P2025";
      throw error;
    }

    // Нийт элементийн тоо
    const total = await prisma.product.count();
    // Заагдсан хуудасны эхлэх элементийн дугаар
    // Example : page=2 limit=20 ==> 2-1*20+1 = 21
    const start = (page - 1) * limit + 1;
    // Example : page=2 limit=20 ==> 21+20-1 = 40 || total
    let end = start + limit - 1;
    if (end > total) end = total;

    // Нийт хуудасны тоо
    const pageCount = Math.ceil(total / limit);
    if (page < pageCount) result.nextPage = page + 1;
    if (page > 1) result.previousPage = page - 1;

    result.start = start;
    result.end = end;
    result.total = total;
    result.pageCount = pageCount;
    result.products = products;
    result.defaultLimit = limit;
    return result;
  };
  getProductService = async (productId: string) => {
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
  deleteProduct = async (productId: string) => {
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
  updateProduct = async (productId: string, data: {}) => {
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
}

export default new ProductService();
