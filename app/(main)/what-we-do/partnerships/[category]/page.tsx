import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import PageHero from "@/components/ui/page-hero";
import SectionHeading from "@/components/ui/section-heading";
import DottedCtaBanner from "@/components/ui/dotted-cta-banner";
import BulletList from "@/components/sections/partnerships/bullet-list";
import ValueGrid from "@/components/sections/partnerships/value-grid";
import StepList from "@/components/sections/partnerships/step-list";
import CheckList from "@/components/sections/partnerships/check-list";
import PricingTable from "@/components/sections/partnerships/pricing-table";
import { Reveal } from "@/components/ui/motion/reveal";
import { pageMetadata } from "@/lib/seo";
import { partnerships, getPartnershipBySlug, DISCOVERY_EMAIL } from "@/lib/data/partnerships";

interface PageProps {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return partnerships.map((partnership) => ({ category: partnership.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const partnership = getPartnershipBySlug(slug);
  if (!partnership) return {};

  return pageMetadata({
    title: `${partnership.name} | Partnerships`,
    description: partnership.heroParagraph,
    path: `/what-we-do/partnerships/${partnership.slug}`,
  });
}

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
export default async function PartnershipDetailPage({ params }: PageProps) {
  const { category: slug } = await params;
  const partnership = getPartnershipBySlug(slug);
  if (!partnership) notFound();

  return (
    <main className="w-full overflow-x-hidden">

      {/* ══════════════════════════════════════
          1. HERO — eyebrow strip + PageHero (reused)
      ══════════════════════════════════════ */}
      <div className="bg-[#0B1638] text-center py-2.5">
        <span className="text-white/70 text-xs font-semibold tracking-widest uppercase">
          {partnership.eyebrow}
        </span>
      </div>
      <PageHero
        headline={partnership.subtitle ? `${partnership.name} (${partnership.subtitle})` : partnership.name}
        subtext={partnership.tagline}
      >
        <div className="flex flex-col gap-5">
          <Link
            href="/what-we-do/partnerships"
            className="inline-flex items-center gap-2 text-white/70 text-sm font-medium hover:text-white transition-colors w-fit"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Partnerships
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center px-7 py-3.5 rounded-full bg-[#0066FF] text-white text-sm font-semibold hover:bg-light-blue hover:text-[#1A274F] transition-colors w-fit"
          >
            {partnership.heroCtaLabel}
          </Link>
        </div>
      </PageHero>

      {/* ══════════════════════════════════════
          2. OVERVIEW
      ══════════════════════════════════════ */}
      <section className="bg-white py-14 lg:py-16">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="max-w-215">
            <p className="text-[#374151] text-base leading-[1.85]">{partnership.heroParagraph}</p>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════
          3. WHO IT'S FOR
      ══════════════════════════════════════ */}
      <section className="bg-[#F7F9FC] py-14 lg:py-16">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading title="Who It's For" className="mb-6" />
          <Reveal className="border-l-4 border-[#0066FF] bg-white px-4 py-2.5 mb-6 w-fit">
            <span className="text-[#1A274F] text-sm">
              <span className="font-bold">Typical buyer:</span> {partnership.typicalBuyer}
            </span>
          </Reveal>
          <BulletList items={partnership.whoFor} />
        </div>
      </section>

      {/* ══════════════════════════════════════
          4. WHY ICENTRA
      ══════════════════════════════════════ */}
      <section className="bg-white py-14 lg:py-16">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading title="Why iCentra" className="mb-6" />
          <Reveal className="max-w-215">
            <p className="text-[#374151] text-base leading-[1.85]">{partnership.whyICentra}</p>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════
          5. OUR VALUE TO YOU
      ══════════════════════════════════════ */}
      <section className="bg-[#F7F9FC] py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading title="Our Value to You" className="mb-8" />
          <ValueGrid items={partnership.valueProps} />
        </div>
      </section>

      {/* ══════════════════════════════════════
          6. HOW IT WORKS
      ══════════════════════════════════════ */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading title="How It Works" className="mb-8" />
          <StepList steps={partnership.howItWorks} />
        </div>
      </section>

      {/* ══════════════════════════════════════
          7. CORE DELIVERABLES
      ══════════════════════════════════════ */}
      <section className="bg-[#F7F9FC] py-14 lg:py-16">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading title="Core Deliverables" className="mb-6" />
          <BulletList items={partnership.deliverables} columns={2} />
        </div>
      </section>

      {/* ══════════════════════════════════════
          8. BUSINESS OUTCOMES
      ══════════════════════════════════════ */}
      <section className="bg-white py-14 lg:py-16">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading title="Business Outcomes" className="mb-6" />
          <CheckList items={partnership.businessOutcomes} />
        </div>
      </section>

      {/* ══════════════════════════════════════
          9. ENGAGEMENT OPTIONS
      ══════════════════════════════════════ */}
      <section className="bg-[#F7F9FC] py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading title="Engagement Options" className="mb-8" />
          <PricingTable tiers={partnership.tiers} />
        </div>
      </section>

      {/* ══════════════════════════════════════
          10. CLOSING CTA
      ══════════════════════════════════════ */}
      <DottedCtaBanner
        title={partnership.heroCtaLabel}
        subtext={`Next step: reach out and we'll help you scope the right ${partnership.name} engagement tier for your organization.`}
        ctaLabel="Get in Touch"
        ctaHref="/contact"
        bgClassName="bg-[#25429A]"
        extraLinks={[{ label: DISCOVERY_EMAIL, href: `mailto:${DISCOVERY_EMAIL}` }]}
      />

    </main>
  );
}
