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
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const LogInFormValidation = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Invalid email address (ex. johndoe@gmail.com)"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters")
});

export const ProfileFormValidation = z.object({
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
});

export const QuantitySchema = z.object({
  quantity: z
    .number()
    .min(1, { message: "Quantity must be at least 1" })
    .max(100, { message: "Quantity cannot exceed stock" }), // max will be updated dynamically
});

export const CheckoutFormValidation = z.object({
  fullName: z.string().min(2, "Name is too short").max(50, "Name is too long"),
  cardNumber: z
    .string()
    .min(16, "Card number must be 16 digits")
    .max(16, "Card number must be 16 digits"),
  expiry: z.string().refine(
    (value) => {
      const [month, year] = value.split("/").map(Number);
      const expiryDate = new Date(Number(`20${year}`), month - 1);
      return expiryDate > new Date();
    },
    { message: "Expiry date must be in the future" }
  ),
  cvc: z.string().min(3, "CVC must be 3 or 4 digits").max(4, "CVC must be 3 or 4 digits"),
});
