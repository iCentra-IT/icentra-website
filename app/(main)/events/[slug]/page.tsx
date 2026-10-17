import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import PageHero from "@/components/ui/page-hero";
import TextBlock from "@/components/ui/text-block";
import SectionHeading from "@/components/ui/section-heading";
import { WebinarRegistrationModal } from "@/components/forms/all-forms";
import CancelRegistration from "@/components/sections/events/cancel-registration";
import PastWebinarCard from "@/components/sections/events/past-webinar-card";
import { Reveal, StaggerGroup } from "@/components/ui/motion/reveal";
import { pageMetadata } from "@/lib/seo";
import { listEvents, getEvent, formatEventSchedule, EVENT_TYPE_LABELS } from "@/lib/api/events";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  // Defensive: a flaky/rate-limited API response here must not fail the whole
  // build — falling back to on-demand rendering for these slugs is fine.
  const events = await listEvents().catch(() => []);
  return events.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEvent(slug);
  if (!event) return {};

  return pageMetadata({
    title: `${event.title} | Events`,
    description: event.subtitle || event.description.slice(0, 160),
    path: `/events/${event.slug}`,
  });
}

export default async function EventDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const event = await getEvent(slug);
  if (!event) notFound();

  // Defensive: this is supplementary content — losing it shouldn't take down
  // a page whose primary event data already loaded successfully.
  const otherEvents = (await listEvents({ upcoming: true }).catch(() => [])).filter((e) => e.slug !== slug).slice(0, 3);

  return (
    <main className="w-full overflow-x-hidden">
      <PageHero headline={event.title} subtext={event.subtitle || undefined}>
        <div className="flex flex-wrap items-center gap-3 text-white/70 text-sm">
          <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-light-blue font-medium">
            {EVENT_TYPE_LABELS[event.event_type]}
          </span>
          {event.pillar && <span>{event.pillar.name}</span>}
        </div>
      </PageHero>

      <section className="bg-white py-14 lg:py-20">
        <div className="max-w-[860px] mx-auto px-6 flex flex-col gap-10">
          <Reveal>
            <p className="text-[#6B7280] text-sm mb-4">{formatEventSchedule(event)}</p>
            <TextBlock text={event.description} />
          </Reveal>

          {event.agenda && (
            <Reveal delay={0.1}>
              <h2 className="text-[#1A274F] text-xl lg:text-[24px] font-bold mb-4">Agenda</h2>
              <TextBlock text={event.agenda} />
            </Reveal>
          )}

          {event.speakers && (
            <Reveal delay={0.15}>
              <h2 className="text-[#1A274F] text-xl lg:text-[24px] font-bold mb-4">Speakers</h2>
              <p className="text-[#374151] text-base leading-[1.8]">{event.speakers}</p>
            </Reveal>
          )}

          <Reveal delay={0.2}>
            <div className="bg-[#EAF3FB] rounded-2xl p-8 flex flex-col gap-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                <div>
                  <h3 className="text-[#1A274F] text-lg font-bold mb-1">
                    {event.registration_is_open ? "Ready to join?" : "Registration is closed"}
                  </h3>
                  <p className="text-[#6B7280] text-sm">
                    {event.registration_is_open
                      ? `Save your spot for ${event.title}.`
                      : "This event is no longer open for registration."}
                  </p>
                </div>
                {event.registration_is_open && (
                  <WebinarRegistrationModal
                    eventSlug={event.slug}
                    eventTitle={event.title}
                    triggerLabel="Register now"
                    triggerClassName="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-[#0066FF] text-white text-sm font-semibold hover:bg-[#25429A] transition-colors shrink-0 cursor-pointer"
                  />
                )}
              </div>
              <CancelRegistration eventSlug={event.slug} />
            </div>
          </Reveal>

          <Link href="/events" className="inline-flex items-center gap-2 text-[#0066FF] text-sm font-semibold hover:gap-3 transition-all w-fit">
            ← Back to all events
          </Link>
        </div>
      </section>

      {otherEvents.length > 0 && (
        <section className="bg-[#F7F9FC] py-14 lg:py-20">
          <div className="max-w-270 mx-auto px-6">
            <SectionHeading title="Other Upcoming Events" className="mb-8" />
            <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {otherEvents.map((e) => (
                <PastWebinarCard key={e.slug} event={e} label="View details" />
              ))}
            </StaggerGroup>
          </div>
        </section>
      )}
    </main>
  );
}
