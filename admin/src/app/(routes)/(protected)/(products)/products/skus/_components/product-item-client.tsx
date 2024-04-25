"use client";

import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { FullProductItem } from "@/db/query/product";

import { Heading } from "@/components/shared/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";

import { ProductItemRow, columns } from "./columns";

interface ProductItemClientProps {
  productItems: FullProductItem[];
}

export function ProductItemClient({
  productItems,
}: ProductItemClientProps) {
  const router = useRouter();

  const data: ProductItemRow[] = productItems.map(({
    id,
    name,
    sku,
    stock,
    price,
    images,
    product,
  }) => {
    return {
      id,
      name,
      sku,
      stock,
      price,
      imageUrls: images.map(image => image.imageUrl),
      product,
    };
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Heading title="SKUs" />
        <Button onClick={() => {
          router.push("/products/add");
        }}>
          <Plus className="mr-2 h-4 w-4" />
          <span>New Product Item</span>
        </Button>
      </div>
      <Separator />
      <DataTable
        data={data}
        columns={columns}
        totalCount={productItems.length}
      />
    </div>
  );
}