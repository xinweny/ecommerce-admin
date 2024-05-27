import { OrderStatus } from "@prisma/client";
import {
  DollarSign,
  CreditCard,
  Box,
  LucideIcon,
} from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Currency } from "@/components/shared/currency";
import { getOrderAggregate, getSelectOrders } from "@/db/query/order";
import { getProductsCount } from "@/db/query/product";
import { SalesGraph } from "./sales-graph";

interface DashboardProps {
  from: Date;
  to: Date;
}

export async function Dashboard({
  from,
  to,
}: DashboardProps) {
  const orderWhereQuery = {
    currentStatus: { not: OrderStatus.cancelled },
    createdAt: {
      gte: from,
      lte: to,
    },
  };

  const [
    orderAgg,
    productCount,
    orders,
  ] = await Promise.all([
    getOrderAggregate(orderWhereQuery),
    getProductsCount({
      isArchived: false,
    }),
    getSelectOrders(
      {
        filter: orderWhereQuery,
        sort: { createdAt: "asc" },
      },
      {
        total: true,
        createdAt: true,
      }
    ),
  ]);

  return (
    <div className="flex flex-col lg:grid gap-4 lg:grid-cols-3">
      <DashboardCard
        title="Total Revenue"
        icon={DollarSign}
      >
        <Currency value={orderAgg._sum.total || 0} />
      </DashboardCard>
      <DashboardCard
        title="Sales"
        icon={CreditCard}
      >
        <span>{orderAgg._count ? `+${orderAgg._count}`: 0}</span>
      </DashboardCard>
      <DashboardCard
        title="Products"
        icon={Box}
      >
        {productCount}
      </DashboardCard>
      <div className="col-span-3">
        <SalesGraph
          from={from}
          to={to}
          orders={orders}
        />
      </div>
    </div>
  );
}

interface DashboardCardProps {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
}

function DashboardCard({
  title,
  icon,
  children,
}: DashboardCardProps) {
  const Icon = icon;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-semibold">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="text-2xl font-bold">
        {children}
      </CardContent>
    </Card>
  );
}


