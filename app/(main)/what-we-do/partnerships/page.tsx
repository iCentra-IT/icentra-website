import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/ui/section-heading";
import StatsBar from "@/components/sections/home/stat";
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

/* ─────────────────────────────────────────
   PARTNERSHIP ICONS — inline SVG, one per partnership slug
───────────────────────────────────────── */
function PartnershipIcon({ slug }: { slug: string }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.8 } as const;
  if (slug === "ai-transformation") {
    return (
      <svg className="w-5 h-5" viewBox="0 0 24 24" {...common}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 17l6-6 4 4 8-8M21 11V3h-8" />
      </svg>
    );
  }
  if (slug === "complycentra") {
    return (
      <svg className="w-5 h-5" viewBox="0 0 24 24" {...common}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
      </svg>
    );
  }
  if (slug === "pmocentra") {
    return (
      <svg className="w-5 h-5" viewBox="0 0 24 24" {...common}>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="4.5" />
        <circle cx="12" cy="12" r="0.5" fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" {...common}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l8-4-8-4-8 4 8 4zm0 0v6m-8-6v3.5c0 .9 3.6 2.5 8 2.5s8-1.6 8-2.5V10" />
    </svg>
  );
}

export default function PartnershipsPage() {
  return (
    <main className="w-full overflow-x-hidden">

      {/* ══════════════════════════════════════
          1. HERO — bespoke gradient hero (matches /what-we-do/solutions)
      ══════════════════════════════════════ */}
      <section className="relative bg-linear-to-br from-[#0B1B4D] via-[#16266E] to-[#1E3A8A] overflow-hidden">
        <div className="absolute right-0 top-0 w-125 h-125 bg-[#0066FF]/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 lg:py-20">
          <span className="inline-block text-[var(--color-light-blue)] text-xs font-bold tracking-[0.18em] uppercase border border-white/20 rounded-full px-4 py-1.5 mb-5">
            Enterprise Partnerships
          </span>
          <h1 className="text-white text-[32px] sm:text-[40px] lg:text-[48px] font-extrabold leading-[1.1] mb-5 max-w-3xl">
            {partnershipsHub.heroHeadline.split("\n").map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
          </h1>
          <div className="w-16 h-1 rounded-full bg-light-blue mb-6" />
          <p className="text-white/75 text-base leading-[1.8] mb-8 max-w-2xl">
            {partnershipsHub.heroSubtext}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-7 py-3.5 rounded-full bg-[#0066FF] text-white text-sm font-semibold hover:bg-[#25429A] transition-colors"
          >
            Book a Discovery Call
          </Link>
        </div>
      </section>

      {/* Proof strip */}
      <StatsBar />

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
                <StaggerItem key={partnership.slug} className="flex items-start gap-4">
                  <span className="shrink-0 w-10 h-10 rounded-full bg-[#EAF3FB] text-[#0066FF] flex items-center justify-center">
                    <PartnershipIcon slug={partnership.slug} />
                  </span>
                  <div>
                    <p className="text-[#0066FF] text-base font-bold">{partnership.name}</p>
                    <p className="text-[#6B7280] text-sm leading-relaxed">{partnership.integratedLine}</p>
                  </div>
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="rounded-2xl border border-[#0066FF]/30 bg-[#EAF3FB] p-7 lg:p-8">
              <p className="text-[#1A274F] text-sm font-bold mb-5">iCentra partnerships work best for organizations that:</p>
              <CheckList items={partnershipsHub.goodFit} columns={1} />
            </div>

            <div className="rounded-2xl border border-[#DCE0E8] bg-white p-7 lg:p-8">
              <p className="text-[#1A274F] text-sm font-bold mb-5">These partnerships are not the right fit for:</p>
              <CheckList items={partnershipsHub.notFit} variant="cross" columns={1} />
            </div>
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
