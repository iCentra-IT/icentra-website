// components/CardCarouselSection.tsx
"use client";

import { useCarouselScroll } from "@/hook";
import { ReactNode } from "react";
import { CarouselArrows } from "./carouselArrow";
import SectionHeading from "../section-heading";


type CardCarouselSectionProps<T> = {
  items: T[];
  renderCard: (item: T) => ReactNode;
  getKey: (item: T) => string;
  heading: string;
  underlineWord: string; // which word in the heading gets the underline
  subtitle?: string;
  bgClassName?: string; // section background — defaults to white
};

export function CardCarouselSection<T>({
  items,
  renderCard,
  getKey,
  heading,
  subtitle,
  bgClassName = "bg-white",
}: CardCarouselSectionProps<T>) {
  const { scrollRef, canScrollLeft, canScrollRight, scrollByCard } =
    useCarouselScroll();

  return (
    <section className={`${bgClassName} py-14 lg:py-20`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-start justify-between gap-4 mb-8">
          <SectionHeading title={heading} subtitle={subtitle} />

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