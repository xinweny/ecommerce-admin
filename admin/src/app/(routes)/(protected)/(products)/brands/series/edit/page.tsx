import { redirect } from "next/navigation";

import { getSeriesById } from "@/db/query/series";
import { getBrands } from "@/db/query/brand";

import { UpdateSubcategoryForm } from "./_components/update-series-form";

interface EditSeriesPageProps {
  searchParams: { seriesId: string };
}

export default async function EditSeriesPage({
  searchParams: { seriesId },
}: EditSeriesPageProps) {
  const series = await getSeriesById(+seriesId);

  if (!series) redirect("/brands/series");

  const brands = await getBrands();

  return (
    <UpdateSubcategoryForm
      series={series}
      brands={brands}
    />
  );
}