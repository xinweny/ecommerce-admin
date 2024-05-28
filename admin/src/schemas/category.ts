import * as z from "zod";

export const categorySchema = z.object({
  name: z.string().min(1),
  billboardId: z.optional(z.number()
    .or(z.string().transform(v => +v))
    .or(z.null())
  ),
  slug: z.string().min(1)
    .refine(v => /^[a-z]+(-[a-z]+)*$/.test(v), "Slug must contain only lowercase letters and hyphens"),
});
export type CategorySchema = z.infer<typeof categorySchema>;