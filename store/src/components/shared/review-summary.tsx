import { Star, StarHalf } from "lucide-react";

import { ReviewGroupByPayload } from "@/db/query/review";

interface ReviewSummaryProps {
  aggregate: ReviewGroupByPayload | null;
}

export function ReviewSummaryShort({
  aggregate,
}: ReviewSummaryProps) {
  if (!aggregate) return null;

  const {
    _count: reviewCount,
    _avg: { rating: avgRating },
  } = aggregate;
  
  if (!reviewCount || !avgRating) return null;

  return (
    <div className="flex items-center gap-4">
      <div className="relative">
        <div className="flex gap-2">
          {Array.from(Array(5).keys()).map((i) => (
            <Star
              key={i}
              className="fill-gray-300"
              strokeWidth={0}
              size={16}
            />
          ))}
        </div>
        <div className="flex gap-2 absolute top-0 left-0">
          {Array.from(Array(Math.floor(avgRating))).map((i) => (
            <Star
              key={i}
              className="fill-yellow-400"
              strokeWidth={0}
              size={16}
            />
          ))}
          {avgRating - Math.floor(avgRating) > 0 && (
            <StarHalf
              className="fill-yellow-400"
              strokeWidth={0}
              size={16}
            />
          )}
        </div>
      </div>
      <span className="text-sm">{reviewCount}</span>
    </div>
  );
}

export function ReviewSummaryFull({
  aggregate,
}: ReviewSummaryProps) {
  const reviewCount = aggregate?._count || 0;
  const avgRating = aggregate?._avg.rating;

  return (
    <div className="flex items-center gap-4">
      {avgRating && <span>{+avgRating.toFixed(2)}</span>}
      <div className="relative">
        <div className="flex">
          {Array.from(Array(5).keys()).map((i) => (
            <Star
              key={i}
              className="fill-gray-300"
              strokeWidth={0}
              size={16}
            />
          ))}
        </div>
        <div className="flex absolute top-0 left-0">
          {avgRating && Array.from(Array(Math.floor(avgRating))).map((i) => (
            <Star
              key={i}
              className="fill-yellow-400"
              strokeWidth={0}
              size={16}
            />
          ))}
          {avgRating && avgRating - Math.floor(avgRating) > 0 && (
            <StarHalf
              className="fill-yellow-400"
              strokeWidth={0}
              size={16}
            />
          )}
        </div>
      </div>
      <span className="text-xs">{`${reviewCount} rating${reviewCount === 1 ? "" : "s"}`}</span>
    </div>
  );
}