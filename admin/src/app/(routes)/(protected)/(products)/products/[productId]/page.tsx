import { getProductById } from "@/db/query/product";

import { redirect } from "next/navigation";
import { ProductItemClient } from "./_components/product-item-client";

interface ProductPageProps {
  params: { productId: string };
}

export default async function ProductPage({
  params: { productId },
}: ProductPageProps) {
  const product = await getProductById(+productId);

  if (!product) redirect("/products");

  return (
    <>
      <ProductItemClient product={product} />
    </>
  );
}