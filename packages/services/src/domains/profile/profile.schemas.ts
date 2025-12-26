import { z } from "zod";

export const profileSchema = z.object({
  id: z.string(),
  userId: z.string(),
  phone: z.string().optional(),
  bio: z.string().optional(),
  location: z.string().optional(),
  website: z.string().url().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const updateProfileSchema = z.object({
  phone: z.string().optional(),
  bio: z.string().optional(),
  location: z.string().optional(),
  website: z.string().url().optional(),
});

export type ProfileSchema = z.infer<typeof profileSchema>;
export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>;
