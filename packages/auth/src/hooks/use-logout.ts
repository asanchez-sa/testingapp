import { useState } from "react";
import { useAuthStore } from "../store/auth.store";

export const useLogout = () => {
  const logout = useAuthStore((state) => state.logout);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);

    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
      // Continue even if API call fails
    } finally {
      setIsLoading(false);
    }
  };

  return {
    logout: handleLogout,
    isLoading,
  };
};
