import type { TokenPair } from "./token.types";
import type { User } from "./user.types";

export interface Session {
  user: User;
  tokens: TokenPair;
  expiresAt: number;
  createdAt: number;
}

export interface SessionState {
  isAuthenticated: boolean;
  user: User | null;
  tokens: TokenPair | null;
  isLoading: boolean;
  error: string | null;
}
