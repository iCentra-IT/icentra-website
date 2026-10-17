"use client";

import { WebinarRegistrationModal } from "@/components/forms/all-forms";
import { useEvents } from "@/lib/queries/events";

const REGISTER_CLASS =
  "inline-flex items-center px-6 py-3 rounded-full bg-[#0066FF] text-white text-sm font-semibold hover:bg-light-blue hover:text-[#1A274F] transition-colors cursor-pointer";

export default function AnnouncementStrip() {
  const { data: upcoming } = useEvents({ upcoming: true });
  const nextEvent = upcoming
    ? [...upcoming].sort((a, b) => new Date(a.start_datetime).getTime() - new Date(b.start_datetime).getTime())[0]
    : undefined;

  if (!nextEvent) return null;

  return (
    <div className="bg-deep-blue border-b border-[#0066FF]/40">
      <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-light-blue text-xs font-semibold tracking-widest uppercase mb-1">
            {nextEvent.pillar?.name ?? "Upcoming"}
          </p>
          <p className="text-white text-sm sm:text-base">{nextEvent.title}</p>
        </div>
        <div className="shrink-0">
          <WebinarRegistrationModal
            eventSlug={nextEvent.slug}
            eventTitle={nextEvent.title}
            triggerLabel="Register now →"
            triggerClassName={REGISTER_CLASS}
          />
        </div>
      </div>
    </div>
  );
}
