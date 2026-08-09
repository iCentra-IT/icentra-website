"use client";
import { ResourceDownloadModal } from "@/components/forms/all-forms";
import HeroSlider from "@/components/sections/home/hero-slider";
import TrustedPartners from "@/components/sections/home/partners";
import StatsBar from "@/components/sections/home/stat";
import DiscoverBanner from "@/components/ui/banner";
import BlogCard from "@/components/ui/cards/blog-card";
import SolutionCard from "@/components/ui/cards/solution-card";
import { CardCarouselSection } from "@/components/ui/carousel/carouselComponent";
import SectionHeading from "@/components/ui/section-heading";
import {
  insightCards,
  solutionCards,
  projects,
  testimonials,
  blogCards,
} from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

/* ─────────────────────────────────────────
   TINY LOCAL PRIMITIVES
───────────────────────────────────────── */
function StarRating() {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          className="w-4 h-4 text-yellow-400 fill-current"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
export default function HomePage() {
  return (
    <main className="w-full overflow-x-hidden">
      {/* ══════════════════════════════════════
          1. HERO
      ══════════════════════════════════════ */}
      <section className="relative bg-[#1A274F] overflow-hidden">
        <HeroSlider overlay />

        {/* Stats bar */}
        <StatsBar />
      </section>

      {/* ══════════════════════════════════════
          2. TRANSFORMATION INSIGHTS — BlogCard
      ══════════════════════════════════════ */}
      <CardCarouselSection
        items={insightCards}
        getKey={(card) => card.href}
        heading="Transformation Insights"
        underlineWord="Transformation"
        bgClassName="bg-white"
        renderCard={(card) => (
          <BlogCard
            image={card.image}
            title={card.title}
            date={card.date}
            readTime={card.readTime}
            href={card.href}
          />
        )}
      />

      {/* ══════════════════════════════════════
          3. TECHNOLOGY & BUSINESS SOLUTIONS — SolutionCard
      ══════════════════════════════════════ */}
      <section className="bg-white pb-14 lg:pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            title="Technology and Business Solutions That Deliver Impact"
            className="mb-8"
          />
          {/* 3 SolutionCards — equal columns, fixed height */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {solutionCards.map((s) => (
              <div
                key={s.href}
                className="[&>a]:max-w-none [&>a]:w-full [&>a]:h-95"
              >
                <SolutionCard
                  image={s.image}
                  title={s.title}
                  description={s.description}
                  href={s.href}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          4. OUR TRUSTED PARTNERS
      ══════════════════════════════════════ */}
      <TrustedPartners />

      {/* ══════════════════════════════════════
          5. HIGHLIGHTED TRANSFORMATION PROJECTS
      ══════════════════════════════════════ */}
      <CardCarouselSection
        items={projects}
        getKey={(p) => p.href}
        heading="Highlighted Transformation Projects"
        underlineWord="Highlighted"
        bgClassName="bg-[#F7F9FC]"
        renderCard={(p) => (
          <BlogCard
            image={p.bgImage}
            title={p.title}
            href={p.href}
            excerpt={p.desc}
          />
        )}
      />

      {/* ══════════════════════════════════════
          6. DISCOVER iCENTRA — CTA BANNER
      ══════════════════════════════════════ */}

      <DiscoverBanner
        headline={"Discover iCentra.\nExplore Our Expertise."}
        subtext="Learn how we help organizations achieve measurable results through innovation and strategy."
        primaryCta={{
          label: "Download Brochure",
          modal: <ResourceDownloadModal triggerLabel="Download Brochure" />,
        }}
        secondaryCta={{ label: "Explore Capabilities", href: "/what-we-do/solutions" }}
        image="/images/banner/discover-icentra.png"
        imageAlt={"Banner Image"}
      />

      {/* ══════════════════════════════════════
          7. WHAT OUR CLIENT SAY ABOUT US
      ══════════════════════════════════════ */}
      <section className="bg-white py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            title="What Our Client Say About Us"
            className="mb-8"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-[#F7F9FC] rounded-2xl p-6 flex flex-col gap-4 border border-[#DCE0E8]"
              >
                <StarRating />
                <p className="text-[#1A274F]/70 text-[13px] leading-relaxed flex-1">
                  {t.text}
                </p>
                <div className="flex items-center gap-3 pt-3 border-t border-[#DCE0E8]">
                  <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0 bg-[#A8B8F8]">
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      fill
                      className="object-cover"
                      sizes="36px"
                    />
                  </div>
                  <div>
                    <p className="text-[#1A274F] text-[13px] font-semibold">
                      {t.name}
                    </p>
                    <p className="text-[#4B6CB7] text-[11px]">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          8. THOUGHT LEADERSHIP BANNER
      ══════════════════════════════════════ */}
      <DiscoverBanner
        headline={"Thought Leadership for a Changing World\n"}
        subtext="Stay ahead with expert insights on transformation, cybersecurity, and performance delivery."
        primaryCta={{ label: "Explore Insights", href: "/news" }}
        image="/images/banner/thought-leadership.png"
        imageAlt={"Banner Image"}
      />

      {/* ══════════════════════════════════════
          9. STAY UPDATED — BLOGS & NEWS — BlogCard
      ══════════════════════════════════════ */}
      <section className="bg-white py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            title="Stay Updated with Resources, Blogs &amp; News"
            subtitle="Get the latest insights, expert articles, and company updates all in
            one place."
            className="mb-8"
          />

          {/* 3 BlogCards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {blogCards.map((b) => (
              <div key={b.href} className="[&>div]:max-w-none [&>div]:w-full">
                <BlogCard
                  image={b.image}
                  title={b.title}
                  date={b.date}
                  readTime={b.readTime}
                  href={b.href}
                />
              </div>
            ))}
          </div>

          {/* See More CTA */}
          <div className="flex justify-center mt-12">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border-2 border-[#0066FF] text-[#0066FF] text-[14px] font-semibold hover:bg-[#0066FF] hover:text-white transition-colors"
            >
              See More
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
