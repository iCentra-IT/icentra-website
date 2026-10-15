/* ─────────────────────────────────────────
   ICENTRA BACKEND API CLIENT
   https://api-web.icentra.com/api/docs/

   No endpoint requires auth. Every submission endpoint expects a
   `cf-turnstile-response` field and is rate-limited per IP and per email.
   Every error uses one envelope: {"error": {"code", "detail", "fields"}}.
───────────────────────────────────────── */

if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not set. Add it to .env.local.");
}

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
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

async function parseErrorBody(res: Response): Promise<ApiErrorBody | null> {
  try {
    const json = await res.json();
    return json?.error ?? null;
  } catch {
    return null;
  }
}

/**
 * apiRequest
 * Thin fetch wrapper: builds the full URL, throws ApiError on non-2xx,
 * and returns parsed JSON (or undefined for empty 204 responses).
 */
export async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, init);

  if (!res.ok) {
    throw new ApiError(res.status, await parseErrorBody(res));
  }
  if (res.status === 204) return undefined as T;

  const text = await res.text();
  return text ? (JSON.parse(text) as T) : (undefined as T);
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
