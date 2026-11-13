import Marquee from "@/components/ui/marquee";
import { StaggerGroup, StaggerItem } from "@/components/ui/motion/reveal";
import type { SolutionTestimonial } from "@/lib/data/solutions";

/** Below this count, a marquee would just loop the same 1-3 cards almost
 *  instantly — it reads as broken, not "moving". Render a static row
 *  instead until there are enough real testimonials to scroll smoothly. */
const SCROLL_THRESHOLD = 4;

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function TestimonialCard({ t }: { t: SolutionTestimonial }) {
  return (
    <div className="w-[320px] sm:w-[360px] shrink-0 bg-[#F7F9FC] rounded-2xl p-6 flex flex-col gap-4 border border-[#DCE0E8] text-center sm:text-left">
      <svg className="w-6 h-6 text-[#0066FF]/30" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7.17 6A5.17 5.17 0 002 11.17V18h6.83v-6.83H4.5a2.67 2.67 0 012.67-2.67V6zm10 0a5.17 5.17 0 00-5.17 5.17V18H18.8v-6.83h-4.33a2.67 2.67 0 012.67-2.67V6z" />
      </svg>
      <p className="text-[#1A274F]/80 text-sm leading-relaxed italic">&ldquo;{t.quote}&rdquo;</p>
      <div className="flex items-center gap-3 pt-3 border-t border-[#DCE0E8] justify-center sm:justify-start">
        <div className="w-9 h-9 rounded-full bg-[#0066FF]/10 text-[#0066FF] text-xs font-bold flex items-center justify-center shrink-0">
          {initials(t.name)}
        </div>
        <div>
          <p className="text-[#1A274F] text-sm font-semibold">{t.name}</p>
          <p className="text-[#4B6CB7] text-xs">{t.role}</p>
        </div>
      </div>
    </div>
  );
}

/**
 * TestimonialsCarousel
 * The one place testimonials get rendered, site-wide — a single real quote
 * (e.g. a solution subcategory page) shows as a centered static card; once
 * there are enough quotes (SCROLL_THRESHOLD), it becomes an auto-scrolling
 * marquee. Swap the underlying data source and every usage updates together.
 */
export default function TestimonialsCarousel({
  testimonials,
  speed = 38,
}: {
  testimonials: SolutionTestimonial[];
  speed?: number;
}) {
  if (testimonials.length === 0) return null;

  if (testimonials.length < SCROLL_THRESHOLD) {
    return (
      <StaggerGroup className="flex flex-wrap justify-center gap-6 px-6">
        {testimonials.map((t, i) => (
          <StaggerItem key={i}>
            <TestimonialCard t={t} />
          </StaggerItem>
        ))}
      </StaggerGroup>
    );
  }

  return (
    <Marquee speed={speed}>
      {testimonials.map((t, i) => (
        <TestimonialCard key={i} t={t} />
      ))}
    </Marquee>
  );
}
