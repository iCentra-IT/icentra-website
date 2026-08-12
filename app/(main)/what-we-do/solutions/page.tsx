import type { Metadata } from "next";
import ServiceCard from "@/components/ui/cards/service-card";
import SectionHeading from "@/components/ui/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/ui/motion/reveal";
import AnimatedSolutionsHero from "@/components/sections/solutions/animated-solutions-hero";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Our Solutions",
  description:
    "Explore iCentra's suite of solutions — Enterprise Transformation, Cybersecurity & GRC, Strategy & Execution, and Learning & Talent — delivered through our proven ICE approach.",
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

const solutionCards = [
  {
    image: "/images/solution/1.png",
    category: "Enterprise Transformation",
    title: "Utilize Innovation For Improved Value Delivery",
    activeTitle: "Enterprise Transformation",
    items: [
      "AI & Intelligent Automation",
      "Digital Transformation",
      "Organizational Transformation",
      "Agile Transformation",
    ],
    href: "/enterprise",
  },
  {
    image: "/images/solution/2.jpg",
    category: "Cybersecurity & GRC",
    title: "Mitigate Business Challenges Seamlessly",
    activeTitle: "Cybersecurity & GRC",
    items: [
      "Security Operations",
      "Risk & Compliance",
      "Identity Management",
      "Incident Response",
    ],
    href: "/what-we-do/solutions/cybersecurity",
  },
  {
    image: "/images/solution/3.jpg",
    category: "Strategy & Execution",
    title: "Achieve Your Objectives With Strategic Goals",
    activeTitle: "Strategy & Execution",
    items: [
      "Portfolio Management",
      "Programme Delivery",
      "Change Management",
      "Benefits Realisation",
    ],
    href: "/what-we-do/solutions",
  },
  {
    image: "/images/solution/4.jpg",
    category: "Learning & Talent",
    title: "Accelerate Your Growth With Refined Knowledge",
    activeTitle: "Learning & Talent",
    items: [
      "Leadership Development",
      "Digital Skills Training",
      "Certification Programmes",
      "Coaching & Mentoring",
    ],
    href: "/what-we-do/solutions",
  },
];

/* ─────────────────────────────────────────
   ICE PROCESS ICONS — inline SVG
───────────────────────────────────────── */
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
          1. HERO — gradient navy + ghost watermark
      ══════════════════════════════════════ */}
      <section className="relative bg-linear-to-br from-[#0B1B4D] via-[#16266E] to-[#1E3A8A] overflow-hidden">
        {/* Ghost watermark text */}
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-end pr-10 pointer-events-none select-none"
        >
          <span
            className="text-white/5 text-[160px] lg:text-[220px] font-black italic whitespace-nowrap"
            style={{ writingMode: "horizontal-tb" }}
          >
            Solution
          </span>
        </div>

        {/* Subtle radial glow */}
        <div className="absolute right-0 top-0 w-125 h-125 bg-[#0066FF]/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-16 lg:pt-24 lg:pb-20">
          <AnimatedSolutionsHero />
        </div>
      </section>

      {/* ══════════════════════════════════════
          2. OUR APPROACH — ICE process diagram
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
                className="inline-flex items-center px-7 py-3.5 rounded-full bg-[#0066FF] text-white text-[14px] font-semibold hover:bg-[#25429A] transition-colors"
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
                    <span className="text-white text-[11px] sm:text-[12px] font-semibold leading-snug mt-2 whitespace-pre-line">
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
          3. TECHNOLOGY & BUSINESS SOLUTIONS — ServiceCard ×4
      ══════════════════════════════════════ */}
      <section className="bg-white pb-20 lg:pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading title="Technology and Business Solutions That Deliver Impact" className="mb-10" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {solutionCards.map((card) => (
              <div
                key={card.href}
                className="[&>a]:max-w-none [&>a]:w-full [&>a]:aspect-auto [&>a]:h-100"
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

    </main>
  );
}