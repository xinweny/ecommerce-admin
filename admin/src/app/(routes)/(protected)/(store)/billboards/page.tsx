import { getBillboardsCount, getQueriedBillboards } from "@/db/query/billboard";

import { BillboardsClient } from "./_components/billboards-client";

interface BillboardsPageProps {
  searchParams: {
    [key: string]: string | undefined;
  };
}

export default async function BillboardsPage({
  searchParams: {
    page,
    limit,
    id,
    label,
    createdAt,
    categoryCount,
    query,
  },
}: BillboardsPageProps) {
  const [billboards, totalCount] = await Promise.all([
    getQueriedBillboards({
      pagination: { page, limit },
      sort: {
        id,
        label,
        createdAt,
        category: { _count: categoryCount },
      },
      filter: {
        label: {
          contains: query,
          mode: "insensitive",
        },
      },
    }),
    getBillboardsCount(),
  ]);

  return (
    <BillboardsClient
      billboards={billboards}
      totalCount={totalCount}
    />
  );
}