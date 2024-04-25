import { getQueriedProductItems } from "@/db/query/product";

export default async function ProductItemsPage() {
  const productItems = await getQueriedProductItems({});

  return (
    <>
      
    </>
  );
}