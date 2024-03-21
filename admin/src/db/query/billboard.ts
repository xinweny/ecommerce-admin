import { db } from "../client";

import { currentUser } from "@/lib/auth";

export const getBillboardByStoreId = async (storeId: string) => {
  const user = await currentUser();

  if (!user?.id) return null;

  const store = await db.store.findUnique({
    where: {
      id: storeId,
      userId: user.id,
    },
    include: { billboard: true }
  });

  return store?.billboard;
};