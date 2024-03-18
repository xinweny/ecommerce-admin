import * as z from "zod";

export const userInfoSchema = z.object({
  firstName: z.optional(z.string()),
  lastName: z.optional(z.string()),
  email: z.optional(z.string().email()),
});

export const passwordSchema = z.object({
  oldPassword: z.string().min(1, "Password is required."),
  newPassword: z.string().min(6, "Minimum of 6 characters required"),
  confirmNewPassword: z.string().min(6, "Minimum of 6 characters required"),
})
  .refine(({ newPassword, confirmNewPassword }) => newPassword === confirmNewPassword, {
    message: "Passwords do not match.",
    path: ["confirmNewPassword"],
  });