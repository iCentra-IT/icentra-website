import type { Metadata } from "next";
import Image from "next/image";
import SectionHeading from "@/components/ui/section-heading";
import StatsBar from "@/components/sections/home/stat";
import DottedCtaBanner from "@/components/ui/dotted-cta-banner";
import TestimonialsCarousel from "@/components/ui/testimonials-carousel";
import { StaggerGroup, StaggerItem } from "@/components/ui/motion/reveal";
import HeroVideo from "@/components/sections/home/hero-video";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { solutionCategories, getAllTestimonials, getAllCaseStudies } from "@/lib/data/solutions";
import { InquiryModal, ConsultationRequestModal } from "@/components/forms/all-forms";

export const metadata: Metadata = pageMetadata({
  title: "Our Solutions",
  description:
    "Explore iCentra's suite of solutions spanning Enterprise Transformation, Cybersecurity & GRC, Strategy & Execution, and Learning & Talent, delivered through our proven ICE approach.",
  path: "/what-we-do/solutions",
  image: "/images/solution/solutions.png",
});

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
// Maps each solution category's slug to the `interest` enum value the
// /api/v1/solutions/inquiries/ endpoint expects.
const SOLUTION_INTEREST_MAP: Record<string, string> = {
  "enterprise-transformation": "enterprise_transformation",
  "cybersecurity-and-grc": "cybersecurity_grc",
  "strategy-execution": "strategy_execution",
  "learning-and-talent": "learning_talent",
};
const solutionInterestOptions = solutionCategories.map((c) => ({
  label: c.title,
  value: SOLUTION_INTEREST_MAP[c.slug] ?? "",
}));

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
            <span className="inline-block text-light-blue text-xs font-bold tracking-[0.18em] uppercase border border-white/20 rounded-full px-4 py-1.5 mb-5">
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
                  <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-light-blue group-hover:bg-[#0066FF] group-hover:text-white transition-colors">
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
          3. EXPLORE EVERY SOLUTION — full catalog, grouped by
             domain, pulled straight from each category's own data
             (tagline, intro copy, and all 4 of its subcategories).
      ══════════════════════════════════════ */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            title="Explore Every Solution"
            subtitle="Four domains, sixteen capabilities. Pick a starting point, or browse the full catalog below."
            className="mb-14"
          />

          <div className="flex flex-col gap-16 lg:gap-20">
            {solutionCategories.map((category, i) => (
              <div key={category.slug} id={category.slug} className="scroll-mt-24">
                {/* Category header — copy + dedicated category photo */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8 items-center mb-8 pb-6 border-b border-[#DCE0E8]">
                  <div>
                    <h3 className="text-[#1A274F] text-xl lg:text-2xl font-extrabold mb-2">
                      <span className="text-[#0066FF]">{String(i + 1).padStart(2, "0")} ·</span> {category.title}
                    </h3>
                    <p className="text-[#6B7280] text-sm font-medium mb-3">{category.tagline}</p>
                    <p className="text-[#6B7280] text-sm leading-relaxed mb-4">{category.howWeDoItIntro}</p>
                    <Link
                      href={`/what-we-do/solutions/${category.slug}`}
                      className="inline-flex items-center gap-1.5 text-[#0066FF] text-sm font-semibold hover:gap-2.5 transition-all w-fit"
                    >
                      View all {category.title}
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                  {/* <Link
                    href={`/what-we-do/solutions/${category.slug}`}
                    className="relative block w-full h-40 lg:h-full lg:min-h-35 rounded-2xl overflow-hidden shrink-0"
                  >
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 280px"
                    />
                  </Link> */}
                </div>

                {/* Subcategory mini-cards */}
                <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {category.subcategories.map((sub) => (
                    <StaggerItem key={sub.slug}>
                      <Link
                        href={`/what-we-do/solutions/${category.slug}/${sub.slug}`}
                        className="group block h-full rounded-2xl border border-[#DCE0E8] overflow-hidden hover:border-[#0066FF] hover:shadow-lg hover:shadow-[#0066FF]/5 transition-all"
                      >
                        <div className="relative w-full h-28">
                          <Image
                            src={sub.image}
                            alt={sub.imageAlt ?? sub.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 50vw, 25vw"
                          />
                        </div>
                        <div className="p-5">
                          <h4 className="text-[#1A274F] text-sm font-bold mb-1.5">{sub.title}</h4>
                          <p className="text-[#6B7280] text-xs leading-relaxed line-clamp-4">{sub.blurb ?? sub.subtext}</p>
                          <span className="inline-flex items-center gap-1 text-[#0066FF] text-xs font-semibold mt-3 group-hover:gap-2 transition-all">
                            Learn more
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          </span>
                        </div>
                      </Link>
                    </StaggerItem>
                  ))}
                </StaggerGroup>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          4. OUR APPROACH — ICE process diagram
      ══════════════════════════════════════ */}
      <section className="bg-[#F7F9FC] py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            title="Our Approach"
            subtitle="At iCentra, we address your organization's end-to-end business needs using the effective ICE Approach."
            className="mb-10"
          />

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 lg:items-center justify-between">

            {/* Left — text + CTA */}
            <div className="flex-1 min-w-0 max-w-140">
              <p className="text-[#6B7280] text-base leading-[1.8] mb-8">
                We will partner with you to drive transformation, create superior value, and
                optimize growth for enhanced performance. We provide tools and resources to
                align business strategies with the right technology solutions and equip clients
                with the capabilities to execute projects, programs, and portfolios effectively.
              </p>
              <InquiryModal
                formTitle="Start Your Transformation"
                inquiryType="solutions"
                contextLabel="Solutions Enquiry"
                selectLabel="Which solution are you interested in?"
                interestOptions={solutionInterestOptions}
                messageLabel="Tell us about your goals"
                messagePlaceholder="What challenge are you looking to solve?"
                triggerLabel="Start Transformation"
                triggerClassName="inline-flex items-center px-7 py-3.5 rounded-full bg-[#0066FF] text-white text-sm font-semibold hover:bg-[#25429A] transition-colors"
              />
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
          5. PROOF IT WORKS — real testimonial(s) + case study
             highlight(s), pulled from whichever subcategories have
             them on file (lib/data/solutions.ts)
      ══════════════════════════════════════ */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            title="Proof It Works"
            subtitle="Real engagements, real outcomes."
            className="mb-10"
          />

          <div className="mb-14">
            <TestimonialsCarousel testimonials={getAllTestimonials()} />
          </div>

          <StaggerGroup className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {getAllCaseStudies().map(({ category, subcategory: sub }) => (
              <StaggerItem
                key={sub.slug}
                className="bg-[#F7F9FC] rounded-2xl p-7 lg:p-8 border border-[#DCE0E8] flex flex-col gap-4"
              >
                <p className="text-[#0066FF] text-xs font-bold tracking-widest uppercase">
                  {category.title} · Case Study
                </p>
                <p className="text-[#1A274F] text-base font-bold">{sub.caseStudy!.client}</p>
                <div>
                  <p className="text-[#1A274F] text-sm font-bold mb-1">Challenge</p>
                  <p className="text-[#6B7280] text-sm leading-relaxed">{sub.caseStudy!.challenge}</p>
                </div>
                <div>
                  <p className="text-[#1A274F] text-sm font-bold mb-1.5">Result</p>
                  <ul className="flex flex-col gap-2">
                    {sub.caseStudy!.result.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-[#6B7280] text-sm leading-relaxed">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#0066FF] shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  href={`/what-we-do/solutions/${category.slug}/${sub.slug}`}
                  className="inline-flex items-center gap-1.5 text-[#0066FF] text-sm font-semibold hover:gap-2.5 transition-all w-fit mt-1"
                >
                  Read the full story
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ══════════════════════════════════════
          6. START A CONVERSATION — closing CTA
      ══════════════════════════════════════ */}
      <DottedCtaBanner
        title="Not Sure Where to Begin?"
        subtext="Talk to our team about the right starting point for your transformation. We'll help you identify which domain to prioritize and what a first engagement could look like."
        bgClassName="bg-[#25429A]"
        primaryAction={
          <ConsultationRequestModal
            solutionOptions={solutionInterestOptions}
            triggerLabel="Book a Consultation"
            triggerClassName="inline-flex items-center px-8 py-3.5 rounded-full bg-[#0066FF] text-white text-sm font-semibold hover:bg-light-blue hover:text-[#1A274F] transition-colors"
          />
        }
      />

    </main>
  );
}