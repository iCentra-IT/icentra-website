import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import PageHero from "@/components/ui/page-hero";
import BlogCard from "@/components/ui/cards/blog-card";
import { StaggerGroup, StaggerItem } from "@/components/ui/motion/reveal";
import { sanityFetch } from "@/sanity/lib/live";
import { postImageUrl } from "@/sanity/lib/image";
import { CASE_STUDY_SLUGS_QUERY, POST_BY_SLUG_QUERY, RELATED_POSTS_QUERY } from "@/sanity/lib/queries";
import { formatPostDate, estimateReadTime, estimateReadTimeFromText } from "@/sanity/lib/format";

type SanityImage = { asset?: { _ref: string } } | null | undefined;

type SanityPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  mainImage?: SanityImage;
  publishedAt: string;
  body?: unknown;
  categories?: { title: string; slug: string; parent?: { title: string; slug: string } | null }[];
};

type SanityRelatedPost = {
  _id: string;
  title: string;
  slug: string;
  mainImage?: SanityImage;
  publishedAt: string;
  plainBody?: string;
};

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-5">{children}</p>,
    h2: ({ children }) => <h2 className="text-[#1A274F] text-[22px] font-bold mt-8 mb-4">{children}</h2>,
    h3: ({ children }) => <h3 className="text-[#1A274F] text-[19px] font-bold mt-6 mb-3">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[#0066FF] pl-5 italic text-[#1A274F] my-6">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-6 mb-5 flex flex-col gap-1.5">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-6 mb-5 flex flex-col gap-1.5">{children}</ol>,
  },
  marks: {
    link: ({ children, value }) => (
      <a href={value?.href} className="text-[#0066FF] underline hover:text-[#25429A]" target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
};

export async function generateStaticParams() {
  const { data: slugs } = await sanityFetch({ query: CASE_STUDY_SLUGS_QUERY });
  return ((slugs ?? []) as string[]).map((slug) => ({ slug }));
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: post } = await sanityFetch({ query: POST_BY_SLUG_QUERY, params: { slug } });
  const caseStudy = post as SanityPost | null;

  if (!caseStudy) notFound();

  const { data: related } = await sanityFetch({
    query: RELATED_POSTS_QUERY,
    params: { slug, categorySlugs: ["case-study"] },
  });
  const relatedCaseStudies = (related ?? []) as SanityRelatedPost[];

  const heroImage = postImageUrl(caseStudy.mainImage, 860, 484);

  return (
    <main className="w-full overflow-x-hidden">
      <PageHero headline={caseStudy.title}>
        <div className="flex items-center gap-3 text-white/70 text-[13px]">
          <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-light-blue font-medium">
            Case Study
          </span>
          <span>{formatPostDate(caseStudy.publishedAt)}</span>
          <span className="w-1.25 h-1.25 rounded-full bg-white/40 inline-block" />
          <span>{estimateReadTime(caseStudy.body)} read</span>
        </div>
      </PageHero>

      <section className="bg-white py-14 lg:py-20">
        <div className="max-w-[860px] mx-auto px-6">
          {heroImage && (
            <div className="relative w-full aspect-16/9 rounded-2xl overflow-hidden mb-10">
              <Image
                src={heroImage}
                alt={caseStudy.title}
                fill
                className="object-cover"
                sizes="(max-width: 860px) 100vw, 860px"
              />
            </div>
          )}

          <div className="flex flex-col text-[#374151] text-[15px] leading-[1.9]">
            {Array.isArray(caseStudy.body) && caseStudy.body.length > 0 ? (
              <PortableText value={caseStudy.body} components={portableTextComponents} />
            ) : (
              <p>{caseStudy.excerpt}</p>
            )}
          </div>

          <Link
            href="/industry#case-studies"
            className="inline-flex items-center gap-2 text-[#0066FF] text-[14px] font-semibold hover:gap-3 transition-all w-fit mt-10"
          >
            ← Back to Case Studies
          </Link>
        </div>
      </section>

      {relatedCaseStudies.length > 0 && (
        <section className="bg-white pb-20 lg:pb-24">
          <div className="max-w-[1280px] mx-auto px-6">
            <h2 className="text-[#1A274F] text-[22px] lg:text-[26px] font-bold mb-8">
              Other Case Studies
            </h2>
            <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedCaseStudies.map((item) => (
                <StaggerItem key={item.slug} className="[&>div]:max-w-none [&>div]:w-full">
                  <BlogCard
                    image={postImageUrl(item.mainImage, 600, 450) ?? "/images/bg.jpg"}
                    title={item.title}
                    date={formatPostDate(item.publishedAt)}
                    readTime={estimateReadTimeFromText(item.plainBody)}
                    href={`/industry/case-study/${item.slug}`}
                  />
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </section>
      )}
    </main>
  );
}
