import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/page-hero";
import SectionHeading from "@/components/ui/section-heading";
import ComparisonTable from "@/components/sections/partnerships/comparison-table";
import SolutionCard from "@/components/ui/cards/solution-card";
import DottedCtaBanner from "@/components/ui/dotted-cta-banner";
import CheckList from "@/components/sections/partnerships/check-list";
import StepList from "@/components/sections/partnerships/step-list";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/motion/reveal";
import { pageMetadata } from "@/lib/seo";
import { partnershipsHub, partnerships, DISCOVERY_EMAIL } from "@/lib/data/partnerships";

export const metadata: Metadata = pageMetadata({
  title: "Partnerships",
  description:
    "iCentra's retainer-based Enterprise Partnerships: AI Transformation, PMOCentra, ComplyCentra, and Workforce Capability. One partner, accountable across every dimension of transformation.",
  path: "/what-we-do/partnerships",
});

export default function PartnershipsPage() {
  return (
    <main className="w-full overflow-x-hidden">

      {/* ══════════════════════════════════════
          1. HERO — eyebrow strip + PageHero (reused)
      ══════════════════════════════════════ */}
      <div className="bg-[#0B1638] text-center py-2.5">
        <span className="text-white/70 text-xs font-semibold tracking-widest uppercase">
          {partnershipsHub.eyebrow}
        </span>
      </div>
      <PageHero headline={partnershipsHub.heroHeadline} subtext={partnershipsHub.heroSubtext}>
        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center px-7 py-3.5 rounded-full bg-[#0066FF] text-white text-sm font-semibold hover:bg-light-blue hover:text-[#1A274F] transition-colors"
          >
            Book a Discovery Call
          </Link>
          <a
            href={`mailto:${DISCOVERY_EMAIL}`}
            className="text-white/70 text-sm font-medium hover:text-white transition-colors"
          >
            {DISCOVERY_EMAIL}
          </a>
        </div>
      </PageHero>

      {/* ══════════════════════════════════════
          2. WHY PARTNERSHIP, NOT PROJECT
      ══════════════════════════════════════ */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading title="Why Partnership, Not Project" className="mb-8" />
          <Reveal className="max-w-215 flex flex-col gap-4 mb-12">
            {partnershipsHub.whyIntro.map((paragraph, i) => (
              <p key={i} className="text-[#374151] text-base leading-[1.85]">
                {paragraph}
              </p>
            ))}
          </Reveal>
          <ComparisonTable rows={partnershipsHub.comparisonRows} />
        </div>
      </section>

      {/* ══════════════════════════════════════
          3. FOUR PARTNERSHIPS. CHOOSE YOURS.
      ══════════════════════════════════════ */}
      <section className="bg-[#F7F9FC] py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading title="Four Partnerships. Choose Yours." className="mb-4" />
          <p className="text-[#374151] text-sm lg:text-base leading-[1.8] max-w-205 mb-10">
            {partnershipsHub.partnershipsIntro}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {partnerships.map((partnership) => (
              <div
                key={partnership.slug}
                className="[&>a]:max-w-none [&>a]:w-full [&>a]:aspect-auto [&>a]:h-85"
              >
                <SolutionCard
                  image={partnership.image}
                  title={partnership.name}
                  description={partnership.description}
                  href={`/what-we-do/partnerships/${partnership.slug}`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          4. THE INTEGRATED SYSTEM
      ══════════════════════════════════════ */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading title="The Integrated System" className="mb-4" />
          <p className="text-[#374151] text-sm lg:text-base leading-[1.8] max-w-205 mb-10">
            {partnershipsHub.integratedIntro}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-[#DCE0E8]">
            <StaggerGroup className="bg-[#F7F9FC] p-8 flex flex-col gap-5">
              {partnerships.map((partnership) => (
                <StaggerItem key={partnership.slug}>
                  <p className="text-[#0066FF] text-base font-bold">{partnership.name}</p>
                  <p className="text-[#6B7280] text-sm leading-relaxed">{partnership.integratedLine}</p>
                </StaggerItem>
              ))}
            </StaggerGroup>

            <Reveal className="bg-[#1A274F] p-8 flex flex-col gap-5">
              <p className="text-white text-base font-semibold">
                Running all four partnerships means your organization has:
              </p>
              <ul className="flex flex-col gap-3">
                {partnershipsHub.integratedChecklist.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <svg className="w-4 h-4 text-light-blue mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-white/85 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-white/60 text-sm italic leading-relaxed border-t border-white/15 pt-4">
                {partnershipsHub.integratedNote}
              </p>
            </Reveal>
          </div>

          <Reveal className="mt-6 rounded-2xl border border-[#0066FF]/30 bg-[#EAF3FB] px-6 py-5">
            <p className="text-[#1A274F] text-sm leading-relaxed">
              <span className="font-bold">Multi-Partnership Discount: </span>
              {partnershipsHub.multiPartnershipDiscount}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════
          5. HOW PARTNERSHIP ENGAGEMENTS WORK
      ══════════════════════════════════════ */}
      <section className="bg-[#F7F9FC] py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading title="How Partnership Engagements Work" className="mb-4" />
          <p className="text-[#374151] text-sm lg:text-base leading-[1.8] max-w-205 mb-10">
            {partnershipsHub.howItWorksIntro}
          </p>

          <StepList steps={partnershipsHub.engagementSteps} layout="row" italic />
        </div>
      </section>

      {/* ══════════════════════════════════════
          6. IS A PARTNERSHIP RIGHT FOR YOUR ORGANIZATION?
      ══════════════════════════════════════ */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading title="Is a Partnership Right for Your Organization?" className="mb-10" />

          <div className="mb-10">
            <p className="text-[#1A274F] text-sm font-bold mb-5">iCentra partnerships work best for organizations that:</p>
            <CheckList items={partnershipsHub.goodFit} />
          </div>

          <div>
            <p className="text-[#1A274F] text-sm font-bold mb-5">These partnerships are not the right fit for:</p>
            <CheckList items={partnershipsHub.notFit} variant="cross" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          7. NOT SURE WHERE TO START — closing CTA
      ══════════════════════════════════════ */}
      <DottedCtaBanner
        title={partnershipsHub.discoveryTitle}
        subtext={partnershipsHub.discoverySubtext}
        ctaLabel="Book a Discovery Call"
        ctaHref="/contact"
        bgClassName="bg-[#25429A]"
        extraLinks={[{ label: "Email Us Directly", href: `mailto:${DISCOVERY_EMAIL}` }]}
      />

    </main>
  );
}
