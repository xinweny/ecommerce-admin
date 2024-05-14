"use client";

import Link from "next/link";
import Image from "next/image";
import { Expand } from "lucide-react";

import { ReviewSummary } from "./review-summary";
import { Currency } from "./currency";

import { ProductIncludePayload } from "@/db/query/product";

interface ProductCardProps {
  product: ProductIncludePayload;
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
      <div className="w-full h-auto rounded-lg border shadow-md overflow-hidden group">
        <div className="relative">
          <Image
            src={imageUrls.length > 0
              ? imageUrls[0]
              : "/placeholders/no-product-image.jpeg"
            }
            alt="Product image"
            width={0}
            height={0}
            sizes="100vw"
            className="object-contain object-center bg-slate-200 aspect-square"
            style={{ width: "100%", height: "100%" }}
          />
          <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-4 flex gap-6 justify-center z-1">
            <button
              className="rounded-full bg-white p-2"
              onClick={() => {}}
            >
              <Expand size={20} className="text-gray-600" />
            </button>
          </div>
        </div>
        <div className="flex flex-col py-2 px-4">
          <span className="text-xs">{brand.name.toUpperCase()}</span>
          <span className="font-semibold">{name}</span>
          {reviews && (
            <ReviewSummary aggregate={reviews} />
          )}
          <span className="text-right mt-2">
            <span className="text-xs">from </span>
            <Currency
              className="font-semibold"
              value={Math.min(...productItems.map(productItem => productItem.price))}
            />
          </span>
        </div>
      </div>
    </Link>
  );
}

interface ProductCardListProps {
  title?: string;
  products: ProductIncludePayload[];
}

export function ProductCardList({
  title,
  products,
}: ProductCardListProps) {
  return (
    <div className="space-y-6 px-8">
      {title && <h2 className="font-bold text-2xl">{title}</h2>}
      <div
        className="grid"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
        }}
      >
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}