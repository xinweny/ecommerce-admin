"use client";

import { ProductIncludePayload } from "@/db/query/product";

import {
  Card,
  CardHeader,
  CardContent,
} from "@/components/ui/card";

import { ProductPageCardHeading } from "./product-page-content";

interface ProductClientProps {
  product: ProductIncludePayload;
}

export function ProductClient({
  product,
}: ProductClientProps) {
  return (
    <div className="space-y-4">
      <ProductPageCardHeading>Overview</ProductPageCardHeading>
      <div className="grid grid-cols-2 gap-4">
        <ProductInfoCard product={product} />
      </div>
    </div>
  );
}

export function ProductInfoCard({
  product,
}: ProductClientProps) {
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

  const rows = [
    { label: "Name", value: name },
    { label: "Model No.", value: model },
    { label: "Category", value: category.name },
    { label: "Subcategory", value: subcategory.name },
    { label: "Brand", value: brand.name },
    { label: "Series", value: series?.name || "-" },
  ];

  return (
    <Card>
      <CardHeader>
        <h4 className="font-semibold">Product Info</h4>
      </CardHeader>
      <CardContent className="space-y-4 break-all">
        <div>
          {rows.map(({ label, value }) => (
            <div
              key={label}
              className="flex gap-2 align-center justify-between text-sm border-b py-2"
            >
            <span className="font-semibold break-all">{label}</span>
            <span className="font-light">{value}</span>
          </div>
          ))}
        </div>
        <div className="text-sm">
          <span className=" font-semibold">Description</span>
          <p className="font-light">{description || "-"}</p>
        </div>
        {videoUrl && (
          <div className="flex flex-col justify-between text-sm">
            <span className="font-semibold">Video URL</span>
            <a className="font-light text-blue-600 hover:text-blue-800 visited:text-purple-600" href={videoUrl}>{videoUrl}</a>
          </div>
        )}
      </CardContent>
    </Card>
  );
}