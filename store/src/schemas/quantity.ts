import * as z from "zod";

export const quantitySchema = z.object({
  quantity: z.number().min(1)
    .or(z.string().transform(s => +s)),
});
  
export type QuantitySchema = z.infer<typeof quantitySchema>;