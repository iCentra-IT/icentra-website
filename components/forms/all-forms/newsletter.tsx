"use client";

import { useRef, useState } from "react";
import { FormCard, FormField, FormModal, FormSelect, FormSubmit, IcentraCheckbox } from "../form-component";
import TurnstileWidget, { type TurnstileWidgetHandle } from "../turnstile-widget";
import { useNewsletterCategories, useSubscribeNewsletter } from "@/lib/queries/newsletter";
import { trackEvent } from "@/lib/analytics/track";
import { ApplicationSuccess, CheckboxGroup, FREQUENCY_OPTS, errorText, formEntriesToObject } from "./shared";

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
