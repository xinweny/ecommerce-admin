import { cache } from "react";

import { db } from "../client";

export const getStoreById = cache(async (id: number) => {
  const store = await db.store.findUnique({
    where: { id },
  });

  return store;
});

export const getStores = cache(async () => {
  const stores = await db.store.findMany();

  return stores;
});