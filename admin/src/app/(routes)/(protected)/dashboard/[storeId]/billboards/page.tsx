import { getBillboardsByStoreId } from "@/db/query/billboard";

import { BillboardClient } from "./_components/billboard-client";

interface StoreDisplayPageProps {
  params: { storeId: string };
}

export default async function BillboardsPage({ params }: StoreDisplayPageProps) {
  const { storeId } = params;

  const billboards = await getBillboardsByStoreId(storeId);

  return (
    <BillboardClient
      billboards={billboards}
    />
  );
}