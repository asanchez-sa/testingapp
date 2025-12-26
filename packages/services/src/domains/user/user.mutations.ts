import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userQueries } from "./user.queries";
import { userService } from "./user.service";
import type { UpdateUserData } from "./user.types";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUserData }) =>
      userService.updateUser(id, data),
    onSuccess: (updatedUser) => {
      // Invalidate and refetch user queries
      queryClient.invalidateQueries({ queryKey: userQueries.all() });

      // Optimistically update the cache
      queryClient.setQueryData(
        userQueries.profile(updatedUser.id).queryKey,
        updatedUser
      );
    },
  });
};
