"use client";

import { useEffect, useState } from "react";
import { StaggerGroup } from "@/components/ui/motion/reveal";
import PastWebinarVideoCard from "@/components/sections/events/past-webinar-video-card";
import { usePlaylists, usePlaylistVideos } from "@/lib/queries/playlists";
import { PAST_WEBINARS_YOUTUBE_PLAYLIST_ID } from "@/lib/data/events";

/**
 * Past webinar recordings come from a tracked YouTube playlist (synced from
 * the admin "Playlists" page), not from the internal Events API — past
 * sessions live on YouTube, not as Event records. Other playlists can be
 * (and already have been) tracked for unrelated reasons, so this matches
 * the specific playlist by its YouTube id rather than just taking whichever
 * comes back first.
 */
export default function PastWebinarsGrid() {
  const playlistsQuery = usePlaylists();
  const playlist = playlistsQuery.data?.find((p) => p.youtube_playlist_id === PAST_WEBINARS_YOUTUBE_PLAYLIST_ID);
  const videosQuery = usePlaylistVideos(playlist?.id);
  const [activeId, setActiveId] = useState<string | null>(null);

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
  const videos = [...(videosQuery.data ?? [])].sort(
    (a, b) => new Date(b.published_at ?? 0).getTime() - new Date(a.published_at ?? 0).getTime()
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-10">
        <div className="w-6 h-6 border-2 border-[#DCE0E8] border-t-[#0066FF] rounded-full animate-spin" />
      </div>
    );
  }

  if (!playlist || videos.length === 0) {
    return (
      <div className="bg-[#F7F9FC] rounded-2xl p-10 text-center text-[#6B7280] text-sm">
        No past webinars yet. Check back after our next session.
      </div>
    );
  }

  return (
    <>
      <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {videos.map((video) => (
          <PastWebinarVideoCard key={video.id} video={video} onPlay={setActiveId} />
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
