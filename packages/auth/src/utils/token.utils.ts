import { jwtDecode } from "jwt-decode";
import type { DecodedToken, TokenMetadata } from "../types/token.types";

const decode = (token: string): DecodedToken => {
  try {
    return jwtDecode<DecodedToken>(token);
  } catch {
    throw new Error("Invalid token format");
  }
};

const isExpired = (token: string): boolean => {
  try {
    const decoded = decode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch {
    return true;
  }
};

const getExpirationTime = (token: string): number | null => {
  try {
    const decoded = decode(token);
    return decoded.exp * 1000; // Convert to milliseconds
  } catch {
    return null;
  }
};

const getTimeUntilExpiration = (token: string): number | null => {
  const expirationTime = getExpirationTime(token);
  if (!expirationTime) {
    return null;
  }

  const timeUntilExpiration = expirationTime - Date.now();
  return timeUntilExpiration > 0 ? timeUntilExpiration : 0;
};

const shouldRefresh = (token: string, thresholdMinutes = 5): boolean => {
  const timeUntilExpiration = getTimeUntilExpiration(token);
  if (!timeUntilExpiration) {
    return true;
  }

  const thresholdMs = thresholdMinutes * 60 * 1000;
  return timeUntilExpiration < thresholdMs;
};

const getMetadata = (token: string): TokenMetadata | null => {
  try {
    const decoded = decode(token);
    return {
      expiresAt: decoded.exp * 1000,
      issuedAt: decoded.iat * 1000,
      userId: decoded.sub,
      email: decoded.email,
    };
  } catch {
    return null;
  }
};

const isValid = (token: string): boolean => {
  if (!token) {
    return false;
  }

  try {
    const decoded = decode(token);
    return !isExpired(token) && !!decoded.sub && !!decoded.email;
  } catch {
    return false;
  }
};

export const decodeToken = (token: string): DecodedToken => {
  return decode(token);
};

export const isTokenExpired = (token: string): boolean => {
  return isExpired(token);
};

export const shouldRefreshToken = (
  token: string,
  thresholdMinutes = 5
): boolean => {
  return shouldRefresh(token, thresholdMinutes);
};

export const isTokenValid = (token: string): boolean => {
  return isValid(token);
};

export const getTokenMetadata = (token: string): TokenMetadata | null => {
  return getMetadata(token);
};
