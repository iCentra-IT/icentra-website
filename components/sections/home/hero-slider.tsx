"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

/* ─────────────────────────────────────────
   SLIDE DATA
   sideImage    → used for the regular banner/panel display (overlay = false)
   overlayImage → used as the full-bleed background when overlay = true
───────────────────────────────────────── */
interface Slide {
  sideImage: string;
  overlayImage: string;
  badge: string;
  headlineItalic?: string;
  headlineBold: string;
  ctas: { label: string; href: string; primary: boolean }[];
  helperText: string;
}

const slides: Slide[] = [
  {
    sideImage: "/logo-icon.svg",
    overlayImage: "/overlay-boardroom-strategy.jpg",
    badge: "ENTERPRISE PERFORMANCE · ICENTRA",
    headlineItalic: "Experience ",
    headlineBold: "Transformation.\n Sustain Performance.",
    ctas: [
      { label: "Explore iCentra", href: "/about", primary: true },
      { label: "Our Services", href: "/services", primary: false },
    ],
    helperText: "Transforming people and organizations for sustainable performance",
  },
  {
    sideImage: "/trans.svg",
    overlayImage: "/overlay-glass-architecture.jpg",
    badge: "CONTINUOUS TRANSFORMATION",
    headlineItalic: "TRANSFORMATION ",
    headlineBold: "Is NOT A Project.\n It's a Capability.",
    ctas: [
      { label: "Discover Our Approach", href: "/approach", primary: true },
      { label: "Our Services", href: "/services", primary: false },
    ],
    helperText: "Traditional transformation ends. Continuous transformation builds the system - strategy, governance, execution, and people that sustain performance",
  },
  {
    sideImage: "/form.png",
    overlayImage: "/overlay-city-skyline-night.jpg",
    badge: "FOUR CORE DOMAINS · ONE FIRM",
    headlineItalic: "Integrated Solutions.",
    headlineBold: "For Enterprise Performance.\n",
    ctas: [
      { label: "Explore Solutions", href: "/solutions", primary: true },
      { label: "Our Services", href: "/services", primary: false },
    ],
    helperText: "From strategy to execution, governance to capacity - we deliver transformation across four domains",
  },
];

/* ─────────────────────────────────────────
   HERO SLIDER COMPONENT

   Prop `overlay`:
   - true  → full-bleed overlayImage background + dark scrim, light text (all slides)
   - false → white background, sideImage as banner/side panel, dark text (default)
───────────────────────────────────────── */
interface HeroSliderProps {
  overlay?: boolean;
}

export default function HeroSlider({ overlay = false }: HeroSliderProps) {
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

  // ── Theme tokens, switched based on overlay prop ──
  const theme = overlay
    ? {
        panelBg: "bg-[var(--color-deep-blue)]",
        badgeLine: "bg-[var(--color-light-blue)]",
        badgeText: "text-white/80",
        badgeBorder: "border-white/25",
        italicText: "text-[var(--color-light-blue)]",
        headlineText: "text-white",
        helperText: "text-white/70",
        ctaPrimary:
          "bg-[var(--color-secondary)] text-white hover:bg-[var(--color-light-blue)] hover:text-[var(--color-deep-blue)]",
        ctaSecondary:
          "bg-white/5 border border-white/25 text-white hover:bg-white/15",
        dotActive: "bg-[var(--color-light-blue)]",
        dotInactive: "bg-white/25 hover:bg-white/50",
        arrowBorder: "border-white/25 text-white hover:border-white/50 hover:bg-white/10",
        counterText: "text-white/50",
        scrollText: "text-white/30",
        bottomBorder: "border-white/10",
      }
    : {
        panelBg: "bg-white",
        badgeLine: "bg-[var(--color-secondary)]",
        badgeText: "text-[#1A274F]/70",
        badgeBorder: "border-black/15",
        italicText: "text-secondary",
        headlineText: "text-[#0D1B3E]",
        helperText: "text-[#0D1B3E]/70",
        ctaPrimary: "bg-[var(--color-secondary)] text-white hover:bg-[var(--color-light-blue)]",
        ctaSecondary:
          "bg-black/3 border border-black/15 text-[#0D1B3E] hover:bg-black/6",
        dotActive: "bg-[var(--color-secondary)]",
        dotInactive: "bg-black/20 hover:bg-black/40",
        arrowBorder:
          "border-black/15 text-[#0D1B3E] hover:border-black/40 hover:bg-black/4",
        counterText: "text-black/30",
        scrollText: "text-black/15",
        bottomBorder: "border-black/5",
      };

  return (
    <div
      className="relative w-full overflow-hidden
        lg:h-[calc(100vh-80px)] lg:min-h-130 lg:max-h-187.5"
    >
      {/* ── SLIDE CONTENT ── */}
      <div
        className={`relative lg:absolute lg:inset-0 transition-opacity duration-500 ${
          animating ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className={`relative w-full h-auto lg:h-full ${theme.panelBg} transition-colors duration-500`}>
          {/* Full-bleed overlay background image + scrim — overlay mode only */}
          {overlay && (
            <>
              <div className="absolute inset-0 z-0">
                <Image
                  src={slide.overlayImage}
                  alt=""
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority={current === 0}
                />
              </div>
              {/* Dark scrim using brand colors — keeps image present but subdued so text stays legible */}
              <div
                className="absolute inset-0 z-0"
                style={{
                  background:
                    "linear-gradient(115deg, var(--color-deep-blue) 0%, color-mix(in srgb, var(--color-main) 88%, transparent) 45%, color-mix(in srgb, var(--color-main) 55%, transparent) 100%)",
                }}
              />
            </>
          )}

          {/* Slide counter dots — desktop only */}
          <div className="hidden lg:flex absolute left-6 top-1/2 -translate-y-1/2 flex-col items-center gap-2 z-20">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === current ? `w-0.75 h-10 ${theme.dotActive}` : `w-0.5 h-5 ${theme.dotInactive}`
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Main content */}
          <div className="relative z-10 lg:h-full flex items-center px-5 sm:px-10 md:px-14 lg:px-20 xl:px-24 py-10 sm:py-12 lg:py-0">
            <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center gap-6 sm:gap-8 lg:gap-16">
              {/* Image — banner on mobile, hidden entirely in overlay mode (bg image already covers it) */}
              {/* {!overlay && ( */}
                <div className="w-full lg:hidden aspect-square lg:aspect-21/9 relative rounded-xl overflow-hidden order-first">
                  <Image
                    src={slide.sideImage}
                    alt={slide.headlineBold.replace(/\n/g, " ")}
                    fill
                    sizes="100vw"
                    className="object-cover"
                    priority={current === 0}
                  />
                </div>
              {/* // )} */}

              {/* Text column */}
              <div className="flex-1 min-w-0 w-full text-left">
                {/* Badge */}
                <div className="flex items-center justify-start gap-3 mb-4 sm:mb-6">
                  <div className={`hidden sm:block w-8 h-0.5 ${theme.badgeLine}`} />
                  <span
                    className={`${theme.badgeText} text-[10px] sm:text-[11px] tracking-[0.18em] uppercase border ${theme.badgeBorder} rounded-full px-3 sm:px-4 py-1 sm:py-1.5`}
                  >
                    {slide.badge}
                  </span>
                </div>

                {/* Headline */}
                <h1 className="text-[28px] sm:text-[36px] md:text-[48px] lg:text-[56px] xl:text-[62px] font-extrabold leading-[1.1] lg:leading-[1.05] max-w-full lg:max-w-175">
                  {slide.headlineItalic && (
                    <span className={`block italic font-extrabold ${theme.italicText}`}>
                      {slide.headlineItalic}
                    </span>
                  )}
                  {slide.headlineBold.split("\n").map((line, i) => (
                    <span key={i} className={`block ${theme.headlineText}`}>
                      {line}
                    </span>
                  ))}
                </h1>

                {/* Helper text */}
                <p className={`${theme.helperText} text-[14px] sm:text-[16px] leading-relaxed mt-4 sm:mt-6 max-w-full lg:max-w-140`}>
                  {slide.helperText}
                </p>

                {/* CTAs */}
                <div className="flex flex-row flex-wrap justify-start gap-3 mt-6 sm:mt-8">
                  {slide.ctas.map((cta) => (
                    <Link
                      key={cta.label}
                      href={cta.href}
                      className={`px-6 sm:px-7 py-3 sm:py-3.5 rounded-md text-[13px] sm:text-[14px] font-semibold text-center transition-colors ${
                        cta.primary ? theme.ctaPrimary : theme.ctaSecondary
                      }`}
                    >
                      {cta.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Image — desktop side panel, hidden entirely in overlay mode */}
              {/* {!overlay && ( */}
                <div className="hidden lg:block shrink-0 w-75 xl:w-95 aspect-4/5 relative rounded-2xl overflow-hidden">
                  <Image
                    src={slide.sideImage}
                    alt={slide.headlineBold.replace(/\n/g, " ")}
                    fill
                    sizes="(min-width: 1280px) 380px, 300px"
                    className="object-cover"
                    priority={current === 0}
                  />
                </div>
              {/* // )} */}
            </div>
          </div>

          {/* Bottom bar — counter + arrows */}
          <div className={`relative lg:absolute lg:bottom-0 lg:left-0 lg:right-0 z-10 border-t ${theme.bottomBorder} lg:border-t-0`}>
            <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-14 lg:px-20 xl:px-24 py-4 sm:py-5 flex items-center justify-end gap-4">
              <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                <div className="flex gap-2">
                  {[prev, next].map((fn, i) => (
                    <button
                      key={i}
                      onClick={fn}
                      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border flex items-center justify-center transition-colors cursor-pointer ${theme.arrowBorder}`}
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
                <span className={`${theme.counterText} text-[11px] sm:text-[12px] font-mono tracking-widest`}>
                  {String(current + 1).padStart(2, "0")} /{" "}
                  {String(total).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>

          {/* Right side vertical text — xl only */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden xl:flex">
            <span
              className={`${theme.scrollText} text-[10px] tracking-[0.3em] uppercase`}
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