/* ─────────────────────────────────────────
   ICENTRA BACKEND API CLIENT
   https://api-web.icentra.com/api/docs/

   No endpoint requires auth. Every submission endpoint expects a
   `cf-turnstile-response` field and is rate-limited per IP and per email.
   Every error uses one envelope: {"error": {"code", "detail", "fields"}}.

   Built on axios. `apiRequest`/`apiGet`/`apiPostJson`/`apiPostForm` keep
   their original fetch-shaped signatures (a path + a RequestInit-like init)
   so every caller in lib/api/*.ts stays unchanged — only the transport
   underneath them is axios now.
───────────────────────────────────────── */

import axios from "axios";

if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not set. Add it to .env.local.");
}

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const http = axios.create({ baseURL: API_BASE_URL });

export interface ApiErrorBody {
  code: string;
  detail?: string;
  fields?: Record<string, string>;
}

export class ApiError extends Error {
  status: number;
  code: string;
  fields?: Record<string, string>;

  constructor(status: number, body: ApiErrorBody | null) {
    super(body?.detail || body?.code || `Request failed with status ${status}`);
    this.name = "ApiError";
    this.status = status;
    this.code = body?.code ?? "unknown";
    this.fields = body?.fields;
  }

  /** First field-level message, if the failure was a validation error. */
  get firstFieldError(): string | undefined {
    if (!this.fields) return undefined;
    return Object.values(this.fields)[0];
  }
}

/** The backend's error envelope is `{ error: {...} }` — axios already parses JSON bodies for us. */
function extractErrorBody(data: unknown): ApiErrorBody | null {
  if (data && typeof data === "object" && "error" in data) {
    return (data as { error?: ApiErrorBody }).error ?? null;
  }
  return null;
}

/**
 * apiRequest
 * Thin axios wrapper: builds the full URL, throws ApiError on non-2xx (or
 * on a network-level failure, with status 0), and returns the parsed body
 * (or undefined for empty 204 responses).
 */
export async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  try {
    const res = await http.request<T>({
      url: path,
      method: init?.method || "GET",
      headers: init?.headers as Record<string, string> | undefined,
      data: init?.body,
    });
    return res.status === 204 ? (undefined as T) : res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw new ApiError(err.response?.status ?? 0, extractErrorBody(err.response?.data));
    }
    throw err;
  }
}

export function apiGet<T>(path: string, init?: RequestInit): Promise<T> {
  return apiRequest<T>(path, { ...init, method: "GET" });
}

export function apiPostJson<T>(path: string, body: unknown, init?: RequestInit): Promise<T> {
  return apiRequest<T>(path, {
    ...init,
    method: "POST",
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
    body: JSON.stringify(body),
  });
}

export function apiPostForm<T>(path: string, formData: FormData, init?: RequestInit): Promise<T> {
  // No Content-Type here — the browser sets the multipart boundary itself.
  return apiRequest<T>(path, { ...init, method: "POST", body: formData });
}
