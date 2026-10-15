"use client";

import { useEffect, useState } from "react";
import { FormField, FormRow, FormSelect, FormTextarea } from "@/components/forms/form-component";
import { ApiError } from "@/lib/api/client";
import { withFreshToken } from "@/lib/admin/session";
import { staffListPillars, type StaffPillar } from "@/lib/api/pillars";
import { staffListSpeakers, type StaffSpeaker } from "@/lib/api/speakers";
import {
  EVENT_TYPE_LABELS,
  EVENT_STATUS_LABELS,
  LOCATION_TYPE_LABELS,
  type EventInput,
  type EventType,
  type EventStatus,
  type LocationType,
  type StaffEvent,
} from "@/lib/api/events";

const EVENT_TYPE_OPTS = Object.entries(EVENT_TYPE_LABELS).map(([value, label]) => ({ label, value }));
const STATUS_OPTS = Object.entries(EVENT_STATUS_LABELS).map(([value, label]) => ({ label, value }));
const LOCATION_TYPE_OPTS = Object.entries(LOCATION_TYPE_LABELS).map(([value, label]) => ({ label, value }));

function toDatetimeLocal(iso: string | null | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

interface EventFormProps {
  initial?: StaffEvent;
  submitLabel: string;
  onSubmit: (data: EventInput) => Promise<void>;
  extraActions?: React.ReactNode;
}

export default function EventForm({ initial, submitLabel, onSubmit, extraActions }: EventFormProps) {
  const [pillars, setPillars] = useState<StaffPillar[]>([]);
  const [speakers, setSpeakers] = useState<StaffSpeaker[]>([]);

  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [subtitle, setSubtitle] = useState(initial?.subtitle ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [agenda, setAgenda] = useState(initial?.agenda ?? "");
  const [eventType, setEventType] = useState<EventType>(initial?.event_type ?? "webinar");
  const [pillarId, setPillarId] = useState(initial?.pillar != null ? String(initial.pillar) : "none");
  const [speakerIds, setSpeakerIds] = useState<number[]>(initial?.speakers ?? []);
  const [startDatetime, setStartDatetime] = useState(toDatetimeLocal(initial?.start_datetime));
  const [endDatetime, setEndDatetime] = useState(toDatetimeLocal(initial?.end_datetime));
  const [timezone, setTimezone] = useState(initial?.timezone ?? "UTC");
  const [durationMinutes, setDurationMinutes] = useState(initial?.duration_minutes != null ? String(initial.duration_minutes) : "");
  const [locationType, setLocationType] = useState<LocationType>(initial?.location_type ?? "online");
  const [locationName, setLocationName] = useState(initial?.location_name ?? "");
  const [locationAddress, setLocationAddress] = useState(initial?.location_address ?? "");
  const [locationUrl, setLocationUrl] = useState(initial?.location_url ?? "");
  const [registrationOpen, setRegistrationOpen] = useState(initial?.registration_open ?? true);
  const [registrationClose, setRegistrationClose] = useState(toDatetimeLocal(initial?.registration_close));
  const [capacity, setCapacity] = useState(initial?.capacity != null ? String(initial.capacity) : "");
  const [status, setStatus] = useState<EventStatus>(initial?.status ?? "draft");
  const [isPublic, setIsPublic] = useState(initial?.is_public ?? false);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    withFreshToken((token) => Promise.all([staffListPillars(token), staffListSpeakers(token)]))
      .then(([pillarData, speakerData]) => {
        if (cancelled) return;
        setPillars(pillarData);
        setSpeakers(speakerData);
      })
      .catch(() => {
        /* Pickers are optional — the rest of the form still works without them. */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  function toggleSpeaker(id: number) {
    setSpeakerIds((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await onSubmit({
        title,
        slug: slug.trim() || undefined,
        subtitle,
        description,
        agenda,
        event_type: eventType,
        pillar: pillarId !== "none" ? Number(pillarId) : null,
        speakers: speakerIds,
        start_datetime: startDatetime ? new Date(startDatetime).toISOString() : "",
        end_datetime: endDatetime ? new Date(endDatetime).toISOString() : null,
        timezone,
        duration_minutes: durationMinutes ? Number(durationMinutes) : null,
        location_type: locationType,
        location_name: locationName,
        location_address: locationAddress,
        location_url: locationUrl,
        registration_open: registrationOpen,
        registration_close: registrationClose ? new Date(registrationClose).toISOString() : null,
        capacity: capacity ? Number(capacity) : null,
        status,
        is_public: isPublic,
      });
    } catch (err) {
      setError(err instanceof ApiError ? err.firstFieldError ?? err.message : "Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <div className="bg-white rounded-2xl border border-[#DCE0E8] p-6 lg:p-8 flex flex-col gap-5">
        <FormRow>
          <FormField label="Title" required value={title} onChange={(e) => setTitle(e.target.value)} />
          <FormField label="Slug" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="Auto-generated from title if left blank" />
        </FormRow>
        <FormField label="Subtitle" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} />
        <FormRow>
          <FormSelect label="Event Type" options={EVENT_TYPE_OPTS} value={eventType} onChange={(e) => setEventType(e.target.value as EventType)} />
          <FormSelect
            label="Pillar"
            options={[{ label: "None", value: "none" }, ...pillars.map((p) => ({ label: p.name, value: String(p.id) }))]}
            value={pillarId}
            onChange={(e) => setPillarId(e.target.value)}
          />
        </FormRow>
        <FormRow>
          <FormSelect label="Status" options={STATUS_OPTS} value={status} onChange={(e) => setStatus(e.target.value as EventStatus)} />
          <FormSelect
            label="Location Type"
            options={LOCATION_TYPE_OPTS}
            value={locationType}
            onChange={(e) => setLocationType(e.target.value as LocationType)}
          />
        </FormRow>
      </div>

      <div className="bg-white rounded-2xl border border-[#DCE0E8] p-6 lg:p-8 flex flex-col gap-5">
        <FormTextarea label="Description" required rows={6} value={description} onChange={(e) => setDescription(e.target.value)} />
        <FormTextarea
          label="Agenda"
          rows={5}
          value={agenda}
          onChange={(e) => setAgenda(e.target.value)}
          placeholder="One per line — lines starting with - render as a bulleted list."
        />
      </div>

      <div className="bg-white rounded-2xl border border-[#DCE0E8] p-6 lg:p-8 flex flex-col gap-3">
        <label className="text-[#374151] text-sm font-medium">Speakers</label>
        {speakers.length === 0 ? (
          <p className="text-[#9CA3AF] text-sm">No speakers yet — add some under Speakers first.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {speakers.map((speaker) => {
              const active = speakerIds.includes(speaker.id);
              return (
                <button
                  key={speaker.id}
                  type="button"
                  onClick={() => toggleSpeaker(speaker.id)}
                  className={`px-3.5 py-2 rounded-full text-sm font-medium border transition-colors cursor-pointer ${
                    active ? "bg-[#0066FF] border-[#0066FF] text-white" : "bg-white border-[#DCE0E8] text-[#374151] hover:border-[#0066FF]"
                  }`}
                >
                  {speaker.name}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-[#DCE0E8] p-6 lg:p-8 flex flex-col gap-5">
        <FormRow>
          <FormField label="Start" required type="datetime-local" value={startDatetime} onChange={(e) => setStartDatetime(e.target.value)} />
          <FormField label="End" type="datetime-local" value={endDatetime} onChange={(e) => setEndDatetime(e.target.value)} />
        </FormRow>
        <FormRow>
          <FormField label="Timezone" value={timezone} onChange={(e) => setTimezone(e.target.value)} placeholder="e.g. WAT, GMT, EST" />
          <FormField label="Duration (minutes)" type="number" value={durationMinutes} onChange={(e) => setDurationMinutes(e.target.value)} />
        </FormRow>
        {locationType !== "online" && (
          <FormRow>
            <FormField label="Venue Name" value={locationName} onChange={(e) => setLocationName(e.target.value)} />
            <FormField label="Venue Address" value={locationAddress} onChange={(e) => setLocationAddress(e.target.value)} />
          </FormRow>
        )}
        <FormField
          label={locationType === "online" ? "Join Link" : "Venue / Join Link"}
          type="url"
          value={locationUrl}
          onChange={(e) => setLocationUrl(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-2xl border border-[#DCE0E8] p-6 lg:p-8 flex flex-col gap-5">
        <FormRow>
          <FormField label="Registration Closes" type="datetime-local" value={registrationClose} onChange={(e) => setRegistrationClose(e.target.value)} />
          <FormField label="Capacity" type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} placeholder="Optional" />
        </FormRow>
        <div className="flex flex-col sm:flex-row gap-5">
          <label className="flex items-center gap-3 cursor-pointer w-fit">
            <input type="checkbox" checked={registrationOpen} onChange={(e) => setRegistrationOpen(e.target.checked)} className="w-4 h-4 accent-[#0066FF]" />
            <span className="text-[#374151] text-sm font-medium">Registration open</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer w-fit">
            <input type="checkbox" checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)} className="w-4 h-4 accent-[#0066FF]" />
            <span className="text-[#374151] text-sm font-medium">Public (show on the events page)</span>
          </label>
        </div>
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <div className="flex items-center justify-between gap-4">
        <div>{extraActions}</div>
        <button
          type="submit"
          disabled={submitting}
          className="px-8 py-3.5 rounded-full bg-[#0066FF] text-white text-sm font-semibold hover:bg-[#25429A] transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          {submitting ? "Saving…" : submitLabel}
        </button>
      </div>
    </form>
  );
}
