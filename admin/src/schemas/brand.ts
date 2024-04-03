import * as z from "zod";

export const brandSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1)
    .refine(v => /^[a-z]+(-[a-z]+)*$/.test(v), "Slug must contain only lowercase letters and hyphens"),
  imageUrl: z.optional(z.string()),
});
export type BrandSchema = z.infer<typeof brandSchema>;