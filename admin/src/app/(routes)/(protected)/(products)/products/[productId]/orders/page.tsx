import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";

import { parseDateRange } from "@/lib/db-query";

import { getProductById } from "@/db/query/product";
import { getQueriedOrderItems, getOrderItemsCount } from "@/db/query/order";

import { ProductOrderItemsClient } from "./_components/product-order-items-client";

interface ProductOrderItemsPageProps {
  params: { productId: string };
  searchParams: {
    [key: string]: string | undefined;
  };
}

export default async function ProductOrderItemsPage({
  params: { productId },
  searchParams: {
    page,
    limit,
    createdAt = "desc",
    dateRange,
  },
}: ProductOrderItemsPageProps) {
  const product = await getProductById(+productId);

  if (!product) redirect("/products");

  const filter = {
    ...(dateRange && {
      order: {
        createdAt: parseDateRange(dateRange),
      },
    }),
  } satisfies Prisma.OrderItemWhereInput;

  const [orderItems, totalCount] = await Promise.all([
    getQueriedOrderItems({
      pagination: { page, limit },
      filter,
      sort: { order: { createdAt } },
    }),
    getOrderItemsCount(filter),
  ]);

  return (
    <ProductOrderItemsClient
      orderItems={orderItems}
      totalCount={totalCount}
      productItems={product.productItems}
    />
  );
}