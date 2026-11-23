"use client";

import { useState } from "react";
import { ListSkeleton, EmptyState, ErrorState } from "@/components/admin/list-states";
import { MailIcon } from "@/components/admin/icons";
import { useStaffQuery } from "@/lib/admin/queries";
import {
  staffListEventRegistrations,
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

/** Shown on an event's edit page — every registration for that event, newest first. */
export default function EventRegistrationsPanel({ slug }: { slug: string }) {
  const [status, setStatus] = useState<EventRegistrationStatus | "">("");

  const query = useStaffQuery(
    ["event-registrations", slug, status],
    (token) => staffListEventRegistrations(token, slug, status ? { status } : undefined)
  );

  const registrations = query.data;

  return (
    <div className="bg-white rounded-2xl border border-[#DCE0E8] p-6 lg:p-8 flex flex-col gap-5">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h2 className="text-[#1A274F] text-lg font-bold">
          Registrations{registrations ? ` (${registrations.length})` : ""}
        </h2>
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

      {query.isLoading && <ListSkeleton rows={3} />}

      {query.isError && <ErrorState message="Couldn't load registrations. Please try again." onRetry={() => query.refetch()} />}

      {registrations && registrations.length === 0 && (
        <EmptyState icon={<MailIcon />} title="No registrations yet" description="Attendees who register for this event will show up here." />
      )}

      {registrations && registrations.length > 0 && (
        <div className="flex flex-col gap-3">
          {registrations.map((reg) => (
            <div key={reg.id} className="border border-[#DCE0E8] rounded-xl p-4 flex flex-col gap-3">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div className="min-w-0">
                  <p className="text-[#1A274F] text-sm font-semibold truncate">{reg.full_name}</p>
                  <p className="text-[#6B7280] text-xs truncate">{reg.email}</p>
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
