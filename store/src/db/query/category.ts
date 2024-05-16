import { Prisma } from "@prisma/client";
import { cache } from "react";

import { db } from "../client";

import {
  where,
  orderBy,
  paginate,
  DbQueryParams,
} from "@/lib/db-query";

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

export const getSubcategories = cache(async (params: DbQueryParams<Prisma.SubcategoryWhereInput>) => {
  const { filter, sort, pagination } = params;

  const subcategories = await db.subcategory.findMany({
    ...where(filter),
    ...orderBy(sort),
    ...paginate(pagination),
  });

  return subcategories;
});