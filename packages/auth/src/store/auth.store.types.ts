import type {
  LoginCredentials,
  RegisterData,
  UpdateProfileData,
} from "../api/auth.api.types";
import type { TokenPair } from "../types/token.types";
import type { User } from "../types/user.types";

export interface AuthState {
  // State
  user: User | null;
  tokens: TokenPair | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  storedTokens: TokenPair | null;
  storedUser: User | null;

  // Actions
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  updateUser: (user: User) => void;
  updateProfile: (data: UpdateProfileData) => Promise<void>;
  setTokens: (tokens: TokenPair) => void;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
  clearAuth: () => void;
}
