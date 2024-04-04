import { Prisma } from "@prisma/client";

interface Pagination {
  page: number;
  limit: number;
}

enum AggSortKeys {
  count = "_count",
}

type AggregatedSort = { [key in AggSortKeys]: string | undefined };

interface Sort {
  [key: string]: string | AggregatedSort | undefined;
}

export interface DbQueryParams {
  pagination?: Pagination;
  sort?: Sort;
}

export const paginate = (pagination?: Pagination) => {
  if (!pagination) return undefined;

  const { page, limit } = pagination;

  return {
    take: limit,
    skip: limit * ((page < 1 ? 1 : page) - 1),
  };
};

export const orderBy = (sort?: Sort) => {
  if (!sort) return undefined;

  const sortParams = [] as {
    [key: string]: Prisma.SortOrder | AggregatedSort;
  }[];

  for (const [key, value] of Object.entries(sort)) {
    if (!value) continue;

    if (typeof value === "string") {
      if (value in Prisma.SortOrder) sortParams.push({
        [key]: (value as Prisma.SortOrder),
      });
      continue;
    }

    if (typeof value === "object") {
      const aggSort = {} as AggregatedSort;

      for (const [k, v] of Object.entries(value)) {
        if (!v || !(v in Prisma.SortOrder) || !(k in AggSortKeys)) continue;

        aggSort[k as AggSortKeys] = v as Prisma.SortOrder;
      }

      if (Object.keys(aggSort).length !== 0) sortParams.push({ [key]: aggSort });
    }
  }

  return { orderBy: sortParams };
};