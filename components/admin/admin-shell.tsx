"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { clearTokens, getStoredTokens } from "@/lib/admin/session";

const NAV_LINKS = [
  { label: "Jobs", href: "/admin/jobs" },
  { label: "Events", href: "/admin/events" },
  { label: "Speakers", href: "/admin/speakers" },
  { label: "Pillars", href: "/admin/taxonomy/pillars" },
  { label: "Newsletter Categories", href: "/admin/taxonomy/newsletter-categories" },
  { label: "Volunteer Skills", href: "/admin/taxonomy/volunteer-skills" },
  { label: "Volunteer Availability", href: "/admin/taxonomy/volunteer-availability" },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // localStorage only exists client-side, so the auth check has to happen
    // post-mount — this is a one-time gate on entering the staff area, not
    // the data-fetch-in-a-loop pattern this rule is meant to catch.
    if (!getStoredTokens()) {
      router.replace("/admin/login");
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReady(true);
  }, [router]);

  function handleLogout() {
    clearTokens();
    // Logging out leaves the staff area entirely — back to the public site, not the login screen.
    router.push("/");
  }

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#DCE0E8] border-t-[#0066FF] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-60 shrink-0 bg-white border-r border-[#DCE0E8] py-6 px-4">
        <Link href="/admin/jobs" className="flex items-center gap-2 px-2 mb-8">
          <Image src="/logo.svg" alt="iCentra" width={110} height={32} />
        </Link>
        <nav className="flex flex-col gap-1">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active ? "bg-[#EAF3FB] text-[#0066FF]" : "text-[#374151] hover:bg-[#F7F9FC]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main column */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top bar — always reachable, never requires logging out to leave */}
        <header className="flex items-center justify-between gap-4 px-6 py-4 bg-white border-b border-[#DCE0E8]">
          <span className="md:hidden text-[#1A274F] text-sm font-bold">iCentra Staff</span>
          <div className="flex items-center gap-3 ml-auto">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#DCE0E8] text-[#374151] text-sm font-medium hover:border-[#0066FF] hover:text-[#0066FF] transition-colors"
            >
              View website
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 rounded-full bg-[#F7F9FC] text-[#6B7280] text-sm font-medium hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
            >
              Log out
            </button>
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
