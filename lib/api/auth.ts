import { apiPostJson } from "./client";

export interface TokenPair {
  access: string;
  refresh: string;
}

/** POST /api/v1/auth/token/ — staff accounts only; non-staff accounts get 401. */
export function staffLogin(username: string, password: string): Promise<TokenPair> {
  return apiPostJson<TokenPair>("/api/v1/auth/token/", { username, password });
}

/** POST /api/v1/auth/token/refresh/ — exchange a refresh token for a new access token. */
export async function refreshAccessToken(refresh: string): Promise<string> {
  const result = await apiPostJson<{ access: string }>("/api/v1/auth/token/refresh/", { refresh });
  return result.access;
}
