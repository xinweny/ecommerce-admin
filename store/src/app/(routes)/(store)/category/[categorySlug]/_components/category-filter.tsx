import { CategoryIncludePayload } from "@/db/query/category";

import { SelectFilter, RangeFilter } from "@/components/shared/filter";

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

  return (
    <div className="mb-8 space-y-4">
      <SelectFilter
        name="subcategoryIds"
        values={category.subcategories.map(({ id, name }) => ({
          label: name,
          value: id.toString() as string,
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
    </div>
  );
}