"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FormCard, FormField, FormTextarea, FormSubmit } from "@/components/forms/form-component";
import { unsubscribeNewsletter } from "@/lib/api/newsletter";
import { ApiError } from "@/lib/api/client";

function UnsubscribeForm() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState(searchParams.get("email") ?? "");
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await unsubscribeNewsletter(email, reason || undefined);
      setDone(true);
    } catch (err) {
      setError(err instanceof ApiError ? err.firstFieldError ?? err.message : "Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <FormCard title="You're Unsubscribed">
        <div className="flex flex-col items-center text-center gap-4 py-6">
          <span className="w-14 h-14 rounded-full bg-[#0066FF]/10 flex items-center justify-center">
            <svg className="w-7 h-7 text-[#0066FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </span>
          <p className="text-[#374151] text-sm leading-relaxed max-w-sm">
            {email} has been removed from the iCentra newsletter. You can resubscribe any time.
          </p>
        </div>
      </FormCard>
    );
  }

  return (
    <FormCard title="Unsubscribe from Newsletter">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <p className="text-[#6B7280] text-sm -mt-2">
          Sorry to see you go. Confirm your email below to stop receiving the iCentra newsletter.
        </p>
        <FormField
          label="Email"
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        <FormTextarea
          label="Reason (optional)"
          rows={3}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Let us know why you're unsubscribing..."
        />
        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        <FormSubmit label={submitting ? "Unsubscribing…" : "Unsubscribe"} />
      </form>
    </FormCard>
  );
}

export default function NewsletterUnsubscribePage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <Suspense fallback={null}>
        <UnsubscribeForm />
      </Suspense>
    </div>
  );
}
