import * as z from "zod";

export const userInfoSchema = z.object({
  firstName: z.optional(z.string()),
  lastName: z.optional(z.string()),
  email: z.optional(z.string().email()),
});
export type UserInfoSchema = z.infer<typeof userInfoSchema>;

export const passwordSchema = z.object({
  oldPassword: z.string(),
  newPassword: z.string().min(6, "Minimum of 6 characters required"),
  confirmNewPassword: z.string().min(6, "Minimum of 6 characters required"),
})
  .refine(({ newPassword, confirmNewPassword }) => newPassword === confirmNewPassword, {
    message: "Passwords do not match.",
    path: ["confirmNewPassword"],
  });
  export type PasswordSchema = z.infer<typeof passwordSchema>;

export const emailSchema = z.object({
  email: z.string().email("Email is required"),
});
export type EmailSchema = z.infer<typeof emailSchema>;

export const twoFactorSchema = z.object({
  isTwoFactorEnabled: z.boolean(),
});
export type TwoFactorSchema = z.infer<typeof twoFactorSchema>;