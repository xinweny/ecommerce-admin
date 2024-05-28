import * as z from "zod";

export const brandSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1)
    .refine(v => /^[0-9a-z]+(-[0-9a-z]+)*$/.test(v), "Slug must contain only lowercase letters, numbers and/or hyphens"),
  imageUrl: z.optional(
    z.string()
      .or(z.null())
      .or(z.array(z.string()).length(1).transform(v => v[0])),
  ),
});
export type BrandSchema = z.infer<typeof brandSchema>;