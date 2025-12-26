import type { TokenPair } from "../types/token.types";
import type { User } from "../types/user.types";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  user: User;
  tokens: TokenPair;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface UpdateProfileData {
  name?: string;
  phone?: string;
  bio?: string;
  location?: string;
  avatar?: string;
}
