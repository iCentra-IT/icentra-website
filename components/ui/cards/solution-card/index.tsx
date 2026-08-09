"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const MotionLink = motion.create(Link);

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
    <MotionLink
      href={href}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="group relative block w-ful max-w-75 h-[60vh]! aspect-3/4 rounded-2xl overflow-hidden cursor-pointer"
    >
      {/* Background image */}
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 300px"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-secondary/20" />
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
            bg-glass/50 backdrop-blur-md border border-white/20
            transition-all duration-500 ease-in-out
            group-hover:bg-glass/15 group-hover:border-white/30
          "
        >
          {/* Title row — always visible */}
          <div className="pt-4 p-5">
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
            <span className="inline-flex items-center gap-1 mt-3 text-light-blue text-[13px] font-medium">
              Learn more
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </MotionLink>
  );
}
