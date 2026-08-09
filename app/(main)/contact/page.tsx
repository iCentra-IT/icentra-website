"use client";

import { useState } from "react";
import Link from "next/link";
import PageHero from "@/components/ui/page-hero";
import SectionHeading from "@/components/ui/section-heading";

/* ─────────────────────────────────────────
   OFFICE DATA
───────────────────────────────────────── */
const offices = [
  {
    country: "United States",
    address: "110 W Randol Mill Road,\nArlington, Texas, TX 76011",
    phone: "+1 682 373 2737",
    email: "texas@icentra.com",
    position: "top-left",
  },
  {
    country: "United Kingdom",
    address: "20-22 Wenlock Road\nLondon, N1 7GU.",
    phone: "+44 800 043 4946",
    email: "london@icentra.com",
    position: "top-right",
  },
  {
    country: "Nigeria",
    address: "47B Kumasi Crescent Wuse II,\nAbuja, 900288",
    phone: "+234 807 675 7797",
    email: "abuja@icentra.com",
    position: "bottom-right",
  },
];

/* ─────────────────────────────────────────
   ICON HELPERS
───────────────────────────────────────── */
function LocationIcon() {
  return (
    <svg className="w-4 h-4 text-[#0066FF] shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" clipRule="evenodd" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg className="w-4 h-4 text-[#0066FF] shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.58a1 1 0 01-.25 1.01L6.62 10.79z" />
    </svg>
  );
}
function EmailIcon() {
  return (
    <svg className="w-4 h-4 text-[#0066FF] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

/* ─────────────────────────────────────────
   OFFICE CARD
───────────────────────────────────────── */
function OfficeCard({ office }: { office: typeof offices[number] }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-[#E5E7EB] p-6 w-full max-w-[260px]">
      <h3 className="text-[#0066FF] text-[16px] font-bold mb-4">{office.country}</h3>
      <div className="flex flex-col gap-3">
        <div className="flex items-start gap-2.5">
          <LocationIcon />
          <p className="text-[#374151] text-[13px] leading-relaxed whitespace-pre-line">{office.address}</p>
        </div>
        <div className="flex items-start gap-2.5">
          <PhoneIcon />
          <p className="text-[#374151] text-[13px]">{office.phone}</p>
        </div>
        <div className="flex items-start gap-2.5">
          <EmailIcon />
          <p className="text-[#374151] text-[13px]">{office.email}</p>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   WORLD MAP SVG — simplified dotted outline
───────────────────────────────────────── */
function WorldMapSVG() {
  return (
    <svg
      viewBox="0 0 900 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      {/* Continents as simplified filled shapes — light blue dots */}
      <defs>
        <pattern id="dotPattern" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.5" fill="#BFD7F5" />
        </pattern>
      </defs>

      {/* North America */}
      <ellipse cx="180" cy="180" rx="110" ry="90" fill="url(#dotPattern)" opacity="0.8" />
      {/* Central America */}
      <ellipse cx="210" cy="265" rx="35" ry="25" fill="url(#dotPattern)" opacity="0.8" />
      {/* South America */}
      <ellipse cx="250" cy="360" rx="65" ry="85" fill="url(#dotPattern)" opacity="0.8" />
      {/* Europe */}
      <ellipse cx="450" cy="145" rx="65" ry="55" fill="url(#dotPattern)" opacity="0.8" />
      {/* Africa */}
      <ellipse cx="460" cy="300" rx="70" ry="95" fill="url(#dotPattern)" opacity="0.8" />
      {/* Asia */}
      <ellipse cx="640" cy="170" rx="140" ry="90" fill="url(#dotPattern)" opacity="0.8" />
      {/* Southeast Asia / Oceania */}
      <ellipse cx="720" cy="300" rx="55" ry="40" fill="url(#dotPattern)" opacity="0.8" />
      <ellipse cx="770" cy="380" rx="60" ry="40" fill="url(#dotPattern)" opacity="0.8" />
      {/* Middle East */}
      <ellipse cx="540" cy="220" rx="45" ry="30" fill="url(#dotPattern)" opacity="0.8" />

      {/* Location pin dots */}
      {/* USA - Arlington TX */}
      <circle cx="185" cy="195" r="6" fill="#0066FF" />
      <circle cx="185" cy="195" r="10" fill="#0066FF" fillOpacity="0.2" />
      {/* UK - London */}
      <circle cx="432" cy="140" r="6" fill="#0066FF" />
      <circle cx="432" cy="140" r="10" fill="#0066FF" fillOpacity="0.2" />
      {/* Nigeria - Abuja */}
      <circle cx="452" cy="268" r="6" fill="#0066FF" />
      <circle cx="452" cy="268" r="10" fill="#0066FF" fillOpacity="0.2" />

      {/* Connector lines from pins to approximate card positions */}
      <line x1="185" y1="195" x2="185" y2="205" stroke="#0066FF" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.4" />
      <line x1="432" y1="140" x2="432" y2="150" stroke="#0066FF" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.4" />
      <line x1="452" y1="268" x2="452" y2="278" stroke="#0066FF" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.4" />
    </svg>
  );
}

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
export default function ContactPage() {
  const [agreed, setAgreed] = useState(false);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "",
    organization: "", industry: "", message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire up to your form handler / API
    console.log("Form submitted:", form, "Agreed:", agreed);
  };

  return (
    <main className="w-full overflow-x-hidden">

      {/* ══════════════════════════════════════
          1. HERO — PageHero (reused)
      ══════════════════════════════════════ */}
      <PageHero
        headline={"How can we serve you?\nMake an Inquiry"}
        subtext="Our team is ready to assist you. Fill out the short form below, and we will get back to you as soon as possible."
      />

      {/* ══════════════════════════════════════
          2. CONTACT FORM — light blue card
      ══════════════════════════════════════ */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="max-w-[760px] mx-auto bg-[#EAF3FB] rounded-3xl px-8 py-10 lg:px-12 lg:py-12">
            <h2 className="text-[#1A274F] text-[22px] lg:text-[26px] font-bold text-center mb-8">
              Send us a message
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Row 1 — First Name + Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#1A274F] text-[13px] font-medium">
                    First Name<span className="text-[#0066FF]">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="Enter first name"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-[#DCE0E8] bg-white text-[14px] text-[#374151] placeholder-[#9CA3AF] focus:outline-none focus:border-[#0066FF] transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#1A274F] text-[13px] font-medium">
                    Last Name<span className="text-[#0066FF]">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="Enter last name"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-[#DCE0E8] bg-white text-[14px] text-[#374151] placeholder-[#9CA3AF] focus:outline-none focus:border-[#0066FF] transition-colors"
                  />
                </div>
              </div>

              {/* Row 2 — Email + Organization */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#1A274F] text-[13px] font-medium">
                    Email<span className="text-[#0066FF]">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter Email"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-[#DCE0E8] bg-white text-[14px] text-[#374151] placeholder-[#9CA3AF] focus:outline-none focus:border-[#0066FF] transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#1A274F] text-[13px] font-medium">
                    Organization<span className="text-[#0066FF]">*</span>
                  </label>
                  <select
                    name="organization"
                    value={form.organization}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-[#DCE0E8] bg-white text-[14px] text-[#9CA3AF] focus:outline-none focus:border-[#0066FF] transition-colors cursor-pointer appearance-none"
                  >
                    <option value="" disabled>select organization</option>
                    <option>Private Company</option>
                    <option>Government Agency</option>
                    <option>NGO / Non-Profit</option>
                    <option>Educational Institution</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              {/* Row 3 — Industry (full width) */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[#1A274F] text-[13px] font-medium">
                  Industry<span className="text-[#0066FF]">*</span>
                </label>
                <input
                  type="text"
                  name="industry"
                  value={form.industry}
                  onChange={handleChange}
                  placeholder="Enter your industry"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-[#DCE0E8] bg-white text-[14px] text-[#374151] placeholder-[#9CA3AF] focus:outline-none focus:border-[#0066FF] transition-colors"
                />
              </div>

              {/* Row 4 — How can we help (full-width textarea) */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[#1A274F] text-[13px] font-medium">
                  How Can we help you?
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us how we can help..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-[#DCE0E8] bg-white text-[14px] text-[#374151] placeholder-[#9CA3AF] focus:outline-none focus:border-[#0066FF] transition-colors resize-none"
                />
              </div>

              {/* Checkbox */}
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative mt-0.5 shrink-0">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="sr-only"
                  />
                  <div
                    className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                      agreed
                        ? "bg-[#0066FF] border-[#0066FF]"
                        : "bg-white border-[#DCE0E8] group-hover:border-[#0066FF]"
                    }`}
                  >
                    {agreed && (
                      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-[#374151] text-[13px] leading-relaxed">
                  I would like to receive details about products, services and events from iCentra.
                </span>
              </label>

              {/* Submit */}
              <div className="flex justify-center mt-2">
                <button
                  type="submit"
                  className="w-full sm:w-[220px] py-3.5 rounded-full bg-[#0066FF] text-white text-[14px] font-semibold hover:bg-[#25429A] transition-colors"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          3. OUR OFFICES — world map + 3 office cards
      ══════════════════════════════════════ */}
      <section className="bg-white pb-20 lg:pb-24">
        <div className="max-w-[1280px] mx-auto px-6">
          {/* Heading */}
          <SectionHeading title="Our Offices" className="mb-3" />
          <p className="text-[#374151] text-[14px] leading-[1.8] max-w-[780px] mb-10">
            Need to find a local office? We have 3 worldwide. To contact us, please complete the
            form below. We will use your information to communicate with you regarding your inquiry
            or request. For more information, please see our{" "}
            <Link href="/legal/privacy" className="text-[#0066FF] underline hover:text-[#25429A]">
              Privacy Notice
            </Link>
            .
          </p>

          {/* World map + cards container */}
          <div className="relative w-full min-h-[420px] lg:min-h-[500px]">

            {/* World map SVG background */}
            <div className="absolute inset-0 flex items-center justify-center opacity-70">
              <WorldMapSVG />
            </div>

            {/* ── Desktop layout — absolute positioned cards ── */}
            <div className="hidden lg:block relative w-full h-[500px]">
              {/* United States — top left */}
              <div className="absolute top-[30px] left-[4%]">
                <OfficeCard office={offices[0]} />
              </div>
              {/* United Kingdom — top center-right */}
              <div className="absolute top-[20px] left-[46%]">
                <OfficeCard office={offices[1]} />
              </div>
              {/* Nigeria — bottom center-right */}
              <div className="absolute bottom-[20px] left-[52%]">
                <OfficeCard office={offices[2]} />
              </div>
            </div>

            {/* ── Mobile layout — stacked cards ── */}
            <div className="lg:hidden relative z-10 flex flex-col gap-5 pt-4">
              {offices.map((office) => (
                <div key={office.country} className="mx-auto">
                  <OfficeCard office={office} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}