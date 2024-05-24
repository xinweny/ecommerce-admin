"use server";

import { db } from "@/db/client";
import { revalidatePath } from "next/cache";
import { updateOrderStatusSchema, type UpdateOrderStatusSchema } from "@/schemas/order";

export const updateOrderStatus = async (orderId: string, values: UpdateOrderStatusSchema) => {
  try {
    const validatedFields = updateOrderStatusSchema.safeParse(values);

    if (!validatedFields.success) return { error: "Invalid fields." };

    const order = await db.order.update({
      where: { id: orderId },
      data: {
        currentStatus: values.status,
      },
    });

    revalidatePath("/orders");
    revalidatePath(`/orders/${orderId}`);

    return { success: `${order.orderNumber} status updated.` };
  } catch (error) {
    return { error: "Something went wrong." };
  }
};