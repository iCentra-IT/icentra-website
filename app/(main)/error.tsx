"use client";

import Link from "next/link";

export default function MainError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-20 gap-4">
      <h1 className="text-[#1A274F] text-2xl lg:text-3xl font-bold">Something went wrong</h1>
      <p className="text-[#6B7280] text-sm max-w-md">
        We couldn&apos;t load this page. Please try again in a moment, or head back to the homepage.
      </p>
      <div className="flex items-center gap-3 mt-2">
        <button
          onClick={reset}
          className="px-6 py-3 rounded-full bg-[#0066FF] text-white text-sm font-semibold hover:bg-[#25429A] transition-colors cursor-pointer"
        >
          Try again
        </button>
        <Link
          href="/"
          className="px-6 py-3 rounded-full border border-[#DCE0E8] text-[#374151] text-sm font-semibold hover:border-[#0066FF] hover:text-[#0066FF] transition-colors"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
