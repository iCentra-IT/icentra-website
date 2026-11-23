"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ListSkeleton, EmptyState, ErrorState } from "@/components/admin/list-states";
import { MailIcon } from "@/components/admin/icons";
import { useStaffQuery } from "@/lib/admin/queries";
import {
  staffListAllEventRegistrations,
  EVENT_REGISTRATION_STATUS_LABELS,
  type EventRegistrationStatus,
} from "@/lib/api/events";

const STATUS_BADGE: Record<EventRegistrationStatus, string> = {
  registered: "bg-[#EAF3FB] text-[#0066FF]",
  attended: "bg-[#DCFCE7] text-[#15803D]",
  waitlisted: "bg-[#FEF3C7] text-[#92400E]",
  no_show: "bg-[#FEE2E2] text-[#B91C1C]",
  cancelled: "bg-[#F7F9FC] text-[#6B7280]",
};

function formatDate(iso: string | null): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function AllRegistrationsPage() {
  const [status, setStatus] = useState<EventRegistrationStatus | "">("");
  const [eventSlug, setEventSlug] = useState("");

  const query = useStaffQuery(["event-registrations", "all"], staffListAllEventRegistrations);
  const all = useMemo(() => query.data ?? [], [query.data]);

  const eventOptions = useMemo(() => {
    const seen = new Map<string, string>();
    all.forEach((reg) => seen.set(reg.eventSlug, reg.eventTitle));
    return Array.from(seen.entries());
  }, [all]);

  const filtered = all.filter((reg) => (!status || reg.status === status) && (!eventSlug || reg.eventSlug === eventSlug));

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-[#1A274F] text-xl lg:text-2xl font-bold">Event Registrations</h1>
        <p className="text-[#6B7280] text-sm mt-1">Every registration across every event, newest first.</p>
      </div>

      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <select
          value={eventSlug}
          onChange={(e) => setEventSlug(e.target.value)}
          className="px-3.5 py-2 rounded-full border border-[#DCE0E8] text-[#374151] text-sm font-medium bg-white cursor-pointer"
        >
          <option value="">All events</option>
          {eventOptions.map(([slug, title]) => (
            <option key={slug} value={slug}>
              {title}
            </option>
          ))}
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as EventRegistrationStatus | "")}
          className="px-3.5 py-2 rounded-full border border-[#DCE0E8] text-[#374151] text-sm font-medium bg-white cursor-pointer"
        >
          <option value="">All statuses</option>
          {Object.entries(EVENT_REGISTRATION_STATUS_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {query.isLoading && <ListSkeleton rows={5} />}

      {query.isError && <ErrorState message="Couldn't load registrations. Please try again." onRetry={() => query.refetch()} />}

      {query.data && filtered.length === 0 && (
        <EmptyState
          icon={<MailIcon />}
          title="No registrations yet"
          description={query.data.length === 0 ? "Attendees across all events will show up here." : "No registrations match these filters."}
        />
      )}

      {filtered.length > 0 && (
        <div className="flex flex-col gap-3">
          {filtered.map((reg) => (
            <div key={reg.id} className="bg-white border border-[#DCE0E8] rounded-xl p-4 flex flex-col gap-3">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div className="min-w-0">
                  <p className="text-[#1A274F] text-sm font-semibold truncate">{reg.full_name}</p>
                  <p className="text-[#6B7280] text-xs truncate">{reg.email}</p>
                  <Link
                    href={`/admin/events/${reg.eventSlug}/edit`}
                    className="text-[#0066FF] text-xs font-semibold hover:underline"
                  >
                    {reg.eventTitle}
                  </Link>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold shrink-0 ${STATUS_BADGE[reg.status]}`}>
                  {EVENT_REGISTRATION_STATUS_LABELS[reg.status]}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-2 text-xs">
                <div>
                  <p className="text-[#9CA3AF]">Registered</p>
                  <p className="text-[#374151] font-medium">{formatDate(reg.registered_at)}</p>
                </div>
                <div>
                  <p className="text-[#9CA3AF]">Organization</p>
                  <p className="text-[#374151] font-medium truncate">{reg.organization || "—"}</p>
                </div>
                <div>
                  <p className="text-[#9CA3AF]">Job Title</p>
                  <p className="text-[#374151] font-medium truncate">{reg.job_title || "—"}</p>
                </div>
                <div>
                  <p className="text-[#9CA3AF]">Timezone</p>
                  <p className="text-[#374151] font-medium">{reg.timezone || "—"}</p>
                </div>
              </div>

              {reg.questions_for_host && (
                <p className="text-[#374151] text-xs leading-relaxed pt-2 border-t border-[#F0F1F3]">
                  <span className="text-[#9CA3AF]">Question: </span>
                  {reg.questions_for_host}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
