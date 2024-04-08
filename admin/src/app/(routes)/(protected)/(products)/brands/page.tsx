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
    subcategoryCount?: string;
    billboardLabel?: string;
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