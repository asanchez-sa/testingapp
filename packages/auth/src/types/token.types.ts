export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export interface DecodedToken {
  sub: string;
  email: string;
  exp: number;
  iat: number;
  role?: string;
}

export interface TokenMetadata {
  expiresAt: number;
  issuedAt: number;
  userId: string;
  email: string;
}
