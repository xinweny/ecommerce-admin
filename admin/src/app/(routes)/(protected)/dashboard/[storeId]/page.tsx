import { redirect } from "next/navigation";

import { getStoreById } from "@/db/query/store";

interface StoreDashboardPageProps {
  params: { storeId: string };
}

export default async function StoreDashboardPage({ params }: StoreDashboardPageProps) {
  const store = await getStoreById(params.storeId);

  return (
    <div>
      Store ${store?.name}
    </div>
  );
}