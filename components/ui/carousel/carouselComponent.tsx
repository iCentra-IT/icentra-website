// components/CardCarouselSection.tsx
"use client";

import { useCarouselScroll } from "@/hook";
import { ReactNode } from "react";
import { CarouselArrows } from "./carouselArrow";


type CardCarouselSectionProps<T> = {
  items: T[];
  renderCard: (item: T) => ReactNode;
  getKey: (item: T) => string;
  heading: string;
  underlineWord: string; // which word in the heading gets the underline
  bgClassName?: string; // section background — defaults to white
};

export function CardCarouselSection<T>({
  items,
  renderCard,
  getKey,
  heading,
  underlineWord,
  bgClassName = "bg-white",
}: CardCarouselSectionProps<T>) {
  const { scrollRef, canScrollLeft, canScrollRight, scrollByCard } =
    useCarouselScroll();

  const headingParts = heading.split(underlineWord);

  return (
    <section className={`${bgClassName} py-14 lg:py-20`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-[#1A274F] text-[22px] lg:text-[28px] font-bold">
            <span className="relative inline-block">
              {underlineWord}
              <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-[#1A274F]" />
            </span>
            {headingParts[1]}
          </h2>

          <CarouselArrows
            onPrev={() => scrollByCard("left")}
            onNext={() => scrollByCard("right")}
            canScrollLeft={canScrollLeft}
            canScrollRight={canScrollRight}
          />
        </div>

        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide -mx-6 px-6 lg:mx-0 lg:px-0"
        >
          {items.map((item) => (
            <div
              key={getKey(item)}
              data-card
              className="snap-start shrink-0 w-[85%] sm:w-[47%] lg:w-[calc(25%-15px)]"
            >
              {renderCard(item)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}