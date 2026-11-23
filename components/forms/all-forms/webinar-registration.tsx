"use client";

import { useRef, useState } from "react";
import { FormCard, FormField, FormModal, FormRow, FormSelect, FormSubmit, FormTextarea, IcentraCheckbox, WebinarBanner } from "../form-component";
import TurnstileWidget, { type TurnstileWidgetHandle } from "../turnstile-widget";
import { useRegisterForEvent } from "@/lib/queries/events";
import { trackEvent } from "@/lib/analytics/track";
import { ApplicationSuccess, DEFAULT_WEBINAR_IMAGE, REMINDER_OPTS, TIMEZONE_OPTS, errorText, formEntriesToObject } from "./shared";

function WebinarRegistrationContent({
  eventSlug,
  eventTitle,
  eventImage,
  onSuccess,
}: {
  eventSlug: string;
  eventTitle?: string;
  eventImage?: string | null;
  onSuccess: () => void;
}) {
  const [agreed, setAgreed] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileRef = useRef<TurnstileWidgetHandle>(null);
  const { mutateAsync: registerForEvent, isPending, error } = useRegisterForEvent();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = formEntriesToObject(e.currentTarget);

    try {
      await registerForEvent({
        slug: eventSlug,
        data: {
          first_name: f.firstName,
          last_name: f.lastName,
          email: f.email,
          organization: f.organization,
          job_title: f.jobTitle,
          timezone: f.timezone,
          questions_for_host: f.hostQs,
          marketing_consent: agreed,
          reminder_offsets: f.reminder ? [Number(f.reminder)] : undefined,
          ...(turnstileToken && { "cf-turnstile-response": turnstileToken }),
        },
      });
      trackEvent("webinar_registration", { event_slug: eventSlug, event_title: eventTitle });
      onSuccess();
    } catch {
      turnstileRef.current?.reset();
    }
  }

  return (
    <FormCard title="Webinar Registration Form">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <WebinarBanner image={eventImage || DEFAULT_WEBINAR_IMAGE} alt={eventTitle ?? "iCentra webinar"} />
        {eventTitle && (
          <p className="text-[#6B7280] text-sm -mt-2">
            Registering for <span className="text-[#1A274F] font-semibold">{eventTitle}</span>
          </p>
        )}
        <FormRow>
          <FormField label="First Name"   required name="firstName"    type="text"  placeholder="Your first name" />
          <FormField label="Last Name"             name="lastName"     type="text"  placeholder="Your last name" />
        </FormRow>
        <FormField   label="Email"              required name="email"    type="email" placeholder="Enter your active mail" />
        <FormRow>
          <FormField  label="Organisation"                name="organization" type="text" placeholder="Your organisation" />
          <FormField  label="Job Title"                   name="jobTitle"     type="text" placeholder="Your job title" />
        </FormRow>
        <FormSelect  label="Time Zone"                   name="timezone" options={TIMEZONE_OPTS} placeholder="Select time zone" />
        <FormTextarea label="Questions For Host"         name="hostQs"   rows={4}     placeholder="Type your questions here..." />
        <FormSelect  label="Remind Me"                   name="reminder" options={REMINDER_OPTS} placeholder="Select a reminder" />
        <IcentraCheckbox checked={agreed} onChange={setAgreed} />
        <TurnstileWidget ref={turnstileRef} onVerify={setTurnstileToken} />
        {error && <p className="text-red-600 text-sm text-center">{errorText(error)}</p>}
        <FormSubmit label={isPending ? "Registering…" : "Register"} />
      </form>
    </FormCard>
  );
}

export function WebinarRegistrationModal({
  eventSlug,
  eventTitle,
  eventImage,
  triggerLabel = "Register Now",
  triggerClassName,
}: {
  eventSlug: string;
  eventTitle?: string;
  eventImage?: string | null;
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
        className={triggerClassName ?? "inline-flex items-center px-7 py-3.5 rounded-full bg-[#0066FF] text-white text-sm font-semibold hover:bg-[#25429A] transition-colors"}
      >
        {triggerLabel}
      </button>
      <FormModal open={open} onClose={handleClose}>
        {submitted ? (
          <ApplicationSuccess
            title="You're Registered"
            message="We've saved your spot and will send a confirmation and reminders to your email."
            onClose={handleClose}
          />
        ) : (
          <WebinarRegistrationContent
            eventSlug={eventSlug}
            eventTitle={eventTitle}
            eventImage={eventImage}
            onSuccess={() => setSubmitted(true)}
          />
        )}
      </FormModal>
    </>
  );
}
