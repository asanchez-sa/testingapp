import { useState } from "react";
import type { RegisterData } from "../api/auth.api.types";
import { useAuthStore } from "../store/auth.store";

export const useRegister = () => {
  const register = useAuthStore((state) => state.register);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (data: RegisterData) => {
    setIsLoading(true);
    setError(null);

    try {
      await register(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Registration failed";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register: handleRegister,
    isLoading,
    error,
  };
};
