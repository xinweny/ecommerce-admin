import * as z from "zod";

export const createStoreSchema = z.object({
  name: z.string().min(1),
});

export const updateStoreSchema = z.object({
  name: z.string().min(1),
});