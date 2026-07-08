
import BlogCard from "@/components/ui/cards/blog-card";
import PageHero from "@/components/ui/page-hero";
import Link from "next/link";

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const spotlightCards = [
  {
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    title: "iCentra Bags Global Awards",
    date: "2nd Sep 2025",
    readTime: "2 min",
    href: "/news/icentra-bags-global-awards",
  },
  {
    image: "https://images.unsplash.com/photo-1560472355-536de3962603?w=600&q=80",
    title: "AI & Cybersecurity Governance: Getting Leadership By-In",
    date: "2nd Sep 2025",
    readTime: "2 min",
    href: "/news/ai-cybersecurity-governance",
  },
  {
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
    title: "5 Ai Driven Threats Organizations Can't Ignore In 2026",
    date: "2nd Sep 2025",
    readTime: "2 min",
    href: "/news/5-ai-driven-threats",
  },
];

const newsCards = [
  {
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80",
    title: "The New Operating Model for Sustainable Performance",
    date: "2nd Sep 2025",
    readTime: "2 min",
    href: "/news/new-operating-model",
  },
  {
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=600&q=80",
    title: "AI & Cybersecurity Governance: Getting Leadership By-In",
    date: "2nd Sep 2025",
    readTime: "2 min",
    href: "/news/ai-governance-leadership",
  },
  {
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80",
    title: "5 Ai Driven Threats Organizations Can't Ignore In 2026",
    date: "2nd Sep 2025",
    readTime: "2 min",
    href: "/news/ai-threats-2026",
  },
];

/* ─────────────────────────────────────────
   SECTION HEADING — full-width dark underline
───────────────────────────────────────── */
function SectionHeading({ children }: { children: string }) {
  return (
    <div className="mb-8">
      <h2 className="text-[#1A274F] text-[28px] lg:text-[32px] font-bold pb-3 border-b-2 border-[#1A274F] inline-block pr-6">
        {children}
      </h2>
    </div>
  );
}

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
export default function NewsInsightPage() {
  return (
    <main className="w-full overflow-x-hidden">

      {/* ══════════════════════════════════════
          1. HERO — PageHero (reused)
      ══════════════════════════════════════ */}
      <PageHero
        headline="Stay Informed And Inspired"
        subtext="Our company updates, media features & press releases are thoughtfully curated and optimized for sharing, so you can stay connected and spread the word across your network."
      />

      {/* ══════════════════════════════════════
          2. SPOTLIGHT — 3 BlogCards
      ══════════════════════════════════════ */}
      <section className="bg-white pt-16 lg:pt-20 pb-14">
        <div className="max-w-[1280px] mx-auto px-6">
          <SectionHeading>Spotlight</SectionHeading>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {spotlightCards.map((card) => (
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

      {/* ══════════════════════════════════════
          3. NEWS — 3 BlogCards
      ══════════════════════════════════════ */}
      <section className="bg-white pb-20 lg:pb-24">
        <div className="max-w-[1280px] mx-auto px-6">
          <SectionHeading>News</SectionHeading>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsCards.map((card) => (
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

      {/* ══════════════════════════════════════
          4. BRAND ASSETS CTA — dark navy centered banner
      ══════════════════════════════════════ */}
      <section className="relative bg-[#1A274F] overflow-hidden py-16 lg:py-20">
        {/* Subtle dot / circle texture */}
        

        <div className="relative z-10 flex flex-col items-center text-center gap-7 px-6">
          <h2 className="text-white text-[24px] sm:text-[30px] lg:text-[36px] font-bold leading-tight max-w-[620px]">
            Company brand assets (downloadable logos) in all format
          </h2>
          <Link
            href="/brand-assets"
            className="inline-flex items-center px-8 py-3.5 rounded-full bg-[#0066FF] text-white text-[14px] font-semibold hover:bg-light-blue hover:text-[#1A274F] transition-colors"
          >
            Download
          </Link>
        </div>
      </section>

    </main>
  );
}