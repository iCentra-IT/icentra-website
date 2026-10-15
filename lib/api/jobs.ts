import { apiGet, apiPostForm, apiRequest, ApiError } from "./client";

export type EmploymentType = "full_time" | "part_time" | "contract" | "internship" | "temporary";

export const EMPLOYMENT_TYPE_LABELS: Record<EmploymentType, string> = {
  full_time: "Full-time",
  part_time: "Part-time",
  contract: "Contract",
  internship: "Internship",
  temporary: "Temporary",
};

export interface JobOpening {
  id: number;
  title: string;
  slug: string;
  department: string;
  location: string;
  is_remote: boolean;
  employment_type: EmploymentType;
  description: string;
  requirements: string;
  benefits: string;
  application_deadline: string | null;
  is_accepting_applications: boolean;
}

export interface JobPage {
  count: number;
  next: string | null;
  previous: string | null;
  results: JobOpening[];
}

export interface ApplicationAcceptedResponse {
  message: string;
  application_id: number;
}

/** GET /api/v1/jobs/ — public, open job openings only. */
export async function listJobs(params?: { department?: string }): Promise<JobOpening[]> {
  const search = new URLSearchParams({ page_size: "100" });
  if (params?.department) search.set("department", params.department);

  const jobs: JobOpening[] = [];
  let path: string | null = `/api/v1/jobs/?${search.toString()}`;
  // Follow pagination defensively — in practice one page covers the whole list.
  while (path) {
    const page: JobPage = await apiGet<JobPage>(path, { cache: "no-store" });
    jobs.push(...page.results);
    path = page.next ? page.next.replace(/^https?:\/\/[^/]+/, "") : null;
  }
  return jobs;
}

/** GET /api/v1/jobs/{slug}/ — returns null instead of throwing on 404. */
export async function getJob(slug: string): Promise<JobOpening | null> {
  try {
    return await apiGet<JobOpening>(`/api/v1/jobs/${encodeURIComponent(slug)}/`, { cache: "no-store" });
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) return null;
    throw err;
  }
}

/** POST /api/v1/jobs/{slug}/apply/ — multipart (resume is a required file). */
export function applyToJob(slug: string, formData: FormData): Promise<ApplicationAcceptedResponse> {
  return apiPostForm<ApplicationAcceptedResponse>(
    `/api/v1/jobs/${encodeURIComponent(slug)}/apply/`,
    formData
  );
}

/* ─────────────────────────────────────────
   STAFF — /api/v1/staff/jobs/... (JWT bearer required)
   Sees every status (draft/open/closed), not just open+public like the
   /api/v1/jobs/ list the public site reads.
───────────────────────────────────────── */

export type JobStatus = "draft" | "open" | "closed";

export const JOB_STATUS_LABELS: Record<JobStatus, string> = {
  draft: "Draft",
  open: "Open",
  closed: "Closed",
};

export interface StaffJobOpening extends JobOpening {
  status: JobStatus;
  is_public: boolean;
  application_success_email_template: string;
}

export interface JobOpeningInput {
  title: string;
  slug?: string;
  department?: string;
  location?: string;
  is_remote?: boolean;
  employment_type?: EmploymentType;
  description: string;
  requirements?: string;
  benefits?: string;
  status?: JobStatus;
  application_deadline?: string | null;
  is_public?: boolean;
}

interface StaffJobPage {
  count: number;
  next: string | null;
  previous: string | null;
  results: StaffJobOpening[];
}

function authHeaders(accessToken: string): HeadersInit {
  return { Authorization: `Bearer ${accessToken}` };
}

/** GET /api/v1/staff/jobs/ — every job regardless of status. */
export async function staffListJobs(accessToken: string): Promise<StaffJobOpening[]> {
  const jobs: StaffJobOpening[] = [];
  let path: string | null = "/api/v1/staff/jobs/?page_size=100";
  while (path) {
    const page: StaffJobPage = await apiGet<StaffJobPage>(path, {
      headers: authHeaders(accessToken),
      cache: "no-store",
    });
    jobs.push(...page.results);
    path = page.next ? page.next.replace(/^https?:\/\/[^/]+/, "") : null;
  }
  return jobs;
}

/** GET /api/v1/staff/jobs/{slug}/ */
export function staffGetJob(accessToken: string, slug: string): Promise<StaffJobOpening> {
  return apiGet<StaffJobOpening>(`/api/v1/staff/jobs/${encodeURIComponent(slug)}/`, {
    headers: authHeaders(accessToken),
    cache: "no-store",
  });
}

/** POST /api/v1/staff/jobs/ */
export function staffCreateJob(accessToken: string, data: JobOpeningInput): Promise<StaffJobOpening> {
  return apiRequest<StaffJobOpening>("/api/v1/staff/jobs/", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders(accessToken) },
    body: JSON.stringify(data),
  });
}

/** PATCH /api/v1/staff/jobs/{slug}/ */
export function staffUpdateJob(
  accessToken: string,
  slug: string,
  data: Partial<JobOpeningInput>
): Promise<StaffJobOpening> {
  return apiRequest<StaffJobOpening>(`/api/v1/staff/jobs/${encodeURIComponent(slug)}/`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", ...authHeaders(accessToken) },
    body: JSON.stringify(data),
  });
}

/** DELETE /api/v1/staff/jobs/{slug}/ */
export function staffDeleteJob(accessToken: string, slug: string): Promise<void> {
  return apiRequest<void>(`/api/v1/staff/jobs/${encodeURIComponent(slug)}/`, {
    method: "DELETE",
    headers: authHeaders(accessToken),
  });
}
