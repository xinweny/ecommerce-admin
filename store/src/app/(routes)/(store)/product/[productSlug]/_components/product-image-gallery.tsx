"use client";

import Image from "next/image";
import { ProductItemImage } from "@prisma/client";
import {
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";

import { ProductItemIncludePayload } from "@/db/query/product";

import { cn } from "@/lib/utils";

interface ProductImageGalleryProps {
  productItem: ProductItemIncludePayload;
}

export function ProductImageGallery({
  productItem,
}: ProductImageGalleryProps) {
  const { images } = productItem;

  return (
    <TabGroup as="div" className="flex flex-col">
      <TabPanels className="aspect-square w-full">
        {images.map(image => (
          <TabPanel key={image.id}>
            <div className="aspect-square relative h-full w-full sm:rounded-lg overflow-hidden">
            <Image
              src={image.imageUrl}
              alt="Product image"
              width={0}
              height={0}
              sizes="100vw"
              className="object-contain object-center bg-slate-200 aspect-square cursor-pointer inset-0 overflow-hidden rounded-md"
              style={{ width: "100%", height: "100%" }}
            />
            </div>
          </TabPanel>
        ))}
      </TabPanels>
      <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
        <TabList className="grid grid-cols-4 gap-6">
          {images.map(image => (
            <ProductGalleryTab
              key={image.id}
              image={image}
            />
          ))}
        </TabList>
      </div>
    </TabGroup>
  );
}

interface ProductGalleryTabProps {
  image: ProductItemImage;
}

function ProductGalleryTab({
  image,
}: ProductGalleryTabProps) {
  return (
    <Tab className="relative flex items-center justify-center rounded-mf bg-white">
      {({ selected }) => (
        <div>
          <Image
            src={image.imageUrl}
            alt="Product image"
            width={0}
            height={0}
            sizes="100vw"
            className="object-contain object-center bg-slate-200 aspect-square cursor-pointer inset-0 overflow-hidden rounded-md"
            style={{ width: "100%", height: "100%" }}
          />
          <div
            className={cn(
              "absolute inset-0 rounded-md ring-2 ring-offset-2",
              selected ? "ring-black" : "ring-transparent"
            )}
          />
        </div>
      )}
    </Tab>
  );
}