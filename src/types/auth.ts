// src/types/auth.ts
export interface AuthResponse {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  userId: number;
  email: string;
  fullName: string;
  role: string;
}
