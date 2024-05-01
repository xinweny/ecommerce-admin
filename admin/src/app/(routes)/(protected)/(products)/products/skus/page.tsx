import { getQueriedProductItems } from "@/db/query/product";
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
  const productItems = await getQueriedProductItems({
    pagination: { page, limit },
    sort: {
      id,
      name,
      product: { name: productName },
      isArchived,
    },
    filter: {
      sku: {
        contains: query,
        mode: "insensitive",
      },
    },
  });

  return (
    <ProductItemsClient productItems={productItems} />
  );
}