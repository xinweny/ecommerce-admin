import { db } from "@/db/client";
import { revalidatePath } from "next/cache";

import { upsertBillboardSchema, type UpsertBillboardSchema } from "@/schemas/billboard";

import { getStoreById } from "@/db/query/store";

export const upsertBillboard = async (storeId: string, values: UpsertBillboardSchema) => {
  try {
    const validatedFields = upsertBillboardSchema.safeParse(values);

    if (!validatedFields) return { error: "Invalid fields." };

    const store = await getStoreById(storeId);

    if (!store) return { error: "Store not found." };

    await db.billboard.upsert({
      where: { id: storeId },
      update: { ...values },
      create: { storeId, ...values },
    });

    revalidatePath(`/dashboard/${store.id}/display`);

    return { success: `${store.name} billboard updated.` };
  } catch {
    return { error: "Something went wrong." };
  }
};