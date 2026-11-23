"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ListSkeleton, EmptyState, ErrorState } from "@/components/admin/list-states";
import { MailIcon } from "@/components/admin/icons";
import { useStaffQuery } from "@/lib/admin/queries";
import {
  staffListAllJobApplications,
  JOB_APPLICATION_STATUS_LABELS,
  REFERRAL_SOURCE_LABELS,
  type JobApplicationStatus,
} from "@/lib/api/jobs";

const STATUS_BADGE: Record<JobApplicationStatus, string> = {
  new: "bg-[#EAF3FB] text-[#0066FF]",
  reviewing: "bg-[#FEF3C7] text-[#92400E]",
  shortlisted: "bg-[#E0E7FF] text-[#3730A3]",
  interview: "bg-[#DBEAFE] text-[#1D4ED8]",
  offer: "bg-[#DCFCE7] text-[#15803D]",
  hired: "bg-[#DCFCE7] text-[#15803D]",
  rejected: "bg-[#FEE2E2] text-[#B91C1C]",
  withdrawn: "bg-[#F7F9FC] text-[#6B7280]",
};

function formatDate(iso: string | null): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function AllApplicationsPage() {
  const [status, setStatus] = useState<JobApplicationStatus | "">("");
  const [jobSlug, setJobSlug] = useState("");

  const query = useStaffQuery(["job-applications", "all"], staffListAllJobApplications);
  const all = useMemo(() => query.data ?? [], [query.data]);

  const jobOptions = useMemo(() => {
    const seen = new Map<string, string>();
    all.forEach((app) => seen.set(app.jobSlug, app.jobTitle));
    return Array.from(seen.entries());
  }, [all]);

  const filtered = all.filter((app) => (!status || app.status === status) && (!jobSlug || app.jobSlug === jobSlug));

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-[#1A274F] text-xl lg:text-2xl font-bold">Job Applications</h1>
        <p className="text-[#6B7280] text-sm mt-1">Every applicant across every job opening, newest first.</p>
      </div>

      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <select
          value={jobSlug}
          onChange={(e) => setJobSlug(e.target.value)}
          className="px-3.5 py-2 rounded-full border border-[#DCE0E8] text-[#374151] text-sm font-medium bg-white cursor-pointer"
        >
          <option value="">All jobs</option>
          {jobOptions.map(([slug, title]) => (
            <option key={slug} value={slug}>
              {title}
            </option>
          ))}
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as JobApplicationStatus | "")}
          className="px-3.5 py-2 rounded-full border border-[#DCE0E8] text-[#374151] text-sm font-medium bg-white cursor-pointer"
        >
          <option value="">All statuses</option>
          {Object.entries(JOB_APPLICATION_STATUS_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {query.isLoading && <ListSkeleton rows={5} />}

      {query.isError && <ErrorState message="Couldn't load applications. Please try again." onRetry={() => query.refetch()} />}

      {query.data && filtered.length === 0 && (
        <EmptyState
          icon={<MailIcon />}
          title="No applications yet"
          description={query.data.length === 0 ? "Applicants across all job openings will show up here." : "No applications match these filters."}
        />
      )}

      {filtered.length > 0 && (
        <div className="flex flex-col gap-3">
          {filtered.map((app) => (
            <div key={app.id} className="bg-white border border-[#DCE0E8] rounded-xl p-4 flex flex-col gap-3">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div className="min-w-0">
                  <p className="text-[#1A274F] text-sm font-semibold truncate">{app.full_name}</p>
                  <p className="text-[#6B7280] text-xs truncate">{app.email}{app.phone ? ` · ${app.phone}` : ""}</p>
                  <Link
                    href={`/admin/jobs/${app.jobSlug}/edit`}
                    className="text-[#0066FF] text-xs font-semibold hover:underline"
                  >
                    {app.jobTitle}
                  </Link>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold shrink-0 ${STATUS_BADGE[app.status]}`}>
                  {JOB_APPLICATION_STATUS_LABELS[app.status]}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-2 text-xs">
                <div>
                  <p className="text-[#9CA3AF]">Applied</p>
                  <p className="text-[#374151] font-medium">{formatDate(app.created_at)}</p>
                </div>
                <div>
                  <p className="text-[#9CA3AF]">Referral</p>
                  <p className="text-[#374151] font-medium">{REFERRAL_SOURCE_LABELS[app.referral_source] ?? "—"}</p>
                </div>
                <div>
                  <p className="text-[#9CA3AF]">Expected Salary</p>
                  <p className="text-[#374151] font-medium">{app.expected_salary || "—"}</p>
                </div>
                <div>
                  <p className="text-[#9CA3AF]">Notice Period</p>
                  <p className="text-[#374151] font-medium">{app.notice_period || "—"}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-2 border-t border-[#F0F1F3]">
                {app.resume && (
                  <a href={app.resume} target="_blank" rel="noopener noreferrer" className="text-[#0066FF] text-xs font-semibold hover:underline">
                    Resume →
                  </a>
                )}
                {app.cover_letter && (
                  <a href={app.cover_letter} target="_blank" rel="noopener noreferrer" className="text-[#0066FF] text-xs font-semibold hover:underline">
                    Cover Letter →
                  </a>
                )}
                {app.supporting_document && (
                  <a href={app.supporting_document} target="_blank" rel="noopener noreferrer" className="text-[#0066FF] text-xs font-semibold hover:underline">
                    Supporting Document →
                  </a>
                )}
                {app.linkedin_url && (
                  <a href={app.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-[#0066FF] text-xs font-semibold hover:underline">
                    LinkedIn →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
