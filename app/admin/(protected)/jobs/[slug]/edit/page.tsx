"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import JobForm from "@/components/admin/job-form";
import { withFreshToken, SessionExpiredError } from "@/lib/admin/session";
import { staffGetJob, staffUpdateJob, staffDeleteJob, type JobOpeningInput, type StaffJobOpening } from "@/lib/api/jobs";

export default function EditJobPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();
  const [job, setJob] = useState<StaffJobOpening | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    withFreshToken((token) => staffGetJob(token, slug))
      .then((data) => {
        if (!cancelled) setJob(data);
      })
      .catch((err) => {
        if (cancelled) return;
        if (err instanceof SessionExpiredError) {
          router.replace("/admin/login");
          return;
        }
        setNotFound(true);
      });
    return () => {
      cancelled = true;
    };
  }, [router, slug]);

  async function handleSubmit(data: JobOpeningInput) {
    try {
      const updated = await withFreshToken((token) => staffUpdateJob(token, slug, data));
      setJob(updated);
      if (updated.slug !== slug) router.replace(`/admin/jobs/${updated.slug}/edit`);
    } catch (err) {
      if (err instanceof SessionExpiredError) {
        router.replace("/admin/login");
        return;
      }
      throw err;
    }
  }

  async function handleDelete() {
    if (!job || !window.confirm(`Delete "${job.title}"? This can't be undone.`)) return;
    setDeleting(true);
    try {
      await withFreshToken((token) => staffDeleteJob(token, slug));
      router.push("/admin/jobs");
    } catch (err) {
      if (err instanceof SessionExpiredError) {
        router.replace("/admin/login");
        return;
      }
      window.alert("Couldn't delete this job. Please try again.");
      setDeleting(false);
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

      {notFound && <p className="text-[#6B7280] text-sm">This job opening couldn&apos;t be found.</p>}

      {!notFound && !job && (
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
                disabled={deleting}
                className="px-5 py-2.5 rounded-full border border-red-200 text-red-600 text-sm font-semibold hover:bg-red-50 transition-colors disabled:opacity-50 cursor-pointer"
              >
                {deleting ? "Deleting…" : "Delete Job"}
              </button>
            }
          />
        </>
      )}
    </div>
  );
}
