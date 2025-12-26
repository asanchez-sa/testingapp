import { useQuery } from "@tanstack/react-query";
import { profileQueries } from "./profile.queries";

export const useProfile = (userId: string) => {
  return useQuery(profileQueries.detail(userId));
};

export const useCurrentProfile = () => {
  return useQuery(profileQueries.current());
};

// Re-export mutations
export { useUpdateProfile } from "./profile.mutations";
