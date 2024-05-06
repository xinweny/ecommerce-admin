"use client";

import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { SeriesIncludePayload } from "@/db/query/series";

import { Heading } from "@/components/shared/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";

import { SeriesRow, columns } from "./columns";

interface SeriesClientProps {
  series: SeriesIncludePayload[];
  totalCount: number;
}

export function SeriesClient({
  series,
  totalCount,
}: SeriesClientProps) {
  const router = useRouter();

  const data: SeriesRow[] = series.map(({ id, name, slug, brand, _count }) => {
    return {
      id,
      name,
      slug,
      brand: { id: brand.id, name: brand.name },
      productCount: _count.products,
    };
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Heading
          title="Series"
          description="Manage product series"
        />
        <Button onClick={() => {
          router.push("/brands/series/add");
        }}>
          <Plus className="mr-2 h-4 w-4" />
          <span>New Series</span>
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