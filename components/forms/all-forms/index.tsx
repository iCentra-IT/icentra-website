"use client";

import { useRef, useState } from "react";
import { FormCard, FormField, FormFileUpload, FormModal, FormRow, FormSelect, FormSubmit, FormTextarea, IcentraCheckbox, WebinarBanner } from "../form-component";
import TurnstileWidget, { type TurnstileWidgetHandle } from "../turnstile-widget";
import { ApiError } from "@/lib/api/client";
import { PREFERRED_QUARTER_LABELS, HOW_HEARD_LABELS, type PreferredQuarter, type HowHeard } from "@/lib/api/speakers";
import { useSubmitContactInquiry } from "@/lib/queries/contact";
import { useSubmitSolutionInquiry } from "@/lib/queries/solutions";
import type { SolutionInterest } from "@/lib/api/solutions";
import { useSubmitPartnershipInquiry } from "@/lib/queries/partnerships";
import type { PartnershipInterest } from "@/lib/api/partnerships";
import { useNewsletterCategories, useSubscribeNewsletter } from "@/lib/queries/newsletter";
import { useVolunteerSkills, useVolunteerAvailability, useSubmitVolunteerApplication } from "@/lib/queries/volunteer";
import { usePillars } from "@/lib/queries/pillars";
import { useSubmitSpeakerApplication } from "@/lib/queries/speakers";
import { useRegisterForEvent } from "@/lib/queries/events";
import { useApplyToJob } from "@/lib/queries/jobs";
import { trackEvent } from "@/lib/analytics/track";

/* ─────────────────────────────────────────────────
   SHARED OPTION LISTS
───────────────────────────────────────────────── */
const COMPANY_SIZE_OPTS   = ["1–10", "11–50", "51–200", "201–500", "500+"];
const CONSULT_TYPE_OPTS   = ["Strategy Consulting", "Technology Advisory", "Training & Development", "Cybersecurity Audit", "Other"];
const CONTACT_METHOD_OPTS = ["Email", "Phone", "Video Call", "In-Person"];
const URGENCY_OPTS        = ["Low", "Medium", "High", "Critical"];
const SUBJECT_OPTS        = ["General Inquiry", "Partnership", "Media & Press", "Complaint", "Other"];
export const INDUSTRY_OPTS = ["Government", "Not-for-Profit", "Banking & Finance", "Telecoms & IT", "Construction", "Oil & Gas", "Health", "Agriculture", "Education", "Manufacturing", "Defence", "Media"];
const SOLUTION_OPTS       = ["Enterprise Transformation", "Cybersecurity & GRC", "Strategy & Execution", "Learning & Talent"];
const CAREER_OPTS         = ["Analyst", "Senior Analyst", "Manager", "Senior Manager", "Director", "Vice President", "Chief"];
const FREQUENCY_OPTS      = [
  { label: "Daily", value: "daily" },
  { label: "Weekly", value: "weekly" },
  { label: "Bi-Weekly", value: "bi-weekly" },
  { label: "Monthly", value: "monthly" },
];
// Values are real IANA identifiers (what the backend parses as a timezone),
// labels are the friendly offset the user actually recognizes.
const TIMEZONE_OPTS       = [
  { label: "UTC−5 (EST)",    value: "America/New_York" },
  { label: "UTC+0 (GMT)",    value: "UTC" },
  { label: "UTC+1 (WAT)",    value: "Africa/Lagos" },
  { label: "UTC+3 (EAT)",    value: "Africa/Nairobi" },
  { label: "UTC+5:30 (IST)", value: "Asia/Kolkata" },
  { label: "UTC+8 (SGT)",    value: "Asia/Singapore" },
];
const REMINDER_OPTS       = [
  { label: "1 hour before", value: "60" },
  { label: "1 day before", value: "1440" },
  { label: "3 days before", value: "4320" },
  { label: "1 week before", value: "10080" },
];
const HOW_HEARD_OPTS: { label: string; value: HowHeard }[] = Object.entries(HOW_HEARD_LABELS).map(([value, label]) => ({
  label,
  value: value as HowHeard,
}));
const TIMELINE_OPTS       = ["Immediately", "Within 1 month", "1–3 months", "3–6 months", "6+ months"];
const CORP_SOLUTION_OPTS  = ["Enterprise Transformation", "Cybersecurity & GRC", "PMO & Delivery", "Strategy & Execution", "Learning & Development", "Custom Programme"];
const TIME_SLOT_OPTS      = ["Morning (9am–12pm)", "Afternoon (12pm–5pm)", "Evening (5pm–8pm)", "Weekend"];
const PREFERRED_QUARTER_OPTS: { label: string; value: PreferredQuarter }[] = Object.entries(PREFERRED_QUARTER_LABELS).map(
  ([value, label]) => ({ label, value: value as PreferredQuarter })
);

/* ─────────────────────────────────────────────────
   SHARED HELPERS
───────────────────────────────────────────────── */

/** Reads a plain (non-file) form's fields into an object, dropping blanks. */
function formEntriesToObject(form: HTMLFormElement): Record<string, string> {
  const data = new FormData(form);
  const obj: Record<string, string> = {};
  for (const [key, value] of data.entries()) {
    if (typeof value === "string" && value.trim() !== "") obj[key] = value;
  }
  return obj;
}

function errorText(err: unknown): string {
  return err instanceof ApiError ? err.firstFieldError ?? err.message : "Something went wrong. Please try again.";
}

/** Pill-style multi-select — used wherever a form picks several reference-data slugs. */
function CheckboxGroup({
  label,
  options,
  selected,
  onChange,
}: {
  label: string;
  options: { label: string; value: string }[];
  selected: string[];
  onChange: (values: string[]) => void;
}) {
  function toggle(value: string) {
    onChange(selected.includes(value) ? selected.filter((v) => v !== value) : [...selected, value]);
  }
  if (options.length === 0) return null;
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[#374151] text-sm font-medium">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = selected.includes(opt.value);
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => toggle(opt.value)}
              className={`px-3.5 py-2 rounded-full text-sm font-medium border transition-colors cursor-pointer ${
                active
                  ? "bg-[#0066FF] border-[#0066FF] text-white"
                  : "bg-white border-[#DCE0E8] text-[#374151] hover:border-[#0066FF]"
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ───────────────────────────────────────────────────
   SHARED — success panel shown after a real submission
─────────────────────────────────────────────────── */
function ApplicationSuccess({
  title,
  message,
  onClose,
}: {
  title: string;
  message: string;
  onClose: () => void;
}) {
  return (
    <FormCard title={title}>
      <div className="flex flex-col items-center text-center gap-4 py-6">
        <span className="w-14 h-14 rounded-full bg-[#0066FF]/10 flex items-center justify-center">
          <svg className="w-7 h-7 text-[#0066FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </span>
        <p className="text-[#374151] text-sm leading-relaxed max-w-sm">{message}</p>
        <button
          onClick={onClose}
          className="mt-2 px-7 py-3 rounded-full bg-[#0066FF] text-white text-sm font-semibold hover:bg-[#25429A] transition-colors cursor-pointer"
        >
          Close
        </button>
      </div>
    </FormCard>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ─────────────────────────────────────────────────────────────
   CONTACT PAGE FORMS — rendered INLINE (not in a modal)
   POST /api/v1/contact/inquiries/
   ─────────────────────────────────────────────────────────────
═══════════════════════════════════════════════════════════════ */

/**
 * General Contact Form — Variant A
 * (Full consultation-style form — used on /contact page)
 * INLINE — not wrapped in a modal.
 */
export function GeneralContactFormA() {
  const [agreed, setAgreed] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const turnstileRef = useRef<TurnstileWidgetHandle>(null);
  const { mutateAsync: submitInquiry, isPending, error } = useSubmitContactInquiry();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const f = formEntriesToObject(e.currentTarget);
    // The consultation-specific fields (company size, timing, urgency, etc.)
    // have no dedicated column on the backend — fold them into the message
    // body so nothing the visitor typed is lost.
    const extra = [
      f.companySize && `Company size: ${f.companySize}`,
      f.consultationType && `Consultation type: ${f.consultationType}`,
      f.preferredDateTime && `Preferred date/time: ${f.preferredDateTime}`,
      f.contactMethod && `Preferred contact method: ${f.contactMethod}`,
      f.urgencyLevel && `Urgency: ${f.urgencyLevel}`,
    ].filter(Boolean) as string[];
    const message = [f.projectDesc, extra.join("\n")].filter(Boolean).join("\n\n") || "(No additional details provided.)";

    try {
      await submitInquiry({
        first_name: f.firstName,
        last_name: f.lastName,
        email: f.email,
        organization: f.companyName,
        industry: f.industry,
        phone: f.phone,
        message,
        marketing_consent: agreed,
        ...(turnstileToken && { "cf-turnstile-response": turnstileToken }),
      });
      trackEvent("consultation_request", { consultation_type: f.consultationType });
      setSubmitted(true);
    } catch {
      turnstileRef.current?.reset();
    }
  }

  if (submitted) {
    return (
      <ApplicationSuccess
        title="Message Sent"
        message="Thanks for reaching out. Our team will review your message and get back to you shortly."
        onClose={() => setSubmitted(false)}
      />
    );
  }

  return (
    <FormCard title="General Contact Form">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <FormRow>
          <FormField label="First Name" required name="firstName" type="text" placeholder="Enter first name" />
          <FormField label="Last Name" name="lastName" type="text" placeholder="Enter last name" />
        </FormRow>
        <FormRow>
          <FormField label="Email" required name="email" type="email" placeholder="Enter your active mail" />
          <FormField label="Phone Number" name="phone" type="tel" placeholder="Enter phone number" />
        </FormRow>
        <FormField label="Company Name" name="companyName" type="text" placeholder="Name" />
        <FormSelect label="Industry" name="industry" options={INDUSTRY_OPTS} placeholder="Select Industry" />
        <FormRow>
          <FormSelect label="Company Size" name="companySize" options={COMPANY_SIZE_OPTS} placeholder="Select Size" />
          <FormSelect label="Consultation Type" name="consultationType" options={CONSULT_TYPE_OPTS} placeholder="Select Type" />
        </FormRow>
        <FormField label="Preferred Date & Time" name="preferredDateTime" type="datetime-local" />
        <FormTextarea label="Project Description" name="projectDesc" rows={5} placeholder="Type here..." />
        <FormRow>
          <FormSelect label="Preferred Contact Method" name="contactMethod" options={CONTACT_METHOD_OPTS} placeholder="Select Method" />
          <FormSelect label="Urgency Level" name="urgencyLevel" options={URGENCY_OPTS} placeholder="Select Level" />
        </FormRow>
        <IcentraCheckbox checked={agreed} onChange={setAgreed} />
        <TurnstileWidget ref={turnstileRef} onVerify={setTurnstileToken} />
        {error && <p className="text-red-600 text-sm text-center">{errorText(error)}</p>}
        <FormSubmit label={isPending ? "Sending…" : "Submit"} />
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
  const [turnstileToken, setTurnstileToken] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const turnstileRef = useRef<TurnstileWidgetHandle>(null);
  const { mutateAsync: submitInquiry, isPending, error } = useSubmitContactInquiry();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const f = formEntriesToObject(e.currentTarget);
    const extra = [
      f.contactMethod && `Preferred contact method: ${f.contactMethod}`,
      f.urgencyLevel && `Urgency: ${f.urgencyLevel}`,
    ].filter(Boolean) as string[];
    const message = [f.motivation, extra.join("\n")].filter(Boolean).join("\n\n") || "(No additional details provided.)";

    try {
      await submitInquiry({
        first_name: f.firstName,
        last_name: f.lastName,
        email: f.email,
        organization: f.companyName,
        subject: f.subject,
        message,
        marketing_consent: agreed,
        ...(turnstileToken && { "cf-turnstile-response": turnstileToken }),
      });
      trackEvent("contact_form_submit", { subject: f.subject });
      setSubmitted(true);
    } catch {
      turnstileRef.current?.reset();
    }
  }

  if (submitted) {
    return (
      <ApplicationSuccess
        title="Message Sent"
        message="Thanks for reaching out. Our team will review your message and get back to you shortly."
        onClose={() => setSubmitted(false)}
      />
    );
  }

  return (
    <FormCard title="General Contact Form">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <FormField   label="First Name"              required name="firstName"    type="text"  placeholder="Enter first name" />
        <FormField   label="Last Name"                         name="lastName"     type="text"  placeholder="Enter last name" />
        <FormField   label="Email"                   required name="email"        type="email" placeholder="Enter your active mail" />
        <FormField   label="Company Name"                     name="companyName"  type="text"  placeholder="Name" />
        <FormSelect  label="Subject"                          name="subject"      options={SUBJECT_OPTS}        placeholder="Select Subject" />
        <FormTextarea label="Motivation"                      name="motivation"   rows={5}     placeholder="Type here..." />
        <FormSelect  label="Preferred Contact Method"         name="contactMethod" options={CONTACT_METHOD_OPTS} placeholder="Select Method" />
        <FormSelect  label="Urgency Level"                    name="urgencyLevel" options={URGENCY_OPTS}        placeholder="Select Level" />
        <IcentraCheckbox checked={agreed} onChange={setAgreed} />
        <TurnstileWidget ref={turnstileRef} onVerify={setTurnstileToken} />
        {error && <p className="text-red-600 text-sm text-center">{errorText(error)}</p>}
        <FormSubmit label={isPending ? "Sending…" : "Submit"} />
      </form>
    </FormCard>
  );
}

/**
 * ContactInquiryForm
 * The inline "Send us a message" form on /contact — Organization is
 * optional free text, Industry is a required select (same list as the
 * Download Brochure / Register forms), matching that page's own fields
 * rather than the longer General Contact Form variants above.
 */
export function ContactInquiryForm() {
  const [agreed, setAgreed] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const turnstileRef = useRef<TurnstileWidgetHandle>(null);
  const { mutateAsync: submitInquiry, isPending, error } = useSubmitContactInquiry();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = formEntriesToObject(e.currentTarget);

    try {
      await submitInquiry({
        first_name: f.firstName,
        last_name: f.lastName,
        email: f.email,
        organization: f.organization,
        industry: f.industry,
        message: f.message || "(No additional details provided.)",
        marketing_consent: agreed,
        ...(turnstileToken && { "cf-turnstile-response": turnstileToken }),
      });
      trackEvent("contact_form_submit", { industry: f.industry });
      setSubmitted(true);
    } catch {
      turnstileRef.current?.reset();
    }
  }

  if (submitted) {
    return (
      <div className="max-w-[760px] mx-auto bg-[#EAF3FB] rounded-3xl px-8 py-10 lg:px-12 lg:py-12">
        <div className="flex flex-col items-center text-center gap-4 py-6">
          <span className="w-14 h-14 rounded-full bg-[#0066FF]/10 flex items-center justify-center">
            <svg className="w-7 h-7 text-[#0066FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </span>
          <h2 className="text-[#1A274F] text-[22px] lg:text-[26px] font-bold">Message Sent</h2>
          <p className="text-[#374151] text-sm leading-relaxed max-w-sm">
            Thanks for reaching out. Our team will review your message and get back to you shortly.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-2 px-7 py-3 rounded-full bg-[#0066FF] text-white text-sm font-semibold hover:bg-[#25429A] transition-colors cursor-pointer"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[760px] mx-auto bg-[#EAF3FB] rounded-3xl px-8 py-10 lg:px-12 lg:py-12">
      <h2 className="text-[#1A274F] text-[22px] lg:text-[26px] font-bold text-center mb-8">
        Send us a message
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <FormRow>
          <FormField label="First Name" required name="firstName" type="text" placeholder="Enter first name" />
          <FormField label="Last Name" required name="lastName" type="text" placeholder="Enter last name" />
        </FormRow>
        <FormRow>
          <FormField label="Email" required name="email" type="email" placeholder="Enter Email" />
          <FormField label="Organization" name="organization" type="text" placeholder="Enter your organization" />
        </FormRow>
        <FormSelect label="Industry" required name="industry" options={INDUSTRY_OPTS} placeholder="Select Industry" />
        <FormTextarea label="How Can we help you?" name="message" rows={4} placeholder="Tell us how we can help..." />
        <IcentraCheckbox checked={agreed} onChange={setAgreed} />
        <TurnstileWidget ref={turnstileRef} onVerify={setTurnstileToken} />
        {error && <p className="text-red-600 text-sm text-center">{errorText(error)}</p>}
        <div className="flex justify-center mt-2">
          <button
            type="submit"
            disabled={isPending}
            className="w-full sm:w-[220px] py-3.5 rounded-full bg-[#0066FF] text-white text-sm font-semibold hover:bg-[#25429A] disabled:opacity-60 transition-colors"
          >
            {isPending ? "Sending…" : "Submit"}
          </button>
        </div>
      </form>
    </div>
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
   No matching backend endpoint yet — still local-only.
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
const DEFAULT_WEBINAR_IMAGE = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80";

function WebinarRegistrationContent({
  eventSlug,
  eventTitle,
  eventImage,
  onSuccess,
}: {
  eventSlug: string;
  eventTitle?: string;
  eventImage?: string | null;
  onSuccess: () => void;
}) {
  const [agreed, setAgreed] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileRef = useRef<TurnstileWidgetHandle>(null);
  const { mutateAsync: registerForEvent, isPending, error } = useRegisterForEvent();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = formEntriesToObject(e.currentTarget);

    try {
      await registerForEvent({
        slug: eventSlug,
        data: {
          first_name: f.firstName,
          last_name: f.lastName,
          email: f.email,
          organization: f.organization,
          job_title: f.jobTitle,
          timezone: f.timezone,
          questions_for_host: f.hostQs,
          marketing_consent: agreed,
          reminder_offsets: f.reminder ? [Number(f.reminder)] : undefined,
          ...(turnstileToken && { "cf-turnstile-response": turnstileToken }),
        },
      });
      trackEvent("webinar_registration", { event_slug: eventSlug, event_title: eventTitle });
      onSuccess();
    } catch {
      turnstileRef.current?.reset();
    }
  }

  return (
    <FormCard title="Webinar Registration Form">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <WebinarBanner image={eventImage || DEFAULT_WEBINAR_IMAGE} alt={eventTitle ?? "iCentra webinar"} />
        {eventTitle && (
          <p className="text-[#6B7280] text-sm -mt-2">
            Registering for <span className="text-[#1A274F] font-semibold">{eventTitle}</span>
          </p>
        )}
        <FormRow>
          <FormField label="First Name"   required name="firstName"    type="text"  placeholder="Your first name" />
          <FormField label="Last Name"             name="lastName"     type="text"  placeholder="Your last name" />
        </FormRow>
        <FormField   label="Email"              required name="email"    type="email" placeholder="Enter your active mail" />
        <FormRow>
          <FormField  label="Organisation"                name="organization" type="text" placeholder="Your organisation" />
          <FormField  label="Job Title"                   name="jobTitle"     type="text" placeholder="Your job title" />
        </FormRow>
        <FormSelect  label="Time Zone"                   name="timezone" options={TIMEZONE_OPTS} placeholder="Select time zone" />
        <FormTextarea label="Questions For Host"         name="hostQs"   rows={4}     placeholder="Type your questions here..." />
        <FormSelect  label="Remind Me"                   name="reminder" options={REMINDER_OPTS} placeholder="Select a reminder" />
        <IcentraCheckbox checked={agreed} onChange={setAgreed} />
        <TurnstileWidget ref={turnstileRef} onVerify={setTurnstileToken} />
        {error && <p className="text-red-600 text-sm text-center">{errorText(error)}</p>}
        <FormSubmit label={isPending ? "Registering…" : "Register"} />
      </form>
    </FormCard>
  );
}

export function WebinarRegistrationModal({
  eventSlug,
  eventTitle,
  eventImage,
  triggerLabel = "Register Now",
  triggerClassName,
}: {
  eventSlug: string;
  eventTitle?: string;
  eventImage?: string | null;
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
            title="You're Registered"
            message="We've saved your spot and will send a confirmation and reminders to your email."
            onClose={handleClose}
          />
        ) : (
          <WebinarRegistrationContent
            eventSlug={eventSlug}
            eventTitle={eventTitle}
            eventImage={eventImage}
            onSuccess={() => setSubmitted(true)}
          />
        )}
      </FormModal>
    </>
  );
}

const REFERRAL_SOURCE_OPTS = [
  { label: "Website", value: "website" },
  { label: "LinkedIn", value: "linkedin" },
  { label: "Employee referral", value: "referral" },
  { label: "Job board", value: "job_board" },
  { label: "Recruitment agency", value: "agency" },
  { label: "Other", value: "other" },
];

/* ───────────────────────────────────────────────────
   5. JOB APPLICATION FORM
   POST /api/v1/jobs/{slug}/apply/ — multipart, resume required.
─────────────────────────────────────────────────── */
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
          <FormField label="Phone Number" name="phone" type="tel" placeholder="Enter phone number" />
        </FormRow>
        <FormField label="Location" name="location" type="text" placeholder="City, Country" />
        <FormFileUpload label="Resume" required accept=".pdf,.doc,.docx" onFileChange={setResume} />
        <FormFileUpload label="Cover Letter (optional)" accept=".pdf,.doc,.docx" onFileChange={setCoverLetter} />
        <FormField label="LinkedIn Profile" name="linkedin_url" type="url" placeholder="https://linkedin.com/in/..." />
        <FormSelect label="How did you hear about this role?" name="referral_source" options={REFERRAL_SOURCE_OPTS} placeholder="Select" />
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
function NewsletterContent({ onSuccess }: { onSuccess: () => void }) {
  const [agreed, setAgreed] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileRef = useRef<TurnstileWidgetHandle>(null);

  // Category picker is optional — subscribing still works without it, so a
  // fetch failure here is silently ignored (CheckboxGroup renders nothing).
  const { data: categories = [] } = useNewsletterCategories();
  const { mutateAsync: subscribeNewsletter, isPending, error } = useSubscribeNewsletter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = formEntriesToObject(e.currentTarget);

    try {
      await subscribeNewsletter({
        email: f.email,
        full_name: f.fullName,
        frequency: f.frequency as "daily" | "weekly" | "bi-weekly" | "monthly" | undefined,
        category_slugs: selectedCategories.length ? selectedCategories : undefined,
        marketing_consent: agreed,
        ...(turnstileToken && { "cf-turnstile-response": turnstileToken }),
      });
      trackEvent("newsletter_signup", { frequency: f.frequency });
      onSuccess();
    } catch {
      turnstileRef.current?.reset();
    }
  }

  return (
    <FormCard title="Newsletter Subscription Form">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <FormField  label="Full Name"             name="fullName"  type="text"  placeholder="Your surname first" />
        <FormField  label="Email"                 required name="email" type="email" placeholder="Enter your active mail" />
        <CheckboxGroup
          label="Interest Categories"
          options={categories.map((c) => ({ label: c.name, value: c.slug }))}
          selected={selectedCategories}
          onChange={setSelectedCategories}
        />
        <FormSelect label="Frequency Preference" name="frequency" options={FREQUENCY_OPTS} placeholder="Select frequency" />
        <IcentraCheckbox checked={agreed} onChange={setAgreed} />
        <TurnstileWidget ref={turnstileRef} onVerify={setTurnstileToken} />
        {error && <p className="text-red-600 text-sm text-center">{errorText(error)}</p>}
        <FormSubmit label={isPending ? "Subscribing…" : "Subscribe"} />
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
            title="You're Subscribed"
            message="Check your inbox for a confirmation email to complete your subscription."
            onClose={handleClose}
          />
        ) : (
          <NewsletterContent onSuccess={() => setSubmitted(true)} />
        )}
      </FormModal>
    </>
  );
}

/* ───────────────────────────────────────────────────
   7. RESOURCE DOWNLOAD FORM
   No backend endpoint to send the lead to yet, but the brochure itself is a
   real file — submitting triggers the actual download.
─────────────────────────────────────────────────── */
const BROCHURE_FILE = "/ICENTRA-CORPORATE-BROCHURE-2025.pdf";

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
function VolunteerRegistrationContent({ onSuccess }: { onSuccess: () => void }) {
  const [agreed, setAgreed] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileRef = useRef<TurnstileWidgetHandle>(null);

  // Reference-data pickers are optional — submitting still works without
  // them, so a fetch failure here is silently ignored (lists render empty).
  const { data: skills = [] } = useVolunteerSkills();
  const { data: availability = [] } = useVolunteerAvailability();
  const { mutateAsync: submitVolunteerApplication, isPending, error } = useSubmitVolunteerApplication();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = formEntriesToObject(e.currentTarget);

    try {
      await submitVolunteerApplication({
        full_name: f.fullName,
        email: f.email,
        skills: f.skills,
        skill_slugs: selectedSkills.length ? selectedSkills : undefined,
        availability_slugs: selectedAvailability.length ? selectedAvailability : undefined,
        motivation: f.motivation || "(No motivation provided.)",
        marketing_consent: agreed,
        ...(turnstileToken && { "cf-turnstile-response": turnstileToken }),
      });
      trackEvent("volunteer_application");
      onSuccess();
    } catch {
      turnstileRef.current?.reset();
    }
  }

  return (
    <FormCard title="Volunteer Registration Form">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <FormField   label="Full Name"        required name="fullName"    type="text"  placeholder="Your surname first" />
        <FormField   label="Email"            required name="email"       type="email" placeholder="Enter your active mail" />
        <FormField   label="Skills/ Expertise"         name="skills"      type="text"  placeholder="Skill set" />
        <CheckboxGroup
          label="Areas of Expertise"
          options={skills.map((s) => ({ label: s.name, value: s.slug }))}
          selected={selectedSkills}
          onChange={setSelectedSkills}
        />
        <CheckboxGroup
          label="Availability"
          options={availability.map((a) => ({ label: a.name, value: a.slug }))}
          selected={selectedAvailability}
          onChange={setSelectedAvailability}
        />
        <FormTextarea label="Motivation" required name="motivation" rows={5} placeholder="Type here..." />
        <IcentraCheckbox checked={agreed} onChange={setAgreed} />
        <TurnstileWidget ref={turnstileRef} onVerify={setTurnstileToken} />
        {error && <p className="text-red-600 text-sm text-center">{errorText(error)}</p>}
        <FormSubmit label={isPending ? "Submitting…" : "Submit"} />
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
  const [submitted, setSubmitted] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => setSubmitted(false), 300);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={triggerClassName ?? "inline-flex items-center px-8 py-3.5 rounded-full bg-[#0066FF] text-white text-sm font-semibold hover:bg-[#25429A] transition-colors"}
      >
        {triggerLabel}
      </button>
      <FormModal open={open} onClose={handleClose}>
        {submitted ? (
          <ApplicationSuccess
            title="Application Received"
            message="Thanks for your interest in volunteering. Our team will be in touch by email."
            onClose={handleClose}
          />
        ) : (
          <VolunteerRegistrationContent onSuccess={() => setSubmitted(true)} />
        )}
      </FormModal>
    </>
  );
}

/* ───────────────────────────────────────────────────
   11. SPEAKER APPLICATION FORM (Transform Webinar)
   POST /api/v1/speaker-applications/
─────────────────────────────────────────────────── */
function SpeakerApplicationContent({ onSuccess }: { onSuccess: () => void }) {
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileRef = useRef<TurnstileWidgetHandle>(null);

  // Pillar picker is optional — the proposal just won't be tied to one, so a
  // fetch failure here is silently ignored (the select renders empty).
  const { data: pillars = [] } = usePillars();
  const { mutateAsync: submitSpeakerApplication, isPending, error } = useSubmitSpeakerApplication();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = formEntriesToObject(e.currentTarget);

    try {
      await submitSpeakerApplication({
        full_name: f.fullName,
        job_title: f.jobTitle,
        organization: f.organisation,
        email: f.email,
        pillar_slug: f.pillar,
        preferred_quarter: f.quarter as PreferredQuarter | undefined,
        proposed_topic: f.topic,
        previous_speaking_experience: f.experience,
        linkedin_url: f.linkedin,
        how_heard: f.referral as HowHeard | undefined,
        ...(turnstileToken && { "cf-turnstile-response": turnstileToken }),
      });
      trackEvent("speaker_application", { pillar: f.pillar, preferred_quarter: f.quarter });
      onSuccess();
    } catch {
      turnstileRef.current?.reset();
    }
  }

  return (
    <FormCard title="Speaker Application Form" maxWidth="max-w-[820px]">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <FormRow>
          <FormField label="Full Name"     required name="fullName"     type="text"  placeholder="Your full name" />
          <FormField label="Job Title"     required name="jobTitle"     type="text"  placeholder="Your job title" />
        </FormRow>
        <FormRow>
          <FormField label="Organisation"  required name="organisation" type="text"  placeholder="Your organisation" />
          <FormField label="Email Address" required name="email"        type="email" placeholder="you@example.com" />
        </FormRow>
        <FormRow>
          <FormSelect
            label="Pillar / Topic Area"
            name="pillar"
            options={pillars.map((p) => ({ label: p.name, value: p.slug }))}
            placeholder="Select..."
          />
          <FormSelect label="Preferred Quarter" name="quarter" options={PREFERRED_QUARTER_OPTS} placeholder="Select..." />
        </FormRow>
        <FormTextarea label="Proposed Topic or Talk Title (max 200 words)" required name="topic"      rows={5} placeholder="Short description of what you would like to discuss" />
        <FormTextarea label="Previous Speaking Experience"                          name="experience" rows={4} placeholder="Brief summary of past speaking engagements (optional)" />
        <FormField    label="LinkedIn Profile URL"                                  name="linkedin"   type="url" placeholder="https://linkedin.com/in/..." />
        <FormSelect   label="How did you hear about us?"                            name="referral"   options={HOW_HEARD_OPTS} placeholder="Select..." />
        {error && <p className="text-red-600 text-sm">{errorText(error)}</p>}
        <TurnstileWidget ref={turnstileRef} onVerify={setTurnstileToken} />
        <FormSubmit label={isPending ? "Submitting…" : "Submit application"} align="left" tone="navy" />
        <p className="text-[#9CA3AF] text-xs leading-relaxed">
          Submits to events@icentra.com. Auto-response confirms receipt and a 5 to 7 business day review window.
        </p>
      </form>
    </FormCard>
  );
}

export function SpeakerApplicationModal({
  triggerLabel = "Apply to speak",
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
        className={triggerClassName ?? "inline-flex items-center px-7 py-3.5 rounded-full bg-main text-white text-sm font-semibold hover:bg-[#1A274F] transition-colors"}
      >
        {triggerLabel}
      </button>
      <FormModal open={open} onClose={handleClose} maxWidth="max-w-[860px]">
        {submitted ? (
          <ApplicationSuccess
            title="Application Received"
            message="Thanks for applying to speak. Our team will review your proposal and follow up by email."
            onClose={handleClose}
          />
        ) : (
          <SpeakerApplicationContent onSuccess={() => setSubmitted(true)} />
        )}
      </FormModal>
    </>
  );
}

/* ───────────────────────────────────────────────────
   12. GENERAL INQUIRY FORM — Solutions / Partnerships /
   Continuous Transformation pages.
   POST /api/v1/contact/inquiries/ — a dedicated endpoint for each of
   these is expected later; until then this folds the selected
   interest into the message body, same pattern as GeneralContactFormA.
─────────────────────────────────────────────────── */
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
   13. TRANSFORMATION READINESS ASSESSMENT™ REQUEST FORM
   /what-we-do/continuous-transformation — asks a quick self-rating
   across the same four 4P pillars the page scores the assessment on,
   so the intake itself mirrors what the visitor is told they'll get back.
   POST /api/v1/contact/inquiries/ — temporary until a dedicated
   assessment-intake endpoint exists.
─────────────────────────────────────────────────── */
const ASSESSMENT_PILLARS = [
  { key: "portfolio", label: "Portfolio", tag: "Strategy" },
  { key: "project", label: "Project", tag: "Execution" },
  { key: "people", label: "People", tag: "Capability" },
  { key: "product", label: "Product", tag: "Value" },
] as const;

const MATURITY_OPTS = ["Strong", "Developing", "At Risk", "Not Sure"];

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
    <FormCard title="Transformation Readiness Assessment™">
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
            message="Thanks for requesting your Transformation Readiness Assessment™. A member of our team will reach out to schedule it and walk through your results."
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
