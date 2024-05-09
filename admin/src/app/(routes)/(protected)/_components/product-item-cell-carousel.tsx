"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductItemCellCarouselProps {
  imageUrls: string[];
}

export function ProductItemCellCarousel({
  imageUrls,
}: ProductItemCellCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  return (
    <button
      className="relative w-[64px] h-[64px] rounded overflow-hidden"
      onClick={() => {
        setCurrentIndex(prev => (
          prev === (imageUrls.length - 1)
            ? 0
            : prev + 1
        ));
      }}
    >
      <Image
        src={imageUrls[currentIndex]}
        alt="Product Image"
        fill
        objectFit="contain"
        className="bg-secondary"
      />
    </button>
  );
}