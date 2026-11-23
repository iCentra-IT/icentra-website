"use client";

import { useState } from "react";
import { FormCard, FormField, FormFileUpload, FormModal, FormRow, FormSubmit, IcentraCheckbox } from "../form-component";
import { trackEvent } from "@/lib/analytics/track";
import { ApplicationSuccess, formEntriesToObject } from "./shared";

function InternshipApplicationContent({ onSuccess }: { onSuccess: () => void }) {
  const [agreed, setAgreed] = useState(false);
  const [resume, setResume] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!resume) {
      setError("Please attach your resume.");
      return;
    }
    const f = formEntriesToObject(e.currentTarget);
    trackEvent("internship_application", { job_role: f.jobRole });
    onSuccess();
  }

  return (
    <FormCard title="Internship Application Form">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <FormField label="Name" required name="fullName" type="text" placeholder="Your full name" />
        <FormRow>
          <FormField label="Email" required name="email" type="email" placeholder="Your email address" />
          <FormField label="Phone Number" required name="phone" type="tel" placeholder="Your phone number" />
        </FormRow>
        <FormRow>
          <FormField label="Qualification" required name="qualification" type="text" placeholder="e.g. BSc Computer Science" />
          <FormField label="Job Role" required name="jobRole" type="text" placeholder="Area you're interested in" />
        </FormRow>
        <FormField label="Subject" name="subject" type="text" placeholder="What would you like us to know?" />
        <FormFileUpload label="Resume" required accept=".pdf,.doc,.docx" onFileChange={setResume} />
        <FormFileUpload label="Application Letter" accept=".pdf,.doc,.docx" />
        <FormFileUpload label="Your Headshot" accept=".jpg,.jpeg,.png" />
        <IcentraCheckbox checked={agreed} onChange={setAgreed} />
        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        <FormSubmit label="Submit Application" />
      </form>
    </FormCard>
  );
}

export function InternshipApplicationModal({
  triggerLabel = "Apply Now",
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
        className={triggerClassName ?? "inline-flex items-center px-7 py-3.5 rounded-full bg-[#0066FF] text-white text-sm font-semibold hover:bg-[#25429A] transition-colors"}
      >
        {triggerLabel}
      </button>
      <FormModal open={open} onClose={handleClose} maxWidth="max-w-[860px]">
        {submitted ? (
          <ApplicationSuccess
            title="Application Received"
            message="Thanks for applying to our Internship Programme. Our team will review your application and reach out by email."
            onClose={handleClose}
          />
        ) : (
          <InternshipApplicationContent onSuccess={() => setSubmitted(true)} />
        )}
      </FormModal>
    </>
  );
}
