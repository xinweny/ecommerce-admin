import { getQueriedBrands, getBrandsCount } from "@/db/query/brand";

interface FinishesPageProps {
  searchParams: {
    id?: string;
    page?: string;
    limit?: string;
    name?: string;
    query?: string;
  }
}

export default async function FinishesPage({
  searchParams: {
    page,
    limit,
    id,
    name,
    query,
  },
}: FinishesPageProps) {
  return (
    <></>
  );
}