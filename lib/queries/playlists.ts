"use client";

import { useQuery } from "@tanstack/react-query";
import { listPlaylists, listPlaylistVideos, type Playlist, type PlaylistVideo } from "@/lib/api/playlists";

export function usePlaylists() {
  return useQuery<Playlist[]>({
    queryKey: ["playlists"],
    queryFn: () => listPlaylists(),
  });
}

export function usePlaylistVideos(id: number | undefined) {
  return useQuery<PlaylistVideo[]>({
    queryKey: ["playlist-videos", id],
    queryFn: () => listPlaylistVideos(id as number),
    enabled: typeof id === "number",
  });
}
