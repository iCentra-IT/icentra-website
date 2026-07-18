"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

/* ─────────────────────────────────────────
   SLIDE DATA
   Every slide uses the SAME light template.
   Only the content + side image per slide changes.
───────────────────────────────────────── */
interface Slide {
  sideImage: string;
  badge: string;
  headlineItalic?: string;
  headlineBold: string;
  ctas: { label: string; href: string; primary: boolean }[];
}

const slides: Slide[] = [
  {
    sideImage: "/logo-icon.svg",
    badge: "ENTERPRISE PERFORMANCE · ICENTRA",
    headlineItalic: "Experience ",
    headlineBold: "Transformation.\n Sustain Performance.",
    ctas: [
      { label: "Explore iCentra", href: "/about", primary: true },
      { label: "Our Services", href: "/services", primary: false },
    ],
  },
  {
    sideImage: "/trans.svg",
    badge: "CONTINUOUS TRANSFORMATION",
    headlineItalic: "TRANSFORMATION ",
    headlineBold: "Is NOT A Project.\n It's a Capability.",
    ctas: [
      { label: "Discover Our Approach", href: "/approach", primary: true },
      { label: "Our Services", href: "/services", primary: false },
    ],
  },
  {
    sideImage: "/form.png",
    badge: "FOUR CORE DOMAINS · ONE FIRM",
    headlineItalic: "Integrated Solutions.",
    headlineBold: "For Enterprise Performance.\n",
    ctas: [
      { label: "Explore Solutions", href: "/solutions", primary: true },
      { label: "Our Services", href: "/services", primary: false },
    ],
  },
];

/* ─────────────────────────────────────────
   HERO SLIDER COMPONENT
───────────────────────────────────────── */
export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const total = slides.length;

  const goTo = useCallback(
    (index: number) => {
      if (animating || index === current) return;
      setAnimating(true);
      setTimeout(() => {
        setCurrent(index);
        setAnimating(false);
      }, 300);
    },
    [animating, current],
  );

  const prev = () => goTo((current - 1 + total) % total);
  const next = () => goTo((current + 1) % total);

  // Auto-advance every 6s
  useEffect(() => {
    const timer = setTimeout(() => goTo((current + 1) % total), 6000);
    return () => clearTimeout(timer);
  }, [current, goTo, total]);

  const slide = slides[current];

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        height: "calc(100vh - 68px)",
        minHeight: "520px",
        maxHeight: "750px",
      }}
    >
      {/* ── SLIDE CONTENT ── */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          animating ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="relative w-full h-full bg-white">
          {/* Left slide counter bar */}
          <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 z-20">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-0.75 h-10 bg-[#0066FF]"
                    : "w-0.5 h-5 bg-black/20 hover:bg-black/40"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Main content — two columns: text left, image right */}
          <div className="relative z-10 h-full flex items-center px-16 lg:px-24">
            <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
              {/* Text column */}
              <div className="flex-1 min-w-0">
                {/* Badge */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-0.5 bg-[#0066FF]" />
                  <span className="text-[#1A274F]/70 text-[11px] tracking-[0.18em] uppercase border border-black/15 rounded-full px-4 py-1.5">
                    {slide.badge}
                  </span>
                </div>

                {/* Headline */}
                <h1 className="text-[42px] lg:text-[62px] font-extrabold leading-[1.05] max-w-175">
                  {slide.headlineItalic && (
                    <span className="block italic text-secondary font-extrabold">
                      {slide.headlineItalic}
                    </span>
                  )}
                  {slide.headlineBold.split("\n").map((line, i) => (
                    <span key={i} className="block text-[#0D1B3E]">
                      {line}
                    </span>
                  ))}
                </h1>

                {/* CTAs */}
                <div className="flex flex-wrap gap-3 mt-8">
                  {slide.ctas.map((cta) => (
                    <Link
                      key={cta.label}
                      href={cta.href}
                      className={`px-7 py-3.5 rounded-md text-[14px] font-semibold transition-colors ${
                        cta.primary
                          ? "bg-[#0066FF] text-white "
                          : "bg-black/3 border border-black/15 text-[#0D1B3E] hover:bg-black/6"
                      }`}
                    >
                      {cta.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Image column — hidden on small screens, shown from lg up */}
              <div className="hidden lg:block shrink-0 w-[320px] xl:w-95 aspect-4/5 relative rounded-2xl overflow-hidden">
                <Image
                  src={slide.sideImage}
                  alt={slide.headlineBold.replace(/\n/g, " ")}
                  fill
                  sizes="(min-width: 1280px) 380px, 320px"
                  className="object-cover"
                  priority={current === 0}
                />
              </div>
            </div>
          </div>

          {/* Bottom bar — counter + arrows */}
          <div className="absolute bottom-0 left-0 right-0 z-10">
            <div className="max-w-7x mx-auto px-16 lg:px-24 py-5 flex items-center justify-end gap-4">
              {/* Counter + arrows */}
              <div className="flex items-center gap-4 shrink-0">
                {/* Arrows */}
                <div className="flex gap-2">
                  {[prev, next].map((fn, i) => (
                    <button
                      key={i}
                      onClick={fn}
                      className="w-9 h-9 rounded-full border border-black/15 flex items-center justify-center text-[#0D1B3E] hover:border-black/40 hover:bg-black/4 transition-colors cursor-pointer"
                      aria-label={i === 0 ? "Previous" : "Next"}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d={i === 0 ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
                        />
                      </svg>
                    </button>
                  ))}
                </div>
                {/* Slide counter */}
                <span className="text-black/30 text-[12px] font-mono tracking-widest">
                  {String(current + 1).padStart(2, "0")} /{" "}
                  {String(total).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>

          {/* Right side vertical text */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex">
            <span
              className="text-black/15 text-[10px] tracking-[0.3em] uppercase"
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
              }}
            >
              SCROLL DOWN
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}