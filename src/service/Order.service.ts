import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class OrderService {
  createOrder = async (datas: any) => {
    let totalAmount = 0;
    const order = await prisma.order.create({
      data: {
        total: 0,
      },
    });
    datas.map(async (data: any) => {
      const product = await prisma.product.findUnique({
        where: {
          id: data.product_id,
        },
      });
      if (product) {
        this.createOrderProduct(order, product, data.quantity);
        totalAmount += product?.price;
      }
    });
    throw Error("Order заавал оруулна уу");
  };

  createOrderProduct = async (order: any, product: any, quantity: number) => {
    const order_product = await prisma.product_Order.create({
      data: {
        order: order,
        product: product,
        quantity: quantity,
      },
    });
    return order_product;
    // throw Error("Order заавал оруулна уу");
  };
}

export default new OrderService();
