"use client";

import { Plus } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { Billboard } from "@prisma/client";
import { format } from "date-fns";

import { Heading } from "@/components/shared/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

import { BillboardRow, columns } from "./columns";

interface BillboardClientProps {
  billboards: Billboard[];
  totalCount: number;
}

export function BillboardClient({
  billboards,
  totalCount,
}: BillboardClientProps) {
  const router = useRouter();
  const params = useParams();

  const data = billboards.map(({ id, label, createdAt }) => ({
    id,
    label,
    createdAt: format(createdAt, "dd/mm/yyyy"),
  } as BillboardRow));

  return (
    <>
      <div className="flex items-center justify-between">
      <Heading
          title="Billboards"
          description="Manage store billboards"
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
        data={data}
        columns={columns}
        searchKey="label"
        totalCount={totalCount}
      />
    </>
  );
}