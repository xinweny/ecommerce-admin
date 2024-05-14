import { redirect } from "next/navigation";

import { ProductClient } from "./_components/product-client";
import { RelatedProductsDisplay } from "./_components/related-products-display";

import { getProductBySlug } from "@/db/query/product";

interface ProductPageProps {
  params: { productSlug: string };
}

export default async function ProductPage({
  params: { productSlug },
}: ProductPageProps) {
  const product = await getProductBySlug(productSlug);

  if (!product) redirect("/");

  return (
    <>
      <ProductClient product={product} />
      <RelatedProductsDisplay product={product} />
    </>
  );
}