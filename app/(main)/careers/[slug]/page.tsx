import { notFound } from "next/navigation";
import Link from "next/link";
import PageHero from "@/components/ui/page-hero";
import { JobApplicationModal } from "@/components/forms/all-forms";
import JobCard from "@/components/ui/cards/job-card";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/motion/reveal";
import SectionHeading from "@/components/ui/section-heading";
import TextBlock from "@/components/ui/text-block";
import { listJobs, getJob, EMPLOYMENT_TYPE_LABELS } from "@/lib/api/jobs";

export async function generateStaticParams() {
  const jobs = await listJobs();
  return jobs.map((job) => ({ slug: job.slug }));
}


export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const job = await getJob(slug);
  if (!job) notFound();

  const otherRoles = (await listJobs()).filter((j) => j.slug !== slug).slice(0, 3);

  return (
    <main className="w-full overflow-x-hidden">
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
        <div className="max-w-[860px] mx-auto px-6 flex flex-col gap-10">
          <Reveal>
            <h2 className="text-[#1A274F] text-xl lg:text-[24px] font-bold mb-4">About the Role</h2>
            <TextBlock text={job.description} />
          </Reveal>

          {job.requirements && (
            <Reveal delay={0.1}>
              <h2 className="text-[#1A274F] text-xl lg:text-[24px] font-bold mb-4">What We Are Looking For</h2>
              <TextBlock text={job.requirements} />
            </Reveal>
          )}

          {job.benefits && (
            <Reveal delay={0.15}>
              <h2 className="text-[#1A274F] text-xl lg:text-[24px] font-bold mb-4">What You&apos;ll Get</h2>
              <TextBlock text={job.benefits} />
            </Reveal>
          )}

          <Reveal delay={0.2}>
            <div className="bg-[#EAF3FB] rounded-2xl p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              <div>
                <h3 className="text-[#1A274F] text-lg font-bold mb-1">
                  {job.is_accepting_applications ? "Ready to apply?" : "Applications are closed"}
                </h3>
                <p className="text-[#6B7280] text-sm">
                  {job.is_accepting_applications
                    ? `Submit your details and resume for the ${job.title} role.`
                    : "This role is no longer accepting applications. Check back for other open roles below."}
                </p>
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
            href="/careers"
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
    </main>
  );
}
