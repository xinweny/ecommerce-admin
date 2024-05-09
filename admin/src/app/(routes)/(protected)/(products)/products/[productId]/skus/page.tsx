import { getProductById, getQueriedProductItems } from "@/db/query/product";

import { redirect } from "next/navigation";

import { ProductItemsClient } from "./_components/product-items-client";

interface ProductPageProps {
  params: { productId: string };
  searchParams: {
    [key: string]: string | undefined;
  };
}

export default async function ProductPage({
  params: { productId },
  searchParams: {
    name,
    query,
    page,
    limit,
    sku,
    isArchived,
    price,
    stock,
  }
}: ProductPageProps) {
  const product = await getProductById(+productId);

  if (!product) redirect("/products");

  const productItems = await getQueriedProductItems({
    filter: {
      productId: product.id,
      sku: {
        contains: query,
        mode: "insensitive",
      },
    },
    pagination: { page, limit },
    sort: {
      name,
      sku,
      isArchived,
      price,
      stock,
    },
  });

  return (
    <ProductItemsClient
      product={product}
      productItems={productItems}
    />
  );
}