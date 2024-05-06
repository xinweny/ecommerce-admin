import { redirect } from "next/navigation";

import { getProductById } from "@/db/query/product";

interface ProductPageLayoutProps {
  params: { productId: string };
  children: React.ReactNode;
}

import { ProductNavbarDesktop } from "./_components/product-navbar";
import { ProductHeader } from "./_components/product-header";

export default async function ProductPageLayout({
  params: { productId },
  children,
}: ProductPageLayoutProps) {
  const product = await getProductById(+productId);

  if (!product) redirect("/products");

  return (
    <div className="space-y-4">
      <ProductHeader product={product} />
      <ProductNavbarDesktop productId={product.id} />
      {children}
    </div>
  );
}