import * as z from "zod";

export const userInfoSchema = z.object({
  firstName: z.optional(z.string()),
  lastName: z.optional(z.string()),
  email: z.optional(z.string().email()),
});

export const passwordSchema = z.object({
  oldPassword: z.string().min(1),
  newPassword: z.string().min(6),
  confirmNewPassword: z.string().min(6),
})
  .refine((data) => {
    const { newPassword, confirmNewPassword } = data;

    if (newPassword !== confirmNewPassword) return false;

    return true;
  });