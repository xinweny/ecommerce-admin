import { redirect } from "next/navigation";

import { getProductById } from "@/db/query/product";

interface ProductPageLayoutProps {
  params: { productId: string };
  children: React.ReactNode;
}

import { ProductNavbarDesktop } from "./_components/product-navbar";

export default async function ProductPageLayout({
  params: { productId },
  children,
}: ProductPageLayoutProps) {
  const product = await getProductById(+productId);

  if (!product) redirect("/products");

  return (
    <div className="grow flex">
      <ProductNavbarDesktop product={product} />
      {children}
    </div>
  );
}