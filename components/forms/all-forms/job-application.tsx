"use client";

import { useRef, useState } from "react";
import { FormCard, FormField, FormFileUpload, FormModal, FormRow, FormSelect, FormSubmit, IcentraCheckbox } from "../form-component";
import TurnstileWidget, { type TurnstileWidgetHandle } from "../turnstile-widget";
import { useApplyToJob } from "@/lib/queries/jobs";
import { trackEvent } from "@/lib/analytics/track";
import { ApplicationSuccess, REFERRAL_SOURCE_OPTS, errorText } from "./shared";

function JobApplicationContent({
  jobSlug,
  jobTitle,
  onSuccess,
}: {
  jobSlug: string;
  jobTitle?: string;
  onSuccess: () => void;
}) {
  const [agreed, setAgreed] = useState(false);
  const [resume, setResume] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState<File | null>(null);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileWidgetHandle>(null);
  const { mutateAsync: applyToJob, isPending, error } = useApplyToJob();

  const errorMessage = localError ?? (error ? errorText(error) : null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!resume) {
      setLocalError("Please attach your resume.");
      return;
    }
    if (!coverLetter) {
      setLocalError("Please attach a cover letter.");
      return;
    }
    setLocalError(null);

    const formData = new FormData(e.currentTarget);
    // Optional fields left blank would otherwise submit as "", which the
    // backend's enum/URL validation rejects — omit them so it falls back to its own defaults.
    for (const [key, value] of Array.from(formData.entries())) {
      if (typeof value === "string" && value.trim() === "") formData.delete(key);
    }
    formData.set("resume", resume);
    if (coverLetter) formData.set("cover_letter", coverLetter);
    formData.set("marketing_consent", agreed ? "true" : "false");
    if (turnstileToken) formData.set("cf-turnstile-response", turnstileToken);

    try {
      await applyToJob({ slug: jobSlug, formData });
      trackEvent("job_application", { job_slug: jobSlug, job_title: jobTitle });
      onSuccess();
    } catch {
      turnstileRef.current?.reset();
    }
  }

  return (
    <FormCard title="Job Application Form">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        {jobTitle && (
          <p className="text-[#6B7280] text-sm -mt-2">
            Applying for <span className="text-[#1A274F] font-semibold">{jobTitle}</span>
          </p>
        )}
        <FormField label="Full Name" required name="full_name" type="text" placeholder="Your full name" />
        <FormRow>
          <FormField label="Email" required name="email" type="email" placeholder="Enter your active mail" />
          <FormField label="Phone Number" required name="phone" type="tel" placeholder="Enter phone number" />
        </FormRow>
        <FormField label="Location" required name="location" type="text" placeholder="City, Country" />
        <FormFileUpload label="Resume" required accept=".pdf,.doc,.docx" onFileChange={setResume} />
        <FormFileUpload label="Cover Letter" required accept=".pdf,.doc,.docx" onFileChange={setCoverLetter} />
        <FormField label="LinkedIn Profile" required name="linkedin_url" type="url" placeholder="https://linkedin.com/in/..." />
        <FormSelect label="How did you hear about this role?" required name="referral_source" options={REFERRAL_SOURCE_OPTS} placeholder="Select" />
        <FormRow>
          <FormField label="Availability Date" name="availability_date" type="date" />
          <FormField label="Expected Salary" name="expected_salary" type="text" placeholder="Optional" />
        </FormRow>
        <IcentraCheckbox checked={agreed} onChange={setAgreed} />
        <TurnstileWidget ref={turnstileRef} onVerify={setTurnstileToken} />
        {errorMessage && <p className="text-red-600 text-sm text-center">{errorMessage}</p>}
        <FormSubmit label={isPending ? "Submitting…" : "Submit Application"} />
      </form>
    </FormCard>
  );
}

export function JobApplicationModal({
  jobSlug,
  jobTitle,
  triggerLabel = "Apply",
  triggerClassName,
}: {
  jobSlug: string;
  jobTitle?: string;
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
        className={triggerClassName ?? "inline-flex items-center px-6 py-2.5 rounded-full bg-[#0066FF] text-white text-sm font-semibold hover:bg-[#25429A] transition-colors"}
      >
        {triggerLabel}
      </button>
      <FormModal open={open} onClose={handleClose}>
        {submitted ? (
          <ApplicationSuccess
            title="Application Received"
            message="Thanks for applying. Our team will review your application and get back to you by email."
            onClose={handleClose}
          />
        ) : (
          <JobApplicationContent jobSlug={jobSlug} jobTitle={jobTitle} onSuccess={() => setSubmitted(true)} />
        )}
      </FormModal>
    </>
  );
}

/* ───────────────────────────────────────────────────
   6. NEWSLETTER SUBSCRIPTION FORM
   POST /api/v1/newsletter/subscribe/
─────────────────────────────────────────────────── */
