import { useAuthStore } from "../store/auth.store";

export const useUser = () => {
  const user = useAuthStore((state) => state.user);
  const updateUser = useAuthStore((state) => state.updateUser);
  const updateProfile = useAuthStore((state) => state.updateProfile);

  return {
    user,
    updateUser,
    updateProfile,
  };
};
