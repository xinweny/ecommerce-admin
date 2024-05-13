import { Prisma } from "@prisma/client";
import { cache } from "react";

import { db } from "../client";

export const reviewGroupByArgs = {
  by: "productId",
  _count: true,
  _avg: { rating: true },
} satisfies Prisma.ReviewGroupByArgs;

export type ReviewGroupByPayload = Awaited<Prisma.GetReviewGroupByPayload<typeof reviewGroupByArgs>>[0];