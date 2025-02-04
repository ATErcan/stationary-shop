import { z } from "zod";

export const SignUpFormValidation = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "First name is required")
      .min(2, "First name must be at least 2 characters")
      .max(30, "First name must be at most 30 characters"),
    lastName: z
      .string()
      .trim()
      .max(30, "Last name must be at most 30 characters"),
    email: z
      .string()
      .trim()
      .min(1, "Email is required")
      .email("Invalid email address (ex. johndoe@gmail.com)"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must be at most 20 characters"),
    confirmPassword: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must be at most 20 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
