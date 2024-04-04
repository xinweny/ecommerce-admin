"use client";

import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { AdminSubcategory } from "@/db/query/subcategory";

import { Heading } from "@/components/shared/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";

import { SubcategoryRow, columns } from "./columns";

interface SubcategoryClientProps {
  subcategories: AdminSubcategory[];
  totalCount: number;
}

export function SubcategoryClient({
  subcategories,
  totalCount,
}: SubcategoryClientProps) {
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
    <>
      <div className="flex items-center justify-between">
        <Heading
          title="Subcategories"
          description="Manage product subcategories"
        />
        <Button onClick={() => {
          router.push("/subcategories/add");
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
    </>
  );
}