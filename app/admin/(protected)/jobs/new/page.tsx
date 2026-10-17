"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import JobForm from "@/components/admin/job-form";
import { useStaffMutation } from "@/lib/admin/queries";
import { staffCreateJob, type JobOpeningInput, type StaffJobOpening } from "@/lib/api/jobs";

export default function NewJobPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const createMutation = useStaffMutation<JobOpeningInput, StaffJobOpening>((token, data) => staffCreateJob(token, data));

  async function handleSubmit(data: JobOpeningInput) {
    const job = await createMutation.mutateAsync(data);
    queryClient.invalidateQueries({ queryKey: ["jobs"] });
    toast.success("Job opening created.");
    router.push(`/admin/jobs/${job.slug}/edit`);
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Link href="/admin/jobs" className="inline-flex items-center gap-1.5 text-[#6B7280] text-sm hover:text-[#1A274F] transition-colors mb-4">
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        All job openings
      </Link>
      <h1 className="text-[#1A274F] text-xl lg:text-2xl font-bold mb-6">New Job Opening</h1>
      <JobForm submitLabel="Create Job" onSubmit={handleSubmit} />
    </div>
  );
}
