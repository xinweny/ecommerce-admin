import { redirect } from "next/navigation";

import { getBillboardById } from "@/db/query/billboard";

import { Heading } from "@/components/shared/heading";
import { Separator } from "@/components/ui/separator";

import { UpdateBillboardForm } from "./_components/update-billboard-form";
import { DeleteBillboardButton } from "./_components/delete-billboard-button";

interface EditBillboardPageProps {
  params: { storeId: string };
  searchParams: { billboardId: string };
}

export default async function EditBillboardPage({
  params,
  searchParams,
}: EditBillboardPageProps) {
  const billboard = await getBillboardById(searchParams.billboardId);

  if (!billboard) redirect(`/dashboard/${params.storeId}/billboards`);

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Billboard Settings" description={`Manage ${billboard.label}`} />
        <DeleteBillboardButton billboard={billboard} />
      </div>
      <Separator />
      <UpdateBillboardForm billboard={billboard} />
    </>
  );
}