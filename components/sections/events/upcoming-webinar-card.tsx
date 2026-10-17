"use client";

import Link from "next/link";
import { WebinarRegistrationModal } from "@/components/forms/all-forms";
import { Reveal } from "@/components/ui/motion/reveal";
import { useEvents } from "@/lib/queries/events";
import { formatEventSchedule } from "@/lib/api/events";
import { pillarStyles, DEFAULT_PILLAR_STYLE } from "@/lib/data/events";

const REGISTER_CLASS =
  "inline-flex items-center px-6 py-3 rounded-full bg-[#0066FF] text-white text-sm font-semibold hover:bg-light-blue hover:text-[#1A274F] transition-colors cursor-pointer";

export default function UpcomingWebinarCard() {
  const { data: upcoming, isLoading } = useEvents({ upcoming: true });
  const nextEvent = upcoming
    ? [...upcoming].sort((a, b) => new Date(a.start_datetime).getTime() - new Date(b.start_datetime).getTime())[0]
    : undefined;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-10">
        <div className="w-6 h-6 border-2 border-[#DCE0E8] border-t-[#0066FF] rounded-full animate-spin" />
      </div>
    );
  }

  if (!nextEvent) {
    return (
      <div className="bg-white rounded-2xl border border-[#DCE0E8] p-10 text-center text-[#6B7280] text-sm">
        No upcoming webinars right now. Check back soon.
      </div>
    );
  }

  return (
    <Reveal className="rounded-2xl border border-[#0066FF]/40 bg-white overflow-hidden">
      <div className="bg-main h-52 lg:h-64 flex flex-col items-center justify-center gap-3 px-6 text-center">
        <p className="text-light-blue text-xs font-semibold tracking-widest uppercase">
          {nextEvent.pillar?.name ?? "Upcoming Webinar"}
        </p>
        <p className="text-white text-lg lg:text-xl font-bold max-w-3xl leading-snug">{nextEvent.title}</p>
      </div>

      <div className="p-6 lg:p-10 flex flex-col gap-4">
        <span
          className={`w-fit px-3 py-1 rounded-full text-xs font-medium ${
            nextEvent.pillar ? pillarStyles[nextEvent.pillar.name] ?? DEFAULT_PILLAR_STYLE : DEFAULT_PILLAR_STYLE
          }`}
        >
          {nextEvent.pillar?.name ?? "iCentra Event"}
        </span>
        <h3 className="text-[#1A274F] text-xl lg:text-2xl font-bold leading-snug">{nextEvent.title}</h3>
        <p className="text-[#6B7280] text-sm">{formatEventSchedule(nextEvent)}</p>
        {nextEvent.subtitle && (
          <p className="text-[#374151] text-base leading-[1.8] max-w-4xl">{nextEvent.subtitle}</p>
        )}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-2">
          <WebinarRegistrationModal
            eventSlug={nextEvent.slug}
            eventTitle={nextEvent.title}
            triggerLabel="Register now"
            triggerClassName={REGISTER_CLASS}
          />
          <Link href={`/events/${nextEvent.slug}`} className="text-[#0066FF] text-sm font-semibold hover:text-[#25429A] transition-colors">
            Full details →
          </Link>
        </div>
      </div>
    </Reveal>
  );
}
