import { cache } from "react";

import { db } from "../client";

export const getBillboardById = cache(async (billboardId: number) => {
  const billboard = await db.billboard.findUnique({
    where: { id: billboardId },
  });

  return billboard;
});

export const getBillboards = cache(async () => {
  const billboards = await db.billboard.findMany();

  return billboards;
});

export const getBillboardsCount = cache(async () => {
  const count = await db.billboard.count();

  return count;
});