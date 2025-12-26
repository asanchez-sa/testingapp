import { z } from "zod";

/**
 * Common Zod schemas for validation
 */

/**
 * Email schema
 */
export const emailSchema = z
  .string()
  .email("Invalid email address")
  .min(1, "Email is required");

/**
 * Phone schema (international format)
 */
export const phoneSchema = z
  .string()
  .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number");

/**
 * URL schema
 */
export const urlSchema = z.string().url("Invalid URL");

/**
 * Password schema
 */
export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/\d/, "Password must contain at least one number");

/**
 * Name schema
 */
export const nameSchema = z
  .string()
  .min(2, "Name must be at least 2 characters")
  .max(50, "Name must not exceed 50 characters")
  .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Name can only contain letters and spaces");

/**
 * Username schema
 */
export const usernameSchema = z
  .string()
  .min(3, "Username must be at least 3 characters")
  .max(20, "Username must not exceed 20 characters")
  .regex(
    /^[a-zA-Z0-9._]+$/,
    "Username can only contain letters, numbers, dots and underscores"
  );

/**
 * UUID schema
 */
export const uuidSchema = z.string().uuid("Invalid UUID");

/**
 * Date schema
 */
export const dateSchema = z.coerce.date();

/**
 * Positive number schema
 */
export const positiveNumberSchema = z
  .number()
  .positive("Number must be positive");

/**
 * Non-negative number schema
 */
export const nonNegativeNumberSchema = z
  .number()
  .nonnegative("Number must be non-negative");

/**
 * Pagination schema
 */
export const paginationSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(10),
});

/**
 * Sort schema
 */
export const sortSchema = z.object({
  field: z.string(),
  order: z.enum(["asc", "desc"]).default("asc"),
});

/**
 * ID schema (string or number)
 */
export const idSchema = z.union([z.string(), z.number()]);
