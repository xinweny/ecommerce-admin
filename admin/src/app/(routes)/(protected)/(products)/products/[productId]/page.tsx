import { getProductById } from "@/db/query/product";

import { redirect } from "next/navigation";

interface ProductPageProps {
  params: { productId: string };
}

export default async function ProductPage({
  params: { productId },
}: ProductPageProps) {
  const product = await getProductById(+productId);

  if (!product) redirect("/products");

  console.log(product);

  return (
    <></>
  );
}