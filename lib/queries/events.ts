"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import {
  listEvents,
  getEvent,
  registerForEvent,
  cancelEventRegistration,
  type EventListItem,
  type EventDetail,
  type EventListParams,
  type EventRegistrationInput,
  type EventRegisterResponse,
} from "@/lib/api/events";

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

/** POST /api/v1/events/{slug}/register/ */
export function useRegisterForEvent() {
  return useMutation<EventRegisterResponse, Error, { slug: string; data: EventRegistrationInput }>({
    mutationFn: ({ slug, data }) => registerForEvent(slug, data),
  });
}

/** POST /api/v1/events/{slug}/cancel/ */
export function useCancelEventRegistration() {
  return useMutation<{ message: string }, Error, { slug: string; email: string }>({
    mutationFn: ({ slug, email }) => cancelEventRegistration(slug, email),
  });
}
