"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  {
    label: "What We Do",
    href: "#",
    dropdown: [
      { label: "Continuous Transformation", href: "/what-we-do/continuous-transformation" },
      { label: "Our Solutions", href: "/what-we-do/solutions" },
      { label: "Platforms", href: "/what-we-do/platforms" },
    ],
  },
  { label: "Industry", href: "/industry" },
  { label: "News & Insight", href: "/news" },
  { label: "Event", href: "/events" },
  { label: "Careers", href: "/careers" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
            {navLinks.map((link) =>
              link.dropdown ? (
                <div key={link.label} className="relative group">
                  <button
                    onClick={() => setDropdownOpen((v) => !v)}
                    className="flex items-center gap-1 text-[15px] cursor-pointer font-medium text-[#1A274F] hover:text-secondary transition-colors"
                  >
                    {link.label}
                    {/* Chevron */}
                    <svg
                      className={`w-4 h-4 text-deep-blue transition-transform duration-200 group-hover:text-secondary ${
                        dropdownOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown */}
                  {dropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-[#DCE0E8] rounded-xl shadow-lg py-2 z-50">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="block px-4 py-2.5 text-sm text-[#1A274F] hover:bg-[#eef1fb] hover:text-secondary transition-colors"
                          onClick={() => setDropdownOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-[15px] font-medium text-[#1A274F] hover:text-[#0066FF] transition-colors"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Desktop CTA */}
          <Link
            href="/contact"
            className="hidden lg:inline-flex items-center px-6 py-2.5 rounded-full bg-secondary text-white text-[15px] font-semibold transition-colors"
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
      {mobileOpen && (
        <div className="fixed inset-0 z-100 flex">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="relative ml-auto w-full max-w-105 h-full bg-[#25429A] flex flex-col px-8 pt-10 pb-12 overflow-y-auto">
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
              {navLinks.map((link) =>
                link.dropdown ? (
                  <div key={link.label}>
                    <button
                      onClick={() => setDropdownOpen((v) => !v)}
                      className="flex items-center gap-2 w-full py-5 text-[22px] font-semibold text-white border-b border-white/10 text-left"
                    >
                      {link.label}
                      <svg
                        className={`w-5 h-5 transition-transform duration-200 ${
                          dropdownOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {dropdownOpen && (
                      <div className="pl-4 pb-2 flex flex-col gap-1">
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            className="py-2 text-[16px] text-white/80 hover:text-white transition-colors"
                            onClick={() => setMobileOpen(false)}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="py-5 text-[22px] font-semibold text-white border-b border-white/10 hover:text-light-blue transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            {/* Mobile CTA */}
            <div className="mt-10">
              <Link
                href="/contact"
                className="block w-full text-center py-4 rounded-full border border-white text-white text-[16px] font-semibold hover:bg-white hover:text-[#25429A] transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}