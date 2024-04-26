"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

interface ProductItemCellCarouselProps {
  imageUrls: string[];
}

export function ProductItemCellCarousel({
  imageUrls,
}: ProductItemCellCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;
 
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
 
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    })
  }, [api]);

  return (
    <Carousel className="w-full max-w-[200px] mx-10" setApi={setApi}>
      <CarouselPrevious />
        <CarouselContent>
          {imageUrls.map(url => (
            <CarouselItem key={url}>
              <div className="relative w-[200px] h-[200px] rounded overflow-hidden">
                <Image
                  src={url}
                  alt="Product Image"
                  fill
                  objectFit="contain"
                  className="bg-secondary"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      <CarouselNext />
      <div className="text-center pt-2">
        <span className="text-muted-foreground">{`${current} of ${count}`}</span>
      </div>
    </Carousel>
  );
}