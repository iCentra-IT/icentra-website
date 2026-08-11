"use client";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
}

function getPageNumbers(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: (number | "ellipsis")[] = [1];
  if (current > 3) pages.push("ellipsis");

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) pages.push(i);

  if (current < total - 2) pages.push("ellipsis");
  pages.push(total);

  return pages;
}

export default function Pagination({ currentPage, totalPages, onChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav className="flex items-center justify-center gap-2 mt-12" aria-label="Pagination">
      <button
        onClick={() => onChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className="w-9 h-9 rounded-full border border-[#DCE0E8] flex items-center justify-center text-[#1A274F] hover:border-[#0066FF] hover:text-[#0066FF] transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {getPageNumbers(currentPage, totalPages).map((page, i) =>
        page === "ellipsis" ? (
          <span key={`ellipsis-${i}`} className="w-9 h-9 flex items-center justify-center text-[#9CA3AF] text-[13px]">
            &hellip;
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onChange(page)}
            aria-current={page === currentPage ? "page" : undefined}
            className={`w-9 h-9 rounded-full text-[13px] font-semibold transition-colors cursor-pointer ${
              page === currentPage
                ? "bg-[#0066FF] text-white"
                : "text-[#1A274F] hover:bg-[#EAF3FB]"
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className="w-9 h-9 rounded-full border border-[#DCE0E8] flex items-center justify-center text-[#1A274F] hover:border-[#0066FF] hover:text-[#0066FF] transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </nav>
  );
}
