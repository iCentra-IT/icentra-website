"use client";

import { useRef, useState } from "react";
import { FormCard, FormField, FormModal, FormRow, FormSelect, FormSubmit, FormTextarea, IcentraCheckbox } from "../form-component";
import TurnstileWidget, { type TurnstileWidgetHandle } from "../turnstile-widget";
import { useSubmitSolutionInquiry } from "@/lib/queries/solutions";
import { type SolutionInterest } from "@/lib/api/solutions";
import { trackEvent } from "@/lib/analytics/track";
import { ApplicationSuccess, COMPANY_SIZE_OPTS, CONTACT_METHOD_OPTS, INDUSTRY_OPTS, URGENCY_OPTS, errorText, formEntriesToObject } from "./shared";

function ConsultationRequestContent({
  solutionOptions,
  onSuccess,
}: {
  solutionOptions: { label: string; value: string }[];
  onSuccess: () => void;
}) {
  const [agreed, setAgreed] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileRef = useRef<TurnstileWidgetHandle>(null);
  const { mutateAsync: submitInquiry, isPending, error } = useSubmitSolutionInquiry();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = formEntriesToObject(e.currentTarget);

    const goals = [
      f.industry && `Industry: ${f.industry}`,
      f.companySize && `Company size: ${f.companySize}`,
      f.preferredDateTime && `Preferred date/time: ${f.preferredDateTime}`,
      f.contactMethod && `Preferred contact method: ${f.contactMethod}`,
      f.urgencyLevel && `Urgency: ${f.urgencyLevel}`,
      f.projectDesc && `Details: ${f.projectDesc}`,
    ]
      .filter(Boolean)
      .join("\n\n");

    try {
      await submitInquiry({
        first_name: f.firstName,
        last_name: f.lastName,
        email: f.email,
        organization: f.companyName,
        phone: f.phone,
        interest: f.solution as SolutionInterest | undefined,
        goals,
        marketing_consent: agreed,
        ...(turnstileToken && { "cf-turnstile-response": turnstileToken }),
      });
      trackEvent("consultation_request", { solution: f.solution, urgency: f.urgencyLevel });
      onSuccess();
    } catch {
      turnstileRef.current?.reset();
    }
  }

  return (
    <FormCard title="Book a Consultation">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <FormRow>
          <FormField label="First Name" required name="firstName" type="text" placeholder="Enter first name" />
          <FormField label="Last Name" name="lastName" type="text" placeholder="Enter last name" />
        </FormRow>
        <FormRow>
          <FormField label="Email" required name="email" type="email" placeholder="Enter your active mail" />
          <FormField label="Phone Number" name="phone" type="tel" placeholder="Enter phone number" />
        </FormRow>
        <FormRow>
          <FormField label="Company Name" name="companyName" type="text" placeholder="Name" />
          <FormSelect label="Industry" name="industry" options={INDUSTRY_OPTS} placeholder="Select Industry" />
        </FormRow>
        <FormRow>
          <FormSelect label="Which solution are you interested in?" name="solution" options={solutionOptions} placeholder="Select a solution" />
          <FormSelect label="Company Size" name="companySize" options={COMPANY_SIZE_OPTS} placeholder="Select Size" />
        </FormRow>
        <FormField label="Preferred Date & Time" name="preferredDateTime" type="datetime-local" />
        <FormRow>
          <FormSelect label="Preferred Contact Method" name="contactMethod" options={CONTACT_METHOD_OPTS} placeholder="Select Method" />
          <FormSelect label="Urgency Level" name="urgencyLevel" options={URGENCY_OPTS} placeholder="Select Level" />
        </FormRow>
        <FormTextarea label="What would you like to cover?" name="projectDesc" rows={4} placeholder="Tell us about your goals for this consultation..." />
        <IcentraCheckbox checked={agreed} onChange={setAgreed} />
        <TurnstileWidget ref={turnstileRef} onVerify={setTurnstileToken} />
        {error && <p className="text-red-600 text-sm text-center">{errorText(error)}</p>}
        <FormSubmit label={isPending ? "Sending…" : "Request Consultation"} />
      </form>
    </FormCard>
  );
}

export function ConsultationRequestModal({
  solutionOptions,
  triggerLabel = "Book a Consultation",
  triggerClassName,
}: {
  solutionOptions: { label: string; value: string }[];
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
        type="button"
        onClick={() => setOpen(true)}
        className={triggerClassName ?? "inline-flex items-center px-7 py-3.5 rounded-full bg-[#0066FF] text-white text-sm font-semibold hover:bg-[#25429A] transition-colors"}
      >
        {triggerLabel}
      </button>
      <FormModal open={open} onClose={handleClose} maxWidth="max-w-[760px]">
        {submitted ? (
          <ApplicationSuccess
            title="Request Received"
            message="Thanks for booking a consultation. A member of our team will reach out to confirm your preferred time."
            onClose={handleClose}
          />
        ) : (
          <ConsultationRequestContent solutionOptions={solutionOptions} onSuccess={() => setSubmitted(true)} />
        )}
      </FormModal>
    </>
  );
}

/* ───────────────────────────────────────────────────
   9. INTERNSHIP APPLICATION FORM
   No matching backend endpoint yet — still local-only.
─────────────────────────────────────────────────── */
