import { redirect } from "next/navigation";

import { getStoreById } from "@/db/query/store";

interface StoreDashboardLayoutProps {
  children: React.ReactNode;
  params: { storeId: string };
}

export default async function StoreDashboardLayout({
  children,
  params,
}: StoreDashboardLayoutProps) {
  const store = await getStoreById(params.storeId);

  if (!store) redirect("/dashboard");

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
      {children}
      </div>
    </div>
  );
}