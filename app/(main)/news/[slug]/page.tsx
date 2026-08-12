import { notFound, redirect } from "next/navigation";
import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import PageHero from "@/components/ui/page-hero";
import BlogCard from "@/components/ui/cards/blog-card";
import { StaggerGroup, StaggerItem } from "@/components/ui/motion/reveal";
import { allArticles, getArticleBySlug } from "@/lib/data";
import { sanityFetch } from "@/sanity/lib/live";
import { urlFor } from "@/sanity/lib/image";
import { ALL_POST_SLUGS_QUERY, POST_BY_SLUG_QUERY, RELATED_POSTS_QUERY } from "@/sanity/lib/queries";
import { formatPostDate, estimateReadTime } from "@/sanity/lib/format";

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
};

function imageUrl(image: SanityImage, width = 860, height = 484): string | null {
  if (!image?.asset) return null;
  try {
    return urlFor(image).width(width).height(height).fit("crop").url();
  } catch {
    return null;
  }
}

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
  const { data: sanitySlugs } = await sanityFetch({ query: ALL_POST_SLUGS_QUERY });
  const mockSlugs = allArticles.map((article) => article.slug);
  const allSlugs = new Set<string>([...((sanitySlugs ?? []) as string[]), ...mockSlugs]);
  return Array.from(allSlugs).map((slug) => ({ slug }));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: post } = await sanityFetch({ query: POST_BY_SLUG_QUERY, params: { slug } });
  const sanityPost = post as SanityPost | null;

  if (sanityPost) {
    const categorySlugs = (sanityPost.categories ?? []).flatMap((c) =>
      c.parent?.slug ? [c.slug, c.parent.slug] : [c.slug]
    );

    // Job listings and case studies have their own dedicated templates —
    // send visitors there instead of rendering the generic news layout.
    if (categorySlugs.includes("job-listing")) redirect(`/careers/${slug}`);
    if (categorySlugs.includes("case-study")) redirect(`/industry/case-study/${slug}`);

    const { data: related } = await sanityFetch({
      query: RELATED_POSTS_QUERY,
      params: { slug, categorySlugs },
    });
    const relatedPosts = (related ?? []) as SanityRelatedPost[];

    const badge = sanityPost.categories?.[0]?.title ?? "Insights";
    const heroImage = imageUrl(sanityPost.mainImage);

    return (
      <main className="w-full overflow-x-hidden">
        <PageHero headline={sanityPost.title}>
          <div className="flex items-center gap-3 text-white/70 text-[13px]">
            <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-light-blue font-medium">
              {badge}
            </span>
            <span>{formatPostDate(sanityPost.publishedAt)}</span>
            <span className="w-1.25 h-1.25 rounded-full bg-white/40 inline-block" />
            <span>{estimateReadTime(sanityPost.body)} read</span>
          </div>
        </PageHero>

        <section className="bg-white py-14 lg:py-20">
          <div className="max-w-215 mx-auto px-6">
            {heroImage && (
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-10">
                <Image
                  src={heroImage}
                  alt={sanityPost.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 860px) 100vw, 860px"
                />
              </div>
            )}

            <div className="flex flex-col text-[#374151] text-[15px] leading-[1.9]">
              {Array.isArray(sanityPost.body) && sanityPost.body.length > 0 ? (
                <PortableText value={sanityPost.body} components={portableTextComponents} />
              ) : (
                <p>{sanityPost.excerpt}</p>
              )}
            </div>
          </div>
        </section>

        {relatedPosts.length > 0 && (
          <section className="bg-white pb-20 lg:pb-24">
            <div className="max-w-[1280px] mx-auto px-6">
              <h2 className="text-[#1A274F] text-[22px] lg:text-[26px] font-bold mb-8">
                Related Articles
              </h2>
              <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedPosts.map((item) => (
                  <StaggerItem key={item.slug} className="[&>div]:max-w-none [&>div]:w-full">
                    <BlogCard
                      image={imageUrl(item.mainImage, 600, 450) ?? "/images/bg.jpg"}
                      title={item.title}
                      date={formatPostDate(item.publishedAt)}
                      href={`/news/${item.slug}`}
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

  // Fall back to the mock article set (still referenced by a few pages
  // that haven't been wired to Sanity yet).
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = allArticles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <main className="w-full overflow-x-hidden">
      <PageHero headline={article.title}>
        <div className="flex items-center gap-3 text-white/70 text-[13px]">
          <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-light-blue font-medium">
            {article.category}
          </span>
          <span>{article.date}</span>
          <span className="w-1.25 h-1.25 rounded-full bg-white/40 inline-block" />
          <span>{article.readTime} read</span>
        </div>
      </PageHero>

      <section className="bg-white py-14 lg:py-20">
        <div className="max-w-[860px] mx-auto px-6">
          <div className="relative w-full aspect-16/9 rounded-2xl overflow-hidden mb-10">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
              sizes="(max-width: 860px) 100vw, 860px"
            />
          </div>

          <div className="flex flex-col gap-5 text-[#374151] text-[15px] leading-[1.9]">
            <p>
              {article.title} is part of iCentra&apos;s ongoing coverage on transformation,
              cybersecurity, and workforce capability. Our team continues to track and report
              on the developments shaping how organizations execute strategy and manage change.
            </p>
            <p>
              Check back soon for the full write-up, or explore more of our {article.category.toLowerCase()}
              {" "}coverage below.
            </p>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-white pb-20 lg:pb-24">
          <div className="max-w-[1280px] mx-auto px-6">
            <h2 className="text-[#1A274F] text-[22px] lg:text-[26px] font-bold mb-8">
              Related Articles
            </h2>
            <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((item) => (
                <StaggerItem key={item.slug} className="[&>div]:max-w-none [&>div]:w-full">
                  <BlogCard
                    image={item.image}
                    title={item.title}
                    date={item.date}
                    readTime={item.readTime}
                    href={item.href}
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
