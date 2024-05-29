import { Prisma } from "@prisma/client";
import { cache } from "react";

import { db } from "../client";

export const getBrands = cache(async (query: Prisma.BrandWhereInput) => {
  const brands = await db.brand.findMany({
    where: query,
  });

  return brands;
});