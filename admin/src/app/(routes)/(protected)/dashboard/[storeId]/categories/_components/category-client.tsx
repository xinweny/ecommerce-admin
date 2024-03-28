"use client";

import { useParams } from "next/navigation";
import { Plus } from "lucide-react";
import { Billboard, Category } from "@prisma/client";

import { Heading } from "@/components/shared/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/modals/modal";

import { CreateCategoryForm } from "./create-category-form";

import { columns } from "./columns";

interface CategoryClientProps {
  categories: Category[];
  billboards: Billboard[];
}

export function CategoryClient({
  categories,
  billboards,
}: CategoryClientProps) {
  const params = useParams();

  const data = categories.map(({ id, name, storeId, billboardId }) => {
    const billboard = billboards.find(billboard => billboard.id === billboardId);

    return {
      id,
      name,
      storeId,
      billboard: billboard
        ? { id: billboard.id, label: billboard.label }
        : null,
    };
  });

  return (
    <>
      <div className="flex items-center justify-between">
      <Heading
        title={`Categories - ${categories.length}`}
        description="Manage product categories"
      />
        <Modal
          title="Create Category"
          description="Add a new product category"
          trigger={<Button>
            <Plus className="mr-2 h-4 w-4" />
            <span>New Category</span>
          </Button>}
        >
          <CreateCategoryForm
            storeId={params.storeId as string}
            billboards={billboards}
          />
        </Modal>
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