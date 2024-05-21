import { redirect } from "next/navigation";

import { Separator } from "@/components/ui/separator";

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
      <Separator className="mx-6 w-auto" />
      <RelatedProductsDisplay product={product} />
    </>
  );
}