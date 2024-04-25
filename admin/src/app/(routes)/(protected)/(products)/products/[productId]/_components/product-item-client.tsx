"use client";

import { useRouter } from "next/navigation";
import { Pencil, Plus } from "lucide-react";

import { FullProduct } from "@/db/query/product";

import { Heading } from "@/components/shared/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";

import { ProductItemRow, columns } from "./columns";

interface ProductItemClientProps {
  product: FullProduct;
}

export function ProductItemClient({
  product,
}: ProductItemClientProps) {
  const router = useRouter();

  const { productItems } = product;

  const data: ProductItemRow[] = productItems.map(({
    id,
    name,
    sku,
    stock,
    price,
    images,
  }) => {
    return {
      id,
      name,
      sku,
      stock,
      price,
      imageUrls: images.map(image => image.imageUrl),
    };
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Heading title={product.name} />
        <Button onClick={() => {
          router.push(`/products/edit?productId=${product.id}`);
        }}>
          <Pencil className="mr-2 h-4 w-4" />
          <span>Edit Product</span>
        </Button>
      </div>
      <Separator />
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