"use client";

import { ApiError } from "@/lib/api/client";
import { refreshAccessToken, type TokenPair } from "@/lib/api/auth";

/* ─────────────────────────────────────────
   Admin staff session — access/refresh tokens live in localStorage.
   This is a Bearer-token API with no cookie/session option, so that's the
   pragmatic standard for a client-rendered admin SPA. Nothing here is
   reachable from /api/v1 public routes — only the /admin section uses it.
───────────────────────────────────────── */

const ACCESS_KEY = "icentra_admin_access";
const REFRESH_KEY = "icentra_admin_refresh";

export class SessionExpiredError extends Error {
  constructor() {
    super("Your session has expired. Please sign in again.");
    this.name = "SessionExpiredError";
  }
}

export function getStoredTokens(): TokenPair | null {
  if (typeof window === "undefined") return null;
  const access = window.localStorage.getItem(ACCESS_KEY);
  const refresh = window.localStorage.getItem(REFRESH_KEY);
  if (!access || !refresh) return null;
  return { access, refresh };
}

export function storeTokens(tokens: TokenPair): void {
  window.localStorage.setItem(ACCESS_KEY, tokens.access);
  window.localStorage.setItem(REFRESH_KEY, tokens.refresh);
}

export function clearTokens(): void {
  window.localStorage.removeItem(ACCESS_KEY);
  window.localStorage.removeItem(REFRESH_KEY);
}

/**
 * withFreshToken
 * Runs `fn` with the current access token. If the API rejects it as expired
 * (401), refreshes once and retries. If the refresh token is also dead,
 * clears the session and throws SessionExpiredError so the caller can send
 * the visitor back to /admin/login.
 */
export async function withFreshToken<T>(fn: (accessToken: string) => Promise<T>): Promise<T> {
  const tokens = getStoredTokens();
  if (!tokens) throw new SessionExpiredError();

  try {
    return await fn(tokens.access);
  } catch (err) {
    if (!(err instanceof ApiError) || err.status !== 401) throw err;

    try {
      const access = await refreshAccessToken(tokens.refresh);
      storeTokens({ access, refresh: tokens.refresh });
      return await fn(access);
    } catch {
      clearTokens();
      throw new SessionExpiredError();
    }
  }
}
