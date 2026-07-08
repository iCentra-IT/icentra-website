"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/ui/page-hero";

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const workingPoints = [
  "A culture that celebrates ideas, encourages continuous learning, and fosters mutual respect",
  "Clear growth paths and development opportunities tailored to your goals",
  "A supportive environment that prioritizes your well-being and work-life balance",
  "Meaningful work that challenges you, stretches your thinking, and contributes to real transformation in organizations across the globe",
];

const careerLevels = [
  { label: "Analyst", height: 120, color: "#22C1E8" },
  { label: "Senior\nAnalyst", height: 150, color: "#1AAEDB" },
  { label: "Manager", height: 180, color: "#1B8FCC" },
  { label: "Senior\nManager", height: 210, color: "#1C6FBD" },
  { label: "Director", height: 240, color: "#1A4FA0" },
  { label: "Vice\nPresident", height: 270, color: "#173D8A" },
  { label: "Chief", height: 300, color: "#142B6E" },
];

const cultureColumns = [
  {
    title: "Passion for Excellence",
    text: "Excellence is ingrained in our DNA. We consistently go beyond the ordinary to deliver outstanding results.",
  },
  {
    title: "Solution-Focused",
    text: "We prioritize problem-solving and view challenges as opportunities for growth and innovation.",
  },
  {
    title: "Result-Oriented",
    text: "Effort is acknowledged, but rewards are tied to measurable outcomes and accountability.",
  },
];

const accordionItems = [
  {
    title: "Qualities of an iCentran (P.E.O.P.L.E.)",
    type: "list" as const,
    content: [
      "Purpose-driven",
      "Entrepreneurial-minded",
      "Organized",
      "Problem-solving",
      "Leadership-oriented",
      "Empathic",
    ],
  },
  {
    title: "The 4 Cs of an iCentran",
    type: "list" as const,
    content: ["Competence", "Character", "Commitment", "Collaboration"],
  },
  {
    title: "How We Behave",
    type: "text" as const,
    content:
      "We act with integrity, communicate openly, and treat every colleague and client with respect — holding ourselves accountable to the highest standards in everything we do.",
  },
  {
    title: "What We Value",
    type: "text" as const,
    content:
      "We value innovation, continuous learning, diversity of thought, and the courage to challenge the status quo in pursuit of better outcomes for our people and clients.",
  },
  {
    title: "How We Relate",
    type: "text" as const,
    content:
      "We build relationships rooted in trust, transparency, and mutual respect — both within our teams and with the clients and communities we serve.",
  },
];

const teamVideos = [
  {
    name: "Taopheek Babayeju",
    role: "Product Designer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  },
  {
    name: "Amina Okafor",
    role: "Product Designer",
    image: "",
  },
  {
    name: "Chidi Eze",
    role: "Product Designer",
    image: "",
  },
  {
    name: "Ngozi Bello",
    role: "Product Designer",
    image: "",
  },
];

const jobListings = [
  { title: "Accountant", dept: "Finance (Internship)", location: "Remote - USA" },
  { title: "Accountant", dept: "Finance", location: "Remote - USA" },
  { title: "Accountant", dept: "Finance", location: "Remote - USA" },
];

/* ─────────────────────────────────────────
   ACCORDION ITEM COMPONENT
───────────────────────────────────────── */
function AccordionRow({
  item,
  isOpen,
  onToggle,
}: {
  item: (typeof accordionItems)[number];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-[#E5E7EB]">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left"
      >
        <span className="text-[#1A274F] text-[16px] lg:text-[18px] font-semibold">
          {item.title}
        </span>
        <span className="text-[#1A274F] text-[20px] font-light shrink-0 ml-4 w-5 text-center">
          {isOpen ? "–" : "+"}
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-100 opacity-100 pb-6" : "max-h-0 opacity-0"
        }`}
      >
        {item.type === "list" ? (
          <ul className="flex flex-col gap-2 pl-1">
            {(item.content as string[]).map((point) => (
              <li key={point} className="flex items-start gap-2 text-[#6B7280] text-[14px] leading-relaxed">
                <span className="mt-2 w-1 h-1 rounded-full bg-[#6B7280] shrink-0" />
                {point}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-[#6B7280] text-[14px] leading-relaxed max-w-175">
            {item.content as string}
          </p>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
export default function CareersPage() {
  const [openIndex, setOpenIndex] = useState<number>(0); // first one open by default

  return (
    <main className="w-full overflow-x-hidden">

      {/* ══════════════════════════════════════
          1. HERO — PageHero (reused)
      ══════════════════════════════════════ */}
      <PageHero
        headline={"Be Part of a Team\nDriving Transformation"}
        subtext="Our people are at the heart of everything we do, and we believe that transformation begins with them. We realize that an organization is as good as its people and its culture."
      />

      {/* ══════════════════════════════════════
          2. WORKING AT iCENTRA — text + collage image
      ══════════════════════════════════════ */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

          {/* Left — text */}
          <div className="flex-1 min-w-0">
            <h2 className="text-[#1A274F] text-[24px] lg:text-[28px] font-bold mb-4">Working at iCentra</h2>
            <p className="text-[#374151] text-[14px] leading-[1.8] mb-4">
              We are intentional about creating a workplace where innovation thrives, collaboration
              is natural, and every team member feels seen and valued. &ldquo;iCentra builds entrepreneurial,
              transformation-driven professionals who remain valuable to society during and after
              their time with the organization.&rdquo; Here at iCentra, you will find:
            </p>
            <ul className="flex flex-col gap-3 mb-4">
              {workingPoints.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-[#374151] text-[14px] leading-relaxed">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#0066FF] shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
            <p className="text-[#374151] text-[14px] leading-[1.8]">
              We believe in investing in people, not just positions because when you grow, we all move forward.
            </p>
          </div>

          {/* Right — image collage (2 stacked photos with a small badge between) */}
          <div className="relative shrink-0 w-full lg:w-105 h-110 rounded-2xl overflow-hidden">
            <div className="relative w-full h-[58%] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=700&q=80"
                alt="iCentra team discussing work"
                fill
                className="object-cover"
                sizes="420px"
              />
            </div>
            <div className="relative w-full h-[42%] mt-3 rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1543269865-cbf427effbad?w=700&q=80"
                alt="iCentra colleagues collaborating"
                fill
                className="object-cover"
                sizes="420px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          3. GROWTH OPPORTUNITIES — dark banner
      ══════════════════════════════════════ */}
      <section className="bg-[#1A274F] py-12 lg:py-14">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-6 lg:gap-16 items-start lg:items-center">
          <h2 className="text-[26px] lg:text-[32px] font-bold leading-tight shrink-0 lg:w-85">
            <span className="text-white block">Growth Opportunities</span>
            <span className="text-white/40 block">at iCentra</span>
          </h2>
          <p className="text-white/70 text-[14px] lg:text-[15px] leading-relaxed max-w-160">
            At iCentra, we create equal opportunities for people to grow irrespective of race, tribe,
            religion, and gender, everyone is important and equal and treated specially.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════
          4. CAREER LEVELS — ascending step bars
      ══════════════════════════════════════ */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-[#1A274F] text-[24px] lg:text-[28px] font-bold mb-1 relative inline-block">
            Career Levels
            <span className="absolute -bottom-1 left-0 w-12 h-0.75 bg-[#0066FF] rounded-full" />
          </h2>
          <p className="text-[#6B7280] text-[14px] mt-4 mb-14">
            You are just 7 steps to the top of your career.
          </p>

          {/* Step bars */}
          <div className="flex items-end justify-center gap-1 sm:gap-2">
            {careerLevels.map((level, i) => (
              <div
                key={level.label}
                className="relative flex-1 min-w-0 flex items-end justify-center rounded-t-lg max-w-30"
                style={{
                  height: `${level.height}px`,
                  background: `linear-gradient(180deg, ${level.color}dd 0%, ${level.color} 100%)`,
                  boxShadow: "inset -8px 0 14px rgba(0,0,0,0.15)",
                }}
              >
                <span className="text-white text-[10px] sm:text-[13px] md:text-[14px] font-semibold text-center pb-2 sm:pb-4 md:pb-5 px-1 sm:px-2 leading-snug whitespace-pre-line">
                  {level.label}
                </span>
              </div>
            ))}
          </div>

          {/* Footer notes under the chart */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 justify-center">
            <p className="text-[#6B7280] text-[13px] leading-relaxed">
              Your performance determines how quickly you climb the career ladder. Age and gender do
              not stand in your way; only you can determine your growth.
            </p>
            <div>
              <h4 className="text-[#1A274F] text-[14px] font-bold mb-2">Learning and Growth</h4>
              <ul className="flex flex-col gap-1.5">
                {[
                  "Continuous learning through courses and certifications",
                  "One course or book per month",
                  "Knowledge sharing within teams",
                  "Professional body membership aligned with career paths",
                ].map((pt) => (
                  <li key={pt} className="flex items-start gap-2 text-[#6B7280] text-[13px] leading-relaxed">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-[#6B7280] shrink-0" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          5. iCENTRA CULTURE — 3-col + accordion
      ══════════════════════════════════════ */}
      <section className="bg-white pb-16 lg:pb-20">
        <div className="max-w-[1280px] mx-auto px-6">
          <h2 className="text-[#1A274F] text-[24px] lg:text-[28px] font-bold mb-10 relative inline-block">
            iCentra Culture
            <span className="absolute -bottom-1 left-0 w-12 h-[3px] bg-[#0066FF] rounded-full" />
          </h2>

          {/* 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14 pb-14 border-b border-[#E5E7EB]">
            {cultureColumns.map((col) => (
              <div key={col.title}>
                <h4 className="text-[#1A274F] text-[14px] font-bold mb-2">{col.title}</h4>
                <p className="text-[#6B7280] text-[13px] leading-relaxed">{col.text}</p>
              </div>
            ))}
          </div>

          {/* Accordion */}
          <div className="max-w-[820px]">
            {accordionItems.map((item, i) => (
              <AccordionRow
                key={item.title}
                item={item}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          6. LIFE AT iCENTRA — team video grid
      ══════════════════════════════════════ */}
      <section className="bg-white pb-16 lg:pb-20">
        <div className="max-w-[1280px] mx-auto px-6">
          <h2 className="text-[#1A274F] text-[24px] lg:text-[28px] font-bold mb-4">
            <span className="relative inline-block">
              Life
              <span className="absolute -bottom-1 left-0 w-8 h-[3px] bg-[#0066FF] rounded-full" />
            </span>{" "}
            at iCentra Through the Eyes of Our Team
          </h2>
          <p className="text-[#6B7280] text-[14px] leading-relaxed max-w-[820px] mb-10">
            Our team members bring their unique perspectives, talents, and experiences to work every
            day, and together, we create something powerful. Know what it means to be part of the
            iCentra family. People across different roles and career stages, all united by one thing:
            the drive to make a meaningful difference. &ldquo;Working at iCentra has been a journey of both
            personal and professional growth. The opportunities here are real—and so is the impact you
            get to make.&rdquo;
          </p>

          {/* Video thumbnail grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {teamVideos.map((member, i) => (
              <div key={`${member.name}-${i}`} className="flex flex-col gap-3">
                <button className="group relative w-full aspect-square rounded-xl overflow-hidden bg-[#D1D5DB]">
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="260px"
                    />
                  ) : null}
                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors">
                    <div className="w-11 h-11 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-4 h-4 text-[#1A274F] ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </button>
                <div>
                  <p className="text-[#1A274F] text-[14px] font-semibold">{member.name}</p>
                  <p className="text-[#6B7280] text-[12px]">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          7. JOIN US — text + job listings
      ══════════════════════════════════════ */}
      <section className="bg-white pb-20 lg:pb-24">
        <div className="max-w-[1280px] mx-auto px-6">
          <h2 className="text-[#1A274F] text-[24px] lg:text-[28px] font-bold mb-4">
            <span className="relative inline-block">
              Join
              <span className="absolute -bottom-1 left-0 w-8 h-[3px] bg-[#0066FF] rounded-full" />
            </span>{" "}
            Us Transform People &amp; Organizations Together.
          </h2>
          <p className="text-[#6B7280] text-[14px] leading-relaxed max-w-[820px] mb-2">
            We are always on the lookout for people who are curious, committed, and ready to lead
            change. Whether you&apos;re an experienced professional or a student exploring your first
            career step, iCentra offers opportunities to grow, contribute, and thrive.
          </p>
          <p className="text-[#6B7280] text-[14px] leading-relaxed max-w-[820px] mb-10">
            View current openings below and apply easily through our application portal. Internship
            opportunities are also available for early-career talents looking to gain valuable
            hands-on experience.
          </p>

          {/* Job listing rows */}
          <div className="border-t border-[#E5E7EB]">
            {jobListings.map((job, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-5 border-b border-[#E5E7EB]"
              >
                <div className="sm:w-[260px] shrink-0">
                  <p className="text-[#1A274F] text-[15px] font-semibold">{job.title}</p>
                  <p className="text-[#9CA3AF] text-[12px]">{job.dept}</p>
                </div>
                <div className="flex-1">
                  <p className="text-[#1A274F] text-[14px] font-medium">{job.location}</p>
                </div>
                <Link
                  href="#"
                  className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-[#0066FF] text-white text-[13px] font-semibold hover:bg-[#25429A] transition-colors shrink-0 w-fit"
                >
                  Apply
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}