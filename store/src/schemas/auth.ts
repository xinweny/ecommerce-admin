import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email is required"),
  password: z.string().min(1,  "Password is required"),
  twoFactorCode: z.optional(z.string().length(6)),
});
export type LoginSchema = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Email is required"),
  password: z.string().min(6, "Minimum 6 characters required"),
});
export type RegisterSchema = z.infer<typeof registerSchema>;

export const resetPasswordSchema = z.object({
  password: z.string().min(6, "Minimum 6 characters required"),
  confirmPassword: z.string().min(6, "Minimum 6 characters required"),
})
  .refine(
    ({ password, confirmPassword }) => password === confirmPassword,
    {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    }
  );
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

export const resetSchema = z.object({
  email: z.string().email("Email is required"),
});
export type ResetSchema = z.infer<typeof resetSchema>;