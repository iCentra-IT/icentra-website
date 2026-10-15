"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { withFreshToken, SessionExpiredError } from "@/lib/admin/session";
import { staffListEvents, staffDeleteEvent, EVENT_STATUS_LABELS, formatEventSchedule, type StaffEvent } from "@/lib/api/events";

const STATUS_STYLES: Record<StaffEvent["status"], string> = {
  draft: "bg-[#F7F9FC] text-[#6B7280]",
  open: "bg-[#DCFCE7] text-[#15803D]",
  closed: "bg-[#FEE2E2] text-[#B91C1C]",
};

export default function AdminEventsPage() {
  const router = useRouter();
  const [events, setEvents] = useState<StaffEvent[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    withFreshToken((token) => staffListEvents(token))
      .then((data) => {
        if (!cancelled) setEvents(data);
      })
      .catch((err) => {
        if (cancelled) return;
        if (err instanceof SessionExpiredError) {
          router.replace("/admin/login");
          return;
        }
        setError("Couldn't load events. Please try again.");
      });
    return () => {
      cancelled = true;
    };
  }, [router]);

  async function handleDelete(slug: string, title: string) {
    if (!window.confirm(`Delete "${title}"? This can't be undone.`)) return;
    setDeletingSlug(slug);
    try {
      await withFreshToken((token) => staffDeleteEvent(token, slug));
      setEvents((prev) => prev?.filter((e) => e.slug !== slug) ?? null);
    } catch (err) {
      if (err instanceof SessionExpiredError) {
        router.replace("/admin/login");
        return;
      }
      window.alert("Couldn't delete this event. Please try again.");
    } finally {
      setDeletingSlug(null);
    }
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-[#1A274F] text-xl lg:text-2xl font-bold">Events</h1>
          <p className="text-[#6B7280] text-sm mt-1">Webinars, summits, and workshops shown on the public events page.</p>
        </div>
        <Link
          href="/admin/events/new"
          className="inline-flex items-center px-5 py-2.5 rounded-full bg-[#0066FF] text-white text-sm font-semibold hover:bg-[#25429A] transition-colors shrink-0"
        >
          + New Event
        </Link>
      </div>

      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

      {events === null && !error && (
        <div className="flex items-center justify-center py-20">
          <div className="w-6 h-6 border-2 border-[#DCE0E8] border-t-[#0066FF] rounded-full animate-spin" />
        </div>
      )}

      {events !== null && events.length === 0 && (
        <div className="bg-white rounded-2xl border border-[#DCE0E8] p-10 text-center text-[#6B7280] text-sm">
          No events yet. Create the first one.
        </div>
      )}

      {events !== null && events.length > 0 && (
        <div className="bg-white rounded-2xl border border-[#DCE0E8] overflow-hidden">
          {events.map((event, i) => (
            <div
              key={event.id}
              className={`flex items-center justify-between gap-4 px-6 py-4 ${i !== 0 ? "border-t border-[#DCE0E8]" : ""}`}
            >
              <div className="min-w-0">
                <p className="text-[#1A274F] text-sm font-semibold truncate">{event.title}</p>
                <p className="text-[#9CA3AF] text-xs truncate mt-0.5">{formatEventSchedule(event)}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                {!event.is_public && (
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#F7F9FC] text-[#6B7280]">Hidden</span>
                )}
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_STYLES[event.status]}`}>
                  {EVENT_STATUS_LABELS[event.status]}
                </span>
                <Link href={`/admin/events/${event.slug}/edit`} className="text-[#0066FF] text-sm font-semibold hover:text-[#25429A] transition-colors">
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(event.slug, event.title)}
                  disabled={deletingSlug === event.slug}
                  className="text-red-600 text-sm font-semibold hover:text-red-800 transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {deletingSlug === event.slug ? "Deleting…" : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
