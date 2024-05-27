import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";

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
  searchParams,
}: ProductOrderItemsPageProps) {
  const {
    page,
    limit,
    createdAt = "desc",
    productItemId,
  } = searchParams;

  const product = await getProductById(+productId);

  if (!product) redirect("/products");

  const filter = {
    ...(productItemId && {
      productItem: {
        id: +productItemId,
      },
    }),
    order: {
      createdAt: {
        gte: searchParams['dateRange[from]'] && new Date(searchParams['dateRange[from]']),
        lte: searchParams['dateRange[to]'] && new Date(searchParams['dateRange[to]']),
      },
    },
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