import type { Metadata } from "next";
import { SpeakerApplicationModal } from "@/components/forms/all-forms";
import DiscoverBanner from "@/components/ui/banner";
import PageHero from "@/components/ui/page-hero";
import SectionHeading from "@/components/ui/section-heading";
import AnnouncementStrip from "@/components/sections/events/announcement-strip";
import UpcomingWebinarCard from "@/components/sections/events/upcoming-webinar-card";
import EventProgramsTabs from "@/components/sections/events/event-programs-tabs";
import PastWebinarsGrid from "@/components/sections/events/past-webinars-grid";
import { Reveal } from "@/components/ui/motion/reveal";
import { pageMetadata } from "@/lib/seo";
import { eventsHero, speakAtWebinar } from "@/lib/data/events";

export const metadata: Metadata = pageMetadata({
  title: "Events",
  description:
    "The Transform Webinar series and InnTech Summit: conversations with enterprise leaders on Continuous Transformation, governance, cybersecurity, strategy, and talent.",
  path: "/events",
});

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
export default function EventsPage() {
  return (
    <main className="w-full overflow-x-hidden">

      {/* ══════════════════════════════════════
          1. HERO — PageHero (reused)
      ══════════════════════════════════════ */}
      <PageHero headline={eventsHero.headline} subtext={eventsHero.subtext} >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-4 -mt-3 max-w-4xl">
          {eventsHero.extra.map((paragraph) => (
            <p key={paragraph} className="text-white/75 text-base leading-[1.8]">
              {paragraph}
            </p>
          ))}
        </div>
      </PageHero>

      {/* ══════════════════════════════════════
          2. ANNOUNCEMENT STRIP — next webinar (client-fetched)
      ══════════════════════════════════════ */}
      {/* <AnnouncementStrip /> */}

      {/* ══════════════════════════════════════
          3. UPCOMING WEBINAR — featured card
      ══════════════════════════════════════ */}
      <section className="bg-[#F7F9FC] py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading title="Upcoming Events" className="mb-10" />
          <UpcomingWebinarCard />
        </div>
      </section>

      {/* ══════════════════════════════════════
          4. EVENT PROGRAMS — Transform Webinar / InnTech Summit tabs
      ══════════════════════════════════════ */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <EventProgramsTabs />
        </div>
      </section>

      {/* ══════════════════════════════════════
          5. SPEAK AT A TRANSFORM WEBINAR
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
          6. PAST WEBINARS
      ══════════════════════════════════════ */}
      <section className="bg-white pb-16 lg:pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <PastWebinarsGrid />
        </div>
      </section>

      {/* ══════════════════════════════════════
          7. PARTNER WITH US — DiscoverBanner (reused)
      ══════════════════════════════════════ */}
      <DiscoverBanner
        headline={"Partner With Us"}
        subtext="Are you looking to sponsor, collaborate, or speak at an iCentra event? We would love to hear from you."
        primaryCta={{ label: "Get In Touch", href: "/contact" }}
        image="/images/event/partner-with-us.jpg"
        imageAlt="iCentra team meeting"
      />

    </main>
  );
}
