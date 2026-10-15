import Image from "next/image";
import Link from "next/link";
import { StaggerItem } from "@/components/ui/motion/reveal";
import { TRANSFORM_GRAPHIC } from "@/lib/data/events";
import type { EventListItem } from "@/lib/api/events";

/**
 * PastWebinarCard
 * Thumbnail + title + date, linking to the event's own page. Must sit inside a StaggerGroup.
 */
export default function PastWebinarCard({ event, label = "View recap" }: { event: EventListItem; label?: string }) {
  const date = new Date(event.start_datetime).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <StaggerItem className="bg-white rounded-xl border border-[#DCE0E8] overflow-hidden flex flex-col">
      <div className="relative w-full aspect-video bg-[#F0F0F0]">
        <Image
          src={TRANSFORM_GRAPHIC}
          alt={event.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="p-5 flex flex-col gap-3 flex-1">
        <h3 className="text-[#1A274F] text-base font-semibold leading-snug flex-1">{event.title}</h3>
        <div className="flex items-center gap-2 text-[#9CA3AF] text-sm">
          <svg className="w-4 h-4 text-[#1A274F] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3M4 11h16M5 5h14a1 1 0 011 1v13a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z" />
          </svg>
          <span>{date}</span>
        </div>
        <Link
          href={`/events/${event.slug}`}
          className="inline-flex items-center gap-1.5 text-[#0066FF] text-sm font-semibold hover:gap-2.5 transition-all w-fit"
        >
          {label}
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
    </StaggerItem>
  );
}
