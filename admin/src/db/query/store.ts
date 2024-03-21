import { db } from "../client";

import { currentUser } from "@/lib/auth";

export const getStoreById = async (id: string) => {
  const user = await currentUser();

  if (!user?.id) return null;

  const store = await db.store.findFirst({
    where: {
      id,
      userId: user.id,
    },
  });

  return store;
};

export const getStoresByCurrentUserId = async () => {
  const user = await currentUser();

  if (!user?.id) return [];

  const stores = await db.store.findMany({
    where: { userId: user.id },
  });

  return stores;
};