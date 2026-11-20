import type { Metadata } from "next";
import JobDetail from "@/components/sections/careers/job-detail";
import { listJobs, getJob } from "@/lib/api/jobs";
import { pageMetadata } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  // Defensive: a flaky/rate-limited API response here must not fail the whole
  // build — falling back to on-demand rendering for these slugs is fine.
  const jobs = await listJobs().catch(() => []);
  return jobs.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJob(slug).catch(() => null);
  if (!job) return {};

  return pageMetadata({
    title: `${job.title} | Careers`,
    description: job.description.slice(0, 160),
    path: `/career/opportunities/${job.slug}`,
    image: "/images/career/hero.jpg",
  });
}

export default async function JobDetailPage({ params }: PageProps) {
  const { slug } = await params;

  return (
    <main className="w-full overflow-x-hidden">
      <JobDetail slug={slug} />
    </main>
  );
}
