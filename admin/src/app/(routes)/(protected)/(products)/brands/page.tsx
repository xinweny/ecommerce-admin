import { getQueriedBrands, getBrandsCount } from "@/db/query/brand";

import { BrandClient } from "./_components/brand-client";

interface BrandsPageProps {
  searchParams: {
    id?: string;
    page?: string;
    limit?: string;
    name?: string;
    slug?: string;
    productCount?: string;
    seriesCount?: string;
    query?: string;
  }
}

export default async function BrandsPage({
  searchParams: {
    page,
    limit,
    id,
    name,
    slug,
    productCount,
    seriesCount,
    query,
  },
}: BrandsPageProps) {
  const [brands, totalCount] = await Promise.all([
    getQueriedBrands({
      pagination: { page, limit },
      sort: {
        id,
        name,
        slug,
        product: { _count: productCount },
        series: { _count: seriesCount },
      },
      filter: {
        name: {
          contains: query,
          mode: "insensitive",
        },
      },
    }),
    getBrandsCount()
  ]);

  return (
    <BrandClient
      brands={brands}
      totalCount={totalCount}
    />
  );
}