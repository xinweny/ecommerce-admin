import { Prisma, OrderStatus } from "@prisma/client";

import { getOrdersCount, getQueriedOrders } from "@/db/query/order";

import { OrdersClient } from "./_components/orders-client";

interface ProductsPageProps {
  searchParams: {
    [key: string]: string | undefined;
  };
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const {
    page,
    limit,
    query,
    total,
    createdAt = "desc",
    currentStatus,
  } = searchParams;

  const filter = {
    orderNumber: {
      contains: query,
      mode: Prisma.QueryMode.insensitive,
    },
    createdAt: {
      gte: searchParams['dateRange[from]'] && new Date(searchParams['dateRange[from]']),
      lte: searchParams['dateRange[to]'] && new Date(searchParams['dateRange[to]']),
    },
    ...(currentStatus && { currentStatus: currentStatus as OrderStatus }),
  };

  const [orders, totalCount] = await Promise.all([
    getQueriedOrders({
      pagination: { page, limit },
      sort: {
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