import { Prisma } from "@prisma/client";

import { SubcategoriesClient } from "./_components/subcategories-client";

import { getCategories } from "@/db/query/category";
import { getQueriedSubcategories, getSubcategoriesCount } from "@/db/query/subcategory";

interface SubcategoriesPageProps {
  searchParams: {
    [key: string]: string | undefined;
  };
}

export default async function SubcategoriesPage({
  searchParams: {
    page,
    limit,
    id,
    name,
    slug,
    productCount,
    query,
    categoryId,
  },
}: SubcategoriesPageProps) {
  const filter = {
    name: {
      contains: query,
      mode: Prisma.QueryMode.insensitive,
    },
    ...(categoryId && { categoryId: +categoryId }),
  };

  const [
    subcategories,
    totalCount,
    categories,
  ] = await Promise.all([
    getQueriedSubcategories({
      pagination: { page, limit },
      sort: {
        id,
        name,
        slug,
        productCount,
      },
      filter,
    }),
    getSubcategoriesCount(filter),
    getCategories(),
  ]);

  return (
    <SubcategoriesClient
      subcategories={subcategories}
      totalCount={totalCount}
      categories={categories}
    />
  );
}