import { getBillboards, getBillboardsCount } from "@/db/query/billboard";

import { BillboardClient } from "./_components/billboard-client";

export default async function BillboardsPage() {
  const [billboards, totalCount] = await Promise.all([
    getBillboards(),
    getBillboardsCount(),
  ]);

  return (
    <BillboardClient
      billboards={billboards}
      totalCount={totalCount}
    />
  );
}