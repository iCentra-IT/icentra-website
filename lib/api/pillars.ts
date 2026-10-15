import { apiGet, apiRequest } from "./client";

export interface PillarItem {
  id: number;
  name: string;
  slug: string;
  description: string;
}

/** GET /api/v1/pillars/ — active pillars only. */
export function listPillars(): Promise<PillarItem[]> {
  return apiGet<PillarItem[]>("/api/v1/pillars/");
}

/* ─────────────────────────────────────────
   STAFF — /api/v1/staff/pillars/
───────────────────────────────────────── */
export interface PillarInput {
  name: string;
  slug?: string;
  description?: string;
  is_active?: boolean;
}

export interface StaffPillar extends PillarItem {
  is_active: boolean;
}

function authHeaders(accessToken: string): HeadersInit {
  return { Authorization: `Bearer ${accessToken}` };
}

export async function staffListPillars(accessToken: string): Promise<StaffPillar[]> {
  const items: StaffPillar[] = [];
  let path: string | null = "/api/v1/staff/pillars/?page_size=100";
  while (path) {
    const page: { next: string | null; results: StaffPillar[] } = await apiGet(path, {
      headers: authHeaders(accessToken),
      cache: "no-store",
    });
    items.push(...page.results);
    path = page.next ? page.next.replace(/^https?:\/\/[^/]+/, "") : null;
  }
  return items;
}

export function staffCreatePillar(accessToken: string, data: PillarInput): Promise<StaffPillar> {
  return apiRequest("/api/v1/staff/pillars/", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders(accessToken) },
    body: JSON.stringify(data),
  });
}

export function staffUpdatePillar(accessToken: string, slug: string, data: Partial<PillarInput>): Promise<StaffPillar> {
  return apiRequest(`/api/v1/staff/pillars/${encodeURIComponent(slug)}/`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", ...authHeaders(accessToken) },
    body: JSON.stringify(data),
  });
}

export function staffDeletePillar(accessToken: string, slug: string): Promise<void> {
  return apiRequest(`/api/v1/staff/pillars/${encodeURIComponent(slug)}/`, {
    method: "DELETE",
    headers: authHeaders(accessToken),
  });
}
