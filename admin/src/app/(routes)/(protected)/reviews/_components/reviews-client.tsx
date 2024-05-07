"use client";

import { ReviewGroupByPayload } from "@/db/query/review";

import { Heading } from "@/components/shared/heading";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";

import { columns, ProductReviewRow } from "./columns";

interface ReviewsClientProps {
  reviews: ReviewGroupByPayload[];
}

export function ReviewsClient({
  reviews,
}: ReviewsClientProps) {
  const data = reviews.map(({
    product,
    _count,
    _avg,
  }) => ({
    product: {
      id: product.id,
      name: product.name,
    },
    reviewCount: _count,
    avgRating: _avg.rating,
  })) satisfies ProductReviewRow[];

  return (
    <div className="space-y-4">
      <Heading title="Reviews" />
      <Separator />
      <DataTable
        data={data}
        columns={columns}
        totalCount={reviews.length}
        queryPlaceholder="Search products"
      />
    </div>
  );
}