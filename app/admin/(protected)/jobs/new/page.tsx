"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import JobForm from "@/components/admin/job-form";
import { withFreshToken, SessionExpiredError } from "@/lib/admin/session";
import { staffCreateJob, type JobOpeningInput } from "@/lib/api/jobs";

export default function NewJobPage() {
  const router = useRouter();

  async function handleSubmit(data: JobOpeningInput) {
    try {
      const job = await withFreshToken((token) => staffCreateJob(token, data));
      router.push(`/admin/jobs/${job.slug}/edit`);
    } catch (err) {
      if (err instanceof SessionExpiredError) {
        router.replace("/admin/login");
        return;
      }
      throw err;
    }
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
