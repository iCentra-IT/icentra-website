"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import BlogCard from "@/components/ui/cards/blog-card";

type InsightCard = {
  href: string;
  image: string;
  title: string;
  date: string;
  readTime: string;
};

function CarouselArrows({
  onPrev,
  onNext,
  canScrollLeft,
  canScrollRight,
}: {
  onPrev: () => void;
  onNext: () => void;
  canScrollLeft: boolean;
  canScrollRight: boolean;
}) {
  return (
    <div className="flex gap-2 shrink-0">
      <button
        onClick={onPrev}
        disabled={!canScrollLeft}
        aria-label="Previous"
        className={`w-9 h-9 rounded-full border flex items-center justify-center transition-colors ${
          canScrollLeft
            ? "border-[#DCE0E8] text-[#1A274F] hover:border-[#0066FF] hover:text-[#0066FF]"
            : "border-[#DCE0E8] text-[#B7BFCC] cursor-not-allowed"
        }`}
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={onNext}
        disabled={!canScrollRight}
        aria-label="Next"
        className={`w-9 h-9 rounded-full border flex items-center justify-center transition-colors ${
          canScrollRight
            ? "border-[#0066FF] text-[#0066FF] hover:bg-[#0066FF] hover:text-white"
            : "border-[#DCE0E8] text-[#B7BFCC] cursor-not-allowed"
        }`}
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

export default function TransformationInsights({
  insightCards,
}: {
  insightCards: InsightCard[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState);
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  const scrollByCard = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const cardWidth = card ? card.offsetWidth + 20 : el.clientWidth * 0.8; // 20 = gap-5
    el.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-white py-14 lg:py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-[#1A274F] text-[22px] lg:text-[28px] font-bold">
            <span className="relative inline-block">
              Transformation
              <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-[#1A274F]" />
            </span>{" "}
            Insights
          </h2>

          <CarouselArrows
            onPrev={() => scrollByCard("left")}
            onNext={() => scrollByCard("right")}
            canScrollLeft={canScrollLeft}
            canScrollRight={canScrollRight}
          />
        </div>

        {/* Scrollable card row */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide -mx-6 px-6 lg:mx-0 lg:px-0"
        >
          {insightCards.map((card) => (
            <div
              key={card.href}
              data-card
              className="snap-start shrink-0 w-[85%] sm:w-[47%] lg:w-[calc(25%-15px)]"
            >
              <BlogCard
                image={card.image}
                title={card.title}
                date={card.date}
                readTime={card.readTime}
                href={card.href}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}