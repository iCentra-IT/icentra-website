"use client";

import { useQuery } from "@tanstack/react-query";
import { getTurnstileConfig, type TurnstileConfig } from "@/lib/api/turnstile";

export function useTurnstileConfig() {
  return useQuery<TurnstileConfig>({
    queryKey: ["turnstile-config"],
    queryFn: getTurnstileConfig,
    staleTime: Infinity,
    retry: false,
  });
}
