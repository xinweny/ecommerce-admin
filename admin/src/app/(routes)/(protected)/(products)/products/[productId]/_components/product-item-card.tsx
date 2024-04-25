"use client";

import Image from "next/image";

import { ProductItemWithImages } from "@/db/query/product";

import {
  Card,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ProductItemCardProps {
  productItem: ProductItemWithImages;
}

export function ProductItemCard({
  productItem: {
    name,
    images,
  },
}: ProductItemCardProps) {
  return (
    <Card>
      <CardHeader>{name}</CardHeader>
      <CardContent>
        <Carousel className="w-full max-w-[200px] mx-10">
          <CarouselPrevious />
            <CarouselContent>
              {images.map(({ imageUrl }) => (
                <CarouselItem key={imageUrl}>
                  <div className="relative w-[200px] h-[200px] rounded overflow-hidden">
                    <Image
                      src={imageUrl}
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
        </Carousel>
      </CardContent>
    </Card>
  );
}