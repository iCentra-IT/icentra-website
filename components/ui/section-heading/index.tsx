"use client";

import { Reveal } from "@/components/ui/motion/reveal";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  underlineWidth?: string; // e.g. "w-16", "w-20" — Tailwind width class
}

export default function SectionHeading({
  title,
  subtitle,
  className = "",
  underlineWidth = "w-16",
}: SectionHeadingProps) {
  return (
    <Reveal className={`inline-block px-6 ${className}`}>
      <div className="">
        <h2 className="text-main text-[22px] lg:text-[28px] font-bold">
        {title}
      </h2>
      <div className={`h-1 bg-[#3B82F6] rounded-full mt-2 ${underlineWidth}`} />
      {subtitle && (
        <p className="text-[#5A6376] text-sm sm:text-base mt-3 ">
          {subtitle}
        </p>
      )}
      </div>
    </Reveal>
  );
}