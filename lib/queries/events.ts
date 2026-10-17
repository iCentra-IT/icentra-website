"use client";

import { useQuery } from "@tanstack/react-query";
import { listEvents, getEvent, type EventListItem, type EventDetail, type EventListParams } from "@/lib/api/events";

export function useEvents(params?: EventListParams) {
  return useQuery<EventListItem[]>({
    queryKey: ["events", params ?? null],
    queryFn: () => listEvents(params),
  });
}

export function useEvent(slug: string) {
  return useQuery<EventDetail | null>({
    queryKey: ["event", slug],
    queryFn: () => getEvent(slug),
    enabled: Boolean(slug),
  });
}
