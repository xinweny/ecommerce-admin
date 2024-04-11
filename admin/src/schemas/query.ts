import * as z from "zod";

export const limitSchema = z.object({
  limit: z
    .number().min(10).max(500),
});
export type LimitSchema = z.infer<typeof limitSchema>;