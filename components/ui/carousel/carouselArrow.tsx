// components/CarouselArrows.tsx
export function CarouselArrows({
  onPrev,
  onNext,
  canScrollLeft,
  canScrollRight,
}: {
  onPrev: () => void;
  onNext: () => void;
  canScrollLeft: boolean;
  canScrollRight: boolean;
}) {
  return (
    <div className="flex gap-2 shrink-0">
      <button
        onClick={onPrev}
        disabled={!canScrollLeft}
        aria-label="Previous"
        className={`w-9 h-9 rounded-full border flex items-center justify-center transition-colors ${
          canScrollLeft
            ? "border-[#DCE0E8] text-[#1A274F] hover:border-[#0066FF] hover:text-[#0066FF]"
            : "border-[#DCE0E8] text-[#B7BFCC] cursor-not-allowed"
        }`}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={onNext}
        disabled={!canScrollRight}
        aria-label="Next"
        className={`w-9 h-9 rounded-full border flex items-center justify-center transition-colors ${
          canScrollRight
            ? "border-[#0066FF] text-[#0066FF] hover:bg-[#0066FF] hover:text-white"
            : "border-[#DCE0E8] text-[#B7BFCC] cursor-not-allowed"
        }`}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}