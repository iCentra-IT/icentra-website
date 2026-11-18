import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/page-hero";
import StatsBar from "@/components/sections/home/stat";
import TrustedPartners from "@/components/sections/home/partners";
import BlogCard from "@/components/ui/cards/blog-card";
import SectionHeading from "@/components/ui/section-heading";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/motion/reveal";
import { pageMetadata } from "@/lib/seo";
import { getPartnershipBySlug } from "@/lib/data/partnerships";
import { AssessmentRequestModal } from "@/components/forms/all-forms";
import { CALENDLY_URL } from "@/lib/constants";
import { sanityFetch } from "@/sanity/lib/live";
import { postImageUrl } from "@/sanity/lib/image";
import { POSTS_BY_CATEGORY_QUERY } from "@/sanity/lib/queries";
import { formatPostDate, estimateReadTimeFromText } from "@/sanity/lib/format";

export const metadata: Metadata = pageMetadata({
  title: "Continuous Transformation",
  description:
    "iCentra helps leaders build the operating system that keeps strategy, execution, people, and value delivery aligned — diagnosed by the Continuous Transformation Index, aligned by the 4P Alignment Architecture, delivered through the IMPACT Methodology.",
  path: "/what-we-do/continuous-transformation",
  image: "/images/cont-trans/cont1.jpg",
});

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */

const symptoms = [
  "Strategy disconnected from execution",
  "Projects delivering outputs without measurable outcomes",
  "Governance frameworks that slow innovation",
  "Initiatives that lose momentum after launch",
  "Workforce capability lagging behind strategic ambition",
];

const fourPs = [
  { label: "Portfolio", tag: "Strategy", desc: "Strategic direction and investment priorities." },
  { label: "Project", tag: "Execution", desc: "The execution architecture that turns priorities into action." },
  { label: "People", tag: "Capability", desc: "The capability systems that sustain delivery." },
  { label: "Product", tag: "Value", desc: "The value stakeholders actually receive." },
];

const howWeWork = [
  {
    step: "01",
    name: "Diagnose",
    framework: "Continuous Transformation Index",
    desc: "Measures transformation maturity and shows where misalignment is costing the most.",
  },
  {
    step: "02",
    name: "Align",
    framework: "4P Alignment Architecture",
    desc: "Redesigns portfolio, project, people, and product systems so they reinforce each other.",
    highlight: true,
  },
  {
    step: "03",
    name: "Deliver",
    framework: "IMPACT Methodology",
    desc: "Insight → Model → Protect → Activate → Capability → Transform. How iCentra delivers the change.",
  },
];

const solutionPillars = [
  {
    title: "Enterprise Transformation",
    desc: "AI · Digital · Organizational · Agile transformation — re-architecting the way the business operates.",
    href: "/what-we-do/solutions/enterprise-transformation",
  },
  {
    title: "Cybersecurity & GRC",
    desc: "Cybersecurity, IT governance, risk management, and compliance — protection by design.",
    href: "/what-we-do/solutions/cybersecurity-and-grc",
  },
  {
    title: "Strategy & Execution",
    desc: "Strategy management, change management, PMO solutions, and advisory — the engine behind delivery.",
    href: "/what-we-do/solutions/strategy-execution",
  },
  {
    title: "Learning & Talent",
    desc: "Learning & development and talent optimization — the capability layer that makes change stick.",
    href: "/what-we-do/solutions/learning-and-talent",
  },
] as const;

const partnershipModels = [
  {
    slug: "ai-transformation",
    desc: "The strategy, governance, and workforce enablement that make AI adoption durable, not a one-off experiment.",
    bestFor: "Enterprise reshape and board-level change.",
  },
  {
    slug: "pmocentra",
    desc: "A managed enterprise PMO operating model that runs the portfolio for you.",
    bestFor: "Scaling up program delivery.",
  },
  {
    slug: "complycentra",
    desc: "ISO 27001, 27032, 31000, and 22301 implementation, audit, and certification readiness.",
    bestFor: "Regulated and data-intensive organizations.",
  },
  {
    slug: "workforce-capability",
    desc: "Long-term learning and talent partnerships, from certification to bespoke academies.",
    bestFor: "Workforce uplift and certification.",
  },
] as const;

const assessmentReceive = [
  "Executive diagnostic insights",
  "Your maturity position on each pillar",
  "Transformation roadmap recommendations",
];

/* ─────────────────────────────────────────
   SANITY DATA SHAPING — real "insights" posts
───────────────────────────────────────── */
type SanityImage = { asset?: { _ref: string } } | null | undefined;

type RawPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  mainImage?: SanityImage;
  publishedAt: string;
  plainBody?: string;
};

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
export default async function ContinuousTransformationPage() {
  const { data: insightPosts } = await sanityFetch({ query: POSTS_BY_CATEGORY_QUERY, params: { slug: "insights" } });
  const blogCards = ((insightPosts ?? []) as RawPost[]).slice(0, 3).map((post) => ({
    image: postImageUrl(post.mainImage) ?? "/images/bg.jpg",
    title: post.title,
    date: formatPostDate(post.publishedAt),
    readTime: estimateReadTimeFromText(post.plainBody),
    href: `/news/${post.slug}`,
  }));

  return (
    <main className="w-full overflow-x-hidden">

      {/* ══════════════════════════════════════
          1. HERO — PageHero (reused)
      ══════════════════════════════════════ */}
      <PageHero
        eyebrow="What We Do · Continuous Transformation"
        headline={"Transformation Is a Capability,\nNot a Project."}
        subtext="iCentra helps leaders build the operating system that keeps strategy, execution, people, and value delivery aligned, so performance holds long after the program ends."
      >
        <div className="flex flex-wrap items-center gap-4">
          <Link
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-7 py-3.5 rounded-full bg-[#0066FF] text-white text-sm font-semibold hover:bg-[#25429A] transition-colors"
          >
            Book a Discovery Call
          </Link>
          <Link
            href="#assessment"
            className="inline-flex items-center px-7 py-3.5 rounded-full border border-white/40 text-white text-sm font-semibold hover:bg-white hover:text-[#1A274F] transition-colors"
          >
            Request Your Readiness Assessment
          </Link>
        </div>
      </PageHero>

      {/* ══════════════════════════════════════
          2. WHY TRANSFORMATION STALLS
      ══════════════════════════════════════ */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
          <Reveal className="flex-1 min-w-0">
            <p className="text-[#0066FF] text-xs font-bold tracking-[0.14em] uppercase mb-3">
              Why Transformation Stalls
            </p>
            <h2 className="text-[#1A274F] text-2xl lg:text-[32px] font-extrabold leading-tight mb-5">
              Most transformation problems are alignment problems in disguise.
            </h2>
            <p className="text-[#374151] text-base leading-[1.8]">
              Technology, governance expectations, cyber risk, and workforce dynamics are changing faster than
              one-time programs can keep up with. The organizations that win embed transformation into how they
              operate, not just what they pursue.
            </p>
          </Reveal>

          <Reveal delay={0.15} className="lg:w-100 shrink-0 bg-[#F7F9FC] rounded-2xl p-7">
            <p className="text-[#1A274F] text-base font-semibold mb-4">Many organizations experience:</p>
            <ul className="flex flex-col gap-3 mb-5">
              {symptoms.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[#374151] text-sm leading-relaxed">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#0066FF] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-[#1A274F] text-sm font-semibold border-t border-[#DCE0E8] pt-4">
              The result: repeated transformation efforts without lasting performance.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════
          3. THE OPERATING MODEL — 4P Alignment Architecture
      ══════════════════════════════════════ */}
      <section className="bg-[#F7F9FC] py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-[#0066FF] text-xs font-bold tracking-[0.14em] uppercase mb-3">Framework</p>
          <SectionHeading
            title="The 4P Alignment Architecture"
            subtitle="A continuous loop that aligns strategy with capability."
            className="mb-10"
          />

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
            {/* Diagram — concentric rings, clockwise: Portfolio (top) → Project (right) → People (bottom) → Product (left) */}
            <Reveal className="relative w-full max-w-96 aspect-square mx-auto shrink-0">
              {/* Concentric rings */}
              <div className="absolute inset-[6%] rounded-full bg-[#0B1B4D]" />
              <div className="absolute inset-[21%] rounded-full bg-[#2F4F9E]" />
              <div className="absolute inset-[36%] rounded-full bg-[#CBDAF7]" />
              <div className="absolute inset-[46%] rounded-full bg-[#00DBFF]" />

              {/* Portfolio — top */}
              <div className="absolute top-[6%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5">
                <div className="w-16 h-16 rounded-full bg-[#0B1B4D] border-2 border-[#00DBFF] flex items-center justify-center text-center px-1">
                  <span className="text-white font-mono text-[10px] font-bold tracking-wide uppercase">Portfolio</span>
                </div>
                <span className="text-[#00DBFF] text-[11px] font-medium">Strategy</span>
              </div>

              {/* Project — right */}
              <div className="absolute right-[6%] top-1/2 translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5">
                <div className="w-16 h-16 rounded-full bg-[#0B1B4D] border-2 border-white/30 flex items-center justify-center text-center px-1">
                  <span className="text-white font-mono text-[10px] font-bold tracking-wide uppercase">Project</span>
                </div>
                <span className="text-[#00DBFF] text-[11px] font-medium">Execution</span>
              </div>

              {/* People — bottom */}
              <div className="absolute bottom-[6%] left-1/2 -translate-x-1/2 translate-y-1/2 flex flex-col items-center gap-1.5">
                <span className="text-[#00DBFF] text-[11px] font-medium order-2">Capability</span>
                <div className="w-16 h-16 rounded-full bg-[#0B1B4D] border-2 border-white/30 flex items-center justify-center text-center px-1 order-1">
                  <span className="text-white font-mono text-[10px] font-bold tracking-wide uppercase">People</span>
                </div>
              </div>

              {/* Product — left */}
              <div className="absolute left-[6%] top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5">
                <div className="w-16 h-16 rounded-full bg-[#0B1B4D] border-2 border-white/30 flex items-center justify-center text-center px-1">
                  <span className="text-white font-mono text-[10px] font-bold tracking-wide uppercase">Product</span>
                </div>
                <span className="text-[#00DBFF] text-[11px] font-medium">Value</span>
              </div>
            </Reveal>

            {/* Pillar descriptions */}
            <StaggerGroup className="flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {fourPs.map((p) => (
                <StaggerItem key={p.label} className="bg-white rounded-2xl p-6 border border-[#DCE0E8]">
                  <p className="text-[#0066FF] text-[11px] font-bold tracking-[0.1em] uppercase mb-1.5">{p.tag}</p>
                  <h4 className="text-[#1A274F] text-base font-bold mb-2">{p.label}</h4>
                  <p className="text-[#6B7280] text-sm leading-relaxed">{p.desc}</p>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          4. HOW WE WORK — Diagnose. Align. Deliver.
      ══════════════════════════════════════ */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-[#0066FF] text-xs font-bold tracking-[0.14em] uppercase mb-3">How We Work</p>
          <SectionHeading
            title="Diagnose. Align. Deliver."
            subtitle="Three proprietary frameworks, used in sequence on every engagement."
            className="mb-10"
          />

          <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {howWeWork.map((step) => (
              <StaggerItem
                key={step.step}
                className={`rounded-2xl p-7 flex flex-col gap-3 border ${
                  step.highlight
                    ? "bg-[#1A274F] border-[#1A274F] md:-translate-y-3 shadow-xl shadow-[#1A274F]/15"
                    : "bg-[#F7F9FC] border-[#DCE0E8]"
                }`}
              >
                <span
                  className={`text-[32px] font-extrabold leading-none ${
                    step.highlight ? "text-[#00DBFF]" : "text-[#DCE0E8]"
                  }`}
                >
                  {step.step}
                </span>
                <h4 className={`text-lg font-bold ${step.highlight ? "text-white" : "text-[#1A274F]"}`}>
                  {step.name.toUpperCase()} — {step.framework}
                </h4>
                <p className={`text-sm leading-relaxed ${step.highlight ? "text-white/70" : "text-[#6B7280]"}`}>
                  {step.desc}
                </p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ══════════════════════════════════════
          5. ENTERPRISE ALIGNMENT BAND
      ══════════════════════════════════════ */}
      <section className="bg-[#0B1B4D] py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="text-center mb-12">
            <p className="text-light-blue text-xs font-bold tracking-[0.14em] uppercase mb-3">Enterprise Alignment</p>
            <h2 className="text-white text-2xl lg:text-[32px] font-extrabold leading-tight mb-4">
              The Framework Behind the Work
            </h2>
            <p className="text-white/70 text-base leading-[1.8] max-w-2xl mx-auto">
              The 4P Alignment Architecture is the subject of Taopheek Babayeju&apos;s book,{" "}
              <em className="not-italic font-semibold text-white">The Architecture of Enterprise Alignment</em>.
              Read it, lead with it, or apply it in your organization.
            </p>
          </Reveal>

          <StaggerGroup className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <StaggerItem className="bg-white/5 border border-white/10 rounded-2xl p-7 flex flex-col gap-4">
              <p className="text-light-blue text-[11px] font-bold tracking-[0.1em] uppercase">Read It</p>
              <h4 className="text-white text-base font-bold">The Architecture of Enterprise Alignment</h4>
              <p className="text-white/65 text-sm leading-relaxed flex-1">
                Why good strategies fail to produce sustained results, and how to design an enterprise that delivers.
              </p>
              <Link
                href="https://www.enterprisealignment.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#0066FF] text-white text-sm font-semibold hover:bg-light-blue hover:text-[#1A274F] transition-colors w-fit"
              >
                Get a Copy
              </Link>
            </StaggerItem>

            <StaggerItem className="bg-white/5 border border-white/10 rounded-2xl p-7 flex flex-col gap-4">
              <p className="text-light-blue text-[11px] font-bold tracking-[0.1em] uppercase">Lead With It</p>
              <h4 className="text-white text-base font-bold">Enterprise Alignment (Executive Program)</h4>
              <p className="text-white/65 text-sm leading-relaxed flex-1">
                A 3-day iCentra Learning program for senior executives. Participants leave as designated 4P Leaders
                with a 90-Day Enterprise Alignment Execution Plan.
              </p>
              <Link
                href="https://learning.icentra.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#0066FF] text-white text-sm font-semibold hover:bg-light-blue hover:text-[#1A274F] transition-colors w-fit"
              >
                Apply Now
              </Link>
            </StaggerItem>

            <StaggerItem className="bg-white/5 border border-white/10 rounded-2xl p-7 flex flex-col gap-4">
              <p className="text-light-blue text-[11px] font-bold tracking-[0.1em] uppercase">Apply It</p>
              <h4 className="text-white text-base font-bold">Assessment and Partnership</h4>
              <p className="text-white/65 text-sm leading-relaxed flex-1">
                Start with the Transformation Readiness Assessment, then sustain the work through an iCentra
                partnership.
              </p>
              <Link
                href="#assessment"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#0066FF] text-white text-sm font-semibold hover:bg-light-blue hover:text-[#1A274F] transition-colors w-fit"
              >
                Request Your Assessment
              </Link>
            </StaggerItem>
          </StaggerGroup>

          <Reveal className="text-center mt-10">
            <Link
              href="https://www.enterprisealignment.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-light-blue text-sm font-semibold hover:gap-2.5 transition-all"
            >
              Explore the framework in depth at enterprisealignment.org
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════
          6. SOLUTION PILLARS
      ══════════════════════════════════════ */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-[#0066FF] text-xs font-bold tracking-[0.14em] uppercase mb-3">Our Solutions</p>
          <SectionHeading title="Four Pillars. One Transformation System." className="mb-10" />

          <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {solutionPillars.map((pillar, i) => (
              <StaggerItem key={pillar.href}>
                <Link
                  href={pillar.href}
                  className="group block h-full rounded-2xl border border-[#DCE0E8] p-7 hover:border-[#0066FF] hover:shadow-lg hover:shadow-[#0066FF]/5 transition-all"
                >
                  <div className="h-1 rounded-full bg-[#00DBFF] mb-5 -mt-7 -mx-7" />
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#1A274F] text-white text-xs font-bold mb-4">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h4 className="text-[#1A274F] text-base font-bold mb-2">{pillar.title}</h4>
                  <p className="text-[#6B7280] text-sm leading-relaxed mb-4">{pillar.desc}</p>
                  <span className="inline-flex items-center gap-1.5 text-[#0066FF] text-sm font-semibold group-hover:gap-2.5 transition-all">
                    Learn more
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ══════════════════════════════════════
          7. PARTNERSHIP MODELS
      ══════════════════════════════════════ */}
      <section className="bg-[#F7F9FC] py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-[#0066FF] text-xs font-bold tracking-[0.14em] uppercase mb-3">Partnership Models</p>
          <SectionHeading
            title="Four Ways to Work With Us"
            subtitle="Pick the model that fits the moment, from advisory through long-term partnership."
            className="mb-10"
          />

          <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {partnershipModels.map((model, i) => {
              const partnership = getPartnershipBySlug(model.slug);
              if (!partnership) return null;
              return (
                <StaggerItem key={model.slug} className="bg-white rounded-2xl p-6 border border-[#DCE0E8] flex flex-col gap-3">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#1A274F] text-white text-xs font-bold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h4 className="text-[#1A274F] text-sm font-bold leading-snug">{partnership.name}</h4>
                  <p className="text-[#6B7280] text-sm leading-relaxed flex-1">{model.desc}</p>
                  <p className="text-[#374151] text-xs leading-relaxed border-t border-[#DCE0E8] pt-3">
                    <span className="font-semibold text-[#1A274F]">Best for:</span> {model.bestFor}
                  </p>
                </StaggerItem>
              );
            })}
          </StaggerGroup>

          <Reveal className="text-center mt-10">
            <Link
              href="/what-we-do/partnerships"
              className="inline-flex items-center gap-1.5 text-[#0066FF] text-sm font-semibold hover:gap-2.5 transition-all"
            >
              Explore Partnerships
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════
          8. TRANSFORMATION READINESS ASSESSMENT
      ══════════════════════════════════════ */}
      <section id="assessment" className="bg-white py-16 lg:py-20 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-[#0066FF] text-xs font-bold tracking-[0.14em] uppercase mb-3">Start Here</p>
          <SectionHeading title="Transformation Readiness Assessment" className="mb-10" />

          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
            <Reveal className="flex-1 min-w-0">
              <p className="text-[#374151] text-base leading-[1.8] mb-5">
                Find out where your organization stands. Your results are scored on the Continuous Transformation
                Index across the four 4P pillars and the governance layer.
              </p>
              <p className="text-[#1A274F] text-base font-semibold mb-3">You receive:</p>
              <ul className="flex flex-col gap-2">
                {assessmentReceive.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[#374151] text-base leading-relaxed">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#0066FF] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.15} className="lg:w-95 shrink-0 w-full bg-[#F7F9FC] rounded-2xl p-8 text-center">
              <h4 className="text-[#1A274F] text-lg font-bold mb-2">Request Your Assessment</h4>
              <p className="text-[#6B7280] text-sm leading-relaxed mb-6">
                Tell us about your organization and a member of our team will reach out to schedule your assessment.
              </p>
              <AssessmentRequestModal
                triggerLabel="Request Your Assessment"
                triggerClassName="inline-flex items-center justify-center w-full px-6 py-3.5 rounded-full bg-[#0066FF] text-white text-sm font-semibold hover:bg-[#25429A] transition-colors mb-4"
              />
              <p className="text-[#6B7280] text-sm">
                Or email{" "}
                <a href="mailto:solutions@icentra.com" className="text-[#0066FF] font-semibold hover:underline">
                  solutions@icentra.com
                </a>
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          9. PROOF
      ══════════════════════════════════════ */}
      <StatsBar />

      <section className="bg-white py-14 lg:py-16">
        <TrustedPartners />
      </section>

      {/* ══════════════════════════════════════
          10. INSIGHTS
      ══════════════════════════════════════ */}
      {blogCards.length > 0 && (
        <section className="bg-white py-14 lg:py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
              <SectionHeading title="Insights on Continuous Transformation" className="mb-0" />
              <Link
                href="/news?tab=insights"
                className="inline-flex items-center gap-1.5 text-[#0066FF] text-sm font-semibold hover:gap-2.5 transition-all"
              >
                View all insights
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogCards.map((card) => (
                <div key={card.href} className="[&>div]:max-w-none [&>div]:w-full">
                  <BlogCard image={card.image} title={card.title} date={card.date} readTime={card.readTime} href={card.href} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════
          11. FINAL CTA
      ══════════════════════════════════════ */}
      <section className="bg-main py-16 lg:py-24">
        <Reveal className="max-w-170 mx-auto px-6 flex flex-col items-center text-center gap-5">
          <h2 className="text-white text-[26px] lg:text-[36px] font-extrabold leading-tight">
            Build the Capability to Transform Continuously
          </h2>
          <p className="text-white/55 text-base leading-relaxed">
            Start with a 30-minute discovery call. We will identify where misalignment is costing you most and the
            right entry point for your organization.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
            <Link
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-3.5 rounded-full bg-[#0066FF] text-white text-base font-semibold hover:bg-light-blue hover:text-[#1A274F] transition-colors"
            >
              Book a Discovery Call
            </Link>
            <Link
              href="#assessment"
              className="inline-flex items-center px-8 py-3.5 rounded-full border border-white/40 text-white text-base font-semibold hover:bg-white hover:text-[#1A274F] transition-colors"
            >
              Request Your Assessment
            </Link>
          </div>
          <p className="text-white/50 text-sm">
            Or email{" "}
            <a href="mailto:solutions@icentra.com" className="text-light-blue font-semibold hover:underline">
              solutions@icentra.com
            </a>
          </p>
        </Reveal>
      </section>

    </main>
  );
}
