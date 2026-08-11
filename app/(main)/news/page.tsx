import { Suspense } from "react";
import PageHero from "@/components/ui/page-hero";
import { ResourceDownloadModal } from "@/components/forms/all-forms";
import NewsExplorer, {
  type NewsCategoryChild,
  type NewsPost,
} from "@/components/sections/news/news-explorer";
import { sanityFetch } from "@/sanity/lib/live";
import { urlFor } from "@/sanity/lib/image";
import { CATEGORY_TREE_QUERY, POSTS_FOR_SLUGS_QUERY } from "@/sanity/lib/queries";
import { formatPostDate, estimateReadTimeFromText } from "@/sanity/lib/format";

const TOP_LEVEL_SLUGS = ["spotlights", "insights"];

type SanityImage = { asset?: { _ref: string } } | null | undefined;

type RawPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  mainImage?: SanityImage;
  publishedAt: string;
  plainBody?: string;
  categories?: { title: string; slug: string; parentSlug?: string | null }[];
};

type RawCategory = {
  _id: string;
  title: string;
  slug: string;
  postCount: number;
  children: NewsCategoryChild[];
};

function imageUrl(image: SanityImage): string | null {
  if (!image?.asset) return null;
  try {
    return urlFor(image).width(600).height(450).fit("crop").url();
  } catch {
    return null;
  }
}

export default async function NewsInsightPage() {
  const [{ data: categories }, { data: posts }] = await Promise.all([
    sanityFetch({ query: CATEGORY_TREE_QUERY }),
    sanityFetch({ query: POSTS_FOR_SLUGS_QUERY, params: { slugs: TOP_LEVEL_SLUGS } }),
  ]);

  const categoryTree = (categories ?? []) as RawCategory[];
  const insightsCategory = categoryTree.find((c) => c.slug === "insights");
  const spotlightsCategory = categoryTree.find((c) => c.slug === "spotlights");

  const topLevelTabs = [
    { slug: "spotlights", label: `Spotlight${spotlightsCategory ? ` (${spotlightsCategory.postCount})` : ""}` },
    { slug: "insights", label: `Insights${insightsCategory ? ` (${insightsCategory.postCount})` : ""}` },
  ];

  const newsPosts: NewsPost[] = ((posts ?? []) as RawPost[]).map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    imageUrl: imageUrl(post.mainImage),
    date: formatPostDate(post.publishedAt),
    readTime: estimateReadTimeFromText(post.plainBody),
    categorySlugs: (post.categories ?? []).flatMap((c) =>
      c.parentSlug ? [c.slug, c.parentSlug] : [c.slug]
    ),
  }));

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
          2. SPOTLIGHT / INSIGHTS — tabbed, real Sanity content
      ══════════════════════════════════════ */}
      <section className="bg-white pt-16 lg:pt-20 pb-20 lg:pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <Suspense fallback={null}>
            <NewsExplorer
              topLevelTabs={topLevelTabs}
              insightsSubcategories={insightsCategory?.children ?? []}
              posts={newsPosts}
            />
          </Suspense>
        </div>
      </section>

      {/* ══════════════════════════════════════
          3. BRAND ASSETS CTA — dark navy centered banner
      ══════════════════════════════════════ */}
      <section className="relative bg-[#1A274F] overflow-hidden py-16 lg:py-20">
        <div className="relative z-10 flex flex-col items-center text-center gap-7 px-6">
          <h2 className="text-white text-[24px] sm:text-[30px] lg:text-[36px] font-bold leading-tight max-w-155">
            Company brand assets (downloadable logos) in all format
          </h2>
          <ResourceDownloadModal
            triggerLabel="Download"
            triggerClassName="inline-flex items-center px-8 py-3.5 rounded-full bg-[#0066FF] text-white text-[14px] font-semibold hover:bg-light-blue hover:text-[#1A274F] transition-colors"
          />
        </div>
      </section>

    </main>
  );
}
