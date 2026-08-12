"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/motion/reveal";

export interface AccordionItem {
  title: string;
  type: "list" | "text";
  content: string[] | string;
}

function AccordionRow({
  item,
  isOpen,
  onToggle,
}: {
  item: AccordionItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-[#E5E7EB]">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left cursor-pointer"
      >
        <span className="text-[#1A274F] text-[16px] lg:text-[18px] font-semibold">
          {item.title}
        </span>
        <span className="text-[#1A274F] text-[20px] font-light shrink-0 ml-4 w-5 text-center">
          {isOpen ? "–" : "+"}
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-100 opacity-100 pb-6" : "max-h-0 opacity-0"
        }`}
      >
        {item.type === "list" ? (
          <ul className="flex flex-col gap-2 pl-1">
            {(item.content as string[]).map((point) => (
              <li
                key={point}
                className="flex items-start gap-2 text-[#6B7280] text-base leading-relaxed"
              >
                <span className="mt-2 w-1 h-1 rounded-full bg-[#6B7280] shrink-0" />
                {point}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-[#6B7280] text-[14px] leading-relaxed max-w-175">
            {item.content as string}
          </p>
        )}
      </div>
    </div>
  );
}

export default function CultureAccordion({ items }: { items: AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number>(0); // first one open by default

  return (
    <Reveal className="w-full">
      {items.map((item, i) => (
        <AccordionRow
          key={item.title}
          item={item}
          isOpen={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
        />
      ))}
    </Reveal>
  );
}
