import type { Metadata } from "next";
import ServiceCard from "@/components/ui/cards/service-card";
import SectionHeading from "@/components/ui/section-heading";
import StatsBar from "@/components/sections/home/stat";
import DottedCtaBanner from "@/components/ui/dotted-cta-banner";
import { StaggerGroup, StaggerItem } from "@/components/ui/motion/reveal";
import HeroVideo from "@/components/sections/home/hero-video";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { solutionCategories } from "@/lib/data/solutions";

export const metadata: Metadata = pageMetadata({
  title: "Our Solutions",
  description:
    "Explore iCentra's suite of solutions spanning Enterprise Transformation, Cybersecurity & GRC, Strategy & Execution, and Learning & Talent, delivered through our proven ICE approach.",
  path: "/what-we-do/solutions",
});

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const iceSteps = [
  {
    icon: "identify",
    label: "We Identify\nOur Clients\nNeed",
  },
  {
    icon: "commit",
    label: "We Commit\nour Expertise",
  },
  {
    icon: "execute",
    label: "We Execute\nwith Excellence",
  },
];

const solutionCards = solutionCategories.map((category) => ({
  slug: category.slug,
  image: category.image,
  category: category.title,
  title: category.tagline,
  activeTitle: category.title,
  items: category.subcategories.map((sub) => sub.title),
  href: `/what-we-do/solutions/${category.slug}`,
}));

/* ─────────────────────────────────────────
   ICE PROCESS ICONS — inline SVG
───────────────────────────────────────── */
/* ─────────────────────────────────────────
   PILLAR ICONS — inline SVG, one per solution category
───────────────────────────────────────── */
function PillarIcon({ slug }: { slug: string }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.8 } as const;
  if (slug === "enterprise-transformation") {
    return (
      <svg className="w-5 h-5" viewBox="0 0 24 24" {...common}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 17l6-6 4 4 8-8M21 11V3h-8" />
      </svg>
    );
  }
  if (slug === "cybersecurity-and-grc") {
    return (
      <svg className="w-5 h-5" viewBox="0 0 24 24" {...common}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
      </svg>
    );
  }
  if (slug === "strategy-execution") {
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

function IceIcon({ type }: { type: string }) {
  if (type === "identify") {
    return (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5M4 9a8 8 0 0114-4M20 15a8 8 0 01-14 4" />
      </svg>
    );
  }
  if (type === "commit") {
    return (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={1.8}>
        <circle cx="12" cy="12" r="9" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 3" />
      </svg>
    );
  }
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 19l14-14M19 5h-6M19 5v6" />
    </svg>
  );
}

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
export default function OurSolutionsPage() {
  return (
    <main className="w-full overflow-x-hidden">

      {/* ══════════════════════════════════════
          1. HERO — brand video
      ══════════════════════════════════════ */}
      <section className="relative bg-[#1A274F] overflow-hidden">
        <HeroVideo src="/icentra-video.mp4" />
      </section>

      {/* ══════════════════════════════════════
          2. SOLUTIONS INTRO — copy + CTA, plus a 4-pillar
             quick-jump grid down to the ServiceCard section below.
             Bespoke to this page (not PageHero) so it stays flexible.
      ══════════════════════════════════════ */}
      <section className="relative bg-linear-to-br from-[#0B1B4D] via-[#16266E] to-[#1E3A8A] overflow-hidden">
        {/* Subtle radial glow */}
        <div className="absolute right-0 top-0 w-125 h-125 bg-[#0066FF]/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-16 items-center">
          {/* Left — copy + CTA */}
          <div>
            <span className="inline-block text-[var(--color-light-blue)] text-xs font-bold tracking-[0.18em] uppercase border border-white/20 rounded-full px-4 py-1.5 mb-5">
              Four Domains · One Firm
            </span>
            <h1 className="text-white text-[32px] sm:text-[40px] lg:text-[48px] font-extrabold leading-[1.1] mb-5">
              Empower Organizational Excellence: iCentra Solutions
            </h1>
            <div className="w-16 h-1 rounded-full bg-light-blue mb-6" />
            <p className="text-white/75 text-base leading-[1.8] mb-4 max-w-xl">
              iCentra offers a holistic suite of transformative services designed to propel
              organizations toward sustainable success. We partner with you to address the
              complex challenges of modern business with deep expertise, proven methodology,
              and tailored execution — from digital innovation to robust cybersecurity,
              strategic alignment, and skill development.
            </p>
            <Link
              href="#solutions-grid"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#0066FF] text-white text-sm font-semibold hover:bg-[#25429A] transition-colors"
            >
              Explore Our Solutions
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Right — 4 pillar quick-jump cards */}
          <StaggerGroup className="grid grid-cols-2 gap-4">
            {solutionCategories.map((cat) => (
              <StaggerItem key={cat.slug}>
                <Link
                  href={`#${cat.slug}`}
                  className="group block h-full bg-white/5 border border-white/15 rounded-2xl p-5 flex flex-col gap-3 hover:bg-white/10 hover:border-white/30 transition-colors"
                >
                  <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[var(--color-light-blue)] group-hover:bg-[#0066FF] group-hover:text-white transition-colors">
                    <PillarIcon slug={cat.slug} />
                  </span>
                  <span className="text-white text-sm font-semibold leading-snug">{cat.title}</span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Proof strip */}
      <StatsBar />

      {/* ══════════════════════════════════════
          3. OUR APPROACH — ICE process diagram
      ══════════════════════════════════════ */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            title="Our Approach"
            subtitle="At iCentra, we address your organization's end-to-end business needs using the effective ICE Approach."
            className="mb-10"
          />

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center justify-between">

            {/* Left — text + CTA */}
            <div className="flex-1 min-w-0 max-w-140">
              <p className="text-[#6B7280] text-base leading-[1.8] mb-8">
                We will partner with you to drive transformation, create superior value, and
                optimize growth for enhanced performance. We provide tools and resources to
                align business strategies with the right technology solutions and equip clients
                with the capabilities to execute projects, programs, and portfolios effectively.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center px-7 py-3.5 rounded-full bg-[#0066FF] text-white text-sm font-semibold hover:bg-[#25429A] transition-colors"
              >
                Start Transformation
              </Link>
            </div>

            {/* Right — ICE step diagram */}
            <StaggerGroup className="flex items-center gap-1 sm:gap-3 shrink-0">
              {iceSteps.map((step, i) => (
                <div key={step.label} className="flex items-center gap-1 sm:gap-3">
                  {/* Circle node */}
                  <StaggerItem className="flex flex-col items-center justify-center w-27.5 h-27.5 sm:w-32.5 sm:h-32.5 rounded-full bg-linear-to-br from-[#1A274F] to-[#25429A] shrink-0 text-center px-3 shadow-lg">
                    <IceIcon type={step.icon} />
                    <span className="text-white text-xs sm:text-xs font-semibold leading-snug mt-2 whitespace-pre-line">
                      {step.label}
                    </span>
                  </StaggerItem>
                  {/* Arrow connector — not after last item */}
                  {i < iceSteps.length - 1 && (
                    <svg className="w-6 sm:w-8 h-6 sm:h-8 text-[#60A5FA] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4 11h13.17l-5.59-5.59L13 4l8 8-8 8-1.41-1.41L17.17 13H4z" />
                    </svg>
                  )}
                </div>
              ))}
            </StaggerGroup>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          4. TECHNOLOGY & BUSINESS SOLUTIONS — ServiceCard ×4
      ══════════════════════════════════════ */}
      <section id="solutions-grid" className="bg-white pb-20 lg:pb-24 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            title="Technology and Business Solutions That Deliver Impact"
            subtitle="Four domains, each with a dedicated team and a proven delivery methodology. Pick a card to see what's inside."
            className="mb-10"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {solutionCards.map((card) => (
              <div
                key={card.href}
                id={card.slug}
                className="scroll-mt-24 [&>a]:max-w-none [&>a]:w-full [&>a]:aspect-auto [&>a]:h-100"
              >
                <ServiceCard
                  image={card.image}
                  category={card.category}
                  title={card.title}
                  activeTitle={card.activeTitle}
                  items={card.items}
                  href={card.href}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          5. START A CONVERSATION — closing CTA
      ══════════════════════════════════════ */}
      <DottedCtaBanner
        title="Not Sure Where to Begin?"
        subtext="Talk to our team about the right starting point for your transformation. We'll help you identify which domain to prioritize and what a first engagement could look like."
        ctaLabel="Book a Consultation"
        ctaHref="/contact"
        bgClassName="bg-[#25429A]"
      />

    </main>
  );
}