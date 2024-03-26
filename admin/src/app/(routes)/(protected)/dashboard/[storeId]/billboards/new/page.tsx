import { CreateBillboardForm } from "./_components/create-billboard-form";

interface CreateBillboardPageProps {
  params: { storeId: string };
};

export default async function CreateBillboardPage({ params }: CreateBillboardPageProps) {
  return (
    <CreateBillboardForm storeId={params.storeId} />
  );
}