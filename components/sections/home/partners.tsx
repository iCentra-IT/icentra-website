"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const partners = [
  { name: "NNPC", src: "/images/partners/NNPC.png" },
  { name: "Emerging Africa", src: "/images/partners/emerging-africa.png" },
  { name: "FCTA", src: "/images/partners/FCTA.png" },
  { name: "NRS", src: "/images/partners/NRS.png" },
  { name: "NASENI", src: "/images/partners/NASENI.png" },
  { name: "Nigerian Economic Summit Group", src: "/images/partners/nesg.png" },
  { name: "Microvis MFBank", src: "/images/partners/microvis.png" },
  { name: "Institute of Transport", src: "/images/partners/NITTZ.png" },
  { name: "Seal", src: "/images/partners/Ogun.png" },
  { name: "Health Procurement Africa", src: "/images/partners/hpa.png" },
];

type TrustedPartnersProps = {
  showControls?: boolean;
  speed?: number; // px per second
};

export default function TrustedPartners({
  showControls = false,
  speed = 40,
}: TrustedPartnersProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const pausedRef = useRef(false);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Width of ONE set of logos (track holds two sets back to back)
    const singleSetWidth = track.scrollWidth / 2;

    const step = (time: number) => {
      if (lastTimeRef.current === 0) lastTimeRef.current = time;
      const delta = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      if (!pausedRef.current) {
        offsetRef.current += speed * delta;
        // Wrap using modulo of the EXACT measured width — no drift possible
        if (offsetRef.current >= singleSetWidth) {
          offsetRef.current -= singleSetWidth;
        }
        track.style.transform = `translateX(-${offsetRef.current}px)`;
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [speed]);

  return (
    <section className="relative bg-white border-[#DCE0E8] py-12 lg:py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-[#1A274F] text-[22px] lg:text-[28px] font-bold mb-2">
          <span className="relative inline-block">
            Our
            <span className="absolute left-0 -bottom-1 h-0.5 w-full bg-secondary " />
          </span>{" "}
          Trusted Partners
        </h2>

        <p className="text-[#6B7A99] text-[13px] mb-8">
          Proudly collaborating with global standards organizations and
          technology leaders.
        </p>
      </div>

      <div className="relative w-full mask-[linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
        <div
          ref={trackRef}
          onMouseEnter={() => (pausedRef.current = true)}
          onMouseLeave={() => (pausedRef.current = false)}
          className="flex w-max items-center gap-16 will-change-transform"
        >
          {[...partners, ...partners].map((p, i) => (
            <div
              key={`${p.name}-${i}`}
              className="relative h-18 w-24 shrink-0"
            >
              <Image
                src={p.src}
                alt={p.name}
                fill
                className="object-contain object-left w-full h-full"
                // sizes="500px"
              />
            </div>
          ))}
        </div>
      </div>

      {showControls && (
        <div className="max-w-7xl mx-auto px-6 flex justify-end gap-2 mt-4">
          <button
            onClick={() => (pausedRef.current = !pausedRef.current)}
            aria-label="Pause/resume scrolling"
            className="h-9 px-4 rounded-full border border-[#DCE0E8] text-[#1A274F] text-xs font-medium hover:bg-[#F5F7FB] transition-colors"
          >
            Pause
          </button>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#DDEBFB]" />
    </section>
  );
}