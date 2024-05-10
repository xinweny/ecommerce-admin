import { cache } from "react";

import { db } from "../client";

export const getCategories = cache(async () => {
  const categories = await db.category.findMany();

  return categories;
});