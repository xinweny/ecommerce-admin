import { db } from "@/db/client";

export const getOrderById = async (orderId: string) => {
  try {
    const order = await db.order.findUnique({
      where: { id: orderId },
      select: { id: true, email: true, orderNumber: true },
    });

    return order;
  } catch {
    return null;
  }
};