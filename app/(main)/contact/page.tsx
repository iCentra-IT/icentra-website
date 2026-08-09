"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import worldTopoJson from "world-atlas/countries-110m.json";
import PageHero from "@/components/ui/page-hero";
import SectionHeading from "@/components/ui/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/ui/motion/reveal";

/* ─────────────────────────────────────────
   OFFICE DATA — coordinates are real [longitude, latitude]
───────────────────────────────────────── */
const offices = [
  {
    country: "United States",
    city: "Arlington, Texas",
    address: "110 W Randol Mill Road, Arlington, Texas, TX 76011",
    phone: "+1 682 373 2737",
    email: "texas@icentra.com",
    coordinates: [-97.1075, 32.7357] as [number, number],
  },
  {
    country: "United Kingdom",
    city: "London",
    address: "20-22 Wenlock Road, London, N1 7GU",
    phone: "+44 800 043 4946",
    email: "london@icentra.com",
    coordinates: [-0.1278, 51.5074] as [number, number],
  },
  {
    country: "Nigeria",
    city: "Abuja",
    address: "47B Kumasi Crescent Wuse II, Abuja, 900288",
    phone: "+234 807 675 7797",
    email: "abuja@icentra.com",
    coordinates: [7.4951, 9.0765] as [number, number],
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
function CopyIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <rect x="9" y="9" width="11" height="11" rx="2" strokeLinecap="round" strokeLinejoin="round" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 15H4a1 1 0 01-1-1V4a1 1 0 011-1h10a1 1 0 011 1v1" />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

/* ─────────────────────────────────────────
   OFFICE CARD — click anywhere to copy the address
───────────────────────────────────────── */
function OfficeCard({ office }: { office: (typeof offices)[number] }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(office.address);
      setCopied(true);
    } catch {
      // clipboard API unavailable — silently ignore
    }
  };

  return (
    <motion.button
      type="button"
      onClick={handleCopy}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="group relative text-left w-full h-full bg-white rounded-2xl shadow-lg border border-[#E5E7EB] hover:border-[#0066FF] p-6 cursor-pointer transition-colors"
      aria-label={`Copy ${office.country} office address`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[#0066FF] text-[16px] font-bold">{office.country}</h3>
        <span className="text-[#9CA3AF] text-[11px] font-medium">{office.city}</span>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex items-start gap-2.5">
          <LocationIcon />
          <p className="text-[#374151] text-[13px] leading-relaxed">{office.address}</p>
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

      {/* Copy affordance */}
      <div className="flex items-center gap-1.5 mt-4 pt-4 border-t border-[#F0F1F3] text-[#9CA3AF] text-[12px] font-medium group-hover:text-[#0066FF] transition-colors">
        <CopyIcon />
        Click to copy address
      </div>

      {/* "Copied!" feedback badge */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0066FF] text-white text-[11px] font-semibold"
          >
            <CheckIcon />
            Copied
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

/* ─────────────────────────────────────────
   WORLD MAP — real country geography (react-simple-maps +
   world-atlas), with animated radar-pulse pins for each office.
───────────────────────────────────────── */
function WorldMap() {
  return (
    <div className="relative w-full aspect-2/1 rounded-2xl overflow-hidden bg-[#F7F9FC] border border-[#E5E7EB]">
      <ComposableMap
        projection="geoNaturalEarth1"
        projectionConfig={{ scale: 155 }}
        width={980}
        height={480}
        style={{ width: "100%", height: "100%" }}
      >
        <Geographies geography={worldTopoJson}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                style={{
                  default: { fill: "#BFD7F5", stroke: "#5B9BE0", strokeWidth: 0.5, outline: "none" },
                  hover: { fill: "#9DC1EE", stroke: "#5B9BE0", strokeWidth: 0.5, outline: "none" },
                  pressed: { fill: "#9DC1EE", stroke: "#5B9BE0", strokeWidth: 0.5, outline: "none" },
                }}
              />
            ))
          }
        </Geographies>

        {offices.map((office) => (
          <Marker key={office.country} coordinates={office.coordinates}>
            <motion.circle
              r={5}
              fill="#0066FF"
              fillOpacity={0.25}
              animate={{ scale: [1, 2.6, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
            <circle r={4} fill="#0066FF" stroke="white" strokeWidth={1.2} />
            <text
              textAnchor="middle"
              y={-10}
              style={{ fontSize: 11, fontWeight: 600, fill: "#1A274F" }}
            >
              {office.country}
            </text>
          </Marker>
        ))}
      </ComposableMap>
    </div>
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
          3. OUR OFFICES — real world map + 3 office cards
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

          <div className="flex flex-col gap-10">
            <WorldMap />

            <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {offices.map((office) => (
                <StaggerItem key={office.country}>
                  <OfficeCard office={office} />
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </div>
      </section>

    </main>
  );
}
