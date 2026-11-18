"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import { listJobs, getJob, applyToJob, type JobOpening, type ApplicationAcceptedResponse } from "@/lib/api/jobs";

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

/** POST /api/v1/jobs/{slug}/apply/ — multipart, resume required. */
export function useApplyToJob() {
  return useMutation<ApplicationAcceptedResponse, Error, { slug: string; formData: FormData }>({
    mutationFn: ({ slug, formData }) => applyToJob(slug, formData),
  });
}
