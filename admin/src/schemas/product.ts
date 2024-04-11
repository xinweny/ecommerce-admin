import * as z from "zod";

export const productItemSchema = z.object({
  name: z.string().min(1),
  sku: z.string().min(1),
  stock: z.number().min(0),
  price: z.number().min(0),
  imageUrls: z.array(z.string()),
});

export type ProductItemSchema = z.infer<typeof productItemSchema>;

export const productSchema = z.object({
  name: z.string().min(1),
  model: z.optional(z.string().min(1)),
  description: z.optional(z.string().min(1)),
  videoUrl: z.optional(z.string().min(1)),
  slug: z.string().min(1)
    .refine(v => /^[a-z]+(-[a-z]+)*$/.test(v), "Slug must contain only lowercase letters and hyphens"),
  categoryId: z.number()
    .or(z.string().transform(v => +v)),
  subcategoryId: z.number()
    .or(z.string().transform(v => +v)),
  brandId: z.number()
    .or(z.string().transform(v => +v)),
  seriesId: z.number()
    .or(z.string().transform(v => +v))
    .or(z.null()),
  productItems: z.array(productItemSchema).min(1),
});

export type ProductSchema = z.infer<typeof productSchema>;