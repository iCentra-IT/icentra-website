"use client";

import { useState } from "react";
import { FormField, FormRow, FormSelect, FormTextarea } from "@/components/forms/form-component";
import { ApiError } from "@/lib/api/client";
import {
  EMPLOYMENT_TYPE_LABELS,
  JOB_STATUS_LABELS,
  type EmploymentType,
  type JobOpeningInput,
  type JobStatus,
  type StaffJobOpening,
} from "@/lib/api/jobs";

const EMPLOYMENT_TYPE_OPTS = Object.entries(EMPLOYMENT_TYPE_LABELS).map(([value, label]) => ({ label, value }));
const STATUS_OPTS = Object.entries(JOB_STATUS_LABELS).map(([value, label]) => ({ label, value }));

function AdminCheckbox({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-start gap-3 cursor-pointer group">
      <div className="relative mt-0.5 shrink-0">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <div
          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
            checked ? "bg-[#0066FF] border-[#0066FF]" : "bg-white border-[#DCE0E8] group-hover:border-[#0066FF]"
          }`}
        >
          {checked && (
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
      </div>
      <span>
        <span className="block text-[#374151] text-sm font-medium">{label}</span>
        {description && <span className="block text-[#9CA3AF] text-xs mt-0.5">{description}</span>}
      </span>
    </label>
  );
}

/** datetime-local wants "YYYY-MM-DDTHH:mm" — the API gives/wants full ISO. */
function toDatetimeLocal(iso: string | null | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

interface JobFormProps {
  initial?: StaffJobOpening;
  submitLabel: string;
  onSubmit: (data: JobOpeningInput) => Promise<void>;
  extraActions?: React.ReactNode;
}

export default function JobForm({ initial, submitLabel, onSubmit, extraActions }: JobFormProps) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [department, setDepartment] = useState(initial?.department ?? "");
  const [location, setLocation] = useState(initial?.location ?? "");
  const [isRemote, setIsRemote] = useState(initial?.is_remote ?? false);
  const [employmentType, setEmploymentType] = useState<EmploymentType>(initial?.employment_type ?? "full_time");
  const [status, setStatus] = useState<JobStatus>(initial?.status ?? "draft");
  const [isPublic, setIsPublic] = useState(initial?.is_public ?? false);
  const [deadline, setDeadline] = useState(toDatetimeLocal(initial?.application_deadline));
  const [description, setDescription] = useState(initial?.description ?? "");
  const [requirements, setRequirements] = useState(initial?.requirements ?? "");
  const [benefits, setBenefits] = useState(initial?.benefits ?? "");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await onSubmit({
        title,
        slug: slug.trim() || undefined,
        department,
        location,
        is_remote: isRemote,
        employment_type: employmentType,
        status,
        is_public: isPublic,
        application_deadline: deadline ? new Date(deadline).toISOString() : null,
        description,
        requirements,
        benefits,
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
          <FormField label="Title" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Senior Product Designer" />
          <FormField
            label="Slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="Auto-generated from title if left blank"
          />
        </FormRow>
        <FormRow>
          <FormField label="Department" value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="e.g. Technology" />
          <FormField label="Location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Lagos, Nigeria" />
        </FormRow>
        <FormRow>
          <FormSelect
            label="Employment Type"
            options={EMPLOYMENT_TYPE_OPTS}
            value={employmentType}
            onChange={(e) => setEmploymentType(e.target.value as EmploymentType)}
          />
          <FormSelect
            label="Status"
            options={STATUS_OPTS}
            value={status}
            onChange={(e) => setStatus(e.target.value as JobStatus)}
          />
        </FormRow>
        <FormField
          label="Application Deadline"
          type="datetime-local"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
        <div className="flex flex-col sm:flex-row gap-5">
          <AdminCheckbox label="Remote" description="Can be done from anywhere." checked={isRemote} onChange={setIsRemote} />
          <AdminCheckbox
            label="Public"
            description="Show on the careers page. Draft or closed roles stay hidden regardless."
            checked={isPublic}
            onChange={setIsPublic}
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#DCE0E8] p-6 lg:p-8 flex flex-col gap-5">
        <FormTextarea
          label="Description"
          required
          rows={6}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What the role is and what the day-to-day looks like."
        />
        <FormTextarea
          label="Requirements"
          rows={5}
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
          placeholder="One per line — lines starting with - render as a bulleted list on the job page."
        />
        <FormTextarea
          label="Benefits"
          rows={4}
          value={benefits}
          onChange={(e) => setBenefits(e.target.value)}
          placeholder="Optional — also renders as a bulleted list when lines start with -."
        />
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
