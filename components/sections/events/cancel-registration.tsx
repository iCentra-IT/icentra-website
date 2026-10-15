"use client";

import { useState } from "react";
import { cancelEventRegistration } from "@/lib/api/events";
import { ApiError } from "@/lib/api/client";

/** Small inline "cancel my registration" affordance for an event detail page. */
export default function CancelRegistration({ eventSlug }: { eventSlug: string }) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await cancelEventRegistration(eventSlug, email);
      setDone(true);
    } catch (err) {
      setError(err instanceof ApiError ? err.firstFieldError ?? err.message : "Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  if (done) {
    return <p className="text-[#6B7280] text-sm">Your registration has been cancelled.</p>;
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-[#6B7280] text-sm underline hover:text-[#1A274F] transition-colors cursor-pointer w-fit"
      >
        Need to cancel your registration?
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 sm:items-center">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="The email you registered with"
        className="px-4 py-2.5 rounded-xl border border-[#DCE0E8] bg-white text-sm text-[#374151] placeholder-[#9CA3AF] focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF]/20 transition-colors"
      />
      <button
        type="submit"
        disabled={submitting}
        className="px-5 py-2.5 rounded-full border border-red-200 text-red-600 text-sm font-semibold hover:bg-red-50 transition-colors disabled:opacity-50 cursor-pointer shrink-0"
      >
        {submitting ? "Cancelling…" : "Cancel registration"}
      </button>
      {error && <p className="text-red-600 text-xs">{error}</p>}
    </form>
  );
}
