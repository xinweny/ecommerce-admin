"use client";

import { Route } from "next";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import qs from "qs";

import { Subcategory } from "@prisma/client";
import { SelectFilter } from "@/components/shared/filter";

interface CategoryFilterProps {
  subcategories: Subcategory[];
}

export function CategoryFilter({
  subcategories,
}: CategoryFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onClick = (key: string, value: string) => {
    const currentParams = qs.parse(searchParams.toString());

    const query = {
      ...currentParams,
      [key]: currentParams[key] === value ? null : value,
    };

    const url = qs.stringify({
      url: pathname,
      query,
    }, { skipNulls: true });

    router.push(url as Route);
  };

  return (
    <div className="mb-8">
      <SelectFilter
        name="subcategoryIds"
        values={subcategories.map(({ id, name }) => ({
          label: name,
          value: id.toString() as string,
        }))}
        title="Subcategories"
      />
    </div>
  );
}