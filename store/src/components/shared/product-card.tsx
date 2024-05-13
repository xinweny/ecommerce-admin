import Link from "next/link";
import Image from "next/image";

import { ReviewSummary } from "./review-summary";

import { ProductsIncludePayload } from "@/db/query/product";

interface ProductCardProps {
  product: ProductsIncludePayload;
}

export function ProductCard({
  product,
}: ProductCardProps) {
  const {
    name,
    slug,
    productItems,
    brand,
    reviews,
  } = product;

  const imageUrls = productItems
    .sort((a, b) => a.id - b.id)
    .reduce((acc, next) => [
      ...acc,
      ...next.images.map(image => image.imageUrl),
    ], [] as string[]);

  return (
    <Link href={`/product/${slug}`}>
      <div className="w-full h-auto rounded-lg shadow-md overflow-hidden">
        <Image
          src={imageUrls.length > 0
            ? imageUrls[0]
            : "/placeholders/no-product-image.jpeg"
          }
          alt="Product image"
          width={0}
          height={0}
          sizes="100vw"
          className="object-contain bg-slate-200 aspect-square"
          style={{ width: "100%", height: "100%" }}
        />
        <div className="flex flex-col py-2 px-4">
          <span className="text-xs">{brand.name.toUpperCase()}</span>
          <span className="text-sm font-semibold">{name}</span>
          {reviews && (
            <ReviewSummary aggregate={reviews} />
          )}
          <span className="text-right">
            <span className="text-xs">from </span>
            <span className="text-lg font-bold">
              {Math.min(...productItems.map(productItem => productItem.price))}
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}