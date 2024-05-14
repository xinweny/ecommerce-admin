import { redirect } from "next/navigation";

import { RelatedProductsDisplay } from "./_components/related-products-display";

import { getProductBySlug, getProducts } from "@/db/query/product";

interface ProductPageProps {
  params: { productSlug: string };
}

export default async function ProductPage({
  params: { productSlug },
}: ProductPageProps) {
  const product = await getProductBySlug(productSlug);

  if (!product) redirect("/");

  const relatedProducts = await getProducts({
    filter: {
      AND: [
        { subcategoryId: product.subcategoryId },
        { id: { not: product.id } },
      ],
    },
    pagination: { limit: 5 },
  });

  return (
    <div className="bg-white px-4 py-10 sm:px-6 lg:px-8 lg:grid lg-grid-cols-2 lg:items-start lg:gap-x-8">
      <RelatedProductsDisplay product={product} />
    </div>
  );
}