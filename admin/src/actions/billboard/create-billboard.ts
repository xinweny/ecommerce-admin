"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/db/client";

import { billboardSchema, type BillboardSchema } from "@/schemas/billboard";

export const createBillboard = async (values: BillboardSchema) => {
  try {
    const validatedFields = billboardSchema.safeParse(values);

    if (!validatedFields.success) return { error: "Invalid fields." };

    const billboard = await db.billboard.create({
      data: {
        ...values,
      },
    });

    revalidatePath("/dashboard/billboards");

    return { success: `${billboard.label} created.` };
  } catch (error) {
    return { error: "Something went wrong." };
  }
};