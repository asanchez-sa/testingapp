import { useMutation, useQueryClient } from "@tanstack/react-query";
import { profileQueries } from "./profile.queries";
import { profileService } from "./profile.service";
import type { UpdateProfileData } from "./profile.types";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      data,
    }: {
      userId: string;
      data: UpdateProfileData;
    }) => profileService.updateProfile(userId, data),
    onSuccess: (updatedProfile) => {
      // Invalidate and refetch profile queries
      queryClient.invalidateQueries({ queryKey: profileQueries.all() });

      // Optimistically update the cache
      queryClient.setQueryData(
        profileQueries.detail(updatedProfile.userId).queryKey,
        updatedProfile
      );
    },
  });
};
