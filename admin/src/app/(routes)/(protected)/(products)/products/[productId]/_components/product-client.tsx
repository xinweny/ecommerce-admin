"use client";

import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";

import { ProductIncludePayload } from "@/db/query/product";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/shared/heading";
import { Separator } from "@/components/ui/separator";

interface ProductClientProps {
  product: ProductIncludePayload;
}

export function ProductClient({
  product,
}: ProductClientProps) {
  const router = useRouter();

  // TODO: display product info
  const {
    name,
    model,
    category,
    subcategory,
    brand,
    series,
    description,
    videoUrl,
  } = product;

  return (
    <div>

    </div>
  );
}