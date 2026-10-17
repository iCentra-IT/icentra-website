"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { Toaster } from "sonner";
import { clearTokens, getStoredTokens } from "@/lib/admin/session";
import QueryProvider from "@/components/providers/query-provider";
import { ConfirmProvider } from "@/components/admin/confirm-dialog";
import {
  HomeIcon,
  BriefcaseIcon,
  CalendarIcon,
  MicIcon,
  LayersIcon,
  MailIcon,
  SparklesIcon,
  ClockIcon,
  MenuIcon,
  CloseIcon,
  ExternalLinkIcon,
  LogoutIcon,
} from "@/components/admin/icons";

interface NavLink {
  label: string;
  href: string;
  icon: (props: { className?: string }) => React.ReactNode;
}

const OVERVIEW_LINK: NavLink = { label: "Dashboard", href: "/admin", icon: HomeIcon };

const NAV_GROUPS: { label: string; items: NavLink[] }[] = [
  {
    label: "Content",
    items: [
      { label: "Jobs", href: "/admin/jobs", icon: BriefcaseIcon },
      { label: "Events", href: "/admin/events", icon: CalendarIcon },
      { label: "Speakers", href: "/admin/speakers", icon: MicIcon },
    ],
  },
  {
    label: "Reference Data",
    items: [
      { label: "Pillars", href: "/admin/taxonomy/pillars", icon: LayersIcon },
      { label: "Newsletter Categories", href: "/admin/taxonomy/newsletter-categories", icon: MailIcon },
      { label: "Volunteer Skills", href: "/admin/taxonomy/volunteer-skills", icon: SparklesIcon },
      { label: "Volunteer Availability", href: "/admin/taxonomy/volunteer-availability", icon: ClockIcon },
    ],
  },
];

function NavLinks({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  function isActive(href: string) {
    return href === "/admin" ? pathname === "/admin" : pathname === href || pathname.startsWith(href + "/");
  }

  function renderLink(link: NavLink) {
    const active = isActive(link.href);
    const Icon = link.icon;
    return (
      <Link
        key={link.href}
        href={link.href}
        onClick={onNavigate}
        className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
          active ? "bg-[#EAF3FB] text-[#0066FF]" : "text-[#374151] hover:bg-[#F7F9FC]"
        }`}
      >
        <Icon className="w-4.5 h-4.5 shrink-0" />
        <span className="truncate">{link.label}</span>
      </Link>
    );
  }

  return (
    <nav className="flex flex-col gap-1">
      {renderLink(OVERVIEW_LINK)}
      {NAV_GROUPS.map((group) => (
        <div key={group.label} className="mt-5">
          <p className="px-3 mb-1.5 text-[#9CA3AF] text-[11px] font-bold uppercase tracking-wider">{group.label}</p>
          <div className="flex flex-col gap-1">{group.items.map(renderLink)}</div>
        </div>
      ))}
    </nav>
  );
}

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

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
    <QueryProvider>
      <ConfirmProvider>
        <div className="min-h-screen flex">
          {/* Sidebar — desktop */}
          <aside className="hidden md:flex flex-col w-64 shrink-0 bg-white border-r border-[#DCE0E8] py-6 px-4 overflow-y-auto">
            <Link href="/admin" className="flex items-center gap-2 px-2 mb-8">
              <Image src="/logo.svg" alt="iCentra" width={110} height={32} />
            </Link>
            <NavLinks pathname={pathname} />
          </aside>

          {/* Sidebar — mobile drawer */}
          <AnimatePresence>
            {mobileNavOpen && (
              <div className="fixed inset-0 z-[500] md:hidden">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 bg-black/50"
                  onClick={() => setMobileNavOpen(false)}
                />
                <motion.aside
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="relative z-10 flex flex-col w-72 max-w-[80vw] h-full bg-white py-6 px-4 overflow-y-auto"
                >
                  <div className="flex items-center justify-between px-2 mb-8">
                    <Link href="/admin" onClick={() => setMobileNavOpen(false)}>
                      <Image src="/logo.svg" alt="iCentra" width={110} height={32} />
                    </Link>
                    <button
                      onClick={() => setMobileNavOpen(false)}
                      aria-label="Close menu"
                      className="w-8 h-8 rounded-full flex items-center justify-center text-[#6B7280] hover:bg-[#F7F9FC] transition-colors cursor-pointer"
                    >
                      <CloseIcon className="w-4.5 h-4.5" />
                    </button>
                  </div>
                  <NavLinks pathname={pathname} onNavigate={() => setMobileNavOpen(false)} />
                </motion.aside>
              </div>
            )}
          </AnimatePresence>

          {/* Main column */}
          <div className="flex-1 min-w-0 flex flex-col">
            {/* Top bar — always reachable, never requires logging out to leave */}
            <header className="flex items-center justify-between gap-4 px-4 sm:px-6 py-4 bg-white border-b border-[#DCE0E8]">
              <div className="flex items-center gap-3 min-w-0">
                <button
                  onClick={() => setMobileNavOpen(true)}
                  aria-label="Open menu"
                  className="md:hidden w-9 h-9 rounded-full flex items-center justify-center text-[#374151] hover:bg-[#F7F9FC] transition-colors cursor-pointer shrink-0"
                >
                  <MenuIcon />
                </button>
                <span className="md:hidden text-[#1A274F] text-sm font-bold truncate">iCentra Staff</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 ml-auto shrink-0">
                <Link
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full border border-[#DCE0E8] text-[#374151] text-sm font-medium hover:border-[#0066FF] hover:text-[#0066FF] transition-colors"
                >
                  <span className="hidden sm:inline">View website</span>
                  <ExternalLinkIcon />
                </Link>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full bg-[#F7F9FC] text-[#6B7280] text-sm font-medium hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
                >
                  <span className="hidden sm:inline">Log out</span>
                  <LogoutIcon />
                </button>
              </div>
            </header>

            <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
          </div>
        </div>
        <Toaster position="top-right" richColors closeButton />
      </ConfirmProvider>
    </QueryProvider>
  );
}
