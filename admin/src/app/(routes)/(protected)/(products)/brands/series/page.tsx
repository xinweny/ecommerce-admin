import { getQueriedBrands, getBrandsCount } from "@/db/query/brand";

interface SeriesPageProps {
  searchParams: {
    id?: string;
    page?: string;
    limit?: string;
    name?: string;
    query?: string;
  }
}

export default async function SeriesPage({
  searchParams: {
    page,
    limit,
    id,
    name,
    query,
  },
}: SeriesPageProps) {
  return (
    <></>
  );
}