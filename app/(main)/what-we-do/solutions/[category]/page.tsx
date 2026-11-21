import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import HowWeDoIt from "@/components/sections/solutions/how-we-do-it";
import DottedCtaBanner from "@/components/ui/dotted-cta-banner";
import { Reveal } from "@/components/ui/motion/reveal";
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
    image: category.image,
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
          1. HERO — copy on the left, category image on the right
      ══════════════════════════════════════ */}
      <section className="relative bg-linear-to-br from-[#0B1B4D] via-[#16266E] to-[#1E3A8A] overflow-hidden">
        <div className="absolute right-0 top-0 w-125 h-125 bg-[#0066FF]/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-16 items-center">
          <Reveal>
            <span className="inline-block text-light-blue text-xs font-bold tracking-[0.18em] uppercase border border-white/20 rounded-full px-4 py-1.5 mb-5">
              Solutions · {category.title}
            </span>
            <h1 className="text-white text-[32px] sm:text-[40px] lg:text-[48px] font-extrabold leading-[1.1] mb-5 whitespace-pre-line">
              {category.heroHeadline}
            </h1>
            <div className="w-16 h-1 rounded-full bg-light-blue mb-6" />
            <p className="text-white/75 text-base leading-[1.8] max-w-xl">
              {category.heroSubtext}
            </p>
          </Reveal>

          <Reveal delay={0.15} className="relative w-full h-64 lg:h-96 rounded-2xl overflow-hidden shrink-0">
            <Image
              src={category.image}
              alt={category.imageAlt ?? category.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 480px"
              priority
            />
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════
          2. HOW WE DO IT — 4 subcategory text blocks
      ══════════════════════════════════════ */}
      <HowWeDoIt
        intro={category.howWeDoItIntro}
        items={category.subcategories.map((sub) => ({
          title: sub.title,
          description: sub.blurb ?? sub.subtext,
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
