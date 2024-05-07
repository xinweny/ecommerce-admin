import { Prisma } from "@prisma/client";

import { getProductItemsCount, getQueriedProductItems } from "@/db/query/product";

import { ProductItemsClient } from "./_components/product-items-client";

interface ProductItemsPageProps {
  searchParams: {
    [key: string]: string | undefined;
  };
}

export default async function ProductItemsPage({
  searchParams: {
    page,
    limit,
    id,
    name,
    productName,
    query,
    isArchived,
  },
}: ProductItemsPageProps) {
  const filter = {
    sku: {
      contains: query,
      mode: Prisma.QueryMode.insensitive,
    },
  }

  const [productItems, totalCount] = await Promise.all([
    getQueriedProductItems({
      pagination: { page, limit },
      sort: {
        id,
        name,
        product: { name: productName },
        isArchived,
      },
      filter,
    }),
    getProductItemsCount(filter),
  ]);

  return (
    <ProductItemsClient
      productItems={productItems}
      totalCount={totalCount}
    />
  );
}