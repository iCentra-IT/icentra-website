"use client";

import { useState } from "react";
import { FormCard, FormField, FormModal, FormRow, FormSelect, FormSubmit, FormTextarea, IcentraCheckbox } from "../form-component";
import { CORP_SOLUTION_OPTS, INDUSTRY_OPTS, TIMELINE_OPTS } from "./shared";

function CorporateSolutionContent() {
  const [agreed, setAgreed] = useState(false);
  return (
    <FormCard title="Corporate Solution Inquiry Form">
      <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
        <FormRow>
          <FormField label="First Name"    required name="firstName" type="text"  placeholder="Enter first name" />
          <FormField label="Last Name"     required name="lastName"  type="text"  placeholder="Enter last name" />
        </FormRow>
        <FormRow>
          <FormField label="Email"         required name="email"     type="email" placeholder="Enter Email" />
          <FormField label="Phone Number"  required name="phone"     type="tel"   placeholder="select organization" />
        </FormRow>
        <FormField   label="Company"        required name="company"          type="text"  placeholder="Enter Company" />
        <FormSelect  label="Industry"       required name="industry"         options={INDUSTRY_OPTS}      placeholder="Select Industry" />
        <FormSelect  label="Corporate Solution"       name="corpSolution"    options={CORP_SOLUTION_OPTS} placeholder="Select Industry" />
        <FormTextarea label="Message"                 name="message"         rows={6}     placeholder="Tell us about your needs..." />
        <FormRow>
          <FormField  label="Preferred Contact Method" name="contactMethod"  type="text"  placeholder="Enter Email" />
          <FormSelect label="Timeline"                  name="timeline"      options={TIMELINE_OPTS}      placeholder="select organization" />
        </FormRow>
        <IcentraCheckbox checked={agreed} onChange={setAgreed} />
        <FormSubmit />
      </form>
    </FormCard>
  );
}

export function CorporateSolutionModal({
  triggerLabel = "Enquire Now",
  triggerClassName,
}: {
  triggerLabel?: string;
  triggerClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={triggerClassName ?? "inline-flex items-center px-7 py-3.5 rounded-full bg-[#0066FF] text-white text-sm font-semibold hover:bg-[#25429A] transition-colors"}
      >
        {triggerLabel}
      </button>
      <FormModal open={open} onClose={() => setOpen(false)}>
        <CorporateSolutionContent />
      </FormModal>
    </>
  );
}

/* ───────────────────────────────────────────────────
   10. VOLUNTEER REGISTRATION FORM
   POST /api/v1/volunteer-applications/
─────────────────────────────────────────────────── */
