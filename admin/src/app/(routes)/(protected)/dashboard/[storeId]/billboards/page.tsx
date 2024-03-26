import { getBillboardsByStoreId } from "@/db/query/billboard";

import { BillboardPageHeader } from "./_components/billboard-page-header";

interface StoreDisplayPageProps {
  params: { storeId: string };
}

export default async function BillboardsPage({ params }: StoreDisplayPageProps) {
  const { storeId } = params;

  const billboards = await getBillboardsByStoreId(storeId);

  return (
    <>
      <BillboardPageHeader />
    </>
  );
}