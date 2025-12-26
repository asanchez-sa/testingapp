import { api } from "../../client/api-client";
import { userSchema } from "./user.schemas";
import type { UpdateUserData, User } from "./user.types";

export const userService = {
  getUserProfile: async (id: string): Promise<User> => {
    const response = await api.get(`/users/${id}`);
    return userSchema.parse(response.data);
  },

  updateUser: async (id: string, data: UpdateUserData): Promise<User> => {
    const response = await api.patch(`/users/${id}`, data);
    return userSchema.parse(response.data);
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await api.get("/users/me");
    return userSchema.parse(response.data);
  },
};
