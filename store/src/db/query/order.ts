import { Prisma } from "@prisma/client";
import { cache } from "react";

import { db } from "../client";

export const bestsellerOrderItemGroupByArgs = {
  by: "productId",
  _sum: { quantity: true },
  orderBy: {
    _sum: { quantity: "desc" },
  },
} satisfies Prisma.OrderItemGroupByArgs;

export type BestsellerOrderItemGroupByPayload = Awaited<Prisma.GetOrderItemGroupByPayload<typeof bestsellerOrderItemGroupByArgs>>;

