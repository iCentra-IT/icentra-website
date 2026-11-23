"use client";

import { FormCard } from "../form-component";
import { ApiError } from "@/lib/api/client";
import { PREFERRED_QUARTER_LABELS, HOW_HEARD_LABELS, type PreferredQuarter, type HowHeard } from "@/lib/api/speakers";

export const COMPANY_SIZE_OPTS   = ["1–10", "11–50", "51–200", "201–500", "500+"];

export const CONSULT_TYPE_OPTS   = ["Strategy Consulting", "Technology Advisory", "Training & Development", "Cybersecurity Audit", "Other"];

export const CONTACT_METHOD_OPTS = ["Email", "Phone", "Video Call", "In-Person"];

export const URGENCY_OPTS        = ["Low", "Medium", "High", "Critical"];

export const SUBJECT_OPTS        = ["General Inquiry", "Partnership", "Media & Press", "Complaint", "Other"];

export const INDUSTRY_OPTS = ["Government", "Not-for-Profit", "Banking & Finance", "Telecoms & IT", "Construction", "Oil & Gas", "Health", "Agriculture", "Education", "Manufacturing", "Defence", "Media"];

export const SOLUTION_OPTS       = ["Enterprise Transformation", "Cybersecurity & GRC", "Strategy & Execution", "Learning & Talent"];

export const CAREER_OPTS         = ["Analyst", "Senior Analyst", "Manager", "Senior Manager", "Director", "Vice President", "Chief"];

export const FREQUENCY_OPTS      = [
  { label: "Daily", value: "daily" },
  { label: "Weekly", value: "weekly" },
  { label: "Bi-Weekly", value: "bi-weekly" },
  { label: "Monthly", value: "monthly" },
];

// Values are real IANA identifiers (what the backend parses as a timezone),
// labels are the friendly offset the user actually recognizes.
export const TIMEZONE_OPTS       = [
  { label: "UTC−5 (EST)",    value: "America/New_York" },
  { label: "UTC+0 (GMT)",    value: "UTC" },
  { label: "UTC+1 (WAT)",    value: "Africa/Lagos" },
  { label: "UTC+3 (EAT)",    value: "Africa/Nairobi" },
  { label: "UTC+5:30 (IST)", value: "Asia/Kolkata" },
  { label: "UTC+8 (SGT)",    value: "Asia/Singapore" },
];

export const REMINDER_OPTS       = [
  { label: "1 hour before", value: "60" },
  { label: "1 day before", value: "1440" },
  { label: "3 days before", value: "4320" },
  { label: "1 week before", value: "10080" },
];

export const HOW_HEARD_OPTS: { label: string; value: HowHeard }[] = Object.entries(HOW_HEARD_LABELS).map(([value, label]) => ({
  label,
  value: value as HowHeard,
}));

export const TIMELINE_OPTS       = ["Immediately", "Within 1 month", "1–3 months", "3–6 months", "6+ months"];

export const CORP_SOLUTION_OPTS  = ["Enterprise Transformation", "Cybersecurity & GRC", "PMO & Delivery", "Strategy & Execution", "Learning & Development", "Custom Programme"];

export const TIME_SLOT_OPTS      = ["Morning (9am–12pm)", "Afternoon (12pm–5pm)", "Evening (5pm–8pm)", "Weekend"];

export const PREFERRED_QUARTER_OPTS: { label: string; value: PreferredQuarter }[] = Object.entries(PREFERRED_QUARTER_LABELS).map(
  ([value, label]) => ({ label, value: value as PreferredQuarter })
);

/* ─────────────────────────────────────────────────
   SHARED HELPERS
───────────────────────────────────────────────── */

export const DEFAULT_WEBINAR_IMAGE = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80";

export const REFERRAL_SOURCE_OPTS = [
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

export const BROCHURE_FILE = "/ICENTRA-CORPORATE-BROCHURE-2025.pdf";

export const ASSESSMENT_PILLARS = [
  { key: "portfolio", label: "Portfolio", tag: "Strategy" },
  { key: "project", label: "Project", tag: "Execution" },
  { key: "people", label: "People", tag: "Capability" },
  { key: "product", label: "Product", tag: "Value" },
] as const;

export const MATURITY_OPTS = ["Strong", "Developing", "At Risk", "Not Sure"];

/** Reads a plain (non-file) form's fields into an object, dropping blanks. */
export function formEntriesToObject(form: HTMLFormElement): Record<string, string> {
  const data = new FormData(form);
  const obj: Record<string, string> = {};
  for (const [key, value] of data.entries()) {
    if (typeof value === "string" && value.trim() !== "") obj[key] = value;
  }
  return obj;
}

export function errorText(err: unknown): string {
  return err instanceof ApiError ? err.firstFieldError ?? err.message : "Something went wrong. Please try again.";
}

/** Pill-style multi-select — used wherever a form picks several reference-data slugs. */
export function CheckboxGroup({
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

export function ApplicationSuccess({
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
