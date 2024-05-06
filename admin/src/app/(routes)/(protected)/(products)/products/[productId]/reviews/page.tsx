import { getProductById, getQueriedProductItems } from "@/db/query/product";
import { getQueriedReviews } from "@/db/query/review";

import { redirect } from "next/navigation";

import { ProductReviewsClient } from "./_components/product-reviews-client";

interface ProductPageProps {
  params: { productId: string };
  searchParams: {
    [key: string]: string | undefined;
  };
}

export default async function ProductPage({
  params: { productId },
  searchParams: {
    id,
    query,
    page,
    limit,
    rating,
    createdAt,
  }
}: ProductPageProps) {
  const product = await getProductById(+productId);

  if (!product) redirect("/products");

  const reviews = await getQueriedReviews({
    filter: {
      productId: product.id,
      comment: {
        contains: query,
        mode: "insensitive",
      },
    },
    pagination: { page, limit },
    sort: {
      id,
      rating,
      createdAt,
    },
  });

  return (
    <ProductReviewsClient
      reviews={reviews}
    />
  );
}