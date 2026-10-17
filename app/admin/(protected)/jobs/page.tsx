"use client";

import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useConfirm } from "@/components/admin/confirm-dialog";
import { ListSkeleton, EmptyState, ErrorState } from "@/components/admin/list-states";
import { BriefcaseIcon } from "@/components/admin/icons";
import { useStaffMutation, useStaffQuery } from "@/lib/admin/queries";
import { staffListJobs, staffDeleteJob, EMPLOYMENT_TYPE_LABELS, JOB_STATUS_LABELS, type StaffJobOpening } from "@/lib/api/jobs";

const STATUS_BADGE: Record<string, string> = {
  draft: "bg-[#F7F9FC] text-[#6B7280]",
  open: "bg-[#DCFCE7] text-[#15803D]",
  closed: "bg-[#FEE2E2] text-[#B91C1C]",
};

export default function AdminJobsPage() {
  const queryClient = useQueryClient();
  const confirm = useConfirm();
  const jobsQuery = useStaffQuery<StaffJobOpening[]>(["jobs"], staffListJobs);
  const deleteMutation = useStaffMutation<string, void>((token, slug) => staffDeleteJob(token, slug));

  async function handleDelete(slug: string, title: string) {
    const ok = await confirm({ title: `Delete "${title}"?`, description: "This can't be undone.", confirmLabel: "Delete", tone: "danger" });
    if (!ok) return;
    try {
      await deleteMutation.mutateAsync(slug);
      queryClient.setQueryData<StaffJobOpening[]>(["jobs"], (prev) => prev?.filter((j) => j.slug !== slug));
      toast.success("Job opening deleted.");
    } catch {
      toast.error("Couldn't delete this job. Please try again.");
    }
  }

  const jobs = jobsQuery.data;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-[#1A274F] text-xl lg:text-2xl font-bold">Job Openings</h1>
          <p className="text-[#6B7280] text-sm mt-1">What shows on the public careers page is anything Open and Public.</p>
        </div>
        <Link
          href="/admin/jobs/new"
          className="inline-flex items-center px-5 py-2.5 rounded-full bg-[#0066FF] text-white text-sm font-semibold hover:bg-[#25429A] transition-colors shrink-0"
        >
          + New Job
        </Link>
      </div>

      {jobsQuery.isLoading && <ListSkeleton />}

      {jobsQuery.isError && <ErrorState message="Couldn't load job openings. Please try again." onRetry={() => jobsQuery.refetch()} />}

      {jobs && jobs.length === 0 && (
        <EmptyState
          icon={<BriefcaseIcon />}
          title="No job openings yet"
          description="Create the first one to start accepting applications."
          action={
            <Link href="/admin/jobs/new" className="text-[#0066FF] text-sm font-semibold hover:text-[#25429A] transition-colors mt-1">
              + New Job
            </Link>
          }
        />
      )}

      {jobs && jobs.length > 0 && (
        <div className="bg-white rounded-2xl border border-[#DCE0E8] overflow-hidden">
          <div className="hidden sm:grid grid-cols-[1fr_140px_100px_100px_120px] gap-4 px-6 py-3 bg-[#F7F9FC] border-b border-[#DCE0E8]">
            <span className="text-[#6B7280] text-xs font-bold uppercase tracking-wide">Title</span>
            <span className="text-[#6B7280] text-xs font-bold uppercase tracking-wide">Type</span>
            <span className="text-[#6B7280] text-xs font-bold uppercase tracking-wide">Status</span>
            <span className="text-[#6B7280] text-xs font-bold uppercase tracking-wide">Public</span>
            <span className="text-[#6B7280] text-xs font-bold uppercase tracking-wide text-right">Actions</span>
          </div>
          {jobs.map((job, i) => (
            <div
              key={job.id}
              className={`grid grid-cols-1 sm:grid-cols-[1fr_140px_100px_100px_120px] gap-2 sm:gap-4 items-center px-6 py-4 ${
                i !== 0 ? "border-t border-[#DCE0E8]" : ""
              }`}
            >
              <div className="min-w-0">
                <p className="text-[#1A274F] text-sm font-semibold truncate">{job.title}</p>
                <p className="text-[#9CA3AF] text-xs truncate">{job.department || "—"}</p>
              </div>
              <span className="text-[#6B7280] text-sm">{EMPLOYMENT_TYPE_LABELS[job.employment_type]}</span>
              <span className={`w-fit px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_BADGE[job.status]}`}>
                {JOB_STATUS_LABELS[job.status]}
              </span>
              <span className="text-[#6B7280] text-sm">{job.is_public ? "Yes" : "No"}</span>
              <div className="flex items-center gap-3 sm:justify-end">
                <Link href={`/admin/jobs/${job.slug}/edit`} className="text-[#0066FF] text-sm font-semibold hover:text-[#25429A] transition-colors">
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(job.slug, job.title)}
                  disabled={deleteMutation.isPending}
                  className="text-red-600 text-sm font-semibold hover:text-red-800 transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {deleteMutation.isPending && deleteMutation.variables === job.slug ? "Deleting…" : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
