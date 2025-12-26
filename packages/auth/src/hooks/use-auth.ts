import { useAuthStore } from "../store/auth.store";

export const useAuth = () => {
  const {
    user,
    tokens,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    refreshToken,
    updateUser,
    updateProfile,
    setError,
    clearAuth,
  } = useAuthStore();

  return {
    // State
    user,
    tokens,
    isAuthenticated,
    isLoading,
    error,

    // Actions
    login,
    register,
    logout,
    refreshToken,
    updateUser,
    updateProfile,
    setError,
    clearAuth,
  };
};
