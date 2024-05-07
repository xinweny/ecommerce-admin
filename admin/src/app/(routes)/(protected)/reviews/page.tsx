import { getReviewsGroupByProduct } from "@/db/query/review";

import { ReviewsClient } from "./_components/reviews-client";

interface ReviewsPageProps {
  params: { productId: string };
  searchParams: {
    [key: string]: string | undefined;
  };
}

export default async function ReviewsPage({
  searchParams: {
    query,
    page,
    limit,
    avgRating,
    reviewCount,
  }
}: ReviewsPageProps) {
  const reviews = await getReviewsGroupByProduct({
    filter: {
      product: {
        name: {
          contains: query,
          mode: "insensitive",
        },
      },
    },
    pagination: { page, limit },
    sort: {
      productId: "asc",
      _avg: { rating: avgRating },
      _count: reviewCount,
    },
  });

  return (
    <ReviewsClient reviews={reviews} />
  );
}