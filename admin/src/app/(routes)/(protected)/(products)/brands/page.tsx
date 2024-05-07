import { Prisma } from "@prisma/client";

import { getQueriedBrands, getBrandsCount } from "@/db/query/brand";

import { BrandsClient } from "./_components/brands-client";

interface BrandsPageProps {
  searchParams: {
    [key: string]: string | undefined;
  };
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
  const filter = {
    name: {
      contains: query,
      mode: Prisma.QueryMode.insensitive,
    },
  };

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
      filter,
    }),
    getBrandsCount(filter),
  ]);

  return (
    <BrandsClient
      brands={brands}
      totalCount={totalCount}
    />
  );
}