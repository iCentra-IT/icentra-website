"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BlogCard from "@/components/ui/cards/blog-card";
import PageHero from "@/components/ui/page-hero";
import SectionHeading from "@/components/ui/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/ui/motion/reveal";
import { spotlightCards, newsCards } from "@/lib/data";
import { ResourceDownloadModal } from "@/components/forms/all-forms";

/* ─────────────────────────────────────────
   TABS
───────────────────────────────────────── */
type Tab = "spotlight" | "news";

const TABS: { id: Tab; label: string }[] = [
  { id: "spotlight", label: "Spotlight" },
  { id: "news", label: "News" },
];

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
export default function NewsInsightPage() {
  const [activeTab, setActiveTab] = useState<Tab>("spotlight");
  const cards = activeTab === "spotlight" ? spotlightCards : newsCards;

  return (
    <main className="w-full overflow-x-hidden">

      {/* ══════════════════════════════════════
          1. HERO — PageHero (reused)
      ══════════════════════════════════════ */}
      <PageHero
        headline="Stay Informed And Inspired"
        subtext="Our company updates, media features & press releases are thoughtfully curated and optimized for sharing, so you can stay connected and spread the word across your network."
      />

      {/* ══════════════════════════════════════
          2. SPOTLIGHT / NEWS — tabbed
      ══════════════════════════════════════ */}
      <section className="bg-white pt-16 lg:pt-20 pb-20 lg:pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading title="Spotlight & News" className="mb-4" />

          {/* Tab control */}
          <div className="relative inline-flex items-center gap-1 p-1 rounded-full bg-[#EAF3FB] mb-10">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative z-10 px-6 py-2.5 rounded-full text-[14px] font-semibold transition-colors cursor-pointer ${
                  activeTab === tab.id ? "text-white" : "text-[#1A274F] hover:text-[#0066FF]"
                }`}
              >
                {activeTab === tab.id && (
                  <motion.span
                    layoutId="news-tab-indicator"
                    className="absolute inset-0 -z-10 rounded-full bg-[#0066FF]"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                {tab.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cards.map((card) => (
                  <StaggerItem key={card.href} className="[&>div]:max-w-none [&>div]:w-full">
                    <BlogCard
                      image={card.image}
                      title={card.title}
                      date={card.date}
                      readTime={card.readTime}
                      href={card.href}
                    />
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ══════════════════════════════════════
          3. BRAND ASSETS CTA — dark navy centered banner
      ══════════════════════════════════════ */}
      <section className="relative bg-[#1A274F] overflow-hidden py-16 lg:py-20">
        <div className="relative z-10 flex flex-col items-center text-center gap-7 px-6">
          <h2 className="text-white text-[24px] sm:text-[30px] lg:text-[36px] font-bold leading-tight max-w-155">
            Company brand assets (downloadable logos) in all format
          </h2>
          <ResourceDownloadModal
            triggerLabel="Download"
            triggerClassName="inline-flex items-center px-8 py-3.5 rounded-full bg-[#0066FF] text-white text-[14px] font-semibold hover:bg-light-blue hover:text-[#1A274F] transition-colors"
          />
        </div>
      </section>

    </main>
  );
}
