"use client";

import Image from "next/image";
import Link from "next/link";

interface ServiceCardProps {
  image: string;
  category: string;
  title: string;
  activeTitle?: string;
  items: string[];
  href: string;
}

export default function ServiceCard({
  image,
  category,
  title,
  activeTitle,
  items,
  href,
}: ServiceCardProps) {
  return (
    <Link
      href={href}
      className="group relative block w-full max-w-[280px] aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer"
    >
      {/* Background image — scales & dims on hover */}
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover object-center transition-all duration-500 group-hover:scale-105 group-hover:brightness-50"
        sizes="(max-width: 768px) 100vw, 280px"
      />

      {/* Persistent dark blue overlay */}
      <div className="absolute inset-0 bg-[#1A274F]/50 group-hover:bg-[#1A274F]/65 transition-colors duration-500" />

      {/* ── DEFAULT STATE ── */}
      <div
        className="
          absolute inset-0 flex flex-col justify-end p-5
          transition-all duration-300 ease-in-out
          opacity-100 translate-y-0
          group-hover:opacity-0 group-hover:translate-y-2 group-hover:pointer-events-none
        "
      >
        <p className="text-[11px] font-semibold tracking-[0.15em] text-white/65 uppercase mb-3">
          {category}
        </p>
        <h3 className="text-white text-[22px] font-bold leading-tight">
          {title}
        </h3>
      </div>

      {/* ── HOVER / ACTIVE STATE ── */}
      <div
        className="
          absolute inset-0 flex flex-col justify-end p-5
          transition-all duration-300 ease-in-out
          opacity-0 translate-y-3 pointer-events-none
          group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto
        "
      >
        <h3 className="text-white text-[24px] font-extrabold leading-tight uppercase mb-5">
          {activeTitle ?? category}
        </h3>

        <ul className="flex flex-col gap-2.5">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-white/90 text-[14px] leading-snug">
              <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-white shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}