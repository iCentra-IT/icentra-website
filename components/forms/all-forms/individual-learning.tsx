"use client";

import { useState } from "react";
import { FormCard, FormField, FormModal, FormRow, FormSelect, FormSubmit, IcentraCheckbox } from "../form-component";
import { CAREER_OPTS, SOLUTION_OPTS, TIME_SLOT_OPTS } from "./shared";

function IndividualLearningContent() {
  const [agreed, setAgreed] = useState(false);
  return (
    <FormCard title="Individual Learning Form">
      <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
        <FormRow>
          <FormField label="First Name"    required name="firstName" type="text"  placeholder="Enter first name" />
          <FormField label="Last Name"     required name="lastName"  type="text"  placeholder="Enter last name" />
        </FormRow>
        <FormRow>
          <FormField label="Email"         required name="email"     type="email" placeholder="Enter Email" />
          <FormField label="Phone Number"  required name="phone"     type="tel"   placeholder="select organization" />
        </FormRow>
        <FormSelect label="Career Level"     required name="careerLevel"  options={CAREER_OPTS}     placeholder="Select Career level" />
        <FormSelect label="Preferred Date/Time" required name="dateTime"  options={TIME_SLOT_OPTS}  placeholder="Select Industry" />
        <FormSelect label="Area of Interest"    name="areaOfInterest"     options={SOLUTION_OPTS}   placeholder="Select Industry" />
        <IcentraCheckbox checked={agreed} onChange={setAgreed} />
        <FormSubmit />
      </form>
    </FormCard>
  );
}

export function IndividualLearningModal({
  triggerLabel = "Enroll Now",
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
        <IndividualLearningContent />
      </FormModal>
    </>
  );
}

/* ───────────────────────────────────────────────────
   9. CORPORATE SOLUTION INQUIRY FORM
   No matching backend endpoint yet — still local-only.
─────────────────────────────────────────────────── */
