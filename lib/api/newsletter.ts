import { apiGet, apiPostJson, apiRequest } from "./client";

export type NewsletterFrequency = "daily" | "weekly" | "bi-weekly" | "monthly";

export interface NewsletterCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
}

export interface NewsletterSubscribeInput {
  email: string;
  full_name?: string;
  frequency?: NewsletterFrequency;
  category_slugs?: string[];
  marketing_consent?: boolean;
  "cf-turnstile-response"?: string;
}

export interface NewsletterSubscription {
  id: number;
  email: string;
  status: string;
}

/** GET /api/v1/newsletter/categories/ */
export function listNewsletterCategories(): Promise<NewsletterCategory[]> {
  return apiGet<NewsletterCategory[]>("/api/v1/newsletter/categories/");
}

/** POST /api/v1/newsletter/subscribe/ */
export function subscribeNewsletter(
  data: NewsletterSubscribeInput
): Promise<{ message: string; subscription: NewsletterSubscription }> {
  return apiPostJson("/api/v1/newsletter/subscribe/", data);
}

/** POST /api/v1/newsletter/unsubscribe/ */
export function unsubscribeNewsletter(
  email: string,
  reason?: string
): Promise<{ message: string; subscription?: NewsletterSubscription }> {
  return apiPostJson("/api/v1/newsletter/unsubscribe/", { email, reason });
}

/* ─────────────────────────────────────────
   STAFF — /api/v1/staff/newsletter-categories/
───────────────────────────────────────── */
export interface NewsletterCategoryInput {
  name: string;
  slug?: string;
  description?: string;
  is_active?: boolean;
}

export interface StaffNewsletterCategory extends NewsletterCategory {
  is_active: boolean;
}

function authHeaders(accessToken: string): HeadersInit {
  return { Authorization: `Bearer ${accessToken}` };
}

export async function staffListNewsletterCategories(accessToken: string): Promise<StaffNewsletterCategory[]> {
  const items: StaffNewsletterCategory[] = [];
  let path: string | null = "/api/v1/staff/newsletter-categories/?page_size=100";
  while (path) {
    const page: { next: string | null; results: StaffNewsletterCategory[] } = await apiGet(path, {
      headers: authHeaders(accessToken),
      cache: "no-store",
    });
    items.push(...page.results);
    path = page.next ? page.next.replace(/^https?:\/\/[^/]+/, "") : null;
  }
  return items;
}

export function staffCreateNewsletterCategory(
  accessToken: string,
  data: NewsletterCategoryInput
): Promise<StaffNewsletterCategory> {
  return apiRequest("/api/v1/staff/newsletter-categories/", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders(accessToken) },
    body: JSON.stringify(data),
  });
}

export function staffUpdateNewsletterCategory(
  accessToken: string,
  slug: string,
  data: Partial<NewsletterCategoryInput>
): Promise<StaffNewsletterCategory> {
  return apiRequest(`/api/v1/staff/newsletter-categories/${encodeURIComponent(slug)}/`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", ...authHeaders(accessToken) },
    body: JSON.stringify(data),
  });
}

export function staffDeleteNewsletterCategory(accessToken: string, slug: string): Promise<void> {
  return apiRequest(`/api/v1/staff/newsletter-categories/${encodeURIComponent(slug)}/`, {
    method: "DELETE",
    headers: authHeaders(accessToken),
  });
}
