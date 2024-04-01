import { db } from "../client";

export const getStoreById = async (id: number) => {
  const store = await db.store.findUnique({
    where: { id },
  });

  return store;
};

export const getStores = async () => {
  const stores = await db.store.findMany();

  return stores;
};