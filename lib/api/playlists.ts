import { apiGet, apiRequest } from "./client";

/* ─────────────────────────────────────────
   PLAYLISTS — /api/v1/playlists/, /api/v1/staff/playlists/
   Confirmed against the live schema at /api/schema/?format=json.
───────────────────────────────────────── */

/** Public shape — GET /api/v1/playlists/ and /api/v1/playlists/{id}/videos/. */
export interface Playlist {
  id: number;
  title: string;
  youtube_playlist_id: string;
  last_synced_at: string | null;
}

export interface PlaylistVideo {
  id: number;
  youtube_video_id: string;
  title: string;
  thumbnail_url: string;
  published_at: string | null;
  position: number;
  url: string;
}

/** Staff shape — includes the registered `url` and `is_active`, not exposed publicly. */
export interface StaffPlaylist {
  id: number;
  url: string;
  youtube_playlist_id: string;
  title: string;
  is_active: boolean;
  last_synced_at: string | null;
}

interface Page<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

/** GET /api/v1/playlists/ — public. Not paginated: the schema notes the tracked-playlist count is small and static. */
export function listPlaylists(): Promise<Playlist[]> {
  return apiGet<Playlist[]>("/api/v1/playlists/", { cache: "no-store" });
}

/** GET /api/v1/playlists/{id}/videos/ — public, paginated, most recently published first. */
export async function listPlaylistVideos(id: number): Promise<PlaylistVideo[]> {
  const items: PlaylistVideo[] = [];
  let path: string | null = `/api/v1/playlists/${id}/videos/?page_size=100`;
  while (path) {
    const page: Page<PlaylistVideo> = await apiGet(path, { cache: "no-store" });
    items.push(...page.results);
    path = page.next ? page.next.replace(/^https?:\/\/[^/]+/, "") : null;
  }
  return items;
}

/* ─────────────────────────────────────────
   STAFF
───────────────────────────────────────── */
function authHeaders(accessToken: string): HeadersInit {
  return { Authorization: `Bearer ${accessToken}` };
}

export async function staffListPlaylists(accessToken: string): Promise<StaffPlaylist[]> {
  const items: StaffPlaylist[] = [];
  let path: string | null = "/api/v1/staff/playlists/?page_size=100";
  while (path) {
    const page: Page<StaffPlaylist> = await apiGet(path, { headers: authHeaders(accessToken), cache: "no-store" });
    items.push(...page.results);
    path = page.next ? page.next.replace(/^https?:\/\/[^/]+/, "") : null;
  }
  return items;
}

/** POST /api/v1/staff/playlists/ — only `url` is required; id/title/videos are derived from the YouTube RSS feed on creation. */
export function staffCreatePlaylist(accessToken: string, url: string): Promise<StaffPlaylist> {
  return apiRequest("/api/v1/staff/playlists/", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders(accessToken) },
    body: JSON.stringify({ url }),
  });
}

/** POST /api/v1/staff/playlists/{id}/sync/ — re-pulls the feed on demand. Responds 200 with no body. */
export function staffSyncPlaylist(accessToken: string, id: number): Promise<void> {
  return apiRequest(`/api/v1/staff/playlists/${id}/sync/`, {
    method: "POST",
    headers: authHeaders(accessToken),
  });
}

/** DELETE /api/v1/staff/playlists/{id}/ */
export function staffDeletePlaylist(accessToken: string, id: number): Promise<void> {
  return apiRequest(`/api/v1/staff/playlists/${id}/`, {
    method: "DELETE",
    headers: authHeaders(accessToken),
  });
}
