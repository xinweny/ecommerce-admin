export interface Pagination {
  page: number;
  limit: number;
}

export const paginate = (pagination: Pagination) => {
  const { page, limit } = pagination;

  return {
    take: limit,
    skip: limit * ((page < 1 ? 1 : page) - 1),
  };
};