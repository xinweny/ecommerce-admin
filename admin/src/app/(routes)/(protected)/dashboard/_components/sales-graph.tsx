"use client";

import { Order } from "@prisma/client";
import { useState, useEffect } from "react";
import {
  eachDayOfInterval,
  eachWeekOfInterval,
  eachMonthOfInterval,
  format,
} from "date-fns";

import {
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Currency } from "@/components/shared/currency";

enum XInterval {
  Day = "day",
  Week = "week",
  Month = "month",
}

interface GraphData {
  dateRange: string;
  totalRevenue: number;
}

interface SalesGraphProps {
  from: Date;
  to: Date;
  orders: Pick<Order, "total" | "createdAt">[];
}

const getIntervals = (interval: XInterval, range: {
  start: Date;
  end: Date;
}) => {
  const { start, end } = range;

  switch (interval) {
    case XInterval.Day:
      return eachDayOfInterval({
        start,
        end,
      });
    case XInterval.Week:
      return eachWeekOfInterval({
        start,
        end,
      });
    case XInterval.Month:
      return eachMonthOfInterval({
        start,
        end,
      });
    default:
      return [];
  }
};

export function SalesGraph({
  from,
  to,
  orders,
}: SalesGraphProps) {
  const [interval, setInterval] = useState<XInterval>(XInterval.Day);
  const [data, setData] = useState<GraphData[]>([]);

  useEffect(() => {
    const intervals = getIntervals(interval, {
      start: from,
      end: to,
    });

    const graphData: GraphData[] = [];

    intervals.forEach((int, i) => {
      graphData.push({
        dateRange: format(int, "LL/dd"),
        totalRevenue: orders
          .filter(({ createdAt }) => createdAt >= int && createdAt < intervals[i + 1])
          .reduce((agg, order) => agg + order.total, 0) / 100,
      });
    });

    setData(graphData);
    
  }, [interval, orders, from, to]);

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between">
          <CardTitle>Sales</CardTitle>
          <div className="rounded-lg border p-1 space-x-1">
            {[XInterval.Day, XInterval.Week, XInterval.Month].map(int => (
              <Button
                key={int}
                variant={interval === int
                  ? "secondary"
                  : "ghost"
                }
                size="sm"
                onClick={() => {
                  setInterval(int);
                }}
              >
                {int}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
            <XAxis
              dataKey="dateRange"
              stroke="#888888"
              fontSize={10}
              interval={0}
              angle={-45}
              textAnchor="end"
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickFormatter={(value) => `$${value}`}
            />
            <Line
              dataKey="totalRevenue"
              fill="#3498db"
            />
            <Tooltip
              content={({ active, payload }) => {
                if (!payload || !active) return null;

                return (
                  <div
                    className="bg-primary-foreground py-1 px-2 rounded-lg"
                  >
                    <Currency
                      className="text-sm font-medium"
                      value={payload[0].payload.totalRevenue * 100}
                    />
                  </div>
                );
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}