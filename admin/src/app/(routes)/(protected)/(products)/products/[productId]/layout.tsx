import { redirect } from "next/navigation";

import { getProductById } from "@/db/query/product";

import { Card } from "@/components/ui/card";

import { ProductNavbarDesktop } from "./_components/product-navbar";
import { ProductHeader } from "./_components/product-header";

interface ProductPageLayoutProps {
  params: { productId: string };
  children: React.ReactNode;
}

export default async function ProductPageLayout({
  params: { productId },
  children,
}: ProductPageLayoutProps) {
  const product = await getProductById(+productId);

  if (!product) redirect("/products");

  return (
    <div className="space-y-4 pb-8">
      <ProductHeader product={product} />
      <ProductNavbarDesktop productId={product.id} />
      <Card className="p-8">
        {children}
      </Card>
    </div>
  );
}