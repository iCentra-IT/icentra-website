"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import EventForm from "@/components/admin/event-form";
import { withFreshToken, SessionExpiredError } from "@/lib/admin/session";
import { staffGetEvent, staffUpdateEvent, staffDeleteEvent, type EventInput, type StaffEvent } from "@/lib/api/events";

export default function EditEventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();
  const [event, setEvent] = useState<StaffEvent | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    withFreshToken((token) => staffGetEvent(token, slug))
      .then((data) => {
        if (!cancelled) setEvent(data);
      })
      .catch((err) => {
        if (cancelled) return;
        if (err instanceof SessionExpiredError) {
          router.replace("/admin/login");
          return;
        }
        setNotFound(true);
      });
    return () => {
      cancelled = true;
    };
  }, [router, slug]);

  async function handleSubmit(data: EventInput) {
    try {
      const updated = await withFreshToken((token) => staffUpdateEvent(token, slug, data));
      setEvent(updated);
      if (updated.slug !== slug) router.replace(`/admin/events/${updated.slug}/edit`);
    } catch (err) {
      if (err instanceof SessionExpiredError) {
        router.replace("/admin/login");
        return;
      }
      throw err;
    }
  }

  async function handleDelete() {
    if (!event || !window.confirm(`Delete "${event.title}"? This can't be undone.`)) return;
    setDeleting(true);
    try {
      await withFreshToken((token) => staffDeleteEvent(token, slug));
      router.push("/admin/events");
    } catch (err) {
      if (err instanceof SessionExpiredError) {
        router.replace("/admin/login");
        return;
      }
      window.alert("Couldn't delete this event. Please try again.");
      setDeleting(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Link href="/admin/events" className="inline-flex items-center gap-1.5 text-[#6B7280] text-sm hover:text-[#1A274F] transition-colors mb-4">
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        All events
      </Link>

      {notFound && <p className="text-[#6B7280] text-sm">This event couldn&apos;t be found.</p>}

      {!notFound && !event && (
        <div className="flex items-center justify-center py-20">
          <div className="w-6 h-6 border-2 border-[#DCE0E8] border-t-[#0066FF] rounded-full animate-spin" />
        </div>
      )}

      {event && (
        <>
          <h1 className="text-[#1A274F] text-xl lg:text-2xl font-bold mb-6">Edit Event</h1>
          <EventForm
            initial={event}
            submitLabel="Save Changes"
            onSubmit={handleSubmit}
            extraActions={
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="px-5 py-2.5 rounded-full border border-red-200 text-red-600 text-sm font-semibold hover:bg-red-50 transition-colors disabled:opacity-50 cursor-pointer"
              >
                {deleting ? "Deleting…" : "Delete Event"}
              </button>
            }
          />
        </>
      )}
    </div>
  );
}
