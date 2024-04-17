import * as z from "zod";

export const subcategorySchema = z.object({
  name: z.string().min(1),
  categoryId: z
    .number()
    .or(z.string().transform(v => +v)),
  slug: z.string().min(1)
    .refine(v => /^[0-9a-z]+(-[0-9a-z]+)*$/.test(v), "Slug must contain only lowercase letters, numbers and/or hyphens"),
});
export type SubcategorySchema = z.infer<typeof subcategorySchema>;