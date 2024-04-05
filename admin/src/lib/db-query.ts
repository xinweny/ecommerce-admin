import { Prisma } from "@prisma/client";

export interface DbQueryParams {
  pagination?: Pagination;
  sort?: Sort;
  query?: string;
}

interface Pagination {
  page?: string;
  limit?: string;
}

type SubSort = { [key: string]: string | undefined };

interface Sort {
  [key: string]: string | SubSort | undefined;
}

export const paginate = (pagination?: Pagination) => {
  if (!pagination) return undefined;

  const page = pagination.page ? +pagination.page : 1;
  const limit = pagination.limit ? +pagination.limit : 20;

  if (Number.isNaN(page) || Number.isNaN(limit)) return {
    take: 20,
    skip: 0,
  };

  return {
    take: limit,
    skip: limit * ((page < 1 ? 1 : page) - 1),
  };
};

export const orderBy = (sort?: Sort) => {
  if (!sort) return undefined;

  const sortParams = [] as {
    [key: string]: Prisma.SortOrder | SubSort;
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
      const subSort = {} as SubSort;

      for (const [k, v] of Object.entries(value)) {
        if (!v || !(v in Prisma.SortOrder)) continue;

        subSort[k] = v as Prisma.SortOrder;
      }

      if (Object.keys(subSort).length !== 0) sortParams.push({ [key]: subSort });
    }
  }

  return { orderBy: sortParams };
};