"use client";

import { motion } from "framer-motion";

export interface CareerLevel {
  label: string;
  height: number;
  color: string;
}

export default function CareerLevelBars({ levels }: { levels: CareerLevel[] }) {
  return (
    <div className="flex items-end justify-center sm:gap-">
      {levels.map((level, i) => (
        <motion.div
          key={level.label}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.08 }}
          className="relative flex-1 min-w-13.5 flex items-start justify-center rounded-tl-lg max-w-35 origin-bottom"
          style={{
            height: `${level.height}px`,
            background: `linear-gradient(180deg, ${level.color}dd 0%, ${level.color} 100%)`,
            boxShadow: "inset -8px 0 14px rgba(0,0,0,0.15)",
          }}
        >
          <span className="text-white text-[10px] py-3 sm:text-sm md:text-[14px] font-semibold text-center pb-2 sm:pb-4 md:pb-5 px-1 sm:px-2 leading-snug whitespace-pre-line">
            {level.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
