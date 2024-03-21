import { getStoreById } from "@/db/query/store";

interface DashboardStorePageProps {
  params: { storeId: string };
}

export default async function DashboardStorePage({ params }: DashboardStorePageProps) {
  const store = await getStoreById(params.storeId);

  return (
    <div>
      Store ${store?.name}
    </div>
  );
}