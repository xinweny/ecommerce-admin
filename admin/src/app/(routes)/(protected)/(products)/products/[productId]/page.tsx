import { getProductById } from "@/db/query/product";

import { redirect } from "next/navigation";

import { ProductClient } from "./_components/product-client";

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
      <ProductClient product={product} />
    </>
  );
}