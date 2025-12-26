import { useQuery } from "@tanstack/react-query";
import { userQueries } from "./user.queries";

export const useUserProfile = (id: string) => {
  return useQuery(userQueries.profile(id));
};

export const useCurrentUser = () => {
  return useQuery(userQueries.currentUser());
};

// Re-export mutations
export { useUpdateUser } from "./user.mutations";
