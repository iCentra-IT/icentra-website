"use client";

import { useEffect, useRef, useState } from "react";
import SectionHeading from "@/components/ui/section-heading";
import PastWebinarVideoCard from "@/components/sections/events/past-webinar-video-card";
import { usePlaylists, usePlaylistVideos } from "@/lib/queries/playlists";
import { PAST_WEBINARS_YOUTUBE_PLAYLIST_ID } from "@/lib/data/events";

const AUTO_ADVANCE_MS = 6000;

/**
 * Past webinar recordings come from a tracked YouTube playlist (synced from
 * the admin "Playlists" page), not from the internal Events API — past
 * sessions live on YouTube, not as Event records. Other playlists can be
 * (and already have been) tracked for unrelated reasons, so this matches
 * the specific playlist by its YouTube id rather than just taking whichever
 * comes back first.
 *
 * The carousel itself is a scroll-snap track rather than a sliced array:
 * each card's width is set responsively (100% on mobile, 1/3 at lg), so
 * "scroll by one viewport" naturally means one card on mobile and three on
 * desktop, with no breakpoint detection needed in JS. Prev/next and the
 * auto-advance timer both just scroll by that same page width.
 */
export default function PastWebinarsGrid() {
  const playlistsQuery = usePlaylists();
  const playlist = playlistsQuery.data?.find((p) => p.youtube_playlist_id === PAST_WEBINARS_YOUTUBE_PLAYLIST_ID);
  const videosQuery = usePlaylistVideos(playlist?.id);
  const [activeId, setActiveId] = useState<string | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!activeId) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setActiveId(null);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeId]);

  const isLoading = playlistsQuery.isLoading || (Boolean(playlist) && videosQuery.isLoading);
  // The API's own ordering isn't reliably newest-first, so sort client-side.
  // Videos the uploader has since made private come back with no thumbnail
  // and can't actually be watched — skip them rather than show a dead card.
  const videos = (videosQuery.data ?? [])
    .filter((v) => v.thumbnail_url)
    .sort((a, b) => new Date(b.published_at ?? 0).getTime() - new Date(a.published_at ?? 0).getTime());

  function scrollByPage(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 8;
    const atStart = track.scrollLeft <= 8;
    if (direction === 1 && atEnd) {
      track.scrollTo({ left: 0, behavior: "smooth" });
    } else if (direction === -1 && atStart) {
      track.scrollTo({ left: track.scrollWidth, behavior: "smooth" });
    } else {
      track.scrollBy({ left: direction * track.clientWidth, behavior: "smooth" });
    }
  }

  // Auto-advance, paused whenever the lightbox is open.
  useEffect(() => {
    if (videos.length <= 1 || activeId) return;
    const timer = setInterval(() => scrollByPage(1), AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [videos.length, activeId]);

  const hasMultiple = !isLoading && playlist && videos.length > 1;

  return (
    <>
      <div className="flex items-start justify-between gap-4 mb-10">
        <SectionHeading
          title="Past Webinars"
          subtitle="Missed an event? Catch up on key moments, recordings, and thought leadership from past sessions."
        />
        {hasMultiple && (
          <div className="flex items-center gap-2 shrink-0 mt-1">
            <button
              onClick={() => scrollByPage(-1)}
              aria-label="Previous webinars"
              className="w-9 h-9 rounded-full border border-[#DCE0E8] flex items-center justify-center text-[#1A274F] hover:border-[#0066FF] hover:text-[#0066FF] transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scrollByPage(1)}
              aria-label="Next webinars"
              className="w-9 h-9 rounded-full border border-[#DCE0E8] flex items-center justify-center text-[#1A274F] hover:border-[#0066FF] hover:text-[#0066FF] transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-10">
          <div className="w-6 h-6 border-2 border-[#DCE0E8] border-t-[#0066FF] rounded-full animate-spin" />
        </div>
      )}

      {!isLoading && (!playlist || videos.length === 0) && (
        <div className="bg-[#F7F9FC] rounded-2xl p-10 text-center text-[#6B7280] text-sm">
          No past webinars yet. Check back after our next session.
        </div>
      )}

      {!isLoading && playlist && videos.length > 0 && (
        <div ref={trackRef} className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide">
          {videos.map((video) => (
            <div key={video.id} className="snap-start shrink-0 w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]">
              <PastWebinarVideoCard video={video} onPlay={setActiveId} />
            </div>
          ))}
        </div>
      )}

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
              title="Past webinar recording"
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
