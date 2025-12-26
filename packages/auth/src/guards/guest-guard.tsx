import { type ReactNode, useEffect } from "react";
import { useAuthStore } from "../store/auth.store";

export interface GuestGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
  onAuthenticated?: () => void;
}

export const GuestGuard = ({
  children,
  fallback,
  onAuthenticated,
}: GuestGuardProps) => {
  const { isAuthenticated, isLoading } = useAuthStore();

  useEffect(() => {
    if (!isLoading && isAuthenticated && onAuthenticated) {
      onAuthenticated();
    }
  }, [isAuthenticated, isLoading, onAuthenticated]);

  if (isLoading) {
    return fallback || null;
  }

  if (isAuthenticated) {
    return fallback || null;
  }

  return <>{children}</>;
};
