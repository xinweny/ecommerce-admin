import * as z from "zod";

export const createStoreSchema = z.object({
  name: z.string().min(1),
});
export type CreateStoreSchema = z.infer<typeof createStoreSchema>;

export const updateStoreSchema = z.object({
  name: z.string().min(1),
});
export type UpdateStoreSchema = z.infer<typeof updateStoreSchema>;