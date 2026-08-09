"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const MotionLink = motion.create(Link);

interface JobCardProps {
  slug: string;
  title: string;
  dept: string;
  location: string;
  type: string;
}

function BriefcaseIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

export default function JobCard({ slug, title, dept, location, type }: JobCardProps) {
  return (
    <MotionLink
      href={`/careers/${slug}`}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="group relative flex flex-col gap-4 bg-white rounded-2xl border border-[#E5E7EB] p-6 hover:border-[#0066FF] hover:shadow-lg hover:shadow-[#0066FF]/10 transition-[border-color,box-shadow] duration-300"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="w-11 h-11 rounded-xl bg-[#EAF3FB] flex items-center justify-center text-[#0066FF] shrink-0 group-hover:bg-[#0066FF] group-hover:text-white transition-colors duration-300">
          <BriefcaseIcon />
        </div>
        <span className="px-3 py-1 rounded-full bg-[#F7F9FC] text-[#6B7280] text-[11px] font-semibold uppercase tracking-wide shrink-0">
          {type}
        </span>
      </div>

      <div>
        <h3 className="text-[#1A274F] text-[17px] font-bold leading-snug group-hover:text-[#0066FF] transition-colors">
          {title}
        </h3>
        <p className="text-[#9CA3AF] text-[13px] mt-1">{dept}</p>
      </div>

      <div className="flex items-center gap-1.5 text-[#6B7280] text-[13px]">
        <LocationIcon />
        {location}
      </div>

      <div className="flex items-center gap-2 text-[#0066FF] text-[13px] font-semibold mt-auto pt-4 border-t border-[#F0F1F3] group-hover:gap-3 transition-all">
        View Details
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </MotionLink>
  );
}
