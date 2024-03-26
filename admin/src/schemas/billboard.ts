import * as z from "zod";

export const createBillboardSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string(),
  title: z.optional(z.string()),
  description: z.optional(z.string()),
});
export type CreateBillboardSchema = z.infer<typeof createBillboardSchema>;

export const updateBillboardSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string(),
  title: z.optional(z.string()),
  description: z.optional(z.string()),
});
export type UpdateBillboardSchema = z.infer<typeof updateBillboardSchema>;