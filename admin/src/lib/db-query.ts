import { Prisma } from "@prisma/client";

export interface DbQueryParams {
  pagination?: Pagination;
  sort?: SortStack<string>;
  filter?: Object;
}

interface Pagination {
  page?: string;
  limit?: string;
}

type SortStack<T> = {
  [key: string]: SortStack<T> | T | undefined;
};

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

export const orderBy = (
  sort?: SortStack<string>,
) => {
  if (!sort) return;

  const acc: {
    orderBy: SortStack<Prisma.SortOrder>[];
  } = { orderBy: [] };

  const recurse = (
    key: string | undefined,
    value: SortStack<string> | string | undefined,
    a: SortStack<Prisma.SortOrder> = {}
  ): SortStack<Prisma.SortOrder> | undefined => {
    if (!key || !value) return undefined;

    if (typeof value === "string" && (value in Prisma.SortOrder)) return { [key]: value as Prisma.SortOrder };

    return { [key]: recurse(Object.keys(value)[0], Object.values(value)[0], a) };
  };

  for (const [key, value] of Object.entries(sort)) {
    if (!value) continue;

    if (typeof value === "string" && (value in Prisma.SortOrder)) {
      acc.orderBy.push({ [key]: value as Prisma.SortOrder });
    } else if (typeof value === "object") {
      const subsort = recurse(key, value);

      if (subsort) acc.orderBy.push(subsort);
    }
  }

  return acc;
};

export const where = (filter?: Object) => {
  if (!filter) return undefined;

  return {
    where: filter,
  };
};