import { api } from "../../client/api-client";
import { profileSchema } from "./profile.schemas";
import type { Profile, UpdateProfileData } from "./profile.types";

export const profileService = {
  getProfile: async (userId: string): Promise<Profile> => {
    const response = await api.get(`/profiles/${userId}`);
    return profileSchema.parse(response.data);
  },

  updateProfile: async (
    userId: string,
    data: UpdateProfileData
  ): Promise<Profile> => {
    const response = await api.patch(`/profiles/${userId}`, data);
    return profileSchema.parse(response.data);
  },

  getCurrentProfile: async (): Promise<Profile> => {
    const response = await api.get("/profiles/me");
    return profileSchema.parse(response.data);
  },
};
