"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useConfirm } from "@/components/admin/confirm-dialog";
import { ListSkeleton, EmptyState, ErrorState } from "@/components/admin/list-states";
import { VideoIcon } from "@/components/admin/icons";
import { useStaffMutation, useStaffQuery } from "@/lib/admin/queries";
import { staffListPlaylists, staffCreatePlaylist, staffSyncPlaylist, staffDeletePlaylist, type StaffPlaylist } from "@/lib/api/playlists";

function formatSyncedAt(value: string | null): string {
  if (!value) return "Never synced";
  return `Synced ${new Date(value).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}`;
}

export default function AdminPlaylistsPage() {
  const queryClient = useQueryClient();
  const confirm = useConfirm();
  const [url, setUrl] = useState("");

  const playlistsQuery = useStaffQuery<StaffPlaylist[]>(["playlists"], staffListPlaylists);
  const createMutation = useStaffMutation<string, StaffPlaylist>((token, playlistUrl) => staffCreatePlaylist(token, playlistUrl));
  const syncMutation = useStaffMutation<number, void>((token, id) => staffSyncPlaylist(token, id));
  const deleteMutation = useStaffMutation<number, void>((token, id) => staffDeletePlaylist(token, id));

  async function handleAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = url.trim();
    if (!trimmed) return;
    try {
      const playlist = await createMutation.mutateAsync(trimmed);
      queryClient.setQueryData<StaffPlaylist[]>(["playlists"], (prev) => (prev ? [...prev, playlist] : [playlist]));
      setUrl("");
      toast.success(`"${playlist.title}" added — videos pulled from its feed.`);
    } catch {
      toast.error("Couldn't add that playlist. Check the URL and try again.");
    }
  }

  async function handleSync(id: number, title: string) {
    try {
      await syncMutation.mutateAsync(id);
      queryClient.invalidateQueries({ queryKey: ["playlists"] });
      queryClient.invalidateQueries({ queryKey: ["playlist-videos", id] });
      toast.success(`Synced "${title}".`);
    } catch {
      toast.error("Couldn't sync this playlist. Please try again.");
    }
  }

  async function handleDelete(id: number, title: string) {
    const ok = await confirm({
      title: `Stop tracking "${title}"?`,
      description: "Its videos will no longer show on the website.",
      confirmLabel: "Remove",
      tone: "danger",
    });
    if (!ok) return;
    try {
      await deleteMutation.mutateAsync(id);
      queryClient.setQueryData<StaffPlaylist[]>(["playlists"], (prev) => prev?.filter((p) => p.id !== id));
      toast.success("Playlist removed.");
    } catch {
      toast.error("Couldn't remove this playlist. Please try again.");
    }
  }

  const playlists = playlistsQuery.data;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-[#1A274F] text-xl lg:text-2xl font-bold">Playlists</h1>
        <p className="text-[#6B7280] text-sm mt-1">
          Track a YouTube playlist to pull its videos onto the website — e.g. the past-webinars recordings on the Events page.
        </p>
      </div>

      <form onSubmit={handleAdd} className="bg-white rounded-2xl border border-[#DCE0E8] p-5 mb-6 flex flex-col sm:flex-row gap-3">
        <input
          required
          type="url"
          placeholder="https://youtube.com/playlist?list=..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 px-4 py-2.5 rounded-xl border border-[#DCE0E8] bg-white text-sm text-[#374151] focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF]/20 transition-colors"
        />
        <button
          type="submit"
          disabled={createMutation.isPending}
          className="px-5 py-2.5 rounded-full bg-[#0066FF] text-white text-sm font-semibold hover:bg-[#25429A] transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer shrink-0"
        >
          {createMutation.isPending ? "Adding…" : "+ Add Playlist"}
        </button>
      </form>

      {playlistsQuery.isLoading && <ListSkeleton rows={2} />}

      {playlistsQuery.isError && (
        <ErrorState message="Couldn't load playlists. Please try again." onRetry={() => playlistsQuery.refetch()} />
      )}

      {playlists && playlists.length === 0 && (
        <EmptyState icon={<VideoIcon />} title="No playlists tracked yet" description="Paste a YouTube playlist URL above to start tracking it." />
      )}

      {playlists && playlists.length > 0 && (
        <div className="bg-white rounded-2xl border border-[#DCE0E8] overflow-hidden">
          {playlists.map((playlist, i) => (
            <div key={playlist.id} className={`flex items-center justify-between gap-4 px-6 py-4 ${i !== 0 ? "border-t border-[#DCE0E8]" : ""}`}>
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-10 h-10 rounded-full bg-[#EAF3FB] flex items-center justify-center text-[#0066FF] shrink-0">
                  <VideoIcon className="w-4.5 h-4.5" />
                </span>
                <div className="min-w-0">
                  <p className="text-[#1A274F] text-sm font-semibold truncate">{playlist.title}</p>
                  <p className="text-[#9CA3AF] text-xs truncate">{formatSyncedAt(playlist.last_synced_at)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                {!playlist.is_active && (
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#F7F9FC] text-[#6B7280]">Inactive</span>
                )}
                <button
                  onClick={() => handleSync(playlist.id, playlist.title)}
                  disabled={syncMutation.isPending}
                  className="text-[#0066FF] text-sm font-semibold hover:text-[#25429A] transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {syncMutation.isPending && syncMutation.variables === playlist.id ? "Syncing…" : "Sync now"}
                </button>
                <button
                  onClick={() => handleDelete(playlist.id, playlist.title)}
                  disabled={deleteMutation.isPending}
                  className="text-red-600 text-sm font-semibold hover:text-red-800 transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {deleteMutation.isPending && deleteMutation.variables === playlist.id ? "Removing…" : "Remove"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
