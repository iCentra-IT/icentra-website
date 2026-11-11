"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { solutionCategories } from "@/lib/data/solutions";
import { partnerships } from "@/lib/data/partnerships";

const navLinks = [
  // { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  {
    label: "What We Do",
    href: "#",
    megaMenu: true,
    dropdown: [
      { label: "Continuous Transformation", href: "/what-we-do/continuous-transformation" },
      { label: "Solutions", href: "/what-we-do/solutions" },
      { label: "Partnerships", href: "/what-we-do/partnerships" },
    ],
  },
  { label: "Industry", href: "/industry" },
  { label: "News & Insights", href: "/news" },
  { label: "Events", href: "/events" },
  { label: "Careers", href: "/careers" },
];

// Exact match for "/", prefix match for everything else so nested routes
// (e.g. /industry/healthcare) still highlight the parent "Industry" link.
function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  // Separate state for the desktop dropdown and the mobile drawer's accordion —
  // they're different UI patterns (click-outside-to-close vs. a toggle inside
  // an already-dismissible overlay) and sharing one ref/state closed the
  // mobile accordion on its own sub-link taps before the tap could register.
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  // Hover-intent for the mega menu: close on mouseleave is delayed slightly
  // so moving the pointer from the trigger down to the panel (a real gap in
  // screen space, even though both are DOM descendants of the same wrapper)
  // doesn't close the menu before the pointer gets there.
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function openDesktopDropdown() {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setDesktopDropdownOpen(true);
  }

  function scheduleCloseDesktopDropdown() {
    closeTimerRef.current = setTimeout(() => setDesktopDropdownOpen(false), 200);
  }

  useEffect(() => {
    if (!desktopDropdownOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDesktopDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [desktopDropdownOpen]);

  // Close the mobile drawer on route changes (back/forward, or any
  // navigation not mediated by a Link's own onClick) and lock background
  // scroll while it's open.
  useEffect(() => {
    // Resetting UI state in response to a route change (not a user action
    // this render), not the data-fetch-in-a-loop pattern this rule targets.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileOpen(false);
    setMobileDropdownOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setMobileOpen(false);
    }
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [mobileOpen]);

  return (
    <>
      {/* ── Desktop & Mobile Header ── */}
      <header className="sticky top-0 z-50 bg-white border border-[#DCE0E8] shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-17 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image
              src="/logo.svg"
              alt="iCentra"
              width={120}
              height={36}
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              if (link.dropdown) {
                const parentActive = link.dropdown.some((item) =>
                  isActive(pathname, item.href)
                );

                return (
                  <div
                    key={link.label}
                    className="relative group"
                    ref={dropdownRef}
                    onMouseEnter={openDesktopDropdown}
                    onMouseLeave={scheduleCloseDesktopDropdown}
                  >
                    <button
                      onClick={() => setDesktopDropdownOpen((v) => !v)}
                      className={`flex items-center gap-1 text-base cursor-pointer font-medium transition-colors ${
                        parentActive
                          ? "text-[#0066FF]"
                          : "text-[#1A274F] hover:text-secondary"
                      }`}
                    >
                      {link.label}
                      {/* Chevron */}
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 group-hover:text-secondary ${
                          parentActive ? "text-[#0066FF]" : "text-deep-blue"
                        } ${desktopDropdownOpen ? "rotate-180" : ""}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Active indicator underline */}
                    {parentActive && (
                      <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-[#0066FF] rounded-full" />
                    )}

                    <AnimatePresence>
                      {desktopDropdownOpen && link.megaMenu && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.18, ease: "easeOut" }}
                          className="fixed inset-x-0 top-17 z-50 bg-white border-t border-[#DCE0E8] shadow-xl"
                        >
                          <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-[300px_1fr_1fr] gap-10">
                            {/* Feature card */}
                            <div className="bg-[#EAF3FB] rounded-2xl p-6 flex flex-col">
                              <h3 className="text-[#1A274F] text-xl font-bold leading-snug mb-3">
                                Continuous Transformation
                              </h3>
                              <p className="text-[#6B7280] text-sm leading-relaxed mb-5">
                                Transformation is no longer a one-time initiative — it&apos;s a continuous capability
                                that aligns strategy, governance, execution, and workforce capability.
                              </p>
                              <Link
                                href="/what-we-do/continuous-transformation"
                                onClick={() => setDesktopDropdownOpen(false)}
                                className="mt-auto inline-flex items-center gap-1.5 text-[#0066FF] text-sm font-semibold hover:gap-2.5 transition-all w-fit"
                              >
                                Explore overview
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                                </svg>
                              </Link>
                            </div>

                            {/* Solutions column */}
                            <div>
                              <p className="text-[#6B7280] text-xs font-bold uppercase tracking-[0.08em] mb-5">
                                Solutions
                              </p>
                              <div className="flex flex-col gap-5">
                                {solutionCategories.map((cat) => (
                                  <Link
                                    key={cat.slug}
                                    href={`/what-we-do/solutions/${cat.slug}`}
                                    onClick={() => setDesktopDropdownOpen(false)}
                                    className="group/item block"
                                  >
                                    <span className="block text-[#1A274F] text-sm font-bold group-hover/item:text-[#0066FF] transition-colors">
                                      {cat.title}
                                    </span>
                                    <span className="block text-[#6B7280] text-xs leading-relaxed mt-1">
                                      {cat.tagline}
                                    </span>
                                  </Link>
                                ))}
                              </div>
                              <Link
                                href="/what-we-do/solutions"
                                onClick={() => setDesktopDropdownOpen(false)}
                                className="inline-flex items-center gap-1.5 text-[#0066FF] text-sm font-semibold mt-6 w-fit"
                              >
                                View all solutions
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                                </svg>
                              </Link>
                            </div>

                            {/* Partnerships column */}
                            <div>
                              <p className="text-[#6B7280] text-xs font-bold uppercase tracking-[0.08em] mb-5">
                                Partnerships
                              </p>
                              <div className="flex flex-col gap-5">
                                {partnerships.map((partnership) => (
                                  <Link
                                    key={partnership.slug}
                                    href={`/what-we-do/partnerships/${partnership.slug}`}
                                    onClick={() => setDesktopDropdownOpen(false)}
                                    className="group/item block"
                                  >
                                    <span className="block text-[#1A274F] text-sm font-bold group-hover/item:text-[#0066FF] transition-colors">
                                      {partnership.name}
                                    </span>
                                    <span className="block text-[#6B7280] text-xs leading-relaxed mt-1">
                                      {partnership.description}
                                    </span>
                                  </Link>
                                ))}
                              </div>
                              <Link
                                href="/what-we-do/partnerships"
                                onClick={() => setDesktopDropdownOpen(false)}
                                className="inline-flex items-center gap-1.5 text-[#0066FF] text-sm font-semibold mt-6 w-fit"
                              >
                                View all partnerships
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                                </svg>
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              const active = isActive(pathname, link.href);

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`relative text-base font-medium transition-colors ${
                    active
                      ? "text-[#0066FF]"
                      : "text-[#1A274F] hover:text-[#0066FF]"
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#0066FF] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <Link
            href="/contact"
            className="hidden lg:inline-flex items-center px-6 py-2.5 rounded-full bg-secondary text-white text-base font-semibold transition-colors"
          >
            Contact Us
          </Link>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden flex flex-col justify-center items-center gap-1.25 w-9 h-9"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <span className="w-6 h-0.5 bg-[#1A274F] rounded-full" />
            <span className="w-6 h-0.5 bg-[#1A274F] rounded-full" />
            <span className="w-6 h-0.5 bg-[#1A274F] rounded-full" />
          </button>
        </div>
      </header>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
        <div className="fixed inset-0 z-100 flex">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="relative ml-auto w-full max-w-105 h-full bg-[#25429A] flex flex-col px-8 pt-10 pb-12 overflow-y-auto">
            {/* Close button */}
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white flex items-center justify-center"
            >
              <svg
                className="w-5 h-5 text-[#25429A]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Mobile Links */}
            <nav className="mt-10 flex flex-col gap-0">
              {navLinks.map((link) => {
                if (link.dropdown) {
                  const parentActive = link.dropdown.some((item) =>
                    isActive(pathname, item.href)
                  );

                  return (
                    <div key={link.label}>
                      <button
                        onClick={() => setMobileDropdownOpen((v) => !v)}
                        className={`flex items-center gap-2 w-full py-5 text-[22px] font-semibold border-b border-white/10 text-left transition-colors ${
                          parentActive ? "text-[#8FB2FF]" : "text-white"
                        }`}
                      >
                        {link.label}
                        <svg
                          className={`w-5 h-5 transition-transform duration-200 ${
                            mobileDropdownOpen ? "rotate-180" : ""
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {mobileDropdownOpen && (
                        <div className="pl-4 pb-2 flex flex-col gap-1">
                          {link.dropdown.map((item) => {
                            const itemActive = isActive(pathname, item.href);
                            return (
                              <Link
                                key={item.label}
                                href={item.href}
                                className={`py-2 text-base transition-colors ${
                                  itemActive
                                    ? "text-white font-semibold"
                                    : "text-white/80 hover:text-white"
                                }`}
                                onClick={() => setMobileOpen(false)}
                              >
                                {item.label}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }

                const active = isActive(pathname, link.href);

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`py-5 text-[22px] font-semibold border-b border-white/10 transition-colors ${
                      active ? "text-[#8FB2FF]" : "text-white hover:text-light-blue"
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile CTA */}
            <div className="mt-10">
              <Link
                href="/contact"
                className="block w-full text-center py-4 rounded-full border border-white text-white text-base font-semibold hover:bg-white hover:text-[#25429A] transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
        )}
      </AnimatePresence>
    </>
  );
}