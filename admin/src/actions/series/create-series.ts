"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/db/client";

import { seriesSchema, type SeriesSchema } from "@/schemas/series";

export const createSeries = async (values: SeriesSchema) => {
  try {
    const validatedFields = seriesSchema.safeParse(values);

    if (!validatedFields.success) return { error: "Invalid fields." };

    const series = await db.series.create({
      data: {
        ...values,
      },
    });

    revalidatePath("/brands/series");

    return { success: `${series.name} series created.` };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong." };
  }
};