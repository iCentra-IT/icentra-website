declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/**
 * Pushes a conversion event to GTM's dataLayer. Safe to call even if the
 * visitor hasn't accepted cookies yet or the GTM container isn't configured
 * — the array just queues harmlessly until (and unless) GTM loads.
 */
export function trackEvent(event: string, params: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}
