import Image from "next/image";
import Link from "next/link";
import { StaggerItem } from "@/components/ui/motion/reveal";
import { TRANSFORM_GRAPHIC, type PastWebinar } from "@/lib/data/events";

/**
 * PastWebinarCard
 * Thumbnail + title + date + recording link. Must sit inside a StaggerGroup.
 */
export default function PastWebinarCard({ webinar }: { webinar: PastWebinar }) {
  const href = webinar.videoUrl ?? "/news";
  const external = Boolean(webinar.videoUrl);

  return (
    <StaggerItem className="bg-white rounded-xl border border-[#DCE0E8] overflow-hidden flex flex-col">
      <div className="relative w-full aspect-video bg-[#F0F0F0]">
        <Image
          src={webinar.image ?? TRANSFORM_GRAPHIC}
          alt={webinar.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="p-5 flex flex-col gap-3 flex-1">
        <h3 className="text-[#1A274F] text-base font-semibold leading-snug flex-1">{webinar.title}</h3>
        <div className="flex items-center gap-2 text-[#9CA3AF] text-sm">
          <svg className="w-4 h-4 text-[#1A274F] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3M4 11h16M5 5h14a1 1 0 011 1v13a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z" />
          </svg>
          <span>{webinar.date}</span>
        </div>
        <Link
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className="inline-flex items-center gap-1.5 text-[#0066FF] text-sm font-semibold hover:gap-2.5 hover:text-[#25429A] transition-all w-fit"
        >
          {external ? "Watch video" : "View recap"}
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
    </StaggerItem>
  );
}
