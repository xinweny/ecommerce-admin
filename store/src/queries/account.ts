import { db } from "@/db/client";

export const getAccountsByUserId = async (userId: string) => {
  try {
    const accounts = await db.account.findMany({
      where: { userId },
    });

    return accounts;
  } catch {
    return null;
  }
};