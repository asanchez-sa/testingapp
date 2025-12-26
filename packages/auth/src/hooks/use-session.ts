import { useAuthStore } from "../store/auth.store";
import { isTokenValid, shouldRefreshToken } from "../utils/token.utils";

export const useSession = () => {
  const { tokens, isAuthenticated, refreshToken } = useAuthStore();

  const isValid = tokens?.accessToken
    ? isTokenValid(tokens.accessToken)
    : false;
  const needsRefresh = tokens?.accessToken
    ? shouldRefreshToken(tokens.accessToken)
    : false;

  return {
    tokens,
    isAuthenticated,
    isValid,
    needsRefresh,
    refreshToken,
  };
};
