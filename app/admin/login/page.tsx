"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { staffLogin } from "@/lib/api/auth";
import { ApiError } from "@/lib/api/client";
import { getStoredTokens, storeTokens } from "@/lib/admin/session";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Already signed in — skip the login form.
  useEffect(() => {
    if (getStoredTokens()) router.replace("/admin");
  }, [router]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const tokens = await staffLogin(username, password);
      storeTokens(tokens);
      router.push("/admin");
    } catch (err) {
      setError(
        err instanceof ApiError && err.status === 401
          ? "Incorrect username or password."
          : "Something went wrong. Please try again."
      );
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <Link href="/">
            <Image src="/logo.svg" alt="iCentra" width={130} height={38} priority />
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-[#DCE0E8] p-8 shadow-sm">
          <h1 className="text-[#1A274F] text-xl font-bold mb-1">Staff sign in</h1>
          <p className="text-[#6B7280] text-sm mb-6">Sign in with your iCentra staff account.</p>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1.5">
              <label className="text-[#374151] text-sm font-medium">Username</label>
              <input
                required
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[#DCE0E8] bg-white text-sm text-[#374151] focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF]/20 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[#374151] text-sm font-medium">Password</label>
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[#DCE0E8] bg-white text-sm text-[#374151] focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF]/20 transition-colors"
              />
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="mt-2 w-full py-3.5 rounded-full bg-[#0066FF] text-white text-sm font-semibold hover:bg-[#25429A] transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {submitting ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>

        <Link
          href="/"
          className="mt-6 flex items-center justify-center gap-2 text-[#6B7280] text-sm hover:text-[#1A274F] transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to the website
        </Link>
      </div>
    </main>
  );
}
