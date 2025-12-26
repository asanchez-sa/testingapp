import { type ReactNode, useEffect } from "react";
import { useAuthStore } from "../store/auth.store";

export interface AuthGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
  onUnauthenticated?: () => void;
}

export const AuthGuard = ({
  children,
  fallback,
  onUnauthenticated,
}: AuthGuardProps) => {
  const { isAuthenticated, isLoading } = useAuthStore();

  useEffect(() => {
    if (!(isLoading || isAuthenticated) && onUnauthenticated) {
      onUnauthenticated();
    }
  }, [isAuthenticated, isLoading, onUnauthenticated]);

  if (isLoading) {
    return fallback || null;
  }

  if (!isAuthenticated) {
    return fallback || null;
  }

  return <>{children}</>;
};
