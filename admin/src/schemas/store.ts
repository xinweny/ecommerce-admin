import * as z from "zod";

export const storeSchema = z.object({
  name: z.string().min(1),
  line1: z.string().min(1),
  line2: z.optional(z.string()),
  line3: z.optional(z.string()),
  city: z.string().min(1),
  postalCode: z.string().min(1),
  country: z.string(),
});

export type StoreSchema = z.infer<typeof storeSchema>;