"use client";

import { useRef, useState } from "react";
import { FormCard, FormField, FormModal, FormRow, FormSelect, FormSubmit, FormTextarea, IcentraCheckbox } from "../form-component";
import TurnstileWidget, { type TurnstileWidgetHandle } from "../turnstile-widget";
import { useSubmitContactInquiry } from "@/lib/queries/contact";
import { trackEvent } from "@/lib/analytics/track";
import { ASSESSMENT_PILLARS, ApplicationSuccess, COMPANY_SIZE_OPTS, INDUSTRY_OPTS, MATURITY_OPTS, errorText, formEntriesToObject } from "./shared";

function AssessmentRequestContent({ onSuccess }: { onSuccess: () => void }) {
  const [agreed, setAgreed] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileRef = useRef<TurnstileWidgetHandle>(null);
  const { mutateAsync: submitInquiry, isPending, error } = useSubmitContactInquiry();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = formEntriesToObject(e.currentTarget);

    const ratings = ASSESSMENT_PILLARS.map(
      (p) => `${p.label} (${p.tag}): ${f[`pillar_${p.key}`] || "Not Sure"}`
    ).join("\n");
    const message = [
      f.companySize && `Company size: ${f.companySize}`,
      `Self-rated alignment:\n${ratings}`,
      f.context && `What's driving this: ${f.context}`,
    ]
      .filter(Boolean)
      .join("\n\n");

    try {
      await submitInquiry({
        first_name: f.firstName,
        last_name: f.lastName,
        email: f.email,
        organization: f.organization,
        industry: f.industry,
        phone: f.phone,
        subject: "Transformation Readiness Assessment",
        message,
        marketing_consent: agreed,
        ...(turnstileToken && { "cf-turnstile-response": turnstileToken }),
      });
      trackEvent("assessment_request", { industry: f.industry });
      onSuccess();
    } catch {
      turnstileRef.current?.reset();
    }
  }

  return (
    <FormCard title="Transformation Readiness Assessment">
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
          <FormField label="Organization" name="organization" type="text" placeholder="Enter your organization" />
          <FormSelect label="Industry" name="industry" options={INDUSTRY_OPTS} placeholder="Select Industry" />
        </FormRow>
        <FormSelect label="Company Size" name="companySize" options={COMPANY_SIZE_OPTS} placeholder="Select Size" />

        <div className="flex flex-col gap-3">
          <label className="text-[#374151] text-sm font-medium">
            Rate your current alignment on each pillar
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {ASSESSMENT_PILLARS.map((p) => (
              <FormSelect
                key={p.key}
                label={`${p.label} — ${p.tag}`}
                name={`pillar_${p.key}`}
                options={MATURITY_OPTS}
                placeholder="Select a rating"
              />
            ))}
          </div>
        </div>

        <FormTextarea
          label="What's driving the need for an assessment right now?"
          name="context"
          rows={4}
          placeholder="e.g. a new strategy, a stalled program, leadership turnover..."
        />
        <IcentraCheckbox checked={agreed} onChange={setAgreed} />
        <TurnstileWidget ref={turnstileRef} onVerify={setTurnstileToken} />
        {error && <p className="text-red-600 text-sm text-center">{errorText(error)}</p>}
        <FormSubmit label={isPending ? "Sending…" : "Request My Assessment"} />
      </form>
    </FormCard>
  );
}

export function AssessmentRequestModal({
  triggerLabel = "Request Your Assessment",
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
            message="Thanks for requesting your Transformation Readiness Assessment. A member of our team will reach out to schedule it and walk through your results."
            onClose={handleClose}
          />
        ) : (
          <AssessmentRequestContent onSuccess={() => setSubmitted(true)} />
        )}
      </FormModal>
    </>
  );
}

/* ───────────────────────────────────────────────────
   14. CONSULTATION REQUEST FORM
   /what-we-do/solutions — a scheduling-style intake (preferred date/time,
   contact method, urgency) rather than a generic one-field inquiry, so the
   form matches what "booking a consultation" actually implies.
   POST /api/v1/solutions/inquiries/ — `solution` maps to that endpoint's
   `interest` enum; the scheduling details have no dedicated field, so they
   fold into `goals` alongside the free-text project description.
─────────────────────────────────────────────────── */
