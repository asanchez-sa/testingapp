import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  avatar: z.string().optional(),
  role: z.string().optional(),
  emailVerified: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type UserSchema = z.infer<typeof userSchema>;

export const userProfileSchema = userSchema.extend({
  phone: z.string().optional(),
  bio: z.string().optional(),
  location: z.string().optional(),
  preferences: z.record(z.string(), z.unknown()).optional(),
});

export type UserProfileSchema = z.infer<typeof userProfileSchema>;

export const updateProfileSchema = z.object({
  name: z.string().min(2).optional(),
  phone: z.string().optional(),
  bio: z.string().optional(),
  location: z.string().optional(),
  avatar: z.string().url().optional(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
