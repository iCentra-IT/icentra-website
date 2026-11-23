"use client";

import { useState } from "react";
import { FormCard, FormField, FormModal, FormSelect, FormSubmit, IcentraCheckbox } from "../form-component";
import { trackEvent } from "@/lib/analytics/track";
import { ApplicationSuccess, BROCHURE_FILE, HOW_HEARD_OPTS, INDUSTRY_OPTS, formEntriesToObject } from "./shared";

function ResourceDownloadContent({ onSuccess }: { onSuccess: () => void }) {
  const [agreed, setAgreed] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = formEntriesToObject(e.currentTarget);
    trackEvent("resource_download", { resource: "corporate-brochure-2025", industry: f.industry });

    const link = document.createElement("a");
    link.href = BROCHURE_FILE;
    link.download = "iCentra-Corporate-Brochure-2025.pdf";
    document.body.appendChild(link);
    link.click();
    link.remove();

    onSuccess();
  }

  return (
    <FormCard title="Resource Download Form">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <FormField  label="Full Name"              required name="fullName"  type="text"  placeholder="Your surname first" />
        <FormField  label="Email"                  required name="email"     type="email" placeholder="Enter your active mail" />
        <FormField  label="Company Name"                    name="company"   type="text"  placeholder="Enter company name" />
        <FormField  label="Job Title"                       name="jobTitle"  type="text"  placeholder="Enter your job title" />
        <FormSelect label="Industry"               required name="industry"  options={INDUSTRY_OPTS}   placeholder="Select Industry" />
        <FormSelect label="How did you hear about us"       name="howHeard"  options={HOW_HEARD_OPTS}  placeholder="Select option" />
        <IcentraCheckbox checked={agreed} onChange={setAgreed} />
        <FormSubmit label="Download" />
      </form>
    </FormCard>
  );
}

export function ResourceDownloadModal({
  triggerLabel = "Download",
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
      <FormModal open={open} onClose={handleClose}>
        {submitted ? (
          <ApplicationSuccess
            title="Your Download Is Starting"
            message="The iCentra corporate brochure should begin downloading automatically. If it doesn't, check your browser's download bar."
            onClose={handleClose}
          />
        ) : (
          <ResourceDownloadContent onSuccess={() => setSubmitted(true)} />
        )}
      </FormModal>
    </>
  );
}

/* ───────────────────────────────────────────────────
   8. INDIVIDUAL LEARNING FORM
   No matching backend endpoint yet — still local-only.
─────────────────────────────────────────────────── */
