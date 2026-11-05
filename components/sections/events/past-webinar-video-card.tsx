"use client";

import Image from "next/image";
import { StaggerItem } from "@/components/ui/motion/reveal";
import type { PlaylistVideo } from "@/lib/api/playlists";

export default function PastWebinarVideoCard({ video, onPlay }: { video: PlaylistVideo; onPlay: (youtubeId: string) => void }) {
  const date = video.published_at
    ? new Date(video.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : null;

  return (
    <StaggerItem className="bg-white rounded-xl border border-[#DCE0E8] overflow-hidden flex flex-col">
      <button
        type="button"
        onClick={() => onPlay(video.youtube_video_id)}
        aria-label={`Play recording: ${video.title}`}
        className="group relative w-full aspect-video bg-[#F0F0F0] cursor-pointer"
      >
        <Image
          src={video.thumbnail_url}
          alt={video.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors">
          <div className="w-11 h-11 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
            <svg className="w-4 h-4 text-[#1A274F] ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </button>
      <div className="p-5 flex flex-col gap-3 flex-1">
        <h3 className="text-[#1A274F] text-base font-semibold leading-snug flex-1">{video.title}</h3>
        {date && (
          <div className="flex items-center gap-2 text-[#9CA3AF] text-sm">
            <svg className="w-4 h-4 text-[#1A274F] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3M4 11h16M5 5h14a1 1 0 011 1v13a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z" />
            </svg>
            <span>{date}</span>
          </div>
        )}
      </div>
    </StaggerItem>
  );
}
