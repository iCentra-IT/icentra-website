"use client";

import { useState } from "react";
import { ApiError } from "@/lib/api/client";
import { useCancelEventRegistration } from "@/lib/queries/events";

function errorText(err: unknown): string {
  return err instanceof ApiError ? err.firstFieldError ?? err.message : "Something went wrong. Please try again.";
}

/** Small inline "cancel my registration" affordance for an event detail page. */
export default function CancelRegistration({ eventSlug }: { eventSlug: string }) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const { mutateAsync: cancelRegistration, isPending, error } = useCancelEventRegistration();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await cancelRegistration({ slug: eventSlug, email });
      setDone(true);
    } catch {
      // error state is already surfaced below via the mutation's own `error`.
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
        disabled={isPending}
        className="px-5 py-2.5 rounded-full border border-red-200 text-red-600 text-sm font-semibold hover:bg-red-50 transition-colors disabled:opacity-50 cursor-pointer shrink-0"
      >
        {isPending ? "Cancelling…" : "Cancel registration"}
      </button>
      {error && <p className="text-red-600 text-xs">{errorText(error)}</p>}
    </form>
  );
}
