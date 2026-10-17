"use client";

import { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import JobForm from "@/components/admin/job-form";
import { useConfirm } from "@/components/admin/confirm-dialog";
import { useStaffMutation, useStaffQuery } from "@/lib/admin/queries";
import { staffGetJob, staffUpdateJob, staffDeleteJob, type JobOpeningInput, type StaffJobOpening } from "@/lib/api/jobs";

export default function EditJobPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();
  const queryClient = useQueryClient();
  const confirm = useConfirm();

  const jobQuery = useStaffQuery<StaffJobOpening>(["job", slug], (token) => staffGetJob(token, slug));
  const updateMutation = useStaffMutation<JobOpeningInput, StaffJobOpening>((token, data) => staffUpdateJob(token, slug, data));
  const deleteMutation = useStaffMutation<void, void>((token) => staffDeleteJob(token, slug));

  async function handleSubmit(data: JobOpeningInput) {
    const updated = await updateMutation.mutateAsync(data);
    queryClient.setQueryData(["job", slug], updated);
    queryClient.invalidateQueries({ queryKey: ["jobs"] });
    toast.success("Job opening saved.");
    if (updated.slug !== slug) router.replace(`/admin/jobs/${updated.slug}/edit`);
  }

  async function handleDelete() {
    const job = jobQuery.data;
    if (!job) return;
    const ok = await confirm({ title: `Delete "${job.title}"?`, description: "This can't be undone.", confirmLabel: "Delete", tone: "danger" });
    if (!ok) return;
    try {
      await deleteMutation.mutateAsync();
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      toast.success("Job opening deleted.");
      router.push("/admin/jobs");
    } catch {
      toast.error("Couldn't delete this job. Please try again.");
    }
  }

  const job = jobQuery.data;

  return (
    <div className="max-w-3xl mx-auto">
      <Link href="/admin/jobs" className="inline-flex items-center gap-1.5 text-[#6B7280] text-sm hover:text-[#1A274F] transition-colors mb-4">
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        All job openings
      </Link>

      {jobQuery.isError && <p className="text-[#6B7280] text-sm">This job opening couldn&apos;t be found.</p>}

      {jobQuery.isLoading && (
        <div className="flex items-center justify-center py-20">
          <div className="w-6 h-6 border-2 border-[#DCE0E8] border-t-[#0066FF] rounded-full animate-spin" />
        </div>
      )}

      {job && (
        <>
          <div className="flex items-center justify-between gap-4 mb-6">
            <h1 className="text-[#1A274F] text-xl lg:text-2xl font-bold">Edit Job Opening</h1>
            {job.is_public && job.status === "open" && (
              <Link
                href={`/careers/${job.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0066FF] text-sm font-semibold hover:text-[#25429A] transition-colors shrink-0"
              >
                View on site →
              </Link>
            )}
          </div>
          <JobForm
            initial={job}
            submitLabel="Save Changes"
            onSubmit={handleSubmit}
            extraActions={
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleteMutation.isPending}
                className="px-5 py-2.5 rounded-full border border-red-200 text-red-600 text-sm font-semibold hover:bg-red-50 transition-colors disabled:opacity-50 cursor-pointer"
              >
                {deleteMutation.isPending ? "Deleting…" : "Delete Job"}
              </button>
            }
          />
        </>
      )}
    </div>
  );
}
