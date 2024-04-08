import { Heading } from "@/components/shared/heading";
import { Separator } from "@/components/ui/separator";

import { CreateBrandForm } from "./_components/create-brand-form";

export default async function CreateCategoryPage() {
  return (
    <>
      <Heading
        title="Create Brand"
        description="Add a new product brand"
      />
      <Separator />
      <CreateBrandForm />
    </>
  );
}