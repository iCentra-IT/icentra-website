"use client";

import { useState } from "react";
import { FormCard, FormField, FormFileUpload, FormModal, FormRow, FormSelect, FormSubmit, FormTextarea, IcentraCheckbox, WebinarBanner } from "../form-component";


/* ─────────────────────────────────────────────────
   SHARED OPTION LISTS
───────────────────────────────────────────────── */
const COMPANY_SIZE_OPTS   = ["1–10", "11–50", "51–200", "201–500", "500+"];
const CONSULT_TYPE_OPTS   = ["Strategy Consulting", "Technology Advisory", "Training & Development", "Cybersecurity Audit", "Other"];
const CONTACT_METHOD_OPTS = ["Email", "Phone", "Video Call", "In-Person"];
const URGENCY_OPTS        = ["Low", "Medium", "High", "Critical"];
const SUBJECT_OPTS        = ["General Inquiry", "Partnership", "Media & Press", "Complaint", "Other"];
const INDUSTRY_OPTS       = ["Government", "Not-for-Profit", "Banking & Finance", "Telecoms & IT", "Construction", "Oil & Gas", "Health", "Agriculture", "Education", "Manufacturing", "Defence", "Media"];
const SOLUTION_OPTS       = ["Enterprise Transformation", "Cybersecurity & GRC", "Strategy & Execution", "Learning & Talent"];
const CAREER_OPTS         = ["Analyst", "Senior Analyst", "Manager", "Senior Manager", "Director", "Vice President", "Chief"];
const FREQUENCY_OPTS      = ["Daily", "Weekly", "Bi-Weekly", "Monthly"];
const INTEREST_OPTS       = ["Enterprise Transformation", "Cybersecurity", "Strategy & Execution", "Learning & Development", "Events & Webinars", "Research & Reports"];
const TIMEZONE_OPTS       = ["UTC−5 (EST)", "UTC+0 (GMT)", "UTC+1 (WAT)", "UTC+3 (EAT)", "UTC+5:30 (IST)", "UTC+8 (SGT)"];
const REMINDER_OPTS       = ["1 hour before", "1 day before", "3 days before", "1 week before"];
const HOW_HEARD_OPTS      = ["Google / Search", "Social Media", "Referral", "Email Newsletter", "Event", "Other"];
const TIMELINE_OPTS       = ["Immediately", "Within 1 month", "1–3 months", "3–6 months", "6+ months"];
const CORP_SOLUTION_OPTS  = ["Enterprise Transformation", "Cybersecurity & GRC", "PMO & Delivery", "Strategy & Execution", "Learning & Development", "Custom Programme"];
const AVAIL_OPTS          = ["Weekdays", "Weekends", "Mornings", "Afternoons", "Evenings", "Flexible"];
const TIME_SLOT_OPTS      = ["Morning (9am–12pm)", "Afternoon (12pm–5pm)", "Evening (5pm–8pm)", "Weekend"];

/* ═══════════════════════════════════════════════════════════════
   HELPER — triggers a modal with a button
   Every modal form uses this pattern:
     const [open, setOpen] = useState(false)
     <ModalFormTrigger label="Open form" open={open} setOpen={setOpen}>
       <TheFormContent />
     </ModalFormTrigger>
═══════════════════════════════════════════════════════════════ */
// function useModal() {
//   const [open, setOpen] = useState(false);
//   return { open, open: open, setOpen, onOpen: () => setOpen(true), onClose: () => setOpen(false) };
// }

/* ═══════════════════════════════════════════════════════════════
   ─────────────────────────────────────────────────────────────
   CONTACT PAGE FORMS — rendered INLINE (not in a modal)
   ─────────────────────────────────────────────────────────────
═══════════════════════════════════════════════════════════════ */

/**
 * General Contact Form — Variant A
 * (Full consultation-style form — used on /contact page)
 * INLINE — not wrapped in a modal.
 */
export function GeneralContactFormA() {
  const [agreed, setAgreed] = useState(false);
  return (
    <FormCard title="General Contact Form">
      <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
        <FormField   label="Full Name"              required name="fullName"          type="text"          placeholder="Your surname first" />
        <FormField   label="Email"                  required name="email"             type="email"         placeholder="Enter your active mail" />
        <FormField   label="Company Name"                    name="companyName"       type="text"          placeholder="Name" />
        <FormSelect  label="Company Size"                    name="companySize"       options={COMPANY_SIZE_OPTS}   placeholder="Select Subject" />
        <FormSelect  label="Consultation Type"               name="consultationType"  options={CONSULT_TYPE_OPTS}   placeholder="Select Type" />
        <FormField   label="Preferred Date & Time"           name="preferredDateTime" type="datetime-local" placeholder="DD/MM/YYYY HH:MM" />
        <FormTextarea label="Project Description"            name="projectDesc"       rows={5}             placeholder="Type here..." />
        <FormSelect  label="Preferred Contact Method"        name="contactMethod"     options={CONTACT_METHOD_OPTS} placeholder="Select Type" />
        <FormSelect  label="Urgency Level"                   name="urgencyLevel"      options={URGENCY_OPTS}        placeholder="select level" />
        <IcentraCheckbox checked={agreed} onChange={setAgreed} />
        <FormSubmit />
      </form>
    </FormCard>
  );
}

/**
 * General Contact Form — Variant B
 * (Shorter motivation-style form — also used inline on /contact page)
 * INLINE — not wrapped in a modal.
 */
export function GeneralContactFormB() {
  const [agreed, setAgreed] = useState(false);
  return (
    <FormCard title="General Contact Form">
      <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
        <FormField   label="Full Name"               required name="fullName"      type="text"  placeholder="Your surname first" />
        <FormField   label="Email"                   required name="email"         type="email" placeholder="Enter your active mail" />
        <FormField   label="Company Name"                     name="companyName"   type="text"  placeholder="Name" />
        <FormSelect  label="Subject"                          name="subject"       options={SUBJECT_OPTS}        placeholder="Select Subject" />
        <FormTextarea label="Motivation"                      name="motivation"    rows={5}     placeholder="Type here..." />
        <FormSelect  label="Preferred Contact Method"         name="contactMethod" options={CONTACT_METHOD_OPTS} placeholder="Select Method" />
        <FormSelect  label="Urgency Level"                    name="urgencyLevel"  options={URGENCY_OPTS}        placeholder="Select Level" />
        <IcentraCheckbox checked={agreed} onChange={setAgreed} />
        <FormSubmit />
      </form>
    </FormCard>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ─────────────────────────────────────────────────────────────
   MODAL FORMS — each exports:
     1. The form content component (pure UI, no modal wrapper)
     2. A modal trigger component (button + FormModal wrapping the content)
   ─────────────────────────────────────────────────────────────
═══════════════════════════════════════════════════════════════ */

/* ───────────────────────────────────────────────────
   3. HOMEPAGE FORM — "Start Your Transformation Journey"
─────────────────────────────────────────────────── */
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
        className={triggerClassName ?? "inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#0066FF] text-white text-[14px] font-semibold hover:bg-[#25429A] transition-colors"}
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
─────────────────────────────────────────────────── */
function WebinarRegistrationContent() {
  const [agreed, setAgreed] = useState(false);
  return (
    <FormCard title="Webinar Registration Form">
      <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
        <WebinarBanner
          image="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80"
          alt="Leadership in Business Webinar"
        />
        <FormField   label="Full Name"          required name="fullName" type="text"  placeholder="Your surname first" />
        <FormField   label="Email"              required name="email"    type="email" placeholder="Enter your active mail" />
        <FormSelect  label="Time Zone"                   name="timezone" options={TIMEZONE_OPTS} placeholder="Select time zone" />
        <FormTextarea label="Questions For Host"         name="hostQs"   rows={4}     placeholder="Type your questions here..." />
        <FormSelect  label="Reminder References"         name="reminder" options={REMINDER_OPTS} placeholder="Select time zone" />
        <IcentraCheckbox checked={agreed} onChange={setAgreed} />
        <FormSubmit />
      </form>
    </FormCard>
  );
}

export function WebinarRegistrationModal({
  triggerLabel = "Register Now",
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
        className={triggerClassName ?? "inline-flex items-center px-7 py-3.5 rounded-full bg-[#0066FF] text-white text-[14px] font-semibold hover:bg-[#25429A] transition-colors"}
      >
        {triggerLabel}
      </button>
      <FormModal open={open} onClose={() => setOpen(false)}>
        <WebinarRegistrationContent />
      </FormModal>
    </>
  );
}

/* ───────────────────────────────────────────────────
   5. JOB APPLICATION FORM
─────────────────────────────────────────────────── */
function JobApplicationContent() {
  const [agreed, setAgreed] = useState(false);
  return (
    <FormCard title="Job Application Form">
      <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
        <FormField     label="Full Name"                    required name="fullName"    type="text"  placeholder="Your surname first" />
        <FormField     label="Email"                        required name="email"       type="email" placeholder="Enter your active mail" />
        <FormFileUpload label="Upload your Resume and Cover Letter" required accept=".pdf,.doc,.docx" />
        <FormField     label="LinkedIn Profile Upload"               name="linkedin"    type="url"   placeholder="Url" />
        <FormField     label="Referral Source"              required name="referral"    type="text"  placeholder="Referral" />
        <FormField     label="Availability Date"                     name="available"   type="date"  placeholder="dd/mm/yyyy" />
        <IcentraCheckbox checked={agreed} onChange={setAgreed} />
        <FormSubmit />
      </form>
    </FormCard>
  );
}

export function JobApplicationModal({
  triggerLabel = "Apply",
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
        className={triggerClassName ?? "inline-flex items-center px-6 py-2.5 rounded-full bg-[#0066FF] text-white text-[13px] font-semibold hover:bg-[#25429A] transition-colors"}
      >
        {triggerLabel}
      </button>
      <FormModal open={open} onClose={() => setOpen(false)}>
        <JobApplicationContent />
      </FormModal>
    </>
  );
}

/* ───────────────────────────────────────────────────
   6. NEWSLETTER SUBSCRIPTION FORM
─────────────────────────────────────────────────── */
function NewsletterContent() {
  const [agreed, setAgreed] = useState(false);
  return (
    <FormCard title="Newsletter Subscription Form">
      <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
        <FormField  label="Full Name"             required name="fullName"  type="text"  placeholder="Your surname first" />
        <FormField  label="Email"                 required name="email"     type="email" placeholder="Enter your active mail" />
        <FormSelect label="Interest Categories"            name="interests" options={INTEREST_OPTS}   placeholder="Select Industry" />
        <FormSelect label="Frequency Preference"           name="frequency" options={FREQUENCY_OPTS}  placeholder="Select Industry" />
        <IcentraCheckbox checked={agreed} onChange={setAgreed} />
        <FormSubmit />
      </form>
    </FormCard>
  );
}

export function NewsletterModal({
  triggerLabel = "Sign up, stay connected",
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
        className={triggerClassName ?? "inline-flex items-center px-7 py-3.5 rounded-full bg-[#0066FF] text-white text-[14px] font-semibold hover:bg-[#25429A] transition-colors"}
      >
        {triggerLabel}
      </button>
      <FormModal open={open} onClose={() => setOpen(false)}>
        <NewsletterContent />
      </FormModal>
    </>
  );
}

/* ───────────────────────────────────────────────────
   7. RESOURCE DOWNLOAD FORM
─────────────────────────────────────────────────── */
function ResourceDownloadContent() {
  const [agreed, setAgreed] = useState(false);
  return (
    <FormCard title="Resource Download Form">
      <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
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
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={triggerClassName ?? "inline-flex items-center px-7 py-3.5 rounded-full bg-[#0066FF] text-white text-[14px] font-semibold hover:bg-[#25429A] transition-colors"}
      >
        {triggerLabel}
      </button>
      <FormModal open={open} onClose={() => setOpen(false)}>
        <ResourceDownloadContent />
      </FormModal>
    </>
  );
}

/* ───────────────────────────────────────────────────
   8. INDIVIDUAL LEARNING FORM
─────────────────────────────────────────────────── */
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
        className={triggerClassName ?? "inline-flex items-center px-7 py-3.5 rounded-full bg-[#0066FF] text-white text-[14px] font-semibold hover:bg-[#25429A] transition-colors"}
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
─────────────────────────────────────────────────── */
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
        className={triggerClassName ?? "inline-flex items-center px-7 py-3.5 rounded-full bg-[#0066FF] text-white text-[14px] font-semibold hover:bg-[#25429A] transition-colors"}
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
─────────────────────────────────────────────────── */
function VolunteerRegistrationContent() {
  const [agreed, setAgreed] = useState(false);
  return (
    <FormCard title="Volunteer Registration Form">
      <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
        <FormField   label="Full Name"        required name="fullName"    type="text"  placeholder="Your surname first" />
        <FormField   label="Email"            required name="email"       type="email" placeholder="Enter your active mail" />
        <FormField   label="Skills/ Expertise"         name="skills"      type="text"  placeholder="Skill set" />
        <FormSelect  label="Availability"     required name="availability" options={AVAIL_OPTS} placeholder="Referral" />
        <FormTextarea label="Motivation"               name="motivation"  rows={5}     placeholder="Type here..." />
        <IcentraCheckbox checked={agreed} onChange={setAgreed} />
        <FormSubmit />
      </form>
    </FormCard>
  );
}

export function VolunteerRegistrationModal({
  triggerLabel = "Continue Here",
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
        className={triggerClassName ?? "inline-flex items-center px-8 py-3.5 rounded-full bg-[#0066FF] text-white text-[14px] font-semibold hover:bg-[#25429A] transition-colors"}
      >
        {triggerLabel}
      </button>
      <FormModal open={open} onClose={() => setOpen(false)}>
        <VolunteerRegistrationContent />
      </FormModal>
    </>
  );
}