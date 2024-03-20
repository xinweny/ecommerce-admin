import * as z from "zod";

export const userInfoSchema = z.object({
  firstName: z.optional(z.string()),
  lastName: z.optional(z.string()),
  email: z.optional(z.string().email()),
});

export const passwordSchema = z.object({
  oldPassword: z.string(),
  newPassword: z.string().min(6, "Minimum of 6 characters required"),
  confirmNewPassword: z.string().min(6, "Minimum of 6 characters required"),
})
  .refine(({ newPassword, confirmNewPassword }) => newPassword === confirmNewPassword, {
    message: "Passwords do not match.",
    path: ["confirmNewPassword"],
  });

export const emailSchema = z.object({
  email: z.string().email("Email is required"),
});

export const twoFactorSchema = z.object({
  isTwoFactorEnabled: z.boolean(),
});