import { getBillboardsByStoreId } from "@/db/query/billboard";

import { BillboardClient } from "./_components/billboard-client";

interface BillboardsPageProps {
  params: { storeId: string };
}

export default async function BillboardsPage({ params }: BillboardsPageProps) {
  const { storeId } = params;

  const billboards = await getBillboardsByStoreId(storeId);

  return (
    <BillboardClient
      billboards={billboards}
    />
  );
}