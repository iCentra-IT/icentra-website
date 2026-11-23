"use client";

import { useRef, useState } from "react";
import { FormField, FormRow, FormSelect, FormTextarea, IcentraCheckbox } from "../form-component";
import TurnstileWidget, { type TurnstileWidgetHandle } from "../turnstile-widget";
import { useSubmitContactInquiry } from "@/lib/queries/contact";
import { trackEvent } from "@/lib/analytics/track";
import { INDUSTRY_OPTS, errorText, formEntriesToObject } from "./shared";

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
