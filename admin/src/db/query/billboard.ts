import { db } from "../client";

export const getBillboardById = async (billboardId: string) => {
  const billboard = await db.billboard.findUnique({
    where: { id: billboardId },
  });

  return billboard;
};

export const getBillboardsByStoreId = async (storeId: string) => {


  const billboards = await db.billboard.findMany({
    where: { storeId },
  });

  return billboards;
};