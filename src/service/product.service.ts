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

export { createProduct };
