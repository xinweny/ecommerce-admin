"use server";

import { db } from "@/db/client";
import { revalidatePath } from "next/cache";

import { seriesSchema, type SeriesSchema } from "@/schemas/series";

export const updateSeries = async (seriesId: number, values: SeriesSchema) => {
  try {
    const validatedFields = seriesSchema.safeParse(values);

    if (!validatedFields.success) return { error: "Invalid fields." };

    const series = await db.series.update({
      where: { id: seriesId },
      data: { ...values },
    });

    revalidatePath("/brands/series");

    return { success: `${series.name} updated.` };
  } catch (error) {
    return { error: "Something went wrong." };
  }
};