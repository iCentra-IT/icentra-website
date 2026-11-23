"use client";

import { useState } from "react";
import { FormCard, FormField, FormModal, FormRow, FormSelect, FormSubmit, FormTextarea, IcentraCheckbox } from "../form-component";
import { INDUSTRY_OPTS, SOLUTION_OPTS } from "./shared";

function HomepageFormContent() {
  const [agreed, setAgreed] = useState(false);
  return (
    <FormCard title="Start Your Transformation Journey">
      <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
        <FormRow>
          <FormField label="First Name"    required name="firstName" type="text"  placeholder="Enter first name" />
          <FormField label="Last Name"     required name="lastName"  type="text"  placeholder="Enter last name" />
        </FormRow>
        <FormRow>
          <FormField label="Email"         required name="email"     type="email" placeholder="Enter Email" />
          <FormField label="Phone Number"  required name="phone"     type="tel"   placeholder="Enter phone number" />
        </FormRow>
        <FormField   label="Company"       required name="company"   type="text"  placeholder="Enter Company" />
        <FormSelect  label="Industry"      required name="industry"  options={INDUSTRY_OPTS}  placeholder="Select Industry" />
        <FormSelect  label="Preferred Solution"      name="solution" options={SOLUTION_OPTS}  placeholder="Select Industry" />
        <FormTextarea label="Message"                name="message"  rows={5}     placeholder="Type your message here..." />
        <IcentraCheckbox checked={agreed} onChange={setAgreed} />
        <FormSubmit />
      </form>
    </FormCard>
  );
}

export function HomepageFormModal({
  triggerLabel = "Start Transformation",
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
        className={triggerClassName ?? "inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#0066FF] text-white text-sm font-semibold hover:bg-[#25429A] transition-colors"}
      >
        {triggerLabel}
      </button>
      <FormModal open={open} onClose={() => setOpen(false)}>
        <HomepageFormContent />
      </FormModal>
    </>
  );
}

/* ───────────────────────────────────────────────────
   4. WEBINAR REGISTRATION FORM
   POST /api/v1/events/{slug}/register/
─────────────────────────────────────────────────── */
