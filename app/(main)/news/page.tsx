
import BlogCard from "@/components/ui/cards/blog-card";
import PageHero from "@/components/ui/page-hero";
import { spotlightCards, newsCards } from "@/lib/data";
import Link from "next/link";

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */


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
          <h2 className="text-white text-[24px] sm:text-[30px] lg:text-[36px] font-bold leading-tight max-w-155">
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