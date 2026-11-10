"use client";

import { getStats } from "@/lib/data";
import { useMotionValue, animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";


function parseStatValue(raw: string) {
  const match = raw.match(/^([\d.]+)(.*)$/);
  if (!match) return { number: 0, suffix: raw, decimals: 0 };

  const [, numStr, suffix] = match;
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;

  return { number: parseFloat(numStr), suffix, decimals };
}

function AnimatedStat({ value, start }: { value: string; start: boolean }) {
  const { number, suffix, decimals } = parseStatValue(value);
  const [display, setDisplay] = useState(`0${suffix}`);
  const count = useMotionValue(0);

  useEffect(() => {
    if (!start) return;

    const controls = animate(count, number, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate(latest) {
        setDisplay(`${latest.toFixed(decimals)}${suffix}`);
      },
    });

    return controls.stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start, number, suffix, decimals]);

  return <>{display}</>;
}

export interface StatItem {
  value: string;
  label: string;
}

interface StatsBarProps {
  /** Defaults to the shared homepage stats (getStats()) if not provided. */
  stats?: StatItem[];
}

export default function StatsBar({ stats: statsProp }: StatsBarProps = {}) {
  const stats = statsProp ?? getStats();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const gridClass =
    stats.length === 4 ? "grid-cols-2 lg:grid-cols-4" : stats.length === 2 ? "grid-cols-2" : "grid-cols-3";

  return (
    <div ref={ref} className="relative z-10 bg-main">
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 py-5 sm:py-6 grid ${gridClass} divide-x divide-y sm:divide-y-0 divide-white/10`}>
        {stats.map((s) => (
          <div
            key={s.label}
            className="flex flex-col items-center px-2 sm:px-4 py-2 sm:py-0"
          >
            <span className="text-white text-xl sm:text-[28px] lg:text-[38px] font-extrabold leading-none">
              <AnimatedStat value={s.value} start={inView} />
            </span>
            <span className="text-white/60 text-xs sm:text-xs lg:text-sm mt-1 text-center">
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}