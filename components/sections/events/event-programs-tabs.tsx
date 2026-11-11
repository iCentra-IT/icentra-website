"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "@/components/ui/section-heading";
import { TRANSFORM_GRAPHIC, aboutWebinar, inntechSummit, pillarStyles, DEFAULT_PILLAR_STYLE } from "@/lib/data/events";

type TabKey = "transform" | "inntech";

const TABS: { key: TabKey; label: string }[] = [
  { key: "transform", label: "Transform Webinar" },
  { key: "inntech", label: "InnTech Summit" },
];

/**
 * EventProgramsTabs
 * The Transform Webinar and InnTech Summit are two distinct iCentra event
 * programs that used to sit as separate stacked sections. Tabbed so a
 * visitor only interested in one doesn't have to scroll past the other —
 * Transform Webinar (the one iCentra runs itself) is the default.
 */
export default function EventProgramsTabs() {
  const [active, setActive] = useState<TabKey>("transform");

  return (
    <div>
      {/* Tab switcher */}
      <div className="inline-flex items-center gap-1 p-1 rounded-full bg-[#F7F9FC] border border-[#DCE0E8] mb-10">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActive(tab.key)}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-colors cursor-pointer ${
              active === tab.key
                ? "bg-[#0066FF] text-white"
                : "text-[#6B7280] hover:text-[#1A274F]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {active === "transform" ? (
          <motion.div
            key="transform"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start"
          >
            <div>
              <SectionHeading title={aboutWebinar.title} className="mb-6" />
              <div className="flex flex-col gap-4 md:px-6">
                {aboutWebinar.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-[#374151] text-base leading-[1.8]">
                    {paragraph}
                  </p>
                ))}
                <div className="flex flex-wrap gap-2 mt-2">
                  {aboutWebinar.pillars.map((pillar) => (
                    <span
                      key={pillar}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${pillarStyles[pillar] ?? DEFAULT_PILLAR_STYLE}`}
                    >
                      {pillar}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative w-full aspect-3/2 rounded-2xl overflow-hidden bg-[#F0F0F0]">
              <Image
                src={TRANSFORM_GRAPHIC}
                alt="The Transform Webinar by iCentra"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="inntech"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex flex-col lg:flex-row gap-8 lg:gap-14 items-center"
          >
            <div className="relative shrink-0 w-full lg:w-100 h-52 rounded-2xl bg-[#F7F9FC] overflow-hidden">
              <Image
                src={inntechSummit.logo}
                alt="InnTech Summit"
                fill
                className="object-contain mix-blend-multiply scale-[1.7]"
                sizes="(max-width: 1024px) 100vw, 400px"
              />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-[#1A274F] text-xl lg:text-2xl font-bold mb-3">{inntechSummit.title}</h3>
              <p className="text-[#374151] text-base leading-[1.8] mb-5">{inntechSummit.description}</p>
              <Link
                href={inntechSummit.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-[#1A274F] text-base font-medium hover:text-[#0066FF] transition-colors group"
              >
                {inntechSummit.linkLabel}
                <span className="w-7 h-7 rounded-md bg-main flex items-center justify-center group-hover:bg-[#0066FF] transition-colors">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
