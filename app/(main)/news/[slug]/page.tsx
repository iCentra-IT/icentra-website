import { notFound } from "next/navigation";
import Image from "next/image";
import PageHero from "@/components/ui/page-hero";
import BlogCard from "@/components/ui/cards/blog-card";
import { StaggerGroup, StaggerItem } from "@/components/ui/motion/reveal";
import { allArticles, getArticleBySlug } from "@/lib/data";

export function generateStaticParams() {
  return allArticles.map((article) => ({ slug: article.slug }));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) notFound();

  const related = allArticles
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3);

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
            <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
