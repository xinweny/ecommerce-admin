import { getProductBySlug } from "@/db/query/product";
import { redirect } from "next/navigation";

interface ProductPageProps {
  params: { productSlug: string };
}

export default async function ProductPage({
  params: { productSlug },
}: ProductPageProps) {
  const product = await getProductBySlug(productSlug);

  if (!product) redirect("/");

  return (
    <></>
  );
}