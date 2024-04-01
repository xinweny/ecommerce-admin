import { Heading } from "@/components/shared/heading";
import { Separator } from "@/components/ui/separator";

import { CreateBillboardForm } from "./_components/create-billboard-form";

export default async function CreateBillboardPage() {
  return (
    <>
      <Heading
        title="Create Billboard"
        description="Create a display for your storefront"
      />
      <Separator />
      <CreateBillboardForm />
    </>
  );
}