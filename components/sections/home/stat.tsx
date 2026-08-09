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

export default function StatsBar() {
  const stats = getStats();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="relative z-10 bg-main">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 sm:py-6 grid grid-cols-3 divide-x divide-[#DCE0E8]">
        {stats.map((s) => (
          <div
            key={s.label}
            className="flex flex-col items-center px-2 sm:px-4"
          >
            <span className="text-white text-[20px] sm:text-[28px] lg:text-[38px] font-extrabold leading-none">
              <AnimatedStat value={s.value} start={inView} />
            </span>
            <span className="text-white/60 text-[10px] sm:text-[11px] lg:text-[13px] mt-1 text-center">
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}