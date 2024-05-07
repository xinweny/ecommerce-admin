"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { BillboardIncludePayload } from "@/db/query/billboard";

import { Heading } from "@/components/shared/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

import { BillboardRow, columns } from "./columns";

interface BillboardsClientProps {
  billboards: BillboardIncludePayload[];
  totalCount: number;
}

export function BillboardsClient({
  billboards,
  totalCount,
}: BillboardsClientProps) {
  const router = useRouter();

  const data = billboards.map(({ id, label, createdAt, _count }) => ({
    id,
    label,
    createdAt,
    categoryCount: _count.categories,
  })) satisfies BillboardRow[];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
      <Heading
          title="Billboards"
          description="Manage store billboards"
        />
        <Button onClick={() => {
          router.push("/billboards/add");
        }}>
          <Plus className="mr-2 h-4 w-4" />
          <span>New Billboard</span>
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