import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/page-hero";
import JobOpenings from "@/components/sections/careers/job-openings";
import DottedCtaBanner from "@/components/ui/dotted-cta-banner";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Career Opportunities",
  description:
    "Explore current openings at iCentra. Bring your experience to a team transforming people and organizations across Africa, Europe, and North America.",
  path: "/careers/opportunities",
  image: "/images/career/hero.jpg",
});

export default function CareerOpportunitiesPage() {
  return (
    <main className="w-full overflow-x-hidden">
      {/* ══════════════════════════════════════
          1. HERO — PageHero (reused)
      ══════════════════════════════════════ */}
      <PageHero
        headline={"Bring Your Experience\nto iCentra"}
        subtext="We are always on the lookout for people who are curious, committed, and ready to lead change. Explore our current openings and find the role that matches your experience."
      >
        <Link
          href="/careers"
          className="inline-flex items-center gap-2 text-white/70 text-sm font-medium hover:text-white transition-colors w-fit"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Careers
        </Link>
      </PageHero>

      {/* ══════════════════════════════════════
          2. CURRENT OPENINGS — real Sanity "Job-listing" posts
      ══════════════════════════════════════ */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <JobOpenings />
        </div>
      </section>

      {/* ══════════════════════════════════════
          3. DON'T SEE A FIT — closing CTA
      ══════════════════════════════════════ */}
      <DottedCtaBanner
        title="Don't See the Right Role Yet?"
        subtext="We're always open to meeting people who'd be a great fit for iCentra. Reach out and tell us where you could add value."
        ctaLabel="Get in Touch"
        ctaHref="/contact"
        bgClassName="bg-[#25429A]"
      />
    </main>
  );
}
