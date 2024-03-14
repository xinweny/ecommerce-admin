import * as z from "zod";

export const SettingsSchema = z.object({
  firstName: z.optional(z.string()),
  lastName: z.optional(z.string()),
  email: z.optional(z.string().email()),
  oldPassword: z.optional(z.string()),
  newPassword: z.optional(z.string().min(6)),
  confirmNewPassword: z.optional(z.string().min(6)),
})
  .refine((data) => {
    const { oldPassword, newPassword, confirmNewPassword } = data;

    if (!oldPassword && !newPassword && !confirmNewPassword) return true;

    
  });