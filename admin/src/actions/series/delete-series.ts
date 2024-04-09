"use server";

import { db } from "@/db/client";
import { revalidatePath } from "next/cache";

export const deleteSeries = async (seriesId: number) => {
  try {
    const series = await db.series.delete({
      where: { id: seriesId },
    });

    revalidatePath("/brands/series");

    return { success: `${series.name} series deleted.` };
  } catch {
    return { error: "Something went wrong." };
  }
};