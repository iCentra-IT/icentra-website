"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BlogCard from "@/components/ui/cards/blog-card";
import SectionHeading from "@/components/ui/section-heading";
import Pagination from "@/components/ui/pagination";
import { StaggerGroup, StaggerItem } from "@/components/ui/motion/reveal";

const CASE_STUDIES_PER_PAGE = 8;

export interface CaseStudyCard {
  slug: string;
  title: string;
  excerpt?: string;
  imageUrl: string | null;
  date: string;
  readTime: string;
}

export default function CaseStudiesSection({ items }: { items: CaseStudyCard[] }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(items.length / CASE_STUDIES_PER_PAGE);
  const paged = items.slice((page - 1) * CASE_STUDIES_PER_PAGE, page * CASE_STUDIES_PER_PAGE);

  return (
    <section id="case-studies" className="bg-white py-14 lg:py-20 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          title="Projects That Delivered Transformation"
          subtitle="We believe in showing. These case studies highlight the kind of change we've helped our clients achieve."
          className="mb-8"
        />

        <AnimatePresence mode="wait">
          {paged.length > 0 ? (
            <motion.div
              key={page}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {paged.map((item) => (
                  <StaggerItem key={item.slug} className="[&>div]:max-w-none [&>div]:w-full">
                    <BlogCard
                      image={item.imageUrl ?? "/images/bg.jpg"}
                      title={item.title}
                      date={item.date}
                      readTime={item.readTime}
                      excerpt={item.excerpt}
                      href={`/industry/case-study/${item.slug}`}
                    />
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </motion.div>
          ) : (
            <p className="text-[#6B7280] text-sm py-10 text-center">
              Case studies are on their way — check back soon.
            </p>
          )}
        </AnimatePresence>

        {paged.length > 0 && (
          <Pagination currentPage={page} totalPages={totalPages} onChange={setPage} />
        )}
      </div>
    </section>
  );
}
