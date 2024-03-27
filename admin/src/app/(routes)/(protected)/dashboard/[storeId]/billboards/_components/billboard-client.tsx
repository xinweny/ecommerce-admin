"use client";

import { Plus } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { Billboard } from "@prisma/client";
import { format } from "date-fns";

import { Heading } from "@/components/shared/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

import { columns } from "./columns";

interface BillboardClientProps {
  billboards: Billboard[];
}

export function BillboardClient({
  billboards,
}: BillboardClientProps) {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
      <Heading
          title={`Billboards - ${billboards.length}`}
          description="Manage billboards for your store"
        />
        <Button onClick={() => {
          router.push(`/dashboard/${params.storeId}/billboards/new`);
        }}>
          <Plus className="mr-2 h-4 w-4" />
          <span>New Billboard</span>
        </Button>
      </div>
      <Separator />
      <DataTable
        data={billboards.map(({ id, label, createdAt }) => ({
          id,
          label,
          createdAt: format(createdAt, "dd/mm/yyyy"),
        }))}
        columns={columns}
        searchKey="label"
      />
    </>
  );
}