import { Prisma } from "@prisma/client";
import { cache } from "react";

import { db } from "../client";

const categoryIncludeArgs = {
  billboard: true,
} satisfies Prisma.CategoryInclude;

export type CategoryIncludePayload = Prisma.CategoryGetPayload<{ include: typeof categoryIncludeArgs }>;

export const getCategoryBySlug = cache(async (slug: string) => {
  const category = await db.category.findUnique({
    where: { slug },
    include: categoryIncludeArgs,
  });

  return category;
});

export const getCategories = cache(async () => {
  const categories = await db.category.findMany();

  return categories;
});