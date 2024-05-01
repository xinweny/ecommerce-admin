"use client";

import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";

import { FullProduct } from "@/db/query/product";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/shared/heading";
import { Separator } from "@/components/ui/separator";

interface ProductClientProps {
  product: FullProduct;
}

export function ProductClient({
  product,
}: ProductClientProps) {
  const router = useRouter();

  // TODO: display product info
  const {
    name,
    model,
    category,
    subcategory,
    brand,
    series,
    description,
    videoUrl,
  } = product;

  return (
    <div className="grow">
      <div className="flex justify-between">
        <Heading title={name} />
        <Button onClick={() => { router.push(`/products/edit?productId=${product.id}`) }}>
          <Pencil className="mr-2 h-4 w-4" />
          <span>Edit Product</span>
        </Button>
      </div>
      <Separator />
    </div>
  );
}