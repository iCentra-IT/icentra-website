import { apiGet, apiPostJson, apiRequest, ApiError } from "./client";
import type { PillarItem } from "./pillars";

export type EventType = "webinar" | "summit" | "conference" | "workshop" | "training" | "roundtable";
export type LocationType = "online" | "in_person" | "hybrid";
export type EventStatus = "draft" | "open" | "closed";

export const EVENT_TYPE_LABELS: Record<EventType, string> = {
  webinar: "Webinar",
  summit: "Summit",
  conference: "Conference",
  workshop: "Workshop",
  training: "Training",
  roundtable: "Roundtable",
};

export const EVENT_STATUS_LABELS: Record<EventStatus, string> = {
  draft: "Draft",
  open: "Open",
  closed: "Closed",
};

export const LOCATION_TYPE_LABELS: Record<LocationType, string> = {
  online: "Virtual",
  in_person: "In person",
  hybrid: "Hybrid",
};

/** Human-readable "Sep 24, 2026 · 3:00 PM · WAT · 90 min · Virtual" style summary. */
export function formatEventSchedule(
  event: Pick<EventListItem, "start_datetime" | "timezone" | "duration_minutes" | "location_type"> & { start_local?: string }
): string {
  const date = new Date(event.start_datetime);
  const valid = !Number.isNaN(date.getTime());
  const dateStr = valid ? date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : event.start_local ?? event.start_datetime;
  const timeStr = valid ? date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }) : null;
  return [dateStr, timeStr, event.timezone, event.duration_minutes ? `${event.duration_minutes} min` : null, LOCATION_TYPE_LABELS[event.location_type]]
    .filter(Boolean)
    .join(" · ");
}

export interface EventListItem {
  id: number;
  title: string;
  slug: string;
  subtitle: string;
  event_type: EventType;
  pillar: PillarItem | null;
  start_datetime: string;
  start_local: string;
  timezone: string;
  duration_minutes: number | null;
  location_type: LocationType;
  location_url: string;
  registration_is_open: boolean;
  status: EventStatus;
}

export interface EventDetail extends EventListItem {
  description: string;
  agenda: string;
  speakers: string;
  end_datetime: string | null;
  end_local: string;
  location_name: string;
  location_address: string;
  registration_open: boolean;
  registration_close: string | null;
  capacity: number | null;
  registration_count: number;
  reminder_options: string;
}

interface EventPage {
  count: number;
  next: string | null;
  previous: string | null;
  results: EventListItem[];
}

export interface EventListParams {
  upcoming?: boolean;
  past?: boolean;
  event_type?: EventType;
  pillar?: string;
  page_size?: number;
}

/** GET /api/v1/events/ */
export async function listEvents(params?: EventListParams): Promise<EventListItem[]> {
  const search = new URLSearchParams();
  search.set("page_size", String(params?.page_size ?? 100));
  if (params?.upcoming) search.set("upcoming", "true");
  if (params?.past) search.set("past", "true");
  if (params?.event_type) search.set("event_type", params.event_type);
  if (params?.pillar) search.set("pillar", params.pillar);

  const events: EventListItem[] = [];
  let path: string | null = `/api/v1/events/?${search.toString()}`;
  while (path) {
    const page: EventPage = await apiGet<EventPage>(path, { cache: "no-store" });
    events.push(...page.results);
    path = page.next ? page.next.replace(/^https?:\/\/[^/]+/, "") : null;
  }
  return events;
}

/** GET /api/v1/events/{slug}/ — returns null instead of throwing on 404. */
export async function getEvent(slug: string): Promise<EventDetail | null> {
  try {
    return await apiGet<EventDetail>(`/api/v1/events/${encodeURIComponent(slug)}/`, { cache: "no-store" });
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) return null;
    throw err;
  }
}

export interface EventRegistrationInput {
  first_name: string;
  last_name?: string;
  email: string;
  organization?: string;
  job_title?: string;
  timezone?: string;
  questions_for_host?: string;
  marketing_consent?: boolean;
  reminder_offsets?: number[];
  source?: string;
  "cf-turnstile-response"?: string;
}

export interface EventRegisterResponse {
  message: string;
  registration_id: number;
  reminders_scheduled: { offset_minutes: number }[];
}

/** POST /api/v1/events/{slug}/register/ */
export function registerForEvent(slug: string, data: EventRegistrationInput): Promise<EventRegisterResponse> {
  return apiPostJson<EventRegisterResponse>(`/api/v1/events/${encodeURIComponent(slug)}/register/`, data);
}

/** POST /api/v1/events/{slug}/cancel/ */
export function cancelEventRegistration(slug: string, email: string): Promise<{ message: string }> {
  return apiPostJson(`/api/v1/events/${encodeURIComponent(slug)}/cancel/`, { email });
}

/* ─────────────────────────────────────────
   STAFF — /api/v1/staff/events/
───────────────────────────────────────── */
export interface StaffEvent {
  id: number;
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  agenda: string;
  event_type: EventType;
  pillar: number | null;
  speakers: number[];
  start_datetime: string;
  end_datetime: string | null;
  timezone: string;
  duration_minutes: number | null;
  location_type: LocationType;
  location_name: string;
  location_address: string;
  location_url: string;
  registration_open: boolean;
  registration_close: string | null;
  capacity: number | null;
  status: EventStatus;
  is_public: boolean;
  cover_image: string | null;
}

export interface EventInput {
  title: string;
  slug?: string;
  subtitle?: string;
  description: string;
  agenda?: string;
  event_type?: EventType;
  pillar?: number | null;
  speakers?: number[];
  start_datetime: string;
  end_datetime?: string | null;
  timezone?: string;
  duration_minutes?: number | null;
  location_type?: LocationType;
  location_name?: string;
  location_address?: string;
  location_url?: string;
  registration_open?: boolean;
  registration_close?: string | null;
  capacity?: number | null;
  status?: EventStatus;
  is_public?: boolean;
}

function authHeaders(accessToken: string): HeadersInit {
  return { Authorization: `Bearer ${accessToken}` };
}

export async function staffListEvents(accessToken: string): Promise<StaffEvent[]> {
  const items: StaffEvent[] = [];
  let path: string | null = "/api/v1/staff/events/?page_size=100";
  while (path) {
    const page: { next: string | null; results: StaffEvent[] } = await apiGet(path, {
      headers: authHeaders(accessToken),
      cache: "no-store",
    });
    items.push(...page.results);
    path = page.next ? page.next.replace(/^https?:\/\/[^/]+/, "") : null;
  }
  return items;
}

export function staffGetEvent(accessToken: string, slug: string): Promise<StaffEvent> {
  return apiGet(`/api/v1/staff/events/${encodeURIComponent(slug)}/`, { headers: authHeaders(accessToken), cache: "no-store" });
}

export function staffCreateEvent(accessToken: string, data: EventInput): Promise<StaffEvent> {
  return apiRequest("/api/v1/staff/events/", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders(accessToken) },
    body: JSON.stringify(data),
  });
}

export function staffUpdateEvent(accessToken: string, slug: string, data: Partial<EventInput>): Promise<StaffEvent> {
  return apiRequest(`/api/v1/staff/events/${encodeURIComponent(slug)}/`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", ...authHeaders(accessToken) },
    body: JSON.stringify(data),
  });
}

export function staffDeleteEvent(accessToken: string, slug: string): Promise<void> {
  return apiRequest(`/api/v1/staff/events/${encodeURIComponent(slug)}/`, {
    method: "DELETE",
    headers: authHeaders(accessToken),
  });
}
