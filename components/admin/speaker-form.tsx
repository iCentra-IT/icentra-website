"use client";

import { useState } from "react";
import Image from "next/image";
import { FormField, FormRow, FormTextarea } from "@/components/forms/form-component";
import { ApiError } from "@/lib/api/client";
import type { SpeakerInput, StaffSpeaker } from "@/lib/api/speakers";

interface SpeakerFormProps {
  initial?: StaffSpeaker;
  submitLabel: string;
  onSubmit: (data: SpeakerInput, photo: File | null) => Promise<void>;
  extraActions?: React.ReactNode;
}

export default function SpeakerForm({ initial, submitLabel, onSubmit, extraActions }: SpeakerFormProps) {
  const [name, setName] = useState(initial?.name ?? "");
  const [jobTitle, setJobTitle] = useState(initial?.job_title ?? "");
  const [organization, setOrganization] = useState(initial?.organization ?? "");
  const [bio, setBio] = useState(initial?.bio ?? "");
  const [linkedinUrl, setLinkedinUrl] = useState(initial?.linkedin_url ?? "");
  const [isActive, setIsActive] = useState(initial?.is_active ?? true);
  const [photo, setPhoto] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await onSubmit(
        { name, job_title: jobTitle, organization, bio, linkedin_url: linkedinUrl, is_active: isActive },
        photo
      );
    } catch (err) {
      setError(err instanceof ApiError ? err.firstFieldError ?? err.message : "Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <div className="bg-white rounded-2xl border border-[#DCE0E8] p-6 lg:p-8 flex flex-col gap-5">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden bg-[#EAF3FB] shrink-0">
            {initial?.photo && !photo && (
              <Image src={initial.photo} alt={initial.name} fill className="object-cover" sizes="64px" />
            )}
            {photo && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={URL.createObjectURL(photo)} alt="Preview" className="w-full h-full object-cover" />
            )}
          </div>
          <label className="text-sm text-[#0066FF] font-semibold cursor-pointer hover:text-[#25429A] transition-colors">
            {initial?.photo || photo ? "Change photo" : "Upload photo"}
            <input type="file" accept="image/*" className="sr-only" onChange={(e) => setPhoto(e.target.files?.[0] ?? null)} />
          </label>
        </div>

        <FormRow>
          <FormField label="Name" required value={name} onChange={(e) => setName(e.target.value)} />
          <FormField label="Job Title" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
        </FormRow>
        <FormRow>
          <FormField label="Organization" value={organization} onChange={(e) => setOrganization(e.target.value)} />
          <FormField label="LinkedIn URL" type="url" value={linkedinUrl} onChange={(e) => setLinkedinUrl(e.target.value)} />
        </FormRow>
        <FormTextarea label="Bio" rows={4} value={bio} onChange={(e) => setBio(e.target.value)} />
        <label className="flex items-center gap-3 cursor-pointer w-fit">
          <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} className="w-4 h-4 accent-[#0066FF]" />
          <span className="text-[#374151] text-sm font-medium">Active (selectable for events)</span>
        </label>
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
