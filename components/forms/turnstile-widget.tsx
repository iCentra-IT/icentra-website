"use client";

import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef } from "react";
import { useTurnstileConfig } from "@/lib/queries/turnstile";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
        }
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
  }
}

let scriptLoad: Promise<void> | null = null;

function loadTurnstileScript(src: string): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  if (scriptLoad) return scriptLoad;

  scriptLoad = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Cloudflare Turnstile"));
    document.head.appendChild(script);
  });
  return scriptLoad;
}

export interface TurnstileWidgetHandle {
  /** Call after a failed submit (e.g. `captcha_failed`) so the visitor can retry. */
  reset: () => void;
}

interface TurnstileWidgetProps {
  onVerify: (token: string) => void;
}

/**
 * TurnstileWidget
 * Renders the Cloudflare Turnstile challenge every /api/v1/... submission
 * endpoint expects as `cf-turnstile-response`. Fetches config itself so it
 * can render nothing when Turnstile is disabled (local dev).
 */
const TurnstileWidget = forwardRef<TurnstileWidgetHandle, TurnstileWidgetProps>(
  function TurnstileWidget({ onVerify }, ref) {
    const containerRef = useRef<HTMLDivElement>(null);
    const widgetId = useRef<string | null>(null);
    const onVerifyRef = useRef(onVerify);
    onVerifyRef.current = onVerify;

    const { data: fetchedConfig, isError } = useTurnstileConfig();
    // Backend unreachable — treat as disabled rather than block the form. Memoized
    // so this fallback keeps a stable reference across renders (it would otherwise
    // be a new object every render, re-triggering the effect below needlessly).
    const disabledConfig = useMemo(() => ({ enabled: false, sitekey: "", script_url: "" }), []);
    const config = fetchedConfig ?? (isError ? disabledConfig : null);

    useEffect(() => {
      if (!config?.enabled || !containerRef.current) return;
      let cancelled = false;

      loadTurnstileScript(config.script_url).then(() => {
        if (cancelled || !containerRef.current || !window.turnstile) return;
        widgetId.current = window.turnstile.render(containerRef.current, {
          sitekey: config.sitekey,
          callback: (token) => onVerifyRef.current(token),
          "expired-callback": () => onVerifyRef.current(""),
          "error-callback": () => onVerifyRef.current(""),
        });
      });

      return () => {
        cancelled = true;
        if (widgetId.current && window.turnstile) window.turnstile.remove(widgetId.current);
      };
    }, [config]);

    useImperativeHandle(ref, () => ({
      reset: () => {
        if (widgetId.current && window.turnstile) window.turnstile.reset(widgetId.current);
      },
    }));

    if (!config?.enabled) return null;
    return <div ref={containerRef} className="flex justify-center" />;
  }
);

export default TurnstileWidget;
