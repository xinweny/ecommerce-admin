"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

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
  } = product;

  const imageUrls = productItems.reduce((acc, next) => [
    ...acc,
    ...next.images.map(image => image.imageUrl),
  ], [] as string[]);

  return (
    <Link href={`/product/${slug}`}>
      <div className="rounded-lg shadow-md">
        <div>
          <span>{brand.name}</span>
          <span>{name}</span>
          <span>{`from ${Math.min(...productItems.map(productItem => productItem.price))}`}</span>
        </div>
      </div>
    </Link>
  );
}