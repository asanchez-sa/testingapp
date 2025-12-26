import { queryOptions } from "@tanstack/react-query";
import { userService } from "./user.service";

export const userQueries = {
  all: () => ["user"] as const,

  profile: (id: string) =>
    queryOptions({
      queryKey: [...userQueries.all(), "profile", id] as const,
      queryFn: () => userService.getUserProfile(id),
    }),

  currentUser: () =>
    queryOptions({
      queryKey: [...userQueries.all(), "current"] as const,
      queryFn: () => userService.getCurrentUser(),
    }),
};
