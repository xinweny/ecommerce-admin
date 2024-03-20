import { redirect } from "next/navigation";

import { getStoreById } from "@/db/query/store";

interface DashboardLayoutProps {
  children: React.ReactNode;
  params: { storeId: string };
}

export default async function DashboardLayout({
  children,
  params,
}: DashboardLayoutProps) {
  const { storeId } = params;

  const store = await getStoreById(storeId);

  if (!store) redirect("/dashboard");

  return (
    <div>
      <span>{params.storeId}</span>
      {children}
    </div>
  );
}