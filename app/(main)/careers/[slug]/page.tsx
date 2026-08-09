import { notFound } from "next/navigation";
import Link from "next/link";
import PageHero from "@/components/ui/page-hero";
import { JobApplicationModal } from "@/components/forms/all-forms";
import JobCard from "@/components/ui/cards/job-card";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/motion/reveal";
import { jobListings, getJobBySlug } from "@/lib/data";
import SectionHeading from "@/components/ui/section-heading";

export function generateStaticParams() {
  return jobListings.map((job) => ({ slug: job.slug }));
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = getJobBySlug(slug);

  if (!job) notFound();

  const otherRoles = jobListings.filter((j) => j.slug !== job.slug);

  return (
    <main className="w-full overflow-x-hidden">
      <PageHero headline={job.title}>
        <div className="flex flex-wrap items-center gap-3 text-white/70 text-[13px]">
          <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-light-blue font-medium">
            {job.type}
          </span>
          <span>{job.dept}</span>
          <span className="w-1.25 h-1.25 rounded-full bg-white/40 inline-block" />
          <span>{job.location}</span>
        </div>
      </PageHero>

      <section className="bg-white py-14 lg:py-20">
        <div className="max-w-[860px] mx-auto px-6 flex flex-col gap-10">
          <Reveal>
            <div>
              <h2 className="text-[#1A274F] text-[20px] lg:text-[24px] font-bold mb-4">
                About the Role
              </h2>
              <p className="text-[#374151] text-[15px] leading-[1.9]">{job.description}</p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div>
              <h2 className="text-[#1A274F] text-[20px] lg:text-[24px] font-bold mb-4">
                What You Will Do
              </h2>
              <ul className="flex flex-col gap-2.5">
                {job.responsibilities.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[#374151] text-[15px] leading-relaxed">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#0066FF] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div>
              <h2 className="text-[#1A274F] text-[20px] lg:text-[24px] font-bold mb-4">
                What We Are Looking For
              </h2>
              <ul className="flex flex-col gap-2.5">
                {job.requirements.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[#374151] text-[15px] leading-relaxed">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#0066FF] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="bg-[#EAF3FB] rounded-2xl p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              <div>
                <h3 className="text-[#1A274F] text-[18px] font-bold mb-1">Ready to apply?</h3>
                <p className="text-[#6B7280] text-[14px]">Submit your details and resume for the {job.title} role.</p>
              </div>
              <JobApplicationModal
                triggerLabel="Apply for this role"
                triggerClassName="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-[#0066FF] text-white text-[14px] font-semibold hover:bg-[#25429A] transition-colors shrink-0 cursor-pointer"
              />
            </div>
          </Reveal>

          <Link
            href="/careers"
            className="inline-flex items-center gap-2 text-[#0066FF] text-[14px] font-semibold hover:gap-3 transition-all w-fit"
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
                    dept={role.dept}
                    location={role.location}
                    type={role.type}
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
