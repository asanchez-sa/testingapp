import { queryOptions } from "@tanstack/react-query";
import { profileService } from "./profile.service";

export const profileQueries = {
  all: () => ["profile"] as const,

  detail: (userId: string) =>
    queryOptions({
      queryKey: [...profileQueries.all(), "detail", userId] as const,
      queryFn: () => profileService.getProfile(userId),
    }),

  current: () =>
    queryOptions({
      queryKey: [...profileQueries.all(), "current"] as const,
      queryFn: () => profileService.getCurrentProfile(),
    }),
};
