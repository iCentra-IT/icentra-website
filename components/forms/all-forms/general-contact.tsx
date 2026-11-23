"use client";

import { useRef, useState } from "react";
import { FormCard, FormField, FormRow, FormSelect, FormSubmit, FormTextarea, IcentraCheckbox } from "../form-component";
import TurnstileWidget, { type TurnstileWidgetHandle } from "../turnstile-widget";
import { useSubmitContactInquiry } from "@/lib/queries/contact";
import { trackEvent } from "@/lib/analytics/track";
import { ApplicationSuccess, COMPANY_SIZE_OPTS, CONSULT_TYPE_OPTS, CONTACT_METHOD_OPTS, INDUSTRY_OPTS, SUBJECT_OPTS, URGENCY_OPTS, errorText, formEntriesToObject } from "./shared";

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
