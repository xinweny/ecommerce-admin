import * as z from "zod";

export const productSchema = z.object({
  name: z.string().min(1),
  model: z.optional(z.string().min(1)),
  description: z.optional(z.string().min(1)),
  videoUrl: z.optional(z.string().min(1)),
  categoryId: z.number()
    .or(z.string().transform(v => +v)),
  brandId: z.number()
    .or(z.string().transform(v => +v))
    .or(z.null()),
  seriesId: z.number()
    .or(z.string().transform(v => +v))
    .or(z.null()),
});

export type ProductSchema = z.infer<typeof productSchema>;

export const productItemSchema = z.object({
  name: z.string().min(1),
  sku: z.string().min(1),
  stock: z.number().min(0),
  productId: z.number()
  .or(z.string().transform(v => +v)),
  imageUrls: z.array(z.string()),
});

export type ProductItemSchema = z.infer<typeof productItemSchema>;