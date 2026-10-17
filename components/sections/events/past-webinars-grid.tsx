"use client";

import { StaggerGroup } from "@/components/ui/motion/reveal";
import PastWebinarCard from "@/components/sections/events/past-webinar-card";
import { useEvents } from "@/lib/queries/events";

export default function PastWebinarsGrid() {
  const { data: past, isLoading } = useEvents({ past: true });
  const recentPast = past
    ? [...past].sort((a, b) => new Date(b.start_datetime).getTime() - new Date(a.start_datetime).getTime()).slice(0, 6)
    : [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-10">
        <div className="w-6 h-6 border-2 border-[#DCE0E8] border-t-[#0066FF] rounded-full animate-spin" />
      </div>
    );
  }

  if (recentPast.length === 0) {
    return (
      <div className="bg-[#F7F9FC] rounded-2xl p-10 text-center text-[#6B7280] text-sm">
        No past webinars yet. Check back after our next session.
      </div>
    );
  }

  return (
    <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {recentPast.map((event) => (
        <PastWebinarCard key={event.slug} event={event} />
      ))}
    </StaggerGroup>
  );
}
