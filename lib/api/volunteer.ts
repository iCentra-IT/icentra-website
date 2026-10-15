import { apiGet, apiPostJson, apiRequest } from "./client";

export interface VolunteerSkill {
  id: number;
  name: string;
  slug: string;
}

export interface VolunteerAvailabilitySlot {
  id: number;
  name: string;
  slug: string;
}

export interface VolunteerApplicationInput {
  full_name?: string;
  first_name?: string;
  last_name?: string;
  email: string;
  phone?: string;
  linkedin_url?: string;
  organization?: string;
  city?: string;
  skills?: string;
  skill_slugs?: string[];
  availability_slugs?: string[];
  hours_per_week?: number;
  motivation: string;
  marketing_consent?: boolean;
  "cf-turnstile-response"?: string;
}

/** GET /api/v1/volunteer/skills/ */
export function listVolunteerSkills(): Promise<VolunteerSkill[]> {
  return apiGet<VolunteerSkill[]>("/api/v1/volunteer/skills/");
}

/** GET /api/v1/volunteer/availability/ */
export function listVolunteerAvailability(): Promise<VolunteerAvailabilitySlot[]> {
  return apiGet<VolunteerAvailabilitySlot[]>("/api/v1/volunteer/availability/");
}

/** POST /api/v1/volunteer-applications/ */
export function submitVolunteerApplication(
  data: VolunteerApplicationInput
): Promise<{ message: string; application_id: number }> {
  return apiPostJson("/api/v1/volunteer-applications/", data);
}

/* ─────────────────────────────────────────
   STAFF — /api/v1/staff/volunteer-skills/, /api/v1/staff/volunteer-availability/
───────────────────────────────────────── */
export interface SkillInput {
  name: string;
  slug?: string;
  is_active?: boolean;
}

export interface AvailabilitySlotInput {
  name: string;
  slug?: string;
  sort_order?: number;
}

export interface StaffSkill extends VolunteerSkill {
  is_active: boolean;
}

export interface StaffAvailabilitySlot extends VolunteerAvailabilitySlot {
  sort_order: number;
}

function authHeaders(accessToken: string): HeadersInit {
  return { Authorization: `Bearer ${accessToken}` };
}

async function paginatedGet<T>(path: string, accessToken: string): Promise<T[]> {
  const items: T[] = [];
  let next: string | null = path;
  while (next) {
    const page: { next: string | null; results: T[] } = await apiGet(next, {
      headers: authHeaders(accessToken),
      cache: "no-store",
    });
    items.push(...page.results);
    next = page.next ? page.next.replace(/^https?:\/\/[^/]+/, "") : null;
  }
  return items;
}

export function staffListSkills(accessToken: string): Promise<StaffSkill[]> {
  return paginatedGet<StaffSkill>("/api/v1/staff/volunteer-skills/?page_size=100", accessToken);
}

export function staffCreateSkill(accessToken: string, data: SkillInput): Promise<StaffSkill> {
  return apiRequest("/api/v1/staff/volunteer-skills/", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders(accessToken) },
    body: JSON.stringify(data),
  });
}

export function staffUpdateSkill(accessToken: string, slug: string, data: Partial<SkillInput>): Promise<StaffSkill> {
  return apiRequest(`/api/v1/staff/volunteer-skills/${encodeURIComponent(slug)}/`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", ...authHeaders(accessToken) },
    body: JSON.stringify(data),
  });
}

export function staffDeleteSkill(accessToken: string, slug: string): Promise<void> {
  return apiRequest(`/api/v1/staff/volunteer-skills/${encodeURIComponent(slug)}/`, {
    method: "DELETE",
    headers: authHeaders(accessToken),
  });
}

export function staffListAvailability(accessToken: string): Promise<StaffAvailabilitySlot[]> {
  return paginatedGet<StaffAvailabilitySlot>("/api/v1/staff/volunteer-availability/?page_size=100", accessToken);
}

export function staffCreateAvailability(accessToken: string, data: AvailabilitySlotInput): Promise<StaffAvailabilitySlot> {
  return apiRequest("/api/v1/staff/volunteer-availability/", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders(accessToken) },
    body: JSON.stringify(data),
  });
}

export function staffUpdateAvailability(
  accessToken: string,
  slug: string,
  data: Partial<AvailabilitySlotInput>
): Promise<StaffAvailabilitySlot> {
  return apiRequest(`/api/v1/staff/volunteer-availability/${encodeURIComponent(slug)}/`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", ...authHeaders(accessToken) },
    body: JSON.stringify(data),
  });
}

export function staffDeleteAvailability(accessToken: string, slug: string): Promise<void> {
  return apiRequest(`/api/v1/staff/volunteer-availability/${encodeURIComponent(slug)}/`, {
    method: "DELETE",
    headers: authHeaders(accessToken),
  });
}
