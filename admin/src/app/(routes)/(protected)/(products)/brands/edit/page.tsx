import { redirect } from "next/navigation";

import { getBrandById } from "@/db/query/brand";

import { UpdateBrandForm } from "./_components/update-brand-form";

interface EditBrandPageProps {
  searchParams: { brandId: string };
}

export default async function EditBrandPage({
  searchParams: { brandId },
}: EditBrandPageProps) {
  const brand = await getBrandById(+brandId);

  if (!brand) redirect("/brands");

  return (
    <UpdateBrandForm
      brand={brand}
    />
  );
}