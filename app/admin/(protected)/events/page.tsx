"use client";

import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useConfirm } from "@/components/admin/confirm-dialog";
import { ListSkeleton, EmptyState, ErrorState } from "@/components/admin/list-states";
import { CalendarIcon } from "@/components/admin/icons";
import { useStaffMutation, useStaffQuery } from "@/lib/admin/queries";
import { staffListEvents, staffDeleteEvent, EVENT_STATUS_LABELS, formatEventSchedule, type StaffEvent } from "@/lib/api/events";

const STATUS_STYLES: Record<StaffEvent["status"], string> = {
  draft: "bg-[#F7F9FC] text-[#6B7280]",
  open: "bg-[#DCFCE7] text-[#15803D]",
  closed: "bg-[#FEE2E2] text-[#B91C1C]",
};

export default function AdminEventsPage() {
  const queryClient = useQueryClient();
  const confirm = useConfirm();
  const eventsQuery = useStaffQuery<StaffEvent[]>(["events"], staffListEvents);
  const deleteMutation = useStaffMutation<string, void>((token, slug) => staffDeleteEvent(token, slug));

  async function handleDelete(slug: string, title: string) {
    const ok = await confirm({ title: `Delete "${title}"?`, description: "This can't be undone.", confirmLabel: "Delete", tone: "danger" });
    if (!ok) return;
    try {
      await deleteMutation.mutateAsync(slug);
      queryClient.setQueryData<StaffEvent[]>(["events"], (prev) => prev?.filter((e) => e.slug !== slug));
      toast.success("Event deleted.");
    } catch {
      toast.error("Couldn't delete this event. Please try again.");
    }
  }

  const events = eventsQuery.data;

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

      {eventsQuery.isLoading && <ListSkeleton />}

      {eventsQuery.isError && <ErrorState message="Couldn't load events. Please try again." onRetry={() => eventsQuery.refetch()} />}

      {events && events.length === 0 && (
        <EmptyState
          icon={<CalendarIcon />}
          title="No events yet"
          description="Create the first one to start taking registrations."
          action={
            <Link href="/admin/events/new" className="text-[#0066FF] text-sm font-semibold hover:text-[#25429A] transition-colors mt-1">
              + New Event
            </Link>
          }
        />
      )}

      {events && events.length > 0 && (
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
                  disabled={deleteMutation.isPending}
                  className="text-red-600 text-sm font-semibold hover:text-red-800 transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {deleteMutation.isPending && deleteMutation.variables === event.slug ? "Deleting…" : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
