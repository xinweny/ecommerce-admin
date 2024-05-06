"use server";

import { db } from "@/db/client";
import { revalidatePath } from "next/cache";

export const deleteReview = async (reviewId: number) => {
  try {
    const review = await db.review.delete({
      where: { id: reviewId },
    });

    revalidatePath("/reviews");
    revalidatePath(`/products/${review.productId}/reviews`);

    return { success: `Review #${review.id} deleted.` };
  } catch {
    return { error: "Something went wrong." };
  }
};