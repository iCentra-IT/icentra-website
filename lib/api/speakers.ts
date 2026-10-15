import { apiGet, apiPostJson, apiRequest, apiPostForm } from "./client";

export type PreferredQuarter = "q1" | "q2" | "q3" | "q4" | "any";
export type HowHeard = "website" | "linkedin" | "referral" | "event" | "newsletter" | "search" | "social" | "other";

export const PREFERRED_QUARTER_LABELS: Record<PreferredQuarter, string> = {
  q1: "Q1 (Jan–Mar)",
  q2: "Q2 (Apr–Jun)",
  q3: "Q3 (Jul–Sep)",
  q4: "Q4 (Oct–Dec)",
  any: "Any quarter",
};

export const HOW_HEARD_LABELS: Record<HowHeard, string> = {
  website: "Website",
  linkedin: "LinkedIn",
  referral: "Colleague or referral",
  event: "iCentra event",
  newsletter: "Newsletter",
  search: "Search engine",
  social: "Social media",
  other: "Other",
};

export interface SpeakerApplicationInput {
  full_name?: string;
  first_name?: string;
  last_name?: string;
  email: string;
  job_title?: string;
  organization?: string;
  phone?: string;
  linkedin_url?: string;
  pillar_slug?: string;
  preferred_quarter?: PreferredQuarter;
  proposed_topic: string;
  topic_abstract?: string;
  previous_speaking_experience?: string;
  bio?: string;
  consent_to_record?: boolean;
  how_heard?: HowHeard;
  marketing_consent?: boolean;
  "cf-turnstile-response"?: string;
}

/** POST /api/v1/speaker-applications/ */
export function submitSpeakerApplication(
  data: SpeakerApplicationInput
): Promise<{ message: string; application_id: number }> {
  return apiPostJson("/api/v1/speaker-applications/", data);
}

/* ─────────────────────────────────────────
   STAFF — /api/v1/staff/speakers/
   (There is no public "list speakers" endpoint — speakers are only ever
   attached to events, which expose a flattened `speakers` string publicly.)
───────────────────────────────────────── */
export interface StaffSpeaker {
  id: number;
  name: string;
  job_title: string;
  organization: string;
  bio: string;
  photo: string | null;
  linkedin_url: string;
  is_active: boolean;
}

export interface SpeakerInput {
  name: string;
  job_title?: string;
  organization?: string;
  bio?: string;
  linkedin_url?: string;
  is_active?: boolean;
}

function authHeaders(accessToken: string): HeadersInit {
  return { Authorization: `Bearer ${accessToken}` };
}

export async function staffListSpeakers(accessToken: string): Promise<StaffSpeaker[]> {
  const items: StaffSpeaker[] = [];
  let path: string | null = "/api/v1/staff/speakers/?page_size=100";
  while (path) {
    const page: { next: string | null; results: StaffSpeaker[] } = await apiGet(path, {
      headers: authHeaders(accessToken),
      cache: "no-store",
    });
    items.push(...page.results);
    path = page.next ? page.next.replace(/^https?:\/\/[^/]+/, "") : null;
  }
  return items;
}

export function staffGetSpeaker(accessToken: string, id: number): Promise<StaffSpeaker> {
  return apiGet(`/api/v1/staff/speakers/${id}/`, { headers: authHeaders(accessToken), cache: "no-store" });
}

/** Create/update take FormData so an optional photo file can ride along. */
function speakerFormData(data: SpeakerInput, photo?: File | null): FormData {
  const form = new FormData();
  form.set("name", data.name);
  if (data.job_title) form.set("job_title", data.job_title);
  if (data.organization) form.set("organization", data.organization);
  if (data.bio) form.set("bio", data.bio);
  if (data.linkedin_url) form.set("linkedin_url", data.linkedin_url);
  if (data.is_active !== undefined) form.set("is_active", String(data.is_active));
  if (photo) form.set("photo", photo);
  return form;
}

export function staffCreateSpeaker(accessToken: string, data: SpeakerInput, photo?: File | null): Promise<StaffSpeaker> {
  return apiPostForm(`/api/v1/staff/speakers/`, speakerFormData(data, photo), { headers: authHeaders(accessToken) });
}

export function staffUpdateSpeaker(
  accessToken: string,
  id: number,
  data: SpeakerInput,
  photo?: File | null
): Promise<StaffSpeaker> {
  return apiRequest(`/api/v1/staff/speakers/${id}/`, {
    method: "PATCH",
    headers: authHeaders(accessToken),
    body: speakerFormData(data, photo),
  });
}

export function staffDeleteSpeaker(accessToken: string, id: number): Promise<void> {
  return apiRequest(`/api/v1/staff/speakers/${id}/`, { method: "DELETE", headers: authHeaders(accessToken) });
}
