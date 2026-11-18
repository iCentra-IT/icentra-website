"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import {
  listVolunteerSkills,
  listVolunteerAvailability,
  submitVolunteerApplication,
  type VolunteerSkill,
  type VolunteerAvailabilitySlot,
  type VolunteerApplicationInput,
} from "@/lib/api/volunteer";

export function useVolunteerSkills() {
  return useQuery<VolunteerSkill[]>({
    queryKey: ["volunteer-skills"],
    queryFn: listVolunteerSkills,
  });
}

export function useVolunteerAvailability() {
  return useQuery<VolunteerAvailabilitySlot[]>({
    queryKey: ["volunteer-availability"],
    queryFn: listVolunteerAvailability,
  });
}

export function useSubmitVolunteerApplication() {
  return useMutation({
    mutationFn: (data: VolunteerApplicationInput) => submitVolunteerApplication(data),
  });
}
