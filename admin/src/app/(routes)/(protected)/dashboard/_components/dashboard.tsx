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
import { getOrderAggregate } from "@/db/query/order";
import { getProductsCount } from "@/db/query/product";

export async function Dashboard() {
  const [orderAgg, productCount] = await Promise.all([
    getOrderAggregate({
      currentStatus: { not: OrderStatus.cancelled },
      // ...(timeframe && {
      //   createdAt: {
      //     gte: timeframe.from,
      //     lte: timeframe.to,
      //   },
      // }),
    }),
    getProductsCount({
      isArchived: false,
    }),
  ]);

  return (
    <div className="grid gap-4 grid-cols-3">
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
        title="Products Available"
        icon={Box}
      >
        {productCount}
      </DashboardCard>
      <Card className="col-span-3">

      </Card>
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
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="text-2xl font-bold">
        {children}
      </CardContent>
    </Card>
  );
}


