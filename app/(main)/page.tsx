import type { Metadata } from "next";
import { NewsletterModal, ResourceDownloadModal } from "@/components/forms/all-forms";
import HeroSlider from "@/components/sections/home/hero-slider";
import TrustedPartners from "@/components/sections/home/partners";
import StatsBar from "@/components/sections/home/stat";
import DiscoverBanner from "@/components/ui/banner";
import TestimonialsCarousel from "@/components/ui/testimonials-carousel";
import BlogCard from "@/components/ui/cards/blog-card";
import SolutionCard from "@/components/ui/cards/solution-card";
import { BlogCardCarousel, type BlogCarouselItem } from "@/components/ui/carousel/blog-card-carousel";
import SectionHeading from "@/components/ui/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/ui/motion/reveal";
import { solutionCards } from "@/lib/data";
import { getAllTestimonials } from "@/lib/data/solutions";
import { sanityFetch } from "@/sanity/lib/live";
import { postImageUrl } from "@/sanity/lib/image";
import { POSTS_BY_CATEGORY_QUERY } from "@/sanity/lib/queries";
import { formatPostDate, estimateReadTimeFromText } from "@/sanity/lib/format";
import Link from "next/link";
import { pageMetadata, DEFAULT_TITLE, DEFAULT_DESCRIPTION } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    path: "/",
    image: "/images/og/home.png",
  }),
  // Bypasses the root layout's "%s | iCentra" title template — the homepage
  // title already contains "iCentra", so applying the template would
  // duplicate it ("... | iCentra | iCentra").
  title: { absolute: DEFAULT_TITLE },
};

/* ─────────────────────────────────────────
   SANITY DATA SHAPING
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

function toCarouselItems(posts: RawPost[], hrefBase: string): BlogCarouselItem[] {
  return posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    imageUrl: postImageUrl(post.mainImage),
    date: formatPostDate(post.publishedAt),
    readTime: estimateReadTimeFromText(post.plainBody),
    href: `${hrefBase}/${post.slug}`,
  }));
}

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
export default async function HomePage() {
  const [{ data: insightPosts }, { data: caseStudyPosts }, { data: spotlightPosts }] =
    await Promise.all([
      sanityFetch({ query: POSTS_BY_CATEGORY_QUERY, params: { slug: "insights" } }),
      sanityFetch({ query: POSTS_BY_CATEGORY_QUERY, params: { slug: "case-study" } }),
      sanityFetch({ query: POSTS_BY_CATEGORY_QUERY, params: { slug: "spotlights" } }),
    ]);

  const insightItems = toCarouselItems(((insightPosts ?? []) as RawPost[]).slice(0, 4), "/news");
  const caseStudyItems = toCarouselItems(((caseStudyPosts ?? []) as RawPost[]).slice(0, 4), "/industry/case-study");
  const spotlightItems = ((spotlightPosts ?? []) as RawPost[]).slice(0, 4).map((post) => ({
    slug: post.slug,
    title: post.title,
    imageUrl: postImageUrl(post.mainImage),
    date: formatPostDate(post.publishedAt),
    readTime: estimateReadTimeFromText(post.plainBody),
  }));

  return (
    <main className="w-full overflow-x-hidden">
      {/* ══════════════════════════════════════
          1. HERO
      ══════════════════════════════════════ */}
      <section className="border-b border-[#DCE0E8]">
        <HeroSlider />
      </section>

      {/* Stats bar */}
      <StatsBar />

      {/* ══════════════════════════════════════
          2. TRANSFORMATION INSIGHTS — real posts, carousel + View All
      ══════════════════════════════════════ */}
      <BlogCardCarousel
        items={insightItems}
        heading="Transformation Insights"
        bgClassName="bg-white"
        viewAllHref="/news?tab=insights"
        viewAllLabel="View All Insights"
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
                  list={s.list}
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
          5. HIGHLIGHTED TRANSFORMATION PROJECTS — real case studies, carousel + View All
      ══════════════════════════════════════ */}
      <BlogCardCarousel
        items={caseStudyItems}
        heading="Highlighted Transformation Projects"
        bgClassName="bg-[#F7F9FC]"
        viewAllHref="/industry#case-studies"
        viewAllLabel="View All Case Studies"
        showDate={false}
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
        image="/images/banner/support.jpg"
        imageAlt={"Banner Image"}
      />

      {/* ══════════════════════════════════════
          6b. iCENTRA LEARNING — CTA BANNER
      ══════════════════════════════════════ */}
      <DiscoverBanner
        headline={"Build Capability.\nAccelerate Performance."}
        subtext="Globally aligned certifications, executive programs, and workforce capability solutions designed to deliver measurable business outcomes."
        primaryCta={{ label: "Explore iCentra Learning", href: "https://learning.icentra.com/" }}
        image="/images/banner/learning-talent.webp"
        imageAlt="iCentra Learning executive training session"
        imagePosition="left"
      />

      {/* ══════════════════════════════════════
          7. WHAT OUR CLIENTS SAY ABOUT US — real quotes pulled from the
             solution subcategory pages (lib/data/solutions.ts). Scrolls
             automatically once there are enough of them; shows as a
             static row until then.
      ══════════════════════════════════════ */}
      <section className="bg-white py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            title="What Our Clients Say About Us"
            className="mb-8"
          />
        </div>

        <TestimonialsCarousel testimonials={getAllTestimonials()} />
      </section>

      {/* ══════════════════════════════════════
          9. STAY UPDATED — SPOTLIGHTS — BlogCard
      ══════════════════════════════════════ */}
      <section className="bg-white py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            title="Stay Updated with Resources, Blogs &amp; News"
            subtitle="Get the latest insights, expert articles, and company updates all in
            one place."
            className="mb-8"
          />

          <StaggerGroup className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide -mx-6 px-6 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:snap-none lg:grid-cols-4">
            {spotlightItems.map((post) => (
              <StaggerItem
                key={post.slug}
                className="snap-start shrink-0 w-[85%] sm:w-auto sm:shrink [&>div]:max-w-none [&>div]:w-full"
              >
                <BlogCard
                  image={post.imageUrl ?? "/images/bg.jpg"}
                  title={post.title}
                  date={post.date}
                  readTime={post.readTime}
                  href={`/news/${post.slug}`}
                />
              </StaggerItem>
            ))}
          </StaggerGroup>

          {/* See More CTA */}
          <div className="flex justify-center mt-12">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border-2 border-[#0066FF] text-[#0066FF] text-sm font-semibold hover:bg-[#0066FF] hover:text-white transition-colors"
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

      {/* ══════════════════════════════════════
          8. THOUGHT LEADERSHIP BANNER
      ══════════════════════════════════════ */}
      <DiscoverBanner
        headline={"Thought Leadership for a Changing World\n"}
        subtext="Stay ahead with expert insights on transformation, cybersecurity, and performance delivery."
        primaryCta={{ label: "Explore Insights", href: "/news?tab=insights" }}
        secondaryCta={{
          label: "Subscribe to Newsletter",
          modal: (
            <NewsletterModal
              triggerLabel="Subscribe to Newsletter"
              triggerClassName="inline-flex items-center px-6 py-3 rounded-full border border-white/50 text-white text-sm font-semibold hover:bg-white hover:text-[#1A274F] transition-colors cursor-pointer"
            />
          ),
        }}
        image="/images/banner/thought-leadership.png"
        imageAlt={"Banner Image"}
      />
    </main>
  );
}
