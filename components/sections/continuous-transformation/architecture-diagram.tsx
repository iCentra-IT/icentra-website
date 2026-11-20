"use client";

import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef, useState } from "react";

/** Scattered starting point -> converged diamond point (top/right/bottom/left), in a 400x400 viewBox. */
const paths = [
  { from: [70, 52], to: [200, 94] },
  { from: [352, 120], to: [306, 200] },
  { from: [300, 360], to: [200, 306] },
  { from: [44, 292], to: [94, 200] },
];

function Node({
  progress,
  index,
  label,
  aligned,
}: {
  progress: MotionValue<number>;
  index: number;
  label: string;
  aligned: boolean;
}) {
  const { from, to } = paths[index];
  const x = useTransform(progress, [0, 1], [from[0], to[0]]);
  const y = useTransform(progress, [0, 1], [from[1], to[1]]);
  const linkOpacity = useTransform(progress, [0, 0.35, 0.85, 1], [0, 1, 1, 0]);

  return (
    <>
      <motion.line
        x1={200}
        y1={200}
        x2={x}
        y2={y}
        stroke="#4A6FC2"
        strokeWidth={1.2}
        strokeDasharray="3 4"
        style={{ opacity: linkOpacity }}
      />
      <motion.g style={{ x, y }} aria-hidden="true">
        <circle
          r={34}
          fill="#0B1B4D"
          stroke={aligned ? "#00DBFF" : "#ffffff4d"}
          strokeWidth={aligned ? 3 : 1.5}
          className="transition-[stroke,stroke-width] duration-300"
        />
        <text y={4} textAnchor="middle" fontSize="9.5" letterSpacing="1" fill="#F7F8FB" className="font-mono">
          {label.toUpperCase()}
        </text>
      </motion.g>
    </>
  );
}

/**
 * ArchitectureDiagram
 * Portfolio, Project, People and Product scatter, then converge on the
 * alignment centre as this section scrolls into view — same effect as the
 * "4P Alignment Architecture" section on enterprisealignment.org, ported to
 * this site's own brand colors and content (fourPs comes from the page).
 */
export function ArchitectureDiagram({ fourPs }: { fourPs: { label: string }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [aligned, setAligned] = useState(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.95", "center 0.5"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 110, damping: 26, restDelta: 0.001 });
  const done = useMotionValue(1);
  const progress = reduce ? done : smooth;

  const rings = useTransform(progress, [0.55, 1], [0, 1]);
  const centerFill = useTransform(progress, [0.8, 0.92], ["#CBDAF7", "#00DBFF"]);
  const centerStroke = useTransform(progress, [0.8, 0.92], ["#4A6FC2", "#00DBFF"]);
  useMotionValueEvent(progress, "change", (v) => setAligned(v > 0.9));
  const isAligned = reduce || aligned;

  return (
    <div ref={ref} className="relative w-full max-w-96 aspect-square mx-auto shrink-0">
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full"
        role="img"
        aria-label="Portfolio, Project, People and Product converge on the central alignment node"
      >
        <motion.g style={{ opacity: rings }}>
          <circle cx="200" cy="200" r="150" fill="#0B1B4D" />
          <circle cx="200" cy="200" r="112" fill="#2F4F9E" />
          <circle cx="200" cy="200" r="76" fill="#CBDAF7" />
        </motion.g>
        {fourPs.map((p, i) => (
          <Node key={p.label} progress={progress} index={i} label={p.label} aligned={isAligned} />
        ))}
        <motion.circle cx="200" cy="200" r="22" strokeWidth={2} style={{ fill: centerFill, stroke: centerStroke }} />
      </svg>
    </div>
  );
}
