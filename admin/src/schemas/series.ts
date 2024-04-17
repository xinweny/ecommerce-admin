import * as z from "zod";

export const seriesSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1)
    .refine(v => /^[0-9a-z]+(-[0-9a-z]+)*$/.test(v), "Slug must contain only lowercase letters, numbers and/or hyphens"),
  brandId: z
    .number()
    .or(z.string().transform(v => +v)),
});
export type SeriesSchema = z.infer<typeof seriesSchema>;