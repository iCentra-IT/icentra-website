import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/ui/page-hero";
import DottedCtaBanner from "@/components/ui/dotted-cta-banner";
import SectionHeading from "@/components/ui/section-heading";
import BlogCard from "@/components/ui/cards/blog-card";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/motion/reveal";
import { pageMetadata } from "@/lib/seo";
import {
  DEFAULT_CTA_LABEL,
  getSolutionSubcategory,
  solutionCategories,
} from "@/lib/data/solutions";
import { sanityFetch } from "@/sanity/lib/live";
import { postImageUrl } from "@/sanity/lib/image";
import { POSTS_BY_CATEGORY_QUERY } from "@/sanity/lib/queries";
import { formatPostDate, estimateReadTimeFromText } from "@/sanity/lib/format";

interface PageProps {
  params: Promise<{ category: string; subcategory: string }>;
}

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

export function generateStaticParams() {
  return solutionCategories.flatMap((category) =>
    category.subcategories.map((sub) => ({
      category: category.slug,
      subcategory: sub.slug,
    }))
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: categorySlug, subcategory: subcategorySlug } = await params;
  const match = getSolutionSubcategory(categorySlug, subcategorySlug);
  if (!match) return {};

  return pageMetadata({
    title: `${match.subcategory.title} | ${match.category.title}`,
    description: match.subcategory.subtext,
    path: `/what-we-do/solutions/${match.category.slug}/${match.subcategory.slug}`,
  });
}

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
export default async function SolutionSubcategoryPage({ params }: PageProps) {
  const { category: categorySlug, subcategory: subcategorySlug } = await params;
  const match = getSolutionSubcategory(categorySlug, subcategorySlug);
  if (!match) notFound();

  const { category, subcategory: sub } = match;

  let insightItems: RawPost[] = [];
  if (sub.insightCategorySlug) {
    const { data } = await sanityFetch({
      query: POSTS_BY_CATEGORY_QUERY,
      params: { slug: sub.insightCategorySlug },
    });
    insightItems = ((data ?? []) as RawPost[]).slice(0, 3);
  }

  return (
    <main className="w-full overflow-x-hidden">

      {/* ══════════════════════════════════════
          1. HERO
      ══════════════════════════════════════ */}
      <PageHero headline={sub.tagline} subtext={sub.subtext}>
        <div className="flex flex-col gap-5">
          <Link
            href={`/what-we-do/solutions/${category.slug}`}
            className="inline-flex items-center gap-2 text-white/70 text-sm font-medium hover:text-white transition-colors w-fit"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to {category.title}
          </Link>
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-white text-base lg:text-lg font-semibold">
              {sub.heroCtaLine}
            </span>
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 rounded-full bg-[#0066FF] text-white text-sm font-semibold hover:bg-[#00DBFF] hover:text-[#1A274F] transition-colors"
            >
              {sub.heroCtaLabel ?? DEFAULT_CTA_LABEL}
            </Link>
          </div>
        </div>
      </PageHero>

      {/* ══════════════════════════════════════
          2. OVERVIEW
      ══════════════════════════════════════ */}
      <section className="bg-white py-14 lg:py-16">
        <Reveal className="max-w-[1280px] mx-auto px-6 flex flex-col gap-4 max-w-[900px]">
          {sub.overview.map((paragraph, i) => (
            <p key={i} className="text-[#374151] text-base leading-[1.85]">
              {paragraph}
            </p>
          ))}
        </Reveal>
      </section>

      {/* ══════════════════════════════════════
          3. IMAGE
      ══════════════════════════════════════ */}
      <Reveal as="div" className="w-full max-w-[1280px] mx-auto px-6 pb-14">
        <div className="relative w-full h-[240px] sm:h-[320px] lg:h-[400px] rounded-2xl overflow-hidden">
          <Image src={sub.image} alt={sub.title} fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-[#0B1B4D]/30" />
        </div>
      </Reveal>

      {/* ══════════════════════════════════════
          4. SERVICES
      ══════════════════════════════════════ */}
      <section className="bg-white pb-14 lg:pb-16">
        <div className="max-w-[1280px] mx-auto px-6">
          <p className="text-[#374151] text-base leading-[1.85] max-w-[900px] mb-8">
            {sub.servicesIntro}
          </p>

          <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
            {sub.services.map((service) => (
              <StaggerItem key={service.title}>
                <h4 className="text-[#1A274F] text-sm font-bold mb-1.5">{service.title}</h4>
                <p className="text-[#6B7280] text-sm leading-relaxed">{service.description}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ══════════════════════════════════════
          5. MID CTA (with optional training links)
      ══════════════════════════════════════ */}
      <DottedCtaBanner
        title={sub.midCtaLine}
        ctaLabel={sub.midCtaLabel ?? DEFAULT_CTA_LABEL}
        extraLinks={sub.trainingLinks}
      />

      {/* ══════════════════════════════════════
          6. HOW IT WORKS
      ══════════════════════════════════════ */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-6">
          <SectionHeading
            title="How It Works"
            subtitle={sub.howItWorksIntro}
            className="mb-1"
          />

          <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
            {sub.process.map((step, i) => (
              <StaggerItem key={step.title} className="flex flex-col gap-3">
                <span className="text-[#DCE0E8] text-[36px] font-extrabold leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h4 className="text-[#1A274F] text-base font-bold">{step.title}</h4>
                <p className="text-[#6B7280] text-sm leading-relaxed">{step.description}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ══════════════════════════════════════
          7. CLOSING CTA
      ══════════════════════════════════════ */}
      <DottedCtaBanner
        title={sub.closingCtaLine}
        ctaLabel={sub.closingCtaLabel ?? DEFAULT_CTA_LABEL}
        bgClassName="bg-[#25429A]"
      />

      {/* ══════════════════════════════════════
          8. TESTIMONIAL — only when provided
      ══════════════════════════════════════ */}
      {sub.testimonial && (
        <section className="bg-white py-16 lg:py-20">
          <div className="max-w-[900px] mx-auto px-6">
            <div className="text-center mb-10">
              <SectionHeading title="Client Testimonial" />
            </div>
            <Reveal className="bg-[#F7F9FC] rounded-2xl p-8 lg:p-10 border border-[#DCE0E8] flex flex-col gap-5 text-center">
              <p className="text-[#374151] text-base lg:text-base leading-[1.85] italic">
                &ldquo;{sub.testimonial.quote}&rdquo;
              </p>
              <div>
                <p className="text-[#1A274F] text-sm font-semibold">{sub.testimonial.name}</p>
                <p className="text-[#4B6CB7] text-sm">{sub.testimonial.role}</p>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════
          9. CASE STUDY — only when provided
      ══════════════════════════════════════ */}
      {sub.caseStudy && (
        <section className="bg-[#F7F9FC] py-16 lg:py-20">
          <div className="max-w-[1280px] mx-auto px-6">
            <SectionHeading title="Case Study Highlight" subtitle={sub.caseStudyIntro} className="mb-10" />

            <Reveal className="bg-white rounded-2xl p-8 lg:p-10 border border-[#DCE0E8] flex flex-col gap-6">
              <div>
                <p className="text-[#0066FF] text-sm font-semibold tracking-[0.1em] uppercase mb-1">
                  Client
                </p>
                <p className="text-[#1A274F] text-base font-bold">{sub.caseStudy.client}</p>
              </div>
              <div>
                <p className="text-[#1A274F] text-sm font-bold mb-1.5">Challenge</p>
                <p className="text-[#6B7280] text-sm leading-relaxed">{sub.caseStudy.challenge}</p>
              </div>
              <div>
                <p className="text-[#1A274F] text-sm font-bold mb-1.5">Solution</p>
                <p className="text-[#6B7280] text-sm leading-relaxed">{sub.caseStudy.solution}</p>
              </div>
              <div>
                <p className="text-[#1A274F] text-sm font-bold mb-2">Result</p>
                <ul className="flex flex-col gap-2">
                  {sub.caseStudy.result.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[#6B7280] text-sm leading-relaxed">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#0066FF] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <Link
                  href="/industry#case-studies"
                  className="inline-flex items-center px-6 py-2.5 rounded-full bg-[#0066FF] text-white text-sm font-semibold hover:bg-[#25429A] transition-colors"
                >
                  Read More
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════
          10. INSIGHT ARTICLE — real posts when a category match exists
      ══════════════════════════════════════ */}
      {insightItems.length > 0 && (
        <section className="bg-white py-14 lg:py-20">
          <div className="max-w-[1280px] mx-auto px-6">
            <SectionHeading title="Insight Article" className="mb-10" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {insightItems.map((post) => (
                <div key={post.slug} className="[&>div]:max-w-none [&>div]:w-full">
                  <BlogCard
                    image={postImageUrl(post.mainImage) ?? "/images/bg.jpg"}
                    title={post.title}
                    date={formatPostDate(post.publishedAt)}
                    readTime={estimateReadTimeFromText(post.plainBody)}
                    href={`/news/${post.slug}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

    </main>
  );
}
