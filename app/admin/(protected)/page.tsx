"use client";

import Link from "next/link";
import { useStaffQuery } from "@/lib/admin/queries";
import { staffListJobs } from "@/lib/api/jobs";
import { staffListEvents } from "@/lib/api/events";
import { staffListSpeakers } from "@/lib/api/speakers";
import {
  BriefcaseIcon,
  CalendarIcon,
  MicIcon,
  LayersIcon,
  MailIcon,
  SparklesIcon,
  ClockIcon,
  ChevronRightIcon,
} from "@/components/admin/icons";

function StatCard({
  icon,
  label,
  value,
  sublabel,
  href,
  loading,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | undefined;
  sublabel: string;
  href: string;
  loading: boolean;
}) {
  return (
    <Link
      href={href}
      className="bg-white rounded-2xl border border-[#DCE0E8] p-6 flex items-start justify-between gap-4 hover:border-[#0066FF]/40 hover:shadow-sm transition-all group"
    >
      <div className="min-w-0">
        <p className="text-[#6B7280] text-sm font-medium mb-2">{label}</p>
        {loading ? (
          <div className="h-8 w-14 rounded bg-[#EEF1F6] animate-pulse" />
        ) : (
          <p className="text-[#1A274F] text-3xl font-bold">{value ?? "—"}</p>
        )}
        <p className="text-[#9CA3AF] text-xs mt-1">{sublabel}</p>
      </div>
      <span className="w-11 h-11 rounded-xl bg-[#EAF3FB] text-[#0066FF] flex items-center justify-center shrink-0 group-hover:bg-[#0066FF] group-hover:text-white transition-colors">
        {icon}
      </span>
    </Link>
  );
}

function QuickAction({ icon, label, href }: { icon: React.ReactNode; label: string; href: string }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-5 py-4 rounded-xl border border-[#DCE0E8] bg-white hover:border-[#0066FF] hover:bg-[#EAF3FB]/40 transition-colors group"
    >
      <span className="w-9 h-9 rounded-lg bg-[#F7F9FC] text-[#0066FF] flex items-center justify-center shrink-0 group-hover:bg-[#0066FF] group-hover:text-white transition-colors">
        {icon}
      </span>
      <span className="text-[#1A274F] text-sm font-semibold flex-1">{label}</span>
      <ChevronRightIcon className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#0066FF] transition-colors" />
    </Link>
  );
}

function ReferenceLink({ icon, label, href }: { icon: React.ReactNode; label: string; href: string }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-[#DCE0E8] bg-white hover:border-[#0066FF]/40 hover:bg-[#F7F9FC] transition-colors"
    >
      <span className="text-[#6B7280] shrink-0">{icon}</span>
      <span className="text-[#374151] text-sm font-medium truncate">{label}</span>
    </Link>
  );
}

export default function AdminDashboardPage() {
  const jobsQuery = useStaffQuery(["jobs"], staffListJobs);
  const eventsQuery = useStaffQuery(["events"], staffListEvents);
  const speakersQuery = useStaffQuery(["speakers"], staffListSpeakers);

  const jobs = jobsQuery.data;
  const events = eventsQuery.data;
  const speakers = speakersQuery.data;

  const openJobs = jobs?.filter((j) => j.status === "open" && j.is_public).length;
  const upcomingEvents = events?.filter((e) => e.status === "open" && new Date(e.start_datetime) > new Date()).length;
  const activeSpeakers = speakers?.filter((s) => s.is_active).length;

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-8">
      <div>
        <h1 className="text-[#1A274F] text-xl lg:text-2xl font-bold">Dashboard</h1>
        <p className="text-[#6B7280] text-sm mt-1">An overview of what&apos;s live on the website right now.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard
          icon={<BriefcaseIcon />}
          label="Open Job Roles"
          value={openJobs}
          sublabel={jobs ? `${jobs.length} total` : "Loading…"}
          href="/admin/jobs"
          loading={jobsQuery.isLoading}
        />
        <StatCard
          icon={<CalendarIcon />}
          label="Upcoming Events"
          value={upcomingEvents}
          sublabel={events ? `${events.length} total` : "Loading…"}
          href="/admin/events"
          loading={eventsQuery.isLoading}
        />
        <StatCard
          icon={<MicIcon />}
          label="Active Speakers"
          value={activeSpeakers}
          sublabel={speakers ? `${speakers.length} total` : "Loading…"}
          href="/admin/speakers"
          loading={speakersQuery.isLoading}
        />
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-[#1A274F] text-sm font-bold uppercase tracking-wide mb-3">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <QuickAction icon={<BriefcaseIcon className="w-4.5 h-4.5" />} label="New Job Opening" href="/admin/jobs/new" />
          <QuickAction icon={<CalendarIcon className="w-4.5 h-4.5" />} label="New Event" href="/admin/events/new" />
          <QuickAction icon={<MicIcon className="w-4.5 h-4.5" />} label="New Speaker" href="/admin/speakers/new" />
        </div>
      </div>

      {/* Reference data */}
      <div>
        <h2 className="text-[#1A274F] text-sm font-bold uppercase tracking-wide mb-3">Reference Data</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <ReferenceLink icon={<LayersIcon className="w-4.5 h-4.5" />} label="Pillars" href="/admin/taxonomy/pillars" />
          <ReferenceLink icon={<MailIcon className="w-4.5 h-4.5" />} label="Newsletter Categories" href="/admin/taxonomy/newsletter-categories" />
          <ReferenceLink icon={<SparklesIcon className="w-4.5 h-4.5" />} label="Volunteer Skills" href="/admin/taxonomy/volunteer-skills" />
          <ReferenceLink icon={<ClockIcon className="w-4.5 h-4.5" />} label="Volunteer Availability" href="/admin/taxonomy/volunteer-availability" />
        </div>
      </div>
    </div>
  );
}
