"use client";

import { useEffect, useRef, useState } from "react";
import { FormCard, FormField, FormFileUpload, FormModal, FormRow, FormSelect, FormSubmit, FormTextarea, IcentraCheckbox, WebinarBanner } from "../form-component";
import TurnstileWidget, { type TurnstileWidgetHandle } from "../turnstile-widget";
import { ApiError } from "@/lib/api/client";
import { applyToJob } from "@/lib/api/jobs";
import { submitContactInquiry } from "@/lib/api/contact";
import { listNewsletterCategories, subscribeNewsletter, type NewsletterCategory } from "@/lib/api/newsletter";
import { registerForEvent } from "@/lib/api/events";
import { listVolunteerSkills, listVolunteerAvailability, submitVolunteerApplication, type VolunteerSkill, type VolunteerAvailabilitySlot } from "@/lib/api/volunteer";
import { listPillars, type PillarItem } from "@/lib/api/pillars";
import { submitSpeakerApplication, PREFERRED_QUARTER_LABELS, HOW_HEARD_LABELS, type PreferredQuarter, type HowHeard } from "@/lib/api/speakers";

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
const FREQUENCY_OPTS      = [
  { label: "Daily", value: "daily" },
  { label: "Weekly", value: "weekly" },
  { label: "Bi-Weekly", value: "bi-weekly" },
  { label: "Monthly", value: "monthly" },
];
const TIMEZONE_OPTS       = ["UTC−5 (EST)", "UTC+0 (GMT)", "UTC+1 (WAT)", "UTC+3 (EAT)", "UTC+5:30 (IST)", "UTC+8 (SGT)"];
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
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileWidgetHandle>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

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
      await submitContactInquiry({
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
      setSubmitted(true);
    } catch (err) {
      turnstileRef.current?.reset();
      setError(errorText(err));
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <ApplicationSuccess
        title="Message Sent"
        message="Thanks for reaching out. Our team will review your message and get back to you shortly."
        onClose={() => {
          setSubmitted(false);
          setSubmitting(false);
        }}
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
        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        <FormSubmit label={submitting ? "Sending…" : "Submit"} />
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
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileWidgetHandle>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const f = formEntriesToObject(e.currentTarget);
    const extra = [
      f.contactMethod && `Preferred contact method: ${f.contactMethod}`,
      f.urgencyLevel && `Urgency: ${f.urgencyLevel}`,
    ].filter(Boolean) as string[];
    const message = [f.motivation, extra.join("\n")].filter(Boolean).join("\n\n") || "(No additional details provided.)";

    try {
      await submitContactInquiry({
        first_name: f.firstName,
        last_name: f.lastName,
        email: f.email,
        organization: f.companyName,
        subject: f.subject,
        message,
        marketing_consent: agreed,
        ...(turnstileToken && { "cf-turnstile-response": turnstileToken }),
      });
      setSubmitted(true);
    } catch (err) {
      turnstileRef.current?.reset();
      setError(errorText(err));
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <ApplicationSuccess
        title="Message Sent"
        message="Thanks for reaching out. Our team will review your message and get back to you shortly."
        onClose={() => {
          setSubmitted(false);
          setSubmitting(false);
        }}
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
        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        <FormSubmit label={submitting ? "Sending…" : "Submit"} />
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
function WebinarRegistrationContent({
  eventSlug,
  eventTitle,
  onSuccess,
}: {
  eventSlug: string;
  eventTitle?: string;
  onSuccess: () => void;
}) {
  const [agreed, setAgreed] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileWidgetHandle>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const f = formEntriesToObject(e.currentTarget);

    try {
      await registerForEvent(eventSlug, {
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
      });
      onSuccess();
    } catch (err) {
      turnstileRef.current?.reset();
      setError(errorText(err));
      setSubmitting(false);
    }
  }

  return (
    <FormCard title="Webinar Registration Form">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <WebinarBanner
          image="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80"
          alt="iCentra webinar"
        />
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
        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        <FormSubmit label={submitting ? "Registering…" : "Register"} />
      </form>
    </FormCard>
  );
}

export function WebinarRegistrationModal({
  eventSlug,
  eventTitle,
  triggerLabel = "Register Now",
  triggerClassName,
}: {
  eventSlug: string;
  eventTitle?: string;
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
          <WebinarRegistrationContent eventSlug={eventSlug} eventTitle={eventTitle} onSuccess={() => setSubmitted(true)} />
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
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileWidgetHandle>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!resume) {
      setErrorMessage("Please attach your resume.");
      return;
    }

    setSubmitting(true);
    setErrorMessage(null);

    const data = new FormData(e.currentTarget);
    // Optional fields left blank would otherwise submit as "", which the
    // backend's enum/URL validation rejects — omit them so it falls back to its own defaults.
    for (const [key, value] of Array.from(data.entries())) {
      if (typeof value === "string" && value.trim() === "") data.delete(key);
    }
    data.set("resume", resume);
    if (coverLetter) data.set("cover_letter", coverLetter);
    data.set("marketing_consent", agreed ? "true" : "false");
    if (turnstileToken) data.set("cf-turnstile-response", turnstileToken);

    try {
      await applyToJob(jobSlug, data);
      onSuccess();
    } catch (err) {
      turnstileRef.current?.reset();
      setErrorMessage(err instanceof ApiError ? err.firstFieldError ?? err.message : "Something went wrong. Please try again.");
      setSubmitting(false);
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
        <FormSubmit label={submitting ? "Submitting…" : "Submit Application"} />
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
  const [categories, setCategories] = useState<NewsletterCategory[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileWidgetHandle>(null);

  useEffect(() => {
    let cancelled = false;
    listNewsletterCategories()
      .then((data) => {
        if (!cancelled) setCategories(data);
      })
      .catch(() => {
        /* Category picker is optional — subscribing still works without it. */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
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
      onSuccess();
    } catch (err) {
      turnstileRef.current?.reset();
      setError(errorText(err));
      setSubmitting(false);
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
        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        <FormSubmit label={submitting ? "Subscribing…" : "Subscribe"} />
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
   No matching backend endpoint yet — still local-only.
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
        className={triggerClassName ?? "inline-flex items-center px-7 py-3.5 rounded-full bg-[#0066FF] text-white text-sm font-semibold hover:bg-[#25429A] transition-colors"}
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
  const [skills, setSkills] = useState<VolunteerSkill[]>([]);
  const [availability, setAvailability] = useState<VolunteerAvailabilitySlot[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileWidgetHandle>(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all([listVolunteerSkills(), listVolunteerAvailability()])
      .then(([skillData, availabilityData]) => {
        if (cancelled) return;
        setSkills(skillData);
        setAvailability(availabilityData);
      })
      .catch(() => {
        /* Reference-data pickers are optional — submitting still works without them. */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
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
      onSuccess();
    } catch (err) {
      turnstileRef.current?.reset();
      setError(errorText(err));
      setSubmitting(false);
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
        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        <FormSubmit label={submitting ? "Submitting…" : "Submit"} />
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
  const [pillars, setPillars] = useState<PillarItem[]>([]);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileWidgetHandle>(null);

  useEffect(() => {
    let cancelled = false;
    listPillars()
      .then((data) => {
        if (!cancelled) setPillars(data);
      })
      .catch(() => {
        /* Pillar picker is optional — the proposal just won't be tied to one. */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
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
      onSuccess();
    } catch (err) {
      turnstileRef.current?.reset();
      setError(errorText(err));
      setSubmitting(false);
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
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <TurnstileWidget ref={turnstileRef} onVerify={setTurnstileToken} />
        <FormSubmit label={submitting ? "Submitting…" : "Submit application"} align="left" tone="navy" />
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
