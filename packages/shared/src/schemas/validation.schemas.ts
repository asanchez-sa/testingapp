import { z } from "zod";

/**
 * Validation schemas for common use cases
 */

/**
 * Credit card schema
 */
export const creditCardSchema = z.object({
  number: z
    .string()
    .regex(/^\d{13,19}$/, "Invalid card number")
    .transform((val) => val.replace(/\s/g, "")),
  cvv: z.string().regex(/^\d{3,4}$/, "Invalid CVV"),
  expiryMonth: z
    .number()
    .int()
    .min(1, "Invalid month")
    .max(12, "Invalid month"),
  expiryYear: z
    .number()
    .int()
    .min(new Date().getFullYear(), "Card has expired"),
  holderName: z.string().min(1, "Card holder name is required"),
});

/**
 * Address schema
 */
export const addressSchema = z.object({
  street: z.string().min(1, "Street is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, "Invalid ZIP code"),
  country: z.string().min(1, "Country is required"),
});

/**
 * File upload schema
 */
export const fileUploadSchema = z.object({
  name: z.string(),
  size: z.number().max(10 * 1024 * 1024, "File size must not exceed 10MB"),
  type: z.string(),
  uri: z.string(),
});

/**
 * Image upload schema
 */
export const imageUploadSchema = fileUploadSchema.extend({
  type: z
    .string()
    .regex(/^image\/(jpeg|jpg|png|gif|webp)$/, "Invalid image type"),
  width: z.number().optional(),
  height: z.number().optional(),
});

/**
 * Contact info schema
 */
export const contactInfoSchema = z.object({
  email: z.string().email("Invalid email"),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number")
    .optional(),
  website: z.string().url("Invalid URL").optional(),
});

/**
 * Range schema
 */
export const rangeSchema = z
  .object({
    min: z.number(),
    max: z.number(),
  })
  .refine((data) => data.min <= data.max, {
    message: "Min value must be less than or equal to max value",
  });

/**
 * Date range schema
 */
export const dateRangeSchema = z
  .object({
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
  })
  .refine((data) => data.startDate <= data.endDate, {
    message: "Start date must be before or equal to end date",
  });
