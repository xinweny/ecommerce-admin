import { CategoryIncludePayload } from "@/db/query/category";

import {
  Filters,
  MobileFilters,
  SelectFilter,
  RangeFilter,
} from "@/components/shared/filters";

import { getProductItemsPriceRange } from "@/db/query/product";

interface CategoryFilterProps {
  category: CategoryIncludePayload;
}

export async function CategoryFilter({
  category,
}: CategoryFilterProps) {
  const priceRange = await getProductItemsPriceRange({
    product: { categoryId: category.id },
  });

  const filters = <>
    <SelectFilter
      name="subcategoryIds"
      values={category.subcategories.map(({ id, name }) => ({
        label: name,
        value: id,
      }))}
      title="Subcategories"
    />
    <RangeFilter
      name="priceRange"
      title="Price"
      min={priceRange?._min.price || 0}
      max={priceRange?._max.price || 100_000}
      step={10}
    />
    <SelectFilter
      name="inStock"
      values={[{
        label: "In Stock",
        value: true,
      }]}
      title="Availability"
    />
  </>

  return (
    <>
      <Filters>{filters}</Filters>
      <MobileFilters>{filters}</MobileFilters>
    </>
  );
}