"use client";

import Link from "next/link";
import { useCarouselScroll } from "@/hook";
import { CarouselArrows } from "./carouselArrow";
import SectionHeading from "@/components/ui/section-heading";
import BlogCard from "@/components/ui/cards/blog-card";

export interface BlogCarouselItem {
  slug: string;
  title: string;
  excerpt?: string;
  imageUrl: string | null;
  date: string;
  readTime: string;
  /** overrides the default `/news/<slug>` destination, e.g. for case studies */
  href?: string;
}

interface BlogCardCarouselProps {
  items: BlogCarouselItem[];
  heading: string;
  subtitle?: string;
  bgClassName?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
}

export function BlogCardCarousel({
  items,
  heading,
  subtitle,
  bgClassName = "bg-white",
  viewAllHref,
  viewAllLabel = "View All",
}: BlogCardCarouselProps) {
  const { scrollRef, canScrollLeft, canScrollRight, scrollByCard } = useCarouselScroll();

  if (items.length === 0) return null;

  return (
    <section className={`${bgClassName} py-14 lg:py-20`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-start justify-between gap-4 mb-8">
          <SectionHeading title={heading} subtitle={subtitle} />
          <div className="flex items-center gap-4 shrink-0 mt-1">
            {viewAllHref && (
              <Link
                href={viewAllHref}
                className="hidden sm:inline-flex items-center gap-1.5 text-[#0066FF] text-[13px] font-semibold hover:gap-2.5 transition-all"
              >
                {viewAllLabel}
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            )}
            <CarouselArrows
              onPrev={() => scrollByCard("left")}
              onNext={() => scrollByCard("right")}
              canScrollLeft={canScrollLeft}
              canScrollRight={canScrollRight}
            />
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide -mx-6 px-6 lg:mx-0 lg:px-0"
        >
          {items.map((item) => (
            <div
              key={item.slug}
              data-card
              className="snap-start shrink-0 w-[85%] sm:w-[47%] lg:w-[calc(25%-15px)] [&>div]:max-w-none [&>div]:w-full"
            >
              <BlogCard
                image={item.imageUrl ?? "/images/bg.jpg"}
                title={item.title}
                date={item.date}
                readTime={item.readTime}
                excerpt={item.excerpt}
                href={item.href ?? `/news/${item.slug}`}
              />
            </div>
          ))}
        </div>

        {viewAllHref && (
          <div className="flex sm:hidden justify-center mt-8">
            <Link
              href={viewAllHref}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-[#0066FF] text-[#0066FF] text-[13px] font-semibold hover:bg-[#0066FF] hover:text-white transition-colors"
            >
              {viewAllLabel}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
