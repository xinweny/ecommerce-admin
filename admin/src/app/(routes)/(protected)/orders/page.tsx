import { Prisma, OrderStatus } from "@prisma/client";

import { parseDateRange } from "@/lib/db-query";

import { getOrdersCount, getQueriedOrders } from "@/db/query/order";

import { OrdersClient } from "./_components/orders-client";

interface ProductsPageProps {
  searchParams: {
    [key: string]: string | undefined;
  };
}

export default async function ProductsPage({
  searchParams: {
    id,
    page,
    limit,
    query,
    total,
    createdAt,
    currentStatus,
    dateRange,
  },
}: ProductsPageProps) {
  const filter = {
    id: {
      contains: query,
      mode: Prisma.QueryMode.insensitive,
    },
    ...(dateRange && {
      createdAt: parseDateRange(dateRange),
    }),
    ...(currentStatus && { currentStatus: currentStatus as OrderStatus }),
  };

  const [orders, totalCount] = await Promise.all([
    getQueriedOrders({
      pagination: { page, limit },
      sort: {
        id,
        total,
        createdAt,
      },
      filter,
    }),
    getOrdersCount(filter),
  ]);

  return (
    <OrdersClient
      orders={orders}
      totalCount={totalCount}
    />
  );
}