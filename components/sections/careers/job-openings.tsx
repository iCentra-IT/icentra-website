"use client";

import JobCard from "@/components/ui/cards/job-card";
import { StaggerGroup, StaggerItem } from "@/components/ui/motion/reveal";
import { useJobs } from "@/lib/queries/jobs";
import { EMPLOYMENT_TYPE_LABELS } from "@/lib/api/jobs";

export default function JobOpenings() {
  const { data: jobs, isLoading } = useJobs();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-10">
        <div className="w-6 h-6 border-2 border-[#DCE0E8] border-t-[#0066FF] rounded-full animate-spin" />
      </div>
    );
  }

  if (!jobs || jobs.length === 0) {
    return (
      <p className="text-[#6B7280] text-sm py-10 text-center">
        No open roles right now. Check back soon.
      </p>
    );
  }

  return (
    <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {jobs.map((job) => (
        <StaggerItem key={job.slug}>
          <JobCard
            slug={job.slug}
            title={job.title}
            dept={job.department || "iCentra"}
            location={job.is_remote ? [job.location, "Remote"].filter(Boolean).join(" · ") : job.location}
            type={EMPLOYMENT_TYPE_LABELS[job.employment_type]}
          />
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}
