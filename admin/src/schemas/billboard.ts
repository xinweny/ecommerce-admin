import * as z from "zod";

export const upsertBillboardSchema = z.object({
  imageUrl: z.optional(z.string()),
  title: z.optional(z.string()),
  description: z.optional(z.string()),
});
export type UpsertBillboardSchema = z.infer<typeof upsertBillboardSchema>;