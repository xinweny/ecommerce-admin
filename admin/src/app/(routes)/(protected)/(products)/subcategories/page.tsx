import { getQueriedSubcategories, getSubcategoriesCount } from "@/db/query/subcategory";

import { SubcategoryClient } from "./_components/subcategory-client";

export default async function SubcategoriesPage() {
  const [subcategories, totalCount] = await Promise.all([
    getQueriedSubcategories({
      
    }),
    getSubcategoriesCount(),
  ])

  return (
    <SubcategoryClient
      subcategories={subcategories}
      totalCount={totalCount}
    />
  );
}