import { Prisma } from "@prisma/client";

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
  },
}: ProductsPageProps) {
  const filter = {
    id: {
      query,
      mode: Prisma.QueryMode.insensitive,
    },
  };

  const [orders, totalCount] = await Promise.all([
    getQueriedOrders({
      pagination: { page, limit },
      sort: {
        id,
      },
      filter,
    }),
    getOrdersCount(filter),
  ])

  return (
    <OrdersClient
      orders={orders}
      totalCount={totalCount}
    />
  );
}