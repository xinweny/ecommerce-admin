"use client";

import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { Brand, Category, Series, Subcategory } from "@prisma/client";

import { AdminProduct } from "@/db/query/product";

import { Heading } from "@/components/shared/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";

import { ProductRow, columns } from "./columns";

interface ProductClientProps {
  products: AdminProduct[];
  totalCount: number;
  filters: {
    categories: Category[];
    brands: Brand[];
  };
}

export function ProductClient({
  products,
  totalCount,
  filters,
}: ProductClientProps) {
  const router = useRouter();

  const data: ProductRow[] = products.map(({
    id,
    name,
    slug,
    brand,
    series,
    category,
    subcategory,
    productItems,
  }) => {
    return {
      id,
      name,
      slug,
      brand: { id: brand.id, name: brand.name },
      series: series
        ? { id: series.id, name: series.name }
        : undefined,
      category: { id: category.id, name: category.name },
      subcategory: { id: subcategory.id, name: subcategory.name },
      productItems: {
        count: productItems._count,
        totalStock: productItems._sum.stock || 0,
      },
    };
  });

  const {
    categories,
    brands,
  } = filters;

  const productFilters = [
    {
      name: "categoryId",
      label: "Categories",
      values: categories.map(category => ({
        label: category.name,
        value: category.id,
      })),
    },
    {
      name: "brandId",
      label: "Brands",
      values: brands.map(brand => ({
        label: brand.name,
        value: brand.id,
      })),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Heading
          title="Products"
          description="Manage store products"
        />
        <Button onClick={() => {
          router.push("/products/add");
        }}>
          <Plus className="mr-2 h-4 w-4" />
          <span>New Product</span>
        </Button>
      </div>
      <Separator />
      <DataTable
        data={data}
        columns={columns}
        totalCount={totalCount}
        filters={productFilters}
      />
    </div>
  );
}