import { getBillboards } from "@/db/query/billboard";

import { BillboardClient } from "./_components/billboard-client";

export default async function BillboardsPage() {
  const billboards = await getBillboards();

  return (
    <BillboardClient
      billboards={billboards}
    />
  );
}