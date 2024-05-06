"use client";

import { AdminReview } from "@/db/query/review";

import { Heading } from "@/components/shared/heading";
import { DataTable } from "@/components/ui/data-table";

import { columns } from "./columns";

interface ProductReviewsClientProps {
  reviews: AdminReview[];
}

export function ProductReviewsClient({
  reviews,
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

  return (
    <div className="space-y-4">
      <Heading title={`Reviews - ${1}`} />
      <DataTable
        data={data}
        columns={columns}
        totalCount={reviews.length}
        queryPlaceholder="Search comments"
      />
    </div>
  );
}