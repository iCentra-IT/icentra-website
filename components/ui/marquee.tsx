import type { ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  /** Seconds for one full loop — lower is faster. */
  speed?: number;
  /** Reverses scroll direction (right-to-left instead of left-to-right). */
  reverse?: boolean;
  className?: string;
}

/**
 * Infinite auto-scrolling row (pure CSS — no JS, no deps). Renders the
 * children twice back-to-back and animates the pair left by exactly one
 * copy's width, so the loop has no visible seam. Pauses on hover/focus and
 * sits still for prefers-reduced-motion.
 */
export default function Marquee({ children, speed = 32, reverse = false, className = "" }: MarqueeProps) {
  return (
    <div className={`group overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] ${className}`}>
      <div
        className={`flex w-max animate-marquee gap-6 group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] ${reverse ? "[animation-direction:reverse]" : ""}`}
        style={{ animationDuration: `${speed}s` }}
      >
        <div className="flex shrink-0 gap-6">{children}</div>
        <div className="flex shrink-0 gap-6" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
