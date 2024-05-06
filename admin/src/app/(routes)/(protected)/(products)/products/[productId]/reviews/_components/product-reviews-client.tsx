"use client";

import { ReviewAggregatePayload, ReviewIncludePayload } from "@/db/query/review";

import { Heading } from "@/components/shared/heading";
import { DataTable } from "@/components/ui/data-table";

import { columns } from "./columns";

interface ProductReviewsClientProps {
  reviews: ReviewIncludePayload[];
  reviewAggregate: ReviewAggregatePayload;
}

export function ProductReviewsClient({
  reviews,
  reviewAggregate,
}: ProductReviewsClientProps) {
  const data = reviews.map(({
    id,
    user,
    rating,
    comment,
    createdAt,
  }) => ({
    id,
    rating,
    user: {
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
    },
    comment,
    createdAt,
  }));

  const avgRating = reviewAggregate._avg.rating;

  return (
    <div className="space-y-4">
      <Heading title={`Reviews${avgRating ? ` - ${avgRating}` : ""}`} />
      <DataTable
        data={data}
        columns={columns}
        totalCount={reviews.length}
        queryPlaceholder="Search comments"
      />
    </div>
  );
}