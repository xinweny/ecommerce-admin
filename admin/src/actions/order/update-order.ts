"use server";

import { OrderStatus } from "@prisma/client";

import { db } from "@/db/client";
import { revalidatePath } from "next/cache";

export const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
  try {
    const order = await db.order.update({
      where: { id: orderId },
      data: {
        currentStatus: status,
      },
    });

    revalidatePath("/orders");
    revalidatePath(`/orders/${orderId}`);

    return { success: `${order.orderNumber} status updated.` };
  } catch (error) {
    return { error: "Something went wrong." };
  }
};