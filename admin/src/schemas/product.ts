import * as z from "zod";

export const productItemSchema = z.object({
  name: z.string().min(1),
  sku: z.string().min(1),
  stock: z.number().min(0)
    .or(z.string().transform(v => +v)),
  price: z.number().min(1)
  .or(z.string().transform(v => +v)),
  imageUrls: z.array(z.string()),
});

export type ProductItemSchema = z.infer<typeof productItemSchema>;

export const productSchema = z.object({
  name: z.string().min(1),
  model: z.string().min(1),
  description: z.optional(z.string().min(1)),
  videoUrl: z.optional(z.string().min(1)),
  slug: z.string().min(1)
    .refine(v => /^[0-9a-z]+(-[0-9a-z]+)*$/.test(v), "Slug must contain only lowercase letters, numbers and/or hyphens"),
  categoryId: z.number()
    .or(z.string().transform(v => +v)),
  subcategoryId: z.number()
    .or(z.string().transform(v => +v)),
  brandId: z.number()
    .or(z.string().transform(v => +v)),
  seriesId: z.optional(z.number()
    .or(z.string().transform(v => +v))),
});

export type ProductSchema = z.infer<typeof productSchema>;

export const createProductSchema = z.object({
  ...(productSchema.shape),
  productItems: z.array(productItemSchema).min(1),
});

export type CreateProductSchema = z.infer<typeof createProductSchema>;

export const updateProductItemStockSchema = z.object({
  stock: z.number().min(0)
    .or(z.string().transform(v => +v)),
});

export type UpdateProductItemStockSchema = z.infer<typeof updateProductItemStockSchema>;

export const updateProductItemArchivedSchema = z.object({
  isArchived: z.boolean()
    .or(z.literal("true").transform(() => true))
    .or(z.literal("false").transform(() => false)),
});

export type UpdateProductItemArchivedSchema = z.infer<typeof updateProductItemArchivedSchema>;