import * as z from "zod";

export const billboardSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string()
    .or(z.array(z.string()).length(1).transform(v => v[0])),
  title: z.optional(z.string()),
  description: z.optional(z.string()),
});
export type BillboardSchema = z.infer<typeof billboardSchema>;