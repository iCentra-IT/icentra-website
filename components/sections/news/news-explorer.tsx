"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import BlogCard from "@/components/ui/cards/blog-card";
import { StaggerGroup, StaggerItem } from "@/components/ui/motion/reveal";
import SectionHeading from "@/components/ui/section-heading";
import Pagination from "@/components/ui/pagination";

const POSTS_PER_PAGE = 8;

export interface NewsCategoryChild {
  slug: string;
  title: string;
  postCount: number;
}

export interface NewsPost {
  slug: string;
  title: string;
  excerpt?: string;
  imageUrl: string | null;
  date: string;
  readTime: string;
  /** slugs of every category this post carries, plus each category's parent slug (if any) */
  categorySlugs: string[];
}

interface NewsExplorerProps {
  topLevelTabs: { slug: string; label: string }[];
  insightsSubcategories: NewsCategoryChild[];
  posts: NewsPost[];
}

export default function NewsExplorer({
  topLevelTabs,
  insightsSubcategories,
  posts,
}: NewsExplorerProps) {
  const searchParams = useSearchParams();
  const requestedTab = searchParams.get("tab");
  const initialTab =
    (requestedTab && topLevelTabs.some((t) => t.slug === requestedTab) && requestedTab) ||
    topLevelTabs[0]?.slug ||
    "spotlights";

  const [activeTab, setActiveTab] = useState(initialTab);
  const [activeSubFilter, setActiveSubFilter] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const isInsights = activeTab === "insights";

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      if (isInsights && activeSubFilter) {
        return post.categorySlugs.includes(activeSubFilter);
      }
      return post.categorySlugs.includes(activeTab);
    });
  }, [posts, activeTab, activeSubFilter, isInsights]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const pagedPosts = filteredPosts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  return (
    <div>
      {/* Top-level tab control */}
     <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
  <SectionHeading title="Spotlight & Insights" />

  <div className="relative flex items-end gap-1 p-1 rounded-full bg-[#EAF3FB] w-fit self-end md:self-auto max-w-full overflow-x-auto scrollbar-hide">
    {topLevelTabs.map((tab) => (
      <button
        key={tab.slug}
        onClick={() => {
          setActiveTab(tab.slug);
          setActiveSubFilter(null);
          setPage(1);
        }}
        className={`relative z-10 shrink-0 whitespace-nowrap px-4 md:px-6 py-2 md:py-2.5 rounded-full text-[13px] md:text-[14px] font-semibold transition-colors cursor-pointer ${
          activeTab === tab.slug ? "text-white" : "text-[#1A274F] hover:text-[#0066FF]"
        }`}
      >
        {activeTab === tab.slug && (
          <motion.span
            layoutId="news-tab-indicator"
            className="absolute inset-0 -z-10 rounded-full bg-[#0066FF]"
            transition={{ type: "spring", stiffness: 400, damping: 32 }}
          />
        )}
        {tab.label}
      </button>
    ))}
  </div>
</div>

      {/* Insights sub-category filter chips */}
      {isInsights && insightsSubcategories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => {
              setActiveSubFilter(null);
              setPage(1);
            }}
            className={`px-4 py-1.5 rounded-full text-[13px] font-medium border transition-colors cursor-pointer ${
              activeSubFilter === null
                ? "bg-[#1A274F] border-[#1A274F] text-white"
                : "border-[#DCE0E8] text-[#6B7280] hover:border-[#0066FF] hover:text-[#0066FF]"
            }`}
          >
            All Insights
          </button>
          {insightsSubcategories.map((sub) => (
            <button
              key={sub.slug}
              onClick={() => {
                setActiveSubFilter(sub.slug);
                setPage(1);
              }}
              className={`px-4 py-1.5 rounded-full text-[13px] font-medium border transition-colors cursor-pointer ${
                activeSubFilter === sub.slug
                  ? "bg-[#1A274F] border-[#1A274F] text-white"
                  : "border-[#DCE0E8] text-[#6B7280] hover:border-[#0066FF] hover:text-[#0066FF]"
              }`}
            >
              {sub.title} ({sub.postCount})
            </button>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeTab}-${activeSubFilter ?? "all"}-${page}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          {pagedPosts.length > 0 ? (
            <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {pagedPosts.map((post) => (
                <StaggerItem key={post.slug} className="[&>div]:max-w-none [&>div]:w-full">
                  <BlogCard
                    image={post.imageUrl ?? "/images/bg.jpg"}
                    title={post.title}
                    date={post.date}
                    readTime={post.readTime}
                    href={`/news/${post.slug}`}
                    excerpt={post.excerpt}
                  />
                </StaggerItem>
              ))}
            </StaggerGroup>
          ) : (
            <p className="text-[#6B7280] text-sm py-10 text-center">
              No articles here yet — check back soon.
            </p>
          )}
        </motion.div>
      </AnimatePresence>

      {pagedPosts.length > 0 && (
        <Pagination currentPage={page} totalPages={totalPages} onChange={setPage} />
      )}
    </div>
  );
}
