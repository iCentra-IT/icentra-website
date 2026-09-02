import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/components/ui/page-hero";
import HowWeDoIt from "@/components/sections/solutions/how-we-do-it";
import DottedCtaBanner from "@/components/ui/dotted-cta-banner";
import { pageMetadata } from "@/lib/seo";
import { getSolutionCategoryBySlug, solutionCategories } from "@/lib/data/solutions";

interface PageProps {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return solutionCategories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getSolutionCategoryBySlug(categorySlug);
  if (!category) return {};

  return pageMetadata({
    title: category.title,
    description: category.heroSubtext,
    path: `/what-we-do/solutions/${category.slug}`,
  });
}

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
export default async function SolutionCategoryPage({ params }: PageProps) {
  const { category: categorySlug } = await params;
  const category = getSolutionCategoryBySlug(categorySlug);
  if (!category) notFound();

  return (
    <main className="w-full overflow-x-hidden">

      {/* ══════════════════════════════════════
          1. HERO
      ══════════════════════════════════════ */}
      <PageHero headline={category.heroHeadline} subtext={category.heroSubtext} />

      {/* ══════════════════════════════════════
          2. HOW WE DO IT — 4 subcategory cards
      ══════════════════════════════════════ */}
      <HowWeDoIt
        intro={category.howWeDoItIntro}
        items={category.subcategories.map((sub) => ({
          image: sub.image,
          title: sub.title,
          description: sub.subtext,
          href: `/what-we-do/solutions/${category.slug}/${sub.slug}`,
        }))}
      />

      {/* ══════════════════════════════════════
          3. CTA
      ══════════════════════════════════════ */}
      <DottedCtaBanner
        title={category.ctaTitle}
        subtext={category.ctaSubtext}
      />

    </main>
  );
}
