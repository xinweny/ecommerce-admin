import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { ProductIncludePayload } from "@/db/query/product";

interface ProductCategoryBreadcrumbProps {
  category: ProductIncludePayload["category"];
  subcategory: ProductIncludePayload["subcategory"];
}

export function ProductCategoryBreadcrumb({
  category,
  subcategory,
}: ProductCategoryBreadcrumbProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href={`/category/${category.slug}`}>
            {category.name}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>{subcategory.name}</BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}