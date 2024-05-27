import { Heading } from "@/components/shared/heading";
import { Separator } from "@/components/ui/separator";
import { Dashboard } from "./_components/dashboard";

export default async function DashboardPage() {
  return (
    <>
      <Heading
        title="Dashboard"
        description="Store overview"
      />
      <Separator />
      <Dashboard />
    </>
  );
}