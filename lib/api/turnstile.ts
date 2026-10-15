import { apiGet } from "./client";

export interface TurnstileConfig {
  /** False in local development — submissions skip the captcha and the widget shouldn't render. */
  enabled: boolean;
  sitekey: string;
  /** Empty when disabled. */
  script_url: string;
}

/** GET /api/v1/turnstile/ — lets the frontend decide whether to render the captcha widget. */
export function getTurnstileConfig(): Promise<TurnstileConfig> {
  return apiGet<TurnstileConfig>("/api/v1/turnstile/");
}
