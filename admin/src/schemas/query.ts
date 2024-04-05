import * as z from "zod";

export const searchSchema = z.object({
  query: z.string(),
});
export type SearchSchema = z.infer<typeof searchSchema>;

export const limitSchema = z.object({
  limit: z
    .number().min(10).max(500),
});
export type LimitSchema = z.infer<typeof limitSchema>;