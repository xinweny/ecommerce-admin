"use client";

import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { SubcategoryIncludePayload } from "@/db/query/subcategory";

import { Heading } from "@/components/shared/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";

import { SubcategoryRow, columns } from "./columns";

interface SubcategoriesClientProps {
  subcategories: SubcategoryIncludePayload[];
  totalCount: number;
}

export function SubcategoriesClient({
  subcategories,
  totalCount,
}: SubcategoriesClientProps) {
  const router = useRouter();

  const data: SubcategoryRow[] = subcategories.map(({ id, name, slug, category, _count }) => {
    return {
      id,
      name,
      slug,
      productCount: _count.products,
      category: { id: category.id, name: category.name },
    };
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Heading
          title="Subcategories"
          description="Manage product subcategories"
        />
        <Button onClick={() => {
          router.push("/categories/subcategories/add");
        }}>
          <Plus className="mr-2 h-4 w-4" />
          <span>New Subcategory</span>
        </Button>
      </div>
      <Separator />
      <DataTable
        data={data}
        columns={columns}
        totalCount={totalCount}
      />
    </div>
  );
}