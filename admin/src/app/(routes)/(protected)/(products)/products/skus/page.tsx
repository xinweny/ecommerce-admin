import { getQueriedProductItems } from "@/db/query/product";
import { ProductItemClient } from "./_components/product-item-card";

interface ProductItemsPageProps {
  searchParams: {
    id?: string;
    page?: string;
    limit?: string;
    name?: string;
    productName?: string;
    query?: string;
  }
}

export default async function ProductItemsPage({
  searchParams: {
    page,
    limit,
    id,
    name,
    productName,
    query,
  },
}: ProductItemsPageProps) {
  const productItems = await getQueriedProductItems({
    pagination: { page, limit },
    sort: {
      id,
      name,
      product: { name: productName },
    },
    filter: {
      product: {
        name: {
          contains: query,
          mode: "insensitive",
        },
      }
    },
  });

  return (
    <>
      <ProductItemClient productItems={productItems} />
    </>
  );
}