"use client";

/* ─────────────────────────────────────────
   COOKIE CONSENT — simple accept/reject model.
   Gates anything that sets non-essential cookies (analytics, chat, CRM
   tracking) behind an explicit visitor choice, stored in localStorage.
───────────────────────────────────────── */

const CONSENT_KEY = "icentra_cookie_consent";

export type ConsentValue = "accepted" | "rejected";

export function getConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(CONSENT_KEY);
  return value === "accepted" || value === "rejected" ? value : null;
}

export function setConsent(value: ConsentValue): void {
  window.localStorage.setItem(CONSENT_KEY, value);
  window.dispatchEvent(new Event("icentra-consent-change"));
}

export function hasAnalyticsConsent(): boolean {
  return getConsent() === "accepted";
}
