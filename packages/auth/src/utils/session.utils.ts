import type { Session } from "../types/session.types";
import { TokenUtils } from "./token.utils";

export const isSessionValid = (session: Session | null): boolean => {
  if (!session) {
    return false;
  }

  const { tokens, expiresAt } = session;

  if (!(tokens.accessToken && tokens.refreshToken)) {
    return false;
  }

  // Check if session has expired
  if (Date.now() > expiresAt) {
    return false;
  }

  // Check if access token is valid
  return TokenUtils.isValid(tokens.accessToken);
};

export const isSessionExpired = (session: Session | null): boolean => {
  if (!session) {
    return true;
  }
  return Date.now() > session.expiresAt;
};

export const shouldRefreshSession = (
  session: Session | null,
  thresholdMinutes = 5
): boolean => {
  if (!session) {
    return false;
  }

  return TokenUtils.shouldRefresh(session.tokens.accessToken, thresholdMinutes);
};

export const getTimeUntilExpiration = (
  session: Session | null
): number | null => {
  if (!session) {
    return null;
  }

  const timeUntil = session.expiresAt - Date.now();
  return timeUntil > 0 ? timeUntil : 0;
};

export const createSession = (
  user: Session["user"],
  tokens: Session["tokens"]
): Session => {
  const expirationTime = TokenUtils.getExpirationTime(tokens.accessToken);

  return {
    user,
    tokens,
    expiresAt: expirationTime || Date.now() + 24 * 60 * 60 * 1000, // Default to 24 hours
    createdAt: Date.now(),
  };
};
