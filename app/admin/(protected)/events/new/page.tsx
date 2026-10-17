"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import EventForm from "@/components/admin/event-form";
import { useStaffMutation } from "@/lib/admin/queries";
import { staffCreateEvent, type EventInput, type StaffEvent } from "@/lib/api/events";

export default function NewEventPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const createMutation = useStaffMutation<EventInput, StaffEvent>((token, data) => staffCreateEvent(token, data));

  async function handleSubmit(data: EventInput) {
    const event = await createMutation.mutateAsync(data);
    queryClient.invalidateQueries({ queryKey: ["events"] });
    toast.success("Event created.");
    router.push(`/admin/events/${event.slug}/edit`);
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Link href="/admin/events" className="inline-flex items-center gap-1.5 text-[#6B7280] text-sm hover:text-[#1A274F] transition-colors mb-4">
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        All events
      </Link>
      <h1 className="text-[#1A274F] text-xl lg:text-2xl font-bold mb-6">New Event</h1>
      <EventForm submitLabel="Create Event" onSubmit={handleSubmit} />
    </div>
  );
}
