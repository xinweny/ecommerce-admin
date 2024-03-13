import * as z from "zod";

export const SettingsSchema = z.object({
  firstName: z.optional(z.string()),
  lastName: z.optional(z.string()),
});