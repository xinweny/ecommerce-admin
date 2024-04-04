"use client";

import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { AdminCategory } from "@/db/query/category";

import { Heading } from "@/components/shared/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";

import { CategoryRow, columns } from "./columns";

interface CategoryClientProps {
  categories: AdminCategory[];
  totalCount: number;
}

export function CategoryClient({
  categories,
  totalCount,
}: CategoryClientProps) {
  const router = useRouter();

  const data = categories.map(({ id, name, slug, billboard, _count }) => {
    return {
      id,
      name,
      slug,
      productCount: _count.products,
      subcategoryCount: _count.subcategories,
      billboard: billboard
        ? { id: billboard.id, label: billboard.label }
        : null,
    } as CategoryRow;
  });

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title="Categories"
          description="Manage product categories"
        />
        <Button onClick={() => {
          router.push("/products/categories/add");
        }}>
          <Plus className="mr-2 h-4 w-4" />
          <span>New Category</span>
        </Button>
      </div>
      <Separator />
      <DataTable
        data={data}
        columns={columns}
        searchKey="name"
        totalCount={totalCount}
      />
    </>
  );
}