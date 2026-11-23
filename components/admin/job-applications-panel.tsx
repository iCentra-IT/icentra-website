"use client";

import { useState } from "react";
import { ListSkeleton, EmptyState, ErrorState } from "@/components/admin/list-states";
import { MailIcon } from "@/components/admin/icons";
import { useStaffQuery } from "@/lib/admin/queries";
import {
  staffListJobApplications,
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

/** Shown on a job's edit page — every applicant for that job, newest first. */
export default function JobApplicationsPanel({ slug }: { slug: string }) {
  const [status, setStatus] = useState<JobApplicationStatus | "">("");

  const query = useStaffQuery(
    ["job-applications", slug, status],
    (token) => staffListJobApplications(token, slug, status ? { status } : undefined)
  );

  const applications = query.data;

  return (
    <div className="bg-white rounded-2xl border border-[#DCE0E8] p-6 lg:p-8 flex flex-col gap-5">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h2 className="text-[#1A274F] text-lg font-bold">
          Applicants{applications ? ` (${applications.length})` : ""}
        </h2>
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

      {query.isLoading && <ListSkeleton rows={3} />}

      {query.isError && <ErrorState message="Couldn't load applicants. Please try again." onRetry={() => query.refetch()} />}

      {applications && applications.length === 0 && (
        <EmptyState icon={<MailIcon />} title="No applicants yet" description="Applications for this role will show up here." />
      )}

      {applications && applications.length > 0 && (
        <div className="flex flex-col gap-3">
          {applications.map((app) => (
            <div key={app.id} className="border border-[#DCE0E8] rounded-xl p-4 flex flex-col gap-3">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div className="min-w-0">
                  <p className="text-[#1A274F] text-sm font-semibold truncate">{app.full_name}</p>
                  <p className="text-[#6B7280] text-xs truncate">{app.email}{app.phone ? ` · ${app.phone}` : ""}</p>
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
