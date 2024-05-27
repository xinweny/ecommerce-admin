import { startOfMonth } from "date-fns";

import { Heading } from "@/components/shared/heading";
import { Separator } from "@/components/ui/separator";
import { Dashboard } from "./_components/dashboard";
import { DateRangeForm } from "./_components/date-range-form";

interface DashboardPageProps {
  searchParams: { [key: string]: string };
}

export default async function DashboardPage({
  searchParams,
}: DashboardPageProps) {
  const from = searchParams['dateRange[from]']
    ? new Date(searchParams['dateRange[from]'])
    : startOfMonth(new Date());
  const to = searchParams['dateRange[to]']
    ? new Date(searchParams['dateRange[to]'])
    : new Date();

  return (
    <>
      <div className="flex items-center justify-between flex-wrap gap-4">
        <Heading title="Dashboard" />
        <DateRangeForm />
      </div>
      <Separator />
      <Dashboard
        from={from}
        to={to}
      />
    </>
  );
}