import { create } from "zustand";
import { authApi } from "../api/auth.api";
import type { TokenPair } from "../types/token.types";
import type { AuthState } from "./auth.store.types";

// These values are securely stored in the phone's storage
// storedTokens
// storedUser

export const useAuthStore = create<AuthState>((set, get) => ({
  // Initial state
  user: null,
  tokens: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  storedTokens: null,
  storedUser: null,

  // Login
  login: async (credentials) => {
    set({ isLoading: true, error: null });

    try {
      const response = await authApi.login(credentials);

      // Set auth token in axios
      authApi.setAuthToken(response.tokens.accessToken);

      set({
        user: response.user,
        tokens: response.tokens,
        isAuthenticated: true,
        isLoading: false,
        error: null,
        storedTokens: response.tokens,
        storedUser: response.user,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Login failed",
        isLoading: false,
      });
      throw error;
    }
  },

  // Register
  register: async (data) => {
    set({ isLoading: true, error: null });

    try {
      const response = await authApi.register(data);

      // Set auth token in axios
      authApi.setAuthToken(response.tokens.accessToken);

      set({
        user: response.user,
        tokens: response.tokens,
        isAuthenticated: true,
        isLoading: false,
        error: null,
        storedTokens: response.tokens,
        storedUser: response.user,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Registration failed",
        isLoading: false,
      });
      throw error;
    }
  },

  // Logout
  logout: async () => {
    set({ isLoading: true, error: null });

    try {
      await authApi.logout();
    } catch (error) {
      // Continue even if API call fails
      console.error("Logout API error:", error);
    } finally {
      // Clear auth token from axios
      authApi.setAuthToken(null);

      set({
        user: null,
        tokens: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
        storedTokens: null,
        storedUser: null,
      });
    }
  },

  // Refresh token
  refreshToken: async () => {
    const { tokens } = get();

    if (!tokens?.refreshToken) {
      throw new Error("No refresh token available");
    }

    try {
      const response = await authApi.refreshToken(tokens.refreshToken);

      const newTokens: TokenPair = {
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
      };

      // Update auth token in axios
      authApi.setAuthToken(newTokens.accessToken);

      set({ tokens: newTokens, storedTokens: newTokens });
    } catch (error) {
      // If refresh fails, logout
      get().clearAuth();
      throw error;
    }
  },

  // Update user
  updateUser: (user) => {
    set({ user, storedUser: user });
  },

  // Update profile
  updateProfile: async (data) => {
    set({ isLoading: true, error: null });

    try {
      const updatedUser = await authApi.updateProfile(data);

      set({
        user: updatedUser,
        isLoading: false,
        error: null,
        storedUser: updatedUser,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Profile update failed",
        isLoading: false,
      });
      throw error;
    }
  },

  // Set tokens
  setTokens: (tokens) => {
    set({ tokens, isAuthenticated: true, storedTokens: tokens });
  },

  // Set error
  setError: (error) => {
    set({ error });
  },

  // Set loading
  setLoading: (loading) => {
    set({ isLoading: loading });
  },

  // Clear auth
  clearAuth: () => {
    authApi.setAuthToken(null);

    set({
      user: null,
      tokens: null,
      isAuthenticated: false,
      error: null,
      storedTokens: null,
      storedUser: null,
    });
  },
}));
