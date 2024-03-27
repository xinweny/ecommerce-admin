import { Heading } from "@/components/shared/heading";
import { Separator } from "@/components/ui/separator";

import { CreateBillboardForm } from "./_components/create-billboard-form";

interface CreateBillboardPageProps {
  params: { storeId: string };
};

export default async function CreateBillboardPage({ params }: CreateBillboardPageProps) {
  return (
    <>
      <Heading
        title="Create Billboard"
        description="Create a display for your storefront"
      />
      <Separator />
      <CreateBillboardForm storeId={params.storeId} />
    </>
  );
}