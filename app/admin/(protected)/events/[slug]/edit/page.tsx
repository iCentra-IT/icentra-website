"use client";

import { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import EventForm from "@/components/admin/event-form";
import { useConfirm } from "@/components/admin/confirm-dialog";
import { useStaffMutation, useStaffQuery } from "@/lib/admin/queries";
import { staffGetEvent, staffUpdateEvent, staffDeleteEvent, type EventInput, type StaffEvent } from "@/lib/api/events";

export default function EditEventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();
  const queryClient = useQueryClient();
  const confirm = useConfirm();

  const eventQuery = useStaffQuery<StaffEvent>(["event", slug], (token) => staffGetEvent(token, slug));
  const updateMutation = useStaffMutation<EventInput, StaffEvent>((token, data) => staffUpdateEvent(token, slug, data));
  const deleteMutation = useStaffMutation<void, void>((token) => staffDeleteEvent(token, slug));

  async function handleSubmit(data: EventInput) {
    const updated = await updateMutation.mutateAsync(data);
    queryClient.setQueryData(["event", slug], updated);
    queryClient.invalidateQueries({ queryKey: ["events"] });
    toast.success("Event saved.");
    if (updated.slug !== slug) router.replace(`/admin/events/${updated.slug}/edit`);
  }

  async function handleDelete() {
    const event = eventQuery.data;
    if (!event) return;
    const ok = await confirm({ title: `Delete "${event.title}"?`, description: "This can't be undone.", confirmLabel: "Delete", tone: "danger" });
    if (!ok) return;
    try {
      await deleteMutation.mutateAsync();
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast.success("Event deleted.");
      router.push("/admin/events");
    } catch {
      toast.error("Couldn't delete this event. Please try again.");
    }
  }

  const event = eventQuery.data;

  return (
    <div className="max-w-3xl mx-auto">
      <Link href="/admin/events" className="inline-flex items-center gap-1.5 text-[#6B7280] text-sm hover:text-[#1A274F] transition-colors mb-4">
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        All events
      </Link>

      {eventQuery.isError && <p className="text-[#6B7280] text-sm">This event couldn&apos;t be found.</p>}

      {eventQuery.isLoading && (
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
                disabled={deleteMutation.isPending}
                className="px-5 py-2.5 rounded-full border border-red-200 text-red-600 text-sm font-semibold hover:bg-red-50 transition-colors disabled:opacity-50 cursor-pointer"
              >
                {deleteMutation.isPending ? "Deleting…" : "Delete Event"}
              </button>
            }
          />
        </>
      )}
    </div>
  );
}
