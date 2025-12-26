import { APP_CONSTANTS } from "@superapp/shared/constants";
import axios, { type AxiosInstance } from "axios";
import {
  loginResponseSchema,
  registerResponseSchema,
  userSchema,
} from "../schemas";
import type { User } from "../types/user.types";
import type {
  AuthResponse,
  LoginCredentials,
  RefreshTokenResponse,
  RegisterData,
  UpdateProfileData,
} from "./auth.api.types";

class AuthApiClient {
  private readonly client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: APP_CONSTANTS.AUTH_BASE_URL,
      timeout: APP_CONSTANTS.TIMEOUTS.DEFAULT,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  }

  setAuthToken(token: string | null): void {
    if (token) {
      this.client.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      this.client.defaults.headers.common.Authorization = undefined;
    }
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await this.client.post("/auth/login", credentials);
    return loginResponseSchema.parse(response.data);
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await this.client.post("/auth/register", data);
    return registerResponseSchema.parse(response.data);
  }

  async logout(): Promise<void> {
    await this.client.post("/auth/logout");
  }

  async refreshToken(refreshToken: string): Promise<RefreshTokenResponse> {
    const response = await this.client.post("/auth/refresh", { refreshToken });
    return response.data;
  }

  async getCurrentUser(): Promise<User> {
    const response = await this.client.get("/auth/me");
    return userSchema.parse(response.data);
  }

  async updateProfile(data: UpdateProfileData): Promise<User> {
    const response = await this.client.patch("/auth/profile", data);
    return userSchema.parse(response.data);
  }

  async changePassword(
    currentPassword: string,
    newPassword: string
  ): Promise<void> {
    await this.client.post("/auth/change-password", {
      currentPassword,
      newPassword,
    });
  }

  async forgotPassword(email: string): Promise<void> {
    await this.client.post("/auth/forgot-password", { email });
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    await this.client.post("/auth/reset-password", {
      token,
      newPassword,
    });
  }

  async verifyEmail(token: string): Promise<void> {
    await this.client.post("/auth/verify-email", { token });
  }

  async resendVerificationEmail(): Promise<void> {
    await this.client.post("/auth/resend-verification");
  }
}

// Singleton instance
const authApiClient = new AuthApiClient();

export const authApi = {
  setAuthToken: (token: string | null) => authApiClient.setAuthToken(token),
  login: (credentials: LoginCredentials) => authApiClient.login(credentials),
  register: (data: RegisterData) => authApiClient.register(data),
  logout: () => authApiClient.logout(),
  refreshToken: (refreshToken: string) =>
    authApiClient.refreshToken(refreshToken),
  getCurrentUser: () => authApiClient.getCurrentUser(),
  updateProfile: (data: UpdateProfileData) => authApiClient.updateProfile(data),
  changePassword: (currentPassword: string, newPassword: string) =>
    authApiClient.changePassword(currentPassword, newPassword),
  forgotPassword: (email: string) => authApiClient.forgotPassword(email),
  resetPassword: (token: string, newPassword: string) =>
    authApiClient.resetPassword(token, newPassword),
  verifyEmail: (token: string) => authApiClient.verifyEmail(token),
  resendVerificationEmail: () => authApiClient.resendVerificationEmail(),
};
