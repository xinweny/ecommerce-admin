import { OrderStatus } from "@prisma/client";

import * as z from "zod";

export const updateOrderStatusSchema = z.object({
  status: z.nativeEnum(OrderStatus),
});
export type UpdateOrderStatusSchema = z.infer<typeof updateOrderStatusSchema>;