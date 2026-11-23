"use client";

import { useRef, useState } from "react";
import { FormCard, FormField, FormModal, FormRow, FormSelect, FormSubmit, FormTextarea, IcentraCheckbox } from "../form-component";
import TurnstileWidget, { type TurnstileWidgetHandle } from "../turnstile-widget";
import { useSubmitSolutionInquiry } from "@/lib/queries/solutions";
import { type SolutionInterest } from "@/lib/api/solutions";
import { useSubmitPartnershipInquiry } from "@/lib/queries/partnerships";
import { type PartnershipInterest } from "@/lib/api/partnerships";
import { trackEvent } from "@/lib/analytics/track";
import { ApplicationSuccess, errorText, formEntriesToObject } from "./shared";

function InquiryFormContent({
  formTitle,
  inquiryType,
  contextLabel,
  selectLabel,
  interestOptions,
  messageLabel = "How can we help?",
  messagePlaceholder = "Tell us about your goals...",
  onSuccess,
}: {
  formTitle: string;
  /** Picks which dedicated backend endpoint this inquiry posts to. */
  inquiryType: "solutions" | "partnerships";
  contextLabel: string;
  selectLabel?: string;
  interestOptions?: { label: string; value: string }[];
  messageLabel?: string;
  messagePlaceholder?: string;
  onSuccess: () => void;
}) {
  const [agreed, setAgreed] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileRef = useRef<TurnstileWidgetHandle>(null);
  const solutionInquiry = useSubmitSolutionInquiry();
  const partnershipInquiry = useSubmitPartnershipInquiry();
  const { isPending, error } = inquiryType === "solutions" ? solutionInquiry : partnershipInquiry;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = formEntriesToObject(e.currentTarget);
    const shared = {
      first_name: f.firstName,
      last_name: f.lastName,
      email: f.email,
      organization: f.organization,
      phone: f.phone,
      goals: f.message,
      marketing_consent: agreed,
      ...(turnstileToken && { "cf-turnstile-response": turnstileToken }),
    };

    try {
      if (inquiryType === "solutions") {
        await solutionInquiry.mutateAsync({ ...shared, interest: f.interest as SolutionInterest | undefined });
      } else {
        await partnershipInquiry.mutateAsync({ ...shared, interest: f.interest as PartnershipInterest | undefined });
      }
      trackEvent("inquiry_form_submit", { context: contextLabel, interest: f.interest });
      onSuccess();
    } catch {
      turnstileRef.current?.reset();
    }
  }

  return (
    <FormCard title={formTitle}>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <FormRow>
          <FormField label="First Name" required name="firstName" type="text" placeholder="Enter first name" />
          <FormField label="Last Name" name="lastName" type="text" placeholder="Enter last name" />
        </FormRow>
        <FormRow>
          <FormField label="Email" required name="email" type="email" placeholder="Enter your active mail" />
          <FormField label="Phone Number" name="phone" type="tel" placeholder="Enter phone number" />
        </FormRow>
        <FormField label="Organization" name="organization" type="text" placeholder="Enter your organization" />
        {interestOptions && interestOptions.length > 0 && (
          <FormSelect label={selectLabel ?? "Area of Interest"} name="interest" options={interestOptions} placeholder="Select an option" />
        )}
        <FormTextarea label={messageLabel} name="message" rows={5} placeholder={messagePlaceholder} />
        <IcentraCheckbox checked={agreed} onChange={setAgreed} />
        <TurnstileWidget ref={turnstileRef} onVerify={setTurnstileToken} />
        {error && <p className="text-red-600 text-sm text-center">{errorText(error)}</p>}
        <FormSubmit label={isPending ? "Sending…" : "Submit"} />
      </form>
    </FormCard>
  );
}

export function InquiryModal({
  formTitle,
  inquiryType,
  contextLabel,
  selectLabel,
  interestOptions,
  messageLabel,
  messagePlaceholder,
  successTitle = "Message Sent",
  successMessage = "Thanks for reaching out. Our team will review your message and get back to you shortly.",
  triggerLabel = "Enquire Now",
  triggerClassName,
}: {
  formTitle: string;
  inquiryType: "solutions" | "partnerships";
  contextLabel: string;
  selectLabel?: string;
  interestOptions?: { label: string; value: string }[];
  messageLabel?: string;
  messagePlaceholder?: string;
  successTitle?: string;
  successMessage?: string;
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
      <FormModal open={open} onClose={handleClose}>
        {submitted ? (
          <ApplicationSuccess title={successTitle} message={successMessage} onClose={handleClose} />
        ) : (
          <InquiryFormContent
            formTitle={formTitle}
            inquiryType={inquiryType}
            contextLabel={contextLabel}
            selectLabel={selectLabel}
            interestOptions={interestOptions}
            messageLabel={messageLabel}
            messagePlaceholder={messagePlaceholder}
            onSuccess={() => setSubmitted(true)}
          />
        )}
      </FormModal>
    </>
  );
}

/* ───────────────────────────────────────────────────
   13. TRANSFORMATION READINESS ASSESSMENT REQUEST FORM
   /what-we-do/continuous-transformation — asks a quick self-rating
   across the same four 4P pillars the page scores the assessment on,
   so the intake itself mirrors what the visitor is told they'll get back.
   POST /api/v1/contact/inquiries/ — temporary until a dedicated
   assessment-intake endpoint exists.
─────────────────────────────────────────────────── */
