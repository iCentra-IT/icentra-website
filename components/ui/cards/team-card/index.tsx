"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface TeamMember {
  image: string;
  name: string;
  role: string;
  linkedin?: string;
  bio: string[];
}

interface TeamCardProps {
  member: TeamMember;
}

export function TeamCard({ member }: TeamCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Card */}
      <motion.button
        onClick={() => setOpen(true)}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="group relative w-full max-w-65 aspect-3/4 rounded-2xl overflow-hidden cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0066FF]"
      >
        {/* Photo */}
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 260px"
        />

        {/* Bottom label */}
        <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-[#1A274F]/90 via-[#1A274F]/50 to-transparent pt-10 pb-4 px-4">
          <p className="text-white text-[17px] font-semibold leading-tight">{member.name}</p>
          <p className="text-[#A8B8F8] text-[13px] mt-0.5">{member.role}</p>
        </div>
      </motion.button>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-200 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative bg-white rounded-2xl w-full max-w-215 max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-[#DCE0E8] flex items-center justify-center hover:bg-[#A8B8F8] transition-colors"
            >
              <svg className="w-4 h-4 text-[#1A274F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex flex-col md:flex-row gap-0">
              {/* Left — photo + name */}
              <div className="md:w-[320px] shrink-0 flex flex-col">
                <div className="relative w-full aspect-3/4 rounded-t-2xl md:rounded-l-2x md:rounded-tr-none overflow-hidden bg-[#EAF3FB]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top"
                    sizes="320px"
                  />
                </div>
                <div className="px-6 py-5 border-t border-[#DCE0E8]">
                  <h2 className="text-[#1A274F] text-[20px] font-bold">{member.name}</h2>
                  <p className="text-[#4B6CB7] text-[14px] mt-0.5">{member.role}</p>

                  {/* LinkedIn */}
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex mt-3"
                      aria-label="LinkedIn profile"
                    >
                      <svg viewBox="0 0 40 40" width="36" height="36" xmlns="http://www.w3.org/2000/svg">
                        <rect width="40" height="40" rx="6" fill="#0A66C2" />
                        <path
                          d="M13 16h-4v12h4V16zm-2-6a2 2 0 110 4 2 2 0 010-4zm6 6v12h4v-6.5c0-1.7 1.3-3 3-3s3 1.3 3 3V28h4v-7c0-3.9-3.1-7-7-7-1.9 0-3.6.8-4.8 2V16h-2.2z"
                          fill="white"
                        />
                      </svg>
                    </a>
                  )}
                </div>
              </div>

              {/* Right — bio */}
              <div className="flex-1 px-8 py-8 flex flex-col gap-4 overflow-y-auto">
                {member.bio.map((paragraph, i) => (
                  <p key={i} className="text-[#1A274F]/80 text-[15px] leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}