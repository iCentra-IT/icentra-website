"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import PageHero from "@/components/ui/page-hero";
import { JobApplicationModal } from "@/components/forms/all-forms";
import JobCard from "@/components/ui/cards/job-card";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/motion/reveal";
import SectionHeading from "@/components/ui/section-heading";
import TextBlock from "@/components/ui/text-block";
import { EMPLOYMENT_TYPE_LABELS } from "@/lib/api/jobs";
import { useJob, useJobs } from "@/lib/queries/jobs";

/**
 * JobDetail
 * Fetches the job (and "other roles") client-side, from the visitor's own
 * browser, instead of server-side from Next's render environment. Some
 * backend-side network policies reject server-to-server traffic (e.g. from
 * a hosting platform's IP range) while allowing ordinary browser requests —
 * fetching here sidesteps that entirely, same as the opportunities list
 * page already does.
 */
export default function JobDetail({ slug }: { slug: string }) {
  const { data: job, isLoading, isError, refetch } = useJob(slug);
  const { data: allJobs } = useJobs();

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#DCE0E8] border-t-[#0066FF] rounded-full animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-4 py-20 gap-4">
        <h1 className="text-[#1A274F] text-2xl lg:text-3xl font-bold">Couldn&apos;t load this role</h1>
        <p className="text-[#6B7280] text-sm max-w-md">
          Something went wrong fetching this job. Please try again in a moment.
        </p>
        <div className="flex items-center gap-3 mt-2">
          <button
            onClick={() => refetch()}
            className="px-6 py-3 rounded-full bg-[#0066FF] text-white text-sm font-semibold hover:bg-[#25429A] transition-colors cursor-pointer"
          >
            Try again
          </button>
          <Link
            href="/career"
            className="px-6 py-3 rounded-full border border-[#DCE0E8] text-[#374151] text-sm font-semibold hover:border-[#0066FF] hover:text-[#0066FF] transition-colors"
          >
            Back to all openings
          </Link>
        </div>
      </div>
    );
  }

  if (!job) notFound();

  const otherRoles = (allJobs ?? []).filter((j) => j.slug !== slug).slice(0, 3);

  return (
    <>
      <PageHero headline={job.title}>
        <div className="flex flex-wrap items-center gap-3 text-white/70 text-sm">
          <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-light-blue font-medium">
            {EMPLOYMENT_TYPE_LABELS[job.employment_type]}
          </span>
          {job.department && <span>{job.department}</span>}
          {job.location && (
            <>
              <span className="w-1.25 h-1.25 rounded-full bg-white/40 inline-block" />
              <span>{job.is_remote ? `${job.location} · Remote` : job.location}</span>
            </>
          )}
        </div>
      </PageHero>

      <section className="bg-white py-14 lg:py-20">
        <div className="max-w-215 mx-auto px-6 flex flex-col gap-10">
          {job.about_icentra && (
            <Reveal>
              <TextBlock text={job.about_icentra} />
            </Reveal>
          )}

          <Reveal delay={0.05}>
            <h2 className="text-[#1A274F] text-xl lg:text-[24px] font-bold mb-4">The Role</h2>
            <TextBlock text={job.description} />
          </Reveal>

          {job.role_description && (
            <Reveal delay={0.08}>
              <h2 className="text-[#1A274F] text-xl lg:text-[24px] font-bold mb-4">What You Will Do</h2>
              <TextBlock text={job.role_description} />
            </Reveal>
          )}

          {job.requirements && (
            <Reveal delay={0.1}>
              <h2 className="text-[#1A274F] text-xl lg:text-[24px] font-bold mb-4">What You Will Bring</h2>
              <TextBlock text={job.requirements} />
            </Reveal>
          )}

          {job.benefits && (
            <Reveal delay={0.15}>
              <h2 className="text-[#1A274F] text-xl lg:text-[24px] font-bold mb-4">Why Join Us</h2>
              <TextBlock text={job.benefits} />
            </Reveal>
          )}

          <Reveal delay={0.2}>
            <div className="bg-[#EAF3FB] rounded-2xl p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              <div>
                <h3 className="text-[#1A274F] text-lg font-bold mb-1">
                  {job.is_accepting_applications ? "How to Apply" : "Applications are closed"}
                </h3>
                <p className="text-[#6B7280] text-sm">
                  {job.is_accepting_applications
                    ? `Submit your details and resume for the ${job.title} role.`
                    : "This role is no longer accepting applications. Check back for other open roles below."}
                </p>
                {job.is_accepting_applications && job.application_deadline && (
                  <p className="text-[#6B7280] text-sm mt-1">
                    Applications close{" "}
                    <span className="font-semibold text-[#1A274F]">
                      {new Date(job.application_deadline).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    . Only shortlisted candidates will be contacted.
                  </p>
                )}
              </div>
              {job.is_accepting_applications && (
                <JobApplicationModal
                  jobSlug={job.slug}
                  jobTitle={job.title}
                  triggerLabel="Apply for this role"
                  triggerClassName="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-[#0066FF] text-white text-sm font-semibold hover:bg-[#25429A] transition-colors shrink-0 cursor-pointer"
                />
              )}
            </div>
          </Reveal>

          <Link
            href="/career"
            className="inline-flex items-center gap-2 text-[#0066FF] text-sm font-semibold hover:gap-3 transition-all w-fit"
          >
            ← Back to all openings
          </Link>
        </div>
      </section>

      {otherRoles.length > 0 && (
        <section className="bg-[#F7F9FC] py-14 lg:py-20">
          <div className="max-w-270 mx-auto px-6">
            <SectionHeading title="Other Open Roles" className="mb-8" />
            <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {otherRoles.map((role) => (
                <StaggerItem key={role.slug}>
                  <JobCard
                    slug={role.slug}
                    title={role.title}
                    dept={role.department || "iCentra"}
                    location={role.is_remote ? [role.location, "Remote"].filter(Boolean).join(" · ") : role.location}
                    type={EMPLOYMENT_TYPE_LABELS[role.employment_type]}
                  />
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </section>
      )}
    </>
  );
}
