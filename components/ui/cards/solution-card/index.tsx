"use client";

import Image from "next/image";
import Link from "next/link";

interface SolutionCardProps {
  image: string;
  title: string;
  description: string;
  href: string;
}

export default function SolutionCard({
  image,
  title,
  description,
  href,
}: SolutionCardProps) {
  return (
    <Link
      href={href}
      className="group relative block w-full max-w-75 aspect-3/4 rounded-2xl overflow-hidden cursor-pointer"
    >
      {/* Background image */}
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 300px"
      />

      {/* Glass label — default state (bottom strip) */}
      <div
        className="
          absolute bottom-3 left-3 right-3
          rounded-xl
          overflow-hidden
          transition-all duration-500 ease-in-out
          group-hover:bottom-0 group-hover:left-0 group-hover:right-0 group-hover:rounded-none group-hover:rounded-b-2xl
        "
      >
        {/* Glassmorphism backdrop */}
        <div
          className="
            relative
            bg-white/10 backdrop-blur-md border border-white/20
            transition-all duration-500 ease-in-out
            group-hover:bg-white/15 group-hover:border-white/30
          "
        >
          {/* Title row — always visible */}
          <div className="px-4 pt-4 pb-3">
            <h3 className="text-white text-[20px] font-bold leading-tight">
              {title}
            </h3>
          </div>

          {/* Description — slides in on hover */}
          <div
            className="
              px-4 overflow-hidden
              max-h-0 opacity-0
              transition-all duration-500 ease-in-out
              group-hover:max-h-40 group-hover:opacity-100 group-hover:pb-5
            "
          >
            <p className="text-white/85 text-[14px] leading-relaxed">
              {description}
            </p>
            <span className="inline-flex items-center gap-1 mt-3 text-[#00DBFF] text-[13px] font-medium">
              Learn more
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}