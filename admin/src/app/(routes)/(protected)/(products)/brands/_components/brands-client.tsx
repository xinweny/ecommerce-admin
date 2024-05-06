"use client";

import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { BrandIncludePayload } from "@/db/query/brand";

import { Heading } from "@/components/shared/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";

import { BrandRow, columns } from "./columns";

interface BrandsClientProps {
  brands: BrandIncludePayload[];
  totalCount: number;
}

export function BrandsClient({
  brands,
  totalCount,
}: BrandsClientProps) {
  const router = useRouter();

  const data: BrandRow[] = brands.map(({ id, name, slug, _count }) => {
    return {
      id,
      name,
      slug,
      productCount: _count.products,
      seriesCount: _count.series,
    };
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Heading
          title="Brands"
          description="Manage store brands"
        />
        <Button onClick={() => {
          router.push("/brands/add");
        }}>
          <Plus className="mr-2 h-4 w-4" />
          <span>New Brand</span>
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