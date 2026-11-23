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
  /** "About iCentra" — shown before the role. */
  about_icentra: string;
  /** "The role". */
  description: string;
  /** "What you will do" — shown after the role. */
  role_description: string;
  /** "What you will bring". */
  requirements: string;
  /** "Why join us". */
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
  about_icentra?: string;
  description: string;
  role_description?: string;
  requirements?: string;
  benefits?: string;
  status?: JobStatus;
  application_deadline?: string | null;
  is_public?: boolean;
  /** Name/slug of the email template sent on a successful application. */
  application_success_email_template?: string;
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

/* ─────────────────────────────────────────
   STAFF — /api/v1/staff/jobs/{slug}/applications/
───────────────────────────────────────── */

export type JobApplicationStatus =
  | "new"
  | "reviewing"
  | "shortlisted"
  | "interview"
  | "offer"
  | "rejected"
  | "hired"
  | "withdrawn";

export const JOB_APPLICATION_STATUS_LABELS: Record<JobApplicationStatus, string> = {
  new: "New",
  reviewing: "Reviewing",
  shortlisted: "Shortlisted",
  interview: "Interview",
  offer: "Offer",
  rejected: "Rejected",
  hired: "Hired",
  withdrawn: "Withdrawn",
};

export type ReferralSource = "website" | "linkedin" | "referral" | "job_board" | "agency" | "other";

export const REFERRAL_SOURCE_LABELS: Record<ReferralSource, string> = {
  website: "Website",
  linkedin: "LinkedIn",
  referral: "Employee referral",
  job_board: "Job board",
  agency: "Recruitment agency",
  other: "Other",
};

export interface JobApplication {
  id: number;
  job: number;
  full_name: string;
  email: string;
  phone: string;
  linkedin_url: string;
  location: string;
  resume: string | null;
  cover_letter: string | null;
  /** Optional portfolio or additional document. */
  supporting_document: string | null;
  cover_letter_text: string;
  referral_source: ReferralSource;
  availability_date: string | null;
  expected_salary: string;
  notice_period: string;
  status: JobApplicationStatus;
  created_at: string;
}

interface JobApplicationPage {
  count: number;
  next: string | null;
  previous: string | null;
  results: JobApplication[];
}

/** GET /api/v1/staff/jobs/{slug}/applications/ — every applicant, newest first. */
export async function staffListJobApplications(
  accessToken: string,
  slug: string,
  params?: { status?: JobApplicationStatus }
): Promise<JobApplication[]> {
  const search = new URLSearchParams({ page_size: "100" });
  if (params?.status) search.set("status", params.status);

  const items: JobApplication[] = [];
  let path: string | null = `/api/v1/staff/jobs/${encodeURIComponent(slug)}/applications/?${search.toString()}`;
  while (path) {
    const page: JobApplicationPage = await apiGet<JobApplicationPage>(path, {
      headers: authHeaders(accessToken),
      cache: "no-store",
    });
    items.push(...page.results);
    path = page.next ? page.next.replace(/^https?:\/\/[^/]+/, "") : null;
  }
  return items;
}

export interface JobApplicationWithJob extends JobApplication {
  jobTitle: string;
  jobSlug: string;
}

/**
 * Every application across every job opening, newest first. There's no
 * single backend endpoint for this — applications are scoped per job — so
 * this fetches the job list, then each job's applications, and flattens them.
 */
export async function staffListAllJobApplications(accessToken: string): Promise<JobApplicationWithJob[]> {
  const jobs = await staffListJobs(accessToken);
  const perJob = await Promise.all(
    jobs.map(async (job) => {
      const apps = await staffListJobApplications(accessToken, job.slug);
      return apps.map((app) => ({ ...app, jobTitle: job.title, jobSlug: job.slug }));
    })
  );
  return perJob.flat().sort((a, b) => b.created_at.localeCompare(a.created_at));
}

/** Just the total applicant count for one job — cheap, for a list-page badge. */
export async function staffCountJobApplications(accessToken: string, slug: string): Promise<number> {
  const page = await apiGet<JobApplicationPage>(`/api/v1/staff/jobs/${encodeURIComponent(slug)}/applications/?page_size=1`, {
    headers: authHeaders(accessToken),
    cache: "no-store",
  });
  return page.count;
}
