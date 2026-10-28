import HeroVideo from "@/components/sections/home/hero-video";
import TrustedPartners from "@/components/sections/home/partners";
import BlogCard from "@/components/ui/cards/blog-card";
import ServiceCard from "@/components/ui/cards/service-card";
import SectionHeading from "@/components/ui/section-heading";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/motion/reveal";
import { solutionCategories } from "@/lib/data/solutions";
import { sanityFetch } from "@/sanity/lib/live";
import { postImageUrl } from "@/sanity/lib/image";
import { POSTS_BY_CATEGORY_QUERY } from "@/sanity/lib/queries";
import { formatPostDate, estimateReadTimeFromText } from "@/sanity/lib/format";
import Image from "next/image";
import Link from "next/link";


/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */

const structuredSystem = [
  {
    title: "Continuous Transformation Index™ (CTI)",
    superscript: "™",
    desc: "Assess transformation maturity and identify priority opportunities.",
  },
  {
    title: "4P Strategic Alignment Framework™",
    superscript: "™",
    desc: "Align Portfolio, Project, People, and Product for enterprise-wide coherence.",
  },
  {
    title: "IMPACT™ Methodology",
    superscript: "™",
    desc: "Insight → Model → Protect → Activate → Capability → Transform.",
  },
];

const serviceCards = solutionCategories.map((category) => ({
  image: category.image,
  category: category.title,
  title: category.tagline,
  activeTitle: category.title,
  items: category.subcategories.map((sub) => sub.title),
  href: `/what-we-do/solutions/${category.slug}`,
}));

const stats = [
  { value: "15+",   label: "Years of Excellence" },
  { value: "200",   label: "Organizations Supported" },
  { value: "5000",  label: "Professionals Developed" },
  { value: "99.9%", label: "Global delivery experience" },
];

const partners = [
  { name: "NNPC",      src: "https://placehold.co/110x36/1A274F/ffffff?text=NNPC" },
  { name: "Partner 2", src: "https://placehold.co/110x36/1A274F/ffffff?text=Partner" },
  { name: "NRS",       src: "https://placehold.co/110x36/1A274F/ffffff?text=NRS" },
  { name: "Partner 4", src: "https://placehold.co/110x36/1A274F/ffffff?text=Partner" },
  { name: "Microvis",  src: "https://placehold.co/110x36/1A274F/ffffff?text=Microvis" },
  { name: "Partner 6", src: "https://placehold.co/110x36/1A274F/ffffff?text=Partner" },
  { name: "Partner 7", src: "https://placehold.co/110x36/1A274F/ffffff?text=Partner" },
  { name: "Partner 8", src: "https://placehold.co/110x36/1A274F/ffffff?text=Partner" },
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

function toBlogCards(posts: RawPost[]) {
  return posts.map((post) => ({
    image: postImageUrl(post.mainImage) ?? "/images/bg.jpg",
    title: post.title,
    date: formatPostDate(post.publishedAt),
    readTime: estimateReadTimeFromText(post.plainBody),
    href: `/news/${post.slug}`,
  }));
}

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
export default async function ContinuousTransformationPage() {
  const { data: insightPosts } = await sanityFetch({ query: POSTS_BY_CATEGORY_QUERY, params: { slug: "insights" } });
  const blogCards = toBlogCards(((insightPosts ?? []) as RawPost[]).slice(0, 4));

  return (
    <main className="w-full overflow-x-hidden">

      {/* ══════════════════════════════════════
          1. HERO — homepage HeroVideo (reused)
      ══════════════════════════════════════ */}
      <section className="relative bg-[#1A274F] overflow-hidden">
        <HeroVideo src="/icentra-video.mp4" />
      </section>

      {/* ══════════════════════════════════════
          2. INTRO — bold subheading + 3 paras + image
      ══════════════════════════════════════ */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

          {/* Left */}
          <Reveal className="flex-1 min-w-0">
            <h2 className="text-[#1A274F] text-lg lg:text-[22px] font-bold leading-snug mb-5">
              Transformation Is No Longer A One-Time Initiative. It Is A Continuous Capability
            </h2>
            <div className="flex flex-col gap-4">
              <p className="text-[#374151] text-base leading-[1.8]">
                Organizations today face accelerating change driven by technology innovation,
                evolving governance expectations, cybersecurity risks, and shifting workforce
                dynamics. Success belongs to organizations that embed transformation into how they
                operate, not just what they pursue.
              </p>
              <p className="text-[#374151] text-base leading-[1.8]">
                At iCentra, we help leaders build integrated transformation systems that align
                strategy, governance, execution, and workforce capability.
              </p>
            </div>
          </Reveal>

          {/* Right — branded office image */}
          <Reveal delay={0.15} className="relative shrink-0 w-full lg:w-100 h-70 lg:h-80 rounded-2xl overflow-hidden">
            <Image
              src="/images/cont-trans/cont1.png"
              alt="iCentra team"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 400px"
            />
            {/* iCentra branding overlay badge */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-[#0066FF] flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-[#1A274F] text-xs font-bold">iCentra</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════
          3. WHY TRADITIONAL TRANSFORMATION NO LONGER WORKS
      ══════════════════════════════════════ */}
      <section className="bg-white pb-14 lg:pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading title="Why Traditional Transformation No Longer Works" className="mb-6" />

          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
            {/* Left — bullet list */}
            <Reveal className="flex-1 min-w-0">
              <p className="text-[#1A274F] text-base font-semibold mb-3">
                Many organizations experience:
              </p>
              <ul className="flex flex-col gap-2.5">
                {[
                  "Strategy disconnected from execution.",
                  "Projects delivering outputs without measurable outcomes.",
                  "Governance frameworks slowing innovation.",
                  "Transformation initiatives that fail to sustain momentum.",
                  "Workforce capability lagging behind strategic ambition.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[#374151] text-base leading-relaxed">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#0066FF] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Right — result */}
            <Reveal delay={0.15} className="lg:w-85 shrink-0">
              <p className="text-[#1A274F] text-base font-semibold mb-3">The result?</p>
              <p className="text-[#374151] text-base leading-[1.8]">
                Repeated transformation efforts without lasting performance improvement.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          4. THE NEW OPERATING MODEL — text left + image right
      ══════════════════════════════════════ */}
      <section className="bg-white pb-16 lg:pb-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

          {/* Left */}
          <Reveal className="flex-1 min-w-0">
            <SectionHeading title="The New Operating Model" className="mb-6" />
            <p className="text-[#374151] text-base leading-[1.8] mb-4">
              Continuous Transformation moves organizations from episodic change to sustained
              evolution. It integrates:
            </p>
            <ul className="flex flex-col gap-2 mb-4">
              {[
                "Strategic alignment.",
                "Governance and resilience.",
                "Execution discipline.",
                "Workforce capability",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[#374151] text-base leading-relaxed">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#0066FF] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-[#374151] text-base leading-[1.8]">
              into a unified operating system.<br />
              Transformation becomes continuous measurable and sustainable.
            </p>
          </Reveal>

          {/* Right — image */}
          <Reveal delay={0.15} className="relative shrink-0 w-full lg:w-105 h-75 lg:h-85 rounded-2xl overflow-hidden">
            <Image
              src="/images/cont-trans/cont2.png"
              alt="iCentra operating model"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 420px"
            />
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════
          5. A STRUCTURED SYSTEM — 3 frameworks + CTA
      ══════════════════════════════════════ */}
      <section className="bg-[#F7F9FC] py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading title="A Structured System for Continuous Transformation" className="mb-6" />

          <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {structuredSystem.map((item) => (
              <StaggerItem key={item.title}>
                <h4 className="text-[#1A274F] text-base font-bold mb-2">{item.title}</h4>
                <p className="text-[#6B7280] text-base leading-relaxed">{item.desc}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <div className="flex justify-center">
            <Link
              href="/what-we-do/solutions"
              className="inline-flex items-center px-7 py-3.5 rounded-full bg-[#0066FF] text-white text-base font-semibold hover:bg-[#25429A] transition-colors"
            >
              Explore our framework
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          6. BUILT TO WORK AS ONE SYSTEM — ServiceCard ×4
      ══════════════════════════════════════ */}
      <section className="bg-white py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            title="Built to Work as One System"
            subtitle="Each pillar strengthens your continuous transformation capability."
            className="mb-2"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
            {serviceCards.map((card) => (
              <div key={card.href} className="[&>a]:max-w-none [&>a]:w-full [&>a]:aspect-auto [&>a]:h-95">
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
          7. STATS BAR — dark navy, 4 metrics
      ══════════════════════════════════════ */}
      <section className="bg-main py-10 lg:py-12">
        <StaggerGroup className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
          {stats.map((s) => (
            <StaggerItem key={s.label} className="flex flex-col items-center text-center px-4 py-4 lg:py-0">
              <span className="text-white text-[32px] lg:text-[40px] font-extrabold leading-none">
                {s.value}
              </span>
              <span className="text-white/55 text-xs lg:text-sm mt-1.5">{s.label}</span>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      {/* ══════════════════════════════════════
          8. OUR TRUSTED PARTNERS
      ══════════════════════════════════════ */}
      <section className="bg-white py-14 lg:py-16">
        <TrustedPartners />
      </section>

      {/* ══════════════════════════════════════
          9. TRANSFORMATION READINESS ASSESSMENT™
      ══════════════════════════════════════ */}
      <section className="">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading title="Transformation Readiness Assessment™" className="mb-8" />

          <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-start">
            {/* Left — Understand */}
            <Reveal className="flex-1 min-w-0">
              <p className="text-[#1A274F] text-base font-semibold mb-3">
                Understand your organization&apos;s transformation maturity across:
              </p>
              <ul className="flex flex-col gap-2">
                {[
                  "Strategic Alignment",
                  "Governance & Resilience",
                  "Execution Capability",
                  "Workforce Preparedness",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[#374151] text-base leading-relaxed">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#0066FF] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Right — Receive */}
            <Reveal delay={0.15} className="flex-1 min-w-0">
              <p className="text-[#1A274F] text-base font-semibold mb-3">Receive:</p>
              <ul className="flex flex-col gap-2">
                {[
                  "Executive diagnostic insights",
                  "Maturity positioning",
                  "Transformation roadmap recommendations.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[#374151] text-base leading-relaxed">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#0066FF] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          10. WHY CT IS THE NEW COMPETITIVE ADVANTAGE — BlogCard ×4 (real "insights" posts)
      ══════════════════════════════════════ */}
      {blogCards.length > 0 && (
        <section className="bg-white py-14 lg:py-20">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeading title="Why Continuous Transformation is the New Competitive Advantage" className="mb-10" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {blogCards.map((card) => (
                <div key={card.href} className="[&>div]:max-w-none [&>div]:w-full">
                  <BlogCard
                    image={card.image}
                    title={card.title}
                    date={card.date}
                    readTime={card.readTime}
                    href={card.href}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════
          11. FINAL CTA BANNER — centered dark navy
      ══════════════════════════════════════ */}
      <section className="bg-main py-16 lg:py-24">
        <Reveal className="max-w-170 mx-auto px-6 flex flex-col items-center text-center gap-5">
          <h2 className="text-white text-[26px] lg:text-[36px] font-extrabold leading-tight">
            The Future Belongs to Organizations That Experience Continuous Transformation
          </h2>
          <p className="text-white/55 text-base leading-relaxed">
            Partner with iCentra to build the capability to evolve continuously.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-3.5 rounded-full bg-[#0066FF] text-white text-base font-semibold hover:bg-light-blue hover:text-[#1A274F] transition-colors mt-2"
          >
            Talk to us today
          </Link>
        </Reveal>
      </section>

    </main>
  );
}