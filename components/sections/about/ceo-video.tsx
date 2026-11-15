"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

/**
 * CeoVideo
 * A single featured video (thumbnail + play button) that opens in a
 * fullscreen lightbox — same interaction as TeamVideos and the past-webinar
 * cards, just sized for one large, prominent video instead of a grid.
 */
export default function CeoVideo({ youtubeId, title }: { youtubeId: string; title: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Play video: ${title}`}
        className="group relative block w-full max-w-5xl mx-auto aspect-video rounded-2xl overflow-hidden bg-[#D1D5DB] cursor-pointer shadow-xl shadow-[#1A274F]/10"
      >
        <Image
          src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 1024px"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
          <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6 text-[#1A274F] ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}
        >
          <div className="relative w-full max-w-5xl aspect-video" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close video"
              className="absolute -top-10 right-0 text-white/80 hover:text-white text-sm font-medium cursor-pointer"
            >
              Close ✕
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full rounded-xl"
            />
          </div>
        </div>
      )}
    </>
  );
}
