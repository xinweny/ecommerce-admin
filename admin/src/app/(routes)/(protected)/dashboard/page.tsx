import { Heading } from "@/components/shared/heading";
import { Separator } from "@/components/ui/separator";
import { Dashboard } from "./_components/dashboard";
import { DateRangeForm } from "./_components/date-range-form";

export default async function DashboardPage() {
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Dashboard" />
        <DateRangeForm />
      </div>
      <Separator />
      <Dashboard />
    </>
  );
}