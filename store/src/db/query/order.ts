import { Prisma } from "@prisma/client";

import { db } from "@/db/client";

const orderIncludeArgs = {
  orderItems: {
    include: {
      productItem: {
        include: { images: true, product: true },
      },
    },
  },
} satisfies Prisma.OrderInclude;

export type OrderIncludePayload = Prisma.OrderGetPayload<{ include: typeof orderIncludeArgs }>;

export const getOrderById = async (orderId: string) => {
  try {
    const order = await db.order.findUnique({
      where: { id: orderId },
      include: orderIncludeArgs,
    });

    return order;
  } catch {
    return null;
  }
};