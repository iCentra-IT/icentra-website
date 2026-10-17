"use client";

import { useQuery } from "@tanstack/react-query";
import { listJobs, getJob, type JobOpening } from "@/lib/api/jobs";

export function useJobs(params?: { department?: string }) {
  return useQuery<JobOpening[]>({
    queryKey: ["jobs", params?.department ?? null],
    queryFn: () => listJobs(params),
  });
}

export function useJob(slug: string) {
  return useQuery<JobOpening | null>({
    queryKey: ["job", slug],
    queryFn: () => getJob(slug),
    enabled: Boolean(slug),
  });
}
