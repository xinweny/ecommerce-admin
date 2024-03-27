import * as z from "zod";

export const billboardSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string(),
  title: z.optional(z.string()),
  description: z.optional(z.string()),
});
export type BillboardSchema = z.infer<typeof billboardSchema>;