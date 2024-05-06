"use client";

import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { Product } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/shared/heading";
import { Separator } from "@/components/ui/separator";

interface ProductHeaderProps {
  product: Product;
}

export function ProductHeader({
  product,
}: ProductHeaderProps) {
  const router = useRouter();

  const { name } = product;

  return (
    <div className="grow">
      <div className="flex justify-between mb-4">
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