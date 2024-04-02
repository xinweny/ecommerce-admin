"use client";

import { useParams, useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { Billboard, Category } from "@prisma/client";

import { Heading } from "@/components/shared/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";

import { CategoryRow, columns } from "./columns";

interface CategoryClientProps {
  categories: Category[];
  billboards: Billboard[];
}

export function CategoryClient({
  categories,
  billboards,
}: CategoryClientProps) {
  const router = useRouter();
  const params = useParams();

  const data = categories.map(({ id, name, billboardId }) => {
    const billboard = billboards.find(billboard => billboard.id === billboardId);

    return {
      id,
      name,
      billboard: billboard
        ? { id: billboard.id, label: billboard.label }
        : null,
    } as CategoryRow;
  });

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Categories - ${categories.length}`}
          description="Manage product categories"
        />
        <Button onClick={() => {
          router.push(`/dashboard/${params.storeId}/categories/add`);
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
      />
    </>
  );
}