import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SpeakerApplicationModal, WebinarRegistrationModal } from "@/components/forms/all-forms";
import DiscoverBanner from "@/components/ui/banner";
import PageHero from "@/components/ui/page-hero";
import SectionHeading from "@/components/ui/section-heading";
import PastWebinarCard from "@/components/sections/events/past-webinar-card";
import { Reveal, StaggerGroup } from "@/components/ui/motion/reveal";
import { pageMetadata } from "@/lib/seo";
import { TRANSFORM_GRAPHIC, aboutWebinar, eventsHero, inntechSummit, pillarStyles, DEFAULT_PILLAR_STYLE, speakAtWebinar } from "@/lib/data/events";
import { listEvents, formatEventSchedule } from "@/lib/api/events";

export const metadata: Metadata = pageMetadata({
  title: "Events",
  description:
    "The Transform Webinar series and InnTech Summit: conversations with enterprise leaders on Continuous Transformation, governance, cybersecurity, strategy, and talent.",
  path: "/events",
});

const REGISTER_CLASS =
  "inline-flex items-center px-6 py-3 rounded-full bg-[#0066FF] text-white text-sm font-semibold hover:bg-light-blue hover:text-[#1A274F] transition-colors cursor-pointer";

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
export default async function EventsPage() {
  const [upcoming, past] = await Promise.all([
    listEvents({ upcoming: true }),
    listEvents({ past: true }),
  ]);

  const nextEvent = [...upcoming].sort(
    (a, b) => new Date(a.start_datetime).getTime() - new Date(b.start_datetime).getTime()
  )[0];
  const recentPast = [...past]
    .sort((a, b) => new Date(b.start_datetime).getTime() - new Date(a.start_datetime).getTime())
    .slice(0, 6);

  return (
    <main className="w-full overflow-x-hidden">

      {/* ══════════════════════════════════════
          1. HERO — PageHero (reused)
      ══════════════════════════════════════ */}
      <PageHero headline={eventsHero.headline} subtext={eventsHero.subtext}>
        <div className="flex flex-col gap-4 -mt-3">
          {eventsHero.extra.map((paragraph) => (
            <p key={paragraph} className="text-white/75 text-base leading-[1.8] max-w-2xl">
              {paragraph}
            </p>
          ))}
        </div>
      </PageHero>

      {/* ══════════════════════════════════════
          2. ANNOUNCEMENT STRIP — next webinar
      ══════════════════════════════════════ */}
      {nextEvent && (
        <div className="bg-deep-blue border-b border-[#0066FF]/40">
          <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-light-blue text-xs font-semibold tracking-widest uppercase mb-1">
                {nextEvent.pillar?.name ?? "Upcoming"}
              </p>
              <p className="text-white text-sm sm:text-base">{nextEvent.title}</p>
            </div>
            <div className="shrink-0">
              <WebinarRegistrationModal eventSlug={nextEvent.slug} eventTitle={nextEvent.title} triggerLabel="Register now →" triggerClassName={REGISTER_CLASS} />
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════
          3. UPCOMING WEBINAR — featured card
      ══════════════════════════════════════ */}
      <section className="bg-[#F7F9FC] py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading title="Upcoming Webinar" className="mb-10" />

          {nextEvent ? (
            <Reveal className="rounded-2xl border border-[#0066FF]/40 bg-white overflow-hidden">
              <div className="bg-main h-52 lg:h-64 flex flex-col items-center justify-center gap-3 px-6 text-center">
                <p className="text-light-blue text-xs font-semibold tracking-widest uppercase">
                  {nextEvent.pillar?.name ?? "Upcoming Webinar"}
                </p>
                <p className="text-white text-lg lg:text-xl font-bold max-w-3xl leading-snug">{nextEvent.title}</p>
              </div>

              <div className="p-6 lg:p-10 flex flex-col gap-4">
                <span
                  className={`w-fit px-3 py-1 rounded-full text-xs font-medium ${
                    nextEvent.pillar ? pillarStyles[nextEvent.pillar.name] ?? DEFAULT_PILLAR_STYLE : DEFAULT_PILLAR_STYLE
                  }`}
                >
                  {nextEvent.pillar?.name ?? "iCentra Event"}
                </span>
                <h3 className="text-[#1A274F] text-xl lg:text-2xl font-bold leading-snug">{nextEvent.title}</h3>
                <p className="text-[#6B7280] text-sm">{formatEventSchedule(nextEvent)}</p>
                {nextEvent.subtitle && (
                  <p className="text-[#374151] text-base leading-[1.8] max-w-4xl">{nextEvent.subtitle}</p>
                )}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-2">
                  <WebinarRegistrationModal eventSlug={nextEvent.slug} eventTitle={nextEvent.title} triggerLabel="Register now" triggerClassName={REGISTER_CLASS} />
                  <Link href={`/events/${nextEvent.slug}`} className="text-[#0066FF] text-sm font-semibold hover:text-[#25429A] transition-colors">
                    Full details →
                  </Link>
                </div>
              </div>
            </Reveal>
          ) : (
            <div className="bg-white rounded-2xl border border-[#DCE0E8] p-10 text-center text-[#6B7280] text-sm">
              No upcoming webinars right now. Check back soon.
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════
          4. SERIES DIVIDER
      ══════════════════════════════════════ */}
      <div className="bg-main">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-2.5">
          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 5h18L12 20z" />
          </svg>
          <span className="text-white text-xs font-bold tracking-widest uppercase">Transform Webinar Series</span>
        </div>
      </div>

      {/* ══════════════════════════════════════
          5. ABOUT THE TRANSFORM WEBINAR
      ══════════════════════════════════════ */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start">
          <Reveal>
            <SectionHeading title={aboutWebinar.title} className="mb-6" />
            <div className="flex flex-col gap-4 md:px-6">
              {aboutWebinar.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-[#374151] text-base leading-[1.8]">
                  {paragraph}
                </p>
              ))}
              <div className="flex flex-wrap gap-2 mt-2">
                {aboutWebinar.pillars.map((pillar) => (
                  <span key={pillar} className={`px-3 py-1 rounded-full text-xs font-medium ${pillarStyles[pillar] ?? DEFAULT_PILLAR_STYLE}`}>
                    {pillar}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="w-full">
            <div className="relative w-full aspect-3/2 rounded-2xl overflow-hidden bg-[#F0F0F0]">
              <Image
                src={TRANSFORM_GRAPHIC}
                alt="The Transform Webinar by iCentra"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════
          6. UPCOMING EVENTS — InnTech Summit
      ══════════════════════════════════════ */}
      <section className="bg-white pb-16 lg:pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            title="Upcoming Events"
            subtitle="Join our next event and be part of the conversation that's transforming people."
            className="mb-10"
          />

          <Reveal className="flex flex-col lg:flex-row gap-8 lg:gap-14 items-center">
            <div className="relative shrink-0 w-full lg:w-100 h-52 rounded-2xl bg-[#F7F9FC] overflow-hidden">
              <Image
                src={inntechSummit.logo}
                alt="InnTech Summit"
                fill
                className="object-contain mix-blend-multiply scale-[1.7]"
                sizes="(max-width: 1024px) 100vw, 400px"
              />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-[#1A274F] text-xl lg:text-2xl font-bold mb-3">{inntechSummit.title}</h3>
              <p className="text-[#374151] text-base leading-[1.8] mb-5">{inntechSummit.description}</p>
              <Link
                href={inntechSummit.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-[#1A274F] text-base font-medium hover:text-[#0066FF] transition-colors group"
              >
                {inntechSummit.linkLabel}
                <span className="w-7 h-7 rounded-md bg-main flex items-center justify-center group-hover:bg-[#0066FF] transition-colors">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════
          7. PAST WEBINARS
      ══════════════════════════════════════ */}
      <section className="bg-white pb-16 lg:pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            title="Past Webinars"
            subtitle="Missed an event? Catch up on key moments, recordings, and thought leadership from past sessions."
            className="mb-10"
          />

          {recentPast.length > 0 ? (
            <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {recentPast.map((event) => (
                <PastWebinarCard key={event.slug} event={event} />
              ))}
            </StaggerGroup>
          ) : (
            <div className="bg-[#F7F9FC] rounded-2xl p-10 text-center text-[#6B7280] text-sm">
              No past webinars yet. Check back after our next session.
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════
          8. SPEAK AT A TRANSFORM WEBINAR
      ══════════════════════════════════════ */}
      <section className="bg-[#F7F9FC] py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="rounded-2xl border border-[#DCE0E8] bg-white p-8 lg:p-10">
            <h2 className="text-main text-[22px] lg:text-[28px] font-bold mb-5">{speakAtWebinar.title}</h2>
            <div className="flex flex-col gap-4 max-w-4xl mb-8">
              {speakAtWebinar.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-[#374151] text-base leading-[1.8]">
                  {paragraph}
                </p>
              ))}
            </div>
            <SpeakerApplicationModal />
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════
          9. PARTNER WITH US — DiscoverBanner (reused)
      ══════════════════════════════════════ */}
      <DiscoverBanner
        headline={"Partner With Us"}
        subtext="Are you looking to sponsor, collaborate, or speak at an iCentra event? We would love to hear from you."
        primaryCta={{ label: "Get In Touch", href: "/contact" }}
        image="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=85"
        imageAlt="iCentra team meeting"
      />

    </main>
  );
}
