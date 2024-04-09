import { getBrands } from "@/db/query/brand";

import { CreateSeriesForm } from "./_components/create-series-form";

export default async function CreateSeriesPage() {
  const brands = await getBrands();

  return (
    <CreateSeriesForm
      brands={brands}
    />
  );
}