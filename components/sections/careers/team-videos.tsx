"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { StaggerGroup, StaggerItem } from "@/components/ui/motion/reveal";

export interface TeamVideo {
  name: string;
  role: string;
  youtubeId: string;
}

function thumbnailUrl(id: string) {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

export default function TeamVideos({ videos }: { videos: TeamVideo[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (!activeId) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setActiveId(null);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeId]);

  return (
    <>
      <StaggerGroup className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {videos.map((member, i) => (
          <StaggerItem key={`${member.name}-${i}`} className="flex flex-col gap-3">
            <button
              type="button"
              onClick={() => setActiveId(member.youtubeId)}
              aria-label={`Play video featuring ${member.name}`}
              className="group relative w-full aspect-square rounded-xl overflow-hidden bg-[#D1D5DB] cursor-pointer"
            >
              <Image
                src={thumbnailUrl(member.youtubeId)}
                alt={member.name}
                fill
                className="object-cover"
                sizes="260px"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors">
                <div className="w-11 h-11 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-4 h-4 text-[#1A274F] ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </button>
            <div>
              <p className="text-[#1A274F] text-sm font-semibold">{member.name}</p>
              <p className="text-[#6B7280] text-xs">{member.role}</p>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>

      {activeId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6"
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveId(null)}
        >
          <div className="relative w-full max-w-3xl aspect-video" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setActiveId(null)}
              aria-label="Close video"
              className="absolute -top-10 right-0 text-white/80 hover:text-white text-sm font-medium cursor-pointer"
            >
              Close ✕
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${activeId}?autoplay=1`}
              title="Life at iCentra — team video"
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
