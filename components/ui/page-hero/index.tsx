"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface PageHeroProps {
  /** Large headline — supports "\n" for line breaks */
  headline: string;
  /** Optional paragraph below the headline */
  subtext?: string;
  /** Optional extra content (breadcrumb, badge, CTA) below subtext */
  children?: ReactNode;
}

/**
 * PageHero
 * Full-width deep-blue hero banner with dot-texture background,
 * large bold white headline, cyan underline accent, and subtext.
 * Used on inner pages (About Us, Services, Careers, etc.)
 *
 * Usage:
 *   <PageHero
 *     headline={"History of\nour firm"}
 *     subtext="Founded in 2009 in Abuja, Nigeria…"
 *   />
 */
export default function PageHero({ headline, subtext, children }: PageHeroProps) {
  return (
    <section className="relative w-full overflow-hidden bg-no-repeat bg-cover" style={{
      backgroundImage: "url('/images/bg.jpg')"
    }}>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-16 lg:pt-24 lg:pb-20">

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-white font-extrabold leading-[1.05] text-3xl sm:text-4xl lg:text-5xl max-w-4xl"
        >
          {headline.split("\n").map((line, i) => (
            <span key={i} className="block">{line}</span>
          ))}
        </motion.h1>

        {/* Cyan underline accent */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          style={{ transformOrigin: "left" }}
          className="mt-4 mb-7 w-27.5 h-1 rounded-full bg-light-blue"
        />

        {/* Subtext */}
        {subtext && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.25 }}
            className="text-white/75 text-[15px] lg:text-[16px] leading-[1.8] max-w-2xl"
          >
            {subtext}
          </motion.p>
        )}

        {/* Optional slot (breadcrumb, badge, CTA button, etc.) */}
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.35 }}
            className="mt-7"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}