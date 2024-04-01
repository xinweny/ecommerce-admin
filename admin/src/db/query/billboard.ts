import { db } from "../client";

export const getBillboardById = async (billboardId: number) => {
  const billboard = await db.billboard.findUnique({
    where: { id: billboardId },
  });

  return billboard;
};

export const getBillboards = async () => {
  const billboards = await db.billboard.findMany();

  return billboards;
};