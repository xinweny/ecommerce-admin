"use client";

import { Plus } from "lucide-react";
import { useRouter, useParams } from "next/navigation";

import { Heading } from "@/components/shared/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function BillboardPageHeader() {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title="Billboards (0)"
          description="Manage billboards for your store"
        />
        <Button onClick={() => {
          router.push(`/dashboard/${params.storeId}/billboards/new`)
        }}>
          <Plus className="mr-2 h-4 w-4" />
          <span>New Billboard</span>
        </Button>
      </div>
      <Separator />
    </>
  );
}