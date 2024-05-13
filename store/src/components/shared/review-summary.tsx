import { Star, StarHalf } from "lucide-react";

import { ReviewGroupByPayload } from "@/db/query/review";

interface ReviewSummaryProps {
  aggregate: ReviewGroupByPayload;
}

export function ReviewSummary({
  aggregate,
}: ReviewSummaryProps) {
  const {
    _count: reviewCount,
    _avg: { rating: avgRating },
  } = aggregate;
  
  if (!reviewCount || !avgRating) return null;

  return (
    <div className="flex items-center gap-4">
      <div className="relative">
        <div className="flex gap-2">
          {Array.from(Array(5)).map((i) => (
            <Star
              key={i}
              className="fill-gray-300"
              strokeWidth={0}
            />
          ))}
        </div>
        <div className="flex gap-2 absolute top-0 left-0">
          {Array.from(Array(Math.floor(avgRating))).map((i) => (
            <Star
              key={i}
              className="fill-yellow-400"
              strokeWidth={0}
            />
          ))}
          {avgRating - Math.floor(avgRating) > 0 && (
            <StarHalf className="fill-yellow-400" strokeWidth={0} />
          )}
        </div>
      </div>
      <span className="text-sm">{reviewCount}</span>
    </div>
  );
}