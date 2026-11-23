"use client";

import { useRef, useState } from "react";
import { FormCard, FormField, FormModal, FormSubmit, FormTextarea, IcentraCheckbox } from "../form-component";
import TurnstileWidget, { type TurnstileWidgetHandle } from "../turnstile-widget";
import { useVolunteerSkills, useVolunteerAvailability, useSubmitVolunteerApplication } from "@/lib/queries/volunteer";
import { trackEvent } from "@/lib/analytics/track";
import { ApplicationSuccess, CheckboxGroup, errorText, formEntriesToObject } from "./shared";

function VolunteerRegistrationContent({ onSuccess }: { onSuccess: () => void }) {
  const [agreed, setAgreed] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileRef = useRef<TurnstileWidgetHandle>(null);

  // Reference-data pickers are optional — submitting still works without
  // them, so a fetch failure here is silently ignored (lists render empty).
  const { data: skills = [] } = useVolunteerSkills();
  const { data: availability = [] } = useVolunteerAvailability();
  const { mutateAsync: submitVolunteerApplication, isPending, error } = useSubmitVolunteerApplication();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = formEntriesToObject(e.currentTarget);

    try {
      await submitVolunteerApplication({
        full_name: f.fullName,
        email: f.email,
        skills: f.skills,
        skill_slugs: selectedSkills.length ? selectedSkills : undefined,
        availability_slugs: selectedAvailability.length ? selectedAvailability : undefined,
        motivation: f.motivation || "(No motivation provided.)",
        marketing_consent: agreed,
        ...(turnstileToken && { "cf-turnstile-response": turnstileToken }),
      });
      trackEvent("volunteer_application");
      onSuccess();
    } catch {
      turnstileRef.current?.reset();
    }
  }

  return (
    <FormCard title="Volunteer Registration Form">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <FormField   label="Full Name"        required name="fullName"    type="text"  placeholder="Your surname first" />
        <FormField   label="Email"            required name="email"       type="email" placeholder="Enter your active mail" />
        <FormField   label="Skills/ Expertise"         name="skills"      type="text"  placeholder="Skill set" />
        <CheckboxGroup
          label="Areas of Expertise"
          options={skills.map((s) => ({ label: s.name, value: s.slug }))}
          selected={selectedSkills}
          onChange={setSelectedSkills}
        />
        <CheckboxGroup
          label="Availability"
          options={availability.map((a) => ({ label: a.name, value: a.slug }))}
          selected={selectedAvailability}
          onChange={setSelectedAvailability}
        />
        <FormTextarea label="Motivation" required name="motivation" rows={5} placeholder="Type here..." />
        <IcentraCheckbox checked={agreed} onChange={setAgreed} />
        <TurnstileWidget ref={turnstileRef} onVerify={setTurnstileToken} />
        {error && <p className="text-red-600 text-sm text-center">{errorText(error)}</p>}
        <FormSubmit label={isPending ? "Submitting…" : "Submit"} />
      </form>
    </FormCard>
  );
}

export function VolunteerRegistrationModal({
  triggerLabel = "Continue Here",
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
        className={triggerClassName ?? "inline-flex items-center px-8 py-3.5 rounded-full bg-[#0066FF] text-white text-sm font-semibold hover:bg-[#25429A] transition-colors"}
      >
        {triggerLabel}
      </button>
      <FormModal open={open} onClose={handleClose}>
        {submitted ? (
          <ApplicationSuccess
            title="Application Received"
            message="Thanks for your interest in volunteering. Our team will be in touch by email."
            onClose={handleClose}
          />
        ) : (
          <VolunteerRegistrationContent onSuccess={() => setSubmitted(true)} />
        )}
      </FormModal>
    </>
  );
}

/* ───────────────────────────────────────────────────
   11. SPEAKER APPLICATION FORM (Transform Webinar)
   POST /api/v1/speaker-applications/
─────────────────────────────────────────────────── */
