"use client";

import { useRef, useState } from "react";
import { FormCard, FormField, FormModal, FormRow, FormSelect, FormSubmit, FormTextarea } from "../form-component";
import TurnstileWidget, { type TurnstileWidgetHandle } from "../turnstile-widget";
import { type PreferredQuarter, type HowHeard } from "@/lib/api/speakers";
import { usePillars } from "@/lib/queries/pillars";
import { useSubmitSpeakerApplication } from "@/lib/queries/speakers";
import { trackEvent } from "@/lib/analytics/track";
import { ApplicationSuccess, HOW_HEARD_OPTS, PREFERRED_QUARTER_OPTS, errorText, formEntriesToObject } from "./shared";

function SpeakerApplicationContent({ onSuccess }: { onSuccess: () => void }) {
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileRef = useRef<TurnstileWidgetHandle>(null);

  // Pillar picker is optional — the proposal just won't be tied to one, so a
  // fetch failure here is silently ignored (the select renders empty).
  const { data: pillars = [] } = usePillars();
  const { mutateAsync: submitSpeakerApplication, isPending, error } = useSubmitSpeakerApplication();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = formEntriesToObject(e.currentTarget);

    try {
      await submitSpeakerApplication({
        full_name: f.fullName,
        job_title: f.jobTitle,
        organization: f.organisation,
        email: f.email,
        pillar_slug: f.pillar,
        preferred_quarter: f.quarter as PreferredQuarter | undefined,
        proposed_topic: f.topic,
        previous_speaking_experience: f.experience,
        linkedin_url: f.linkedin,
        how_heard: f.referral as HowHeard | undefined,
        ...(turnstileToken && { "cf-turnstile-response": turnstileToken }),
      });
      trackEvent("speaker_application", { pillar: f.pillar, preferred_quarter: f.quarter });
      onSuccess();
    } catch {
      turnstileRef.current?.reset();
    }
  }

  return (
    <FormCard title="Speaker Application Form" maxWidth="max-w-[820px]">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <FormRow>
          <FormField label="Full Name"     required name="fullName"     type="text"  placeholder="Your full name" />
          <FormField label="Job Title"     required name="jobTitle"     type="text"  placeholder="Your job title" />
        </FormRow>
        <FormRow>
          <FormField label="Organisation"  required name="organisation" type="text"  placeholder="Your organisation" />
          <FormField label="Email Address" required name="email"        type="email" placeholder="you@example.com" />
        </FormRow>
        <FormRow>
          <FormSelect
            label="Pillar / Topic Area"
            name="pillar"
            options={pillars.map((p) => ({ label: p.name, value: p.slug }))}
            placeholder="Select..."
          />
          <FormSelect label="Preferred Quarter" name="quarter" options={PREFERRED_QUARTER_OPTS} placeholder="Select..." />
        </FormRow>
        <FormTextarea label="Proposed Topic or Talk Title (max 200 words)" required name="topic"      rows={5} placeholder="Short description of what you would like to discuss" />
        <FormTextarea label="Previous Speaking Experience"                          name="experience" rows={4} placeholder="Brief summary of past speaking engagements (optional)" />
        <FormField    label="LinkedIn Profile URL"                                  name="linkedin"   type="url" placeholder="https://linkedin.com/in/..." />
        <FormSelect   label="How did you hear about us?"                            name="referral"   options={HOW_HEARD_OPTS} placeholder="Select..." />
        {error && <p className="text-red-600 text-sm">{errorText(error)}</p>}
        <TurnstileWidget ref={turnstileRef} onVerify={setTurnstileToken} />
        <FormSubmit label={isPending ? "Submitting…" : "Submit application"} align="left" tone="navy" />
        <p className="text-[#9CA3AF] text-xs leading-relaxed">
          Submits to events@icentra.com. Auto-response confirms receipt and a 5 to 7 business day review window.
        </p>
      </form>
    </FormCard>
  );
}

export function SpeakerApplicationModal({
  triggerLabel = "Apply to speak",
  triggerClassName,
}: {
  triggerLabel?: string;
  triggerClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => setSubmitted(false), 300);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={triggerClassName ?? "inline-flex items-center px-7 py-3.5 rounded-full bg-main text-white text-sm font-semibold hover:bg-[#1A274F] transition-colors"}
      >
        {triggerLabel}
      </button>
      <FormModal open={open} onClose={handleClose} maxWidth="max-w-[860px]">
        {submitted ? (
          <ApplicationSuccess
            title="Application Received"
            message="Thanks for applying to speak. Our team will review your proposal and follow up by email."
            onClose={handleClose}
          />
        ) : (
          <SpeakerApplicationContent onSuccess={() => setSubmitted(true)} />
        )}
      </FormModal>
    </>
  );
}

/* ───────────────────────────────────────────────────
   12. GENERAL INQUIRY FORM — Solutions / Partnerships /
   Continuous Transformation pages.
   POST /api/v1/contact/inquiries/ — a dedicated endpoint for each of
   these is expected later; until then this folds the selected
   interest into the message body, same pattern as GeneralContactFormA.
─────────────────────────────────────────────────── */
