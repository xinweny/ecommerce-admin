import { redirect } from "next/navigation";

import { getBillboardById } from "@/db/query/billboard";

import { UpdateBillboardForm } from "./_components/update-billboard-form";

interface BillboardPageProps {
  params: {
    storeId: string;
    billboardId: string;
  };
}

export default async function BillboardPage({
  params
}: BillboardPageProps) {
  const billboard = await getBillboardById(params.billboardId);

  if (!billboard) redirect(`/dashboard/${params.storeId}/billboards`);

  return (
    <>
      <UpdateBillboardForm billboard={billboard} />
    </>
  );
}