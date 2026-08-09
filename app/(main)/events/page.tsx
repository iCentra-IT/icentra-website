import { WebinarRegistrationModal } from "@/components/forms/all-forms";
import DiscoverBanner from "@/components/ui/banner";
import PageHero from "@/components/ui/page-hero";
import Image from "next/image";
import Link from "next/link";


/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const upcomingEvents = [
  {
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
    title: "iCentra Masterclass: Risk Management & ISO Implementation",
    desc: "Designed for senior professionals and business decision-makers, this masterclass dives into practical risk frameworks, ISO standards, and governance models that work.",
    date: "2nd Sep 2025",
    location: "Abuja",
    href: "#",
  },
  {
    image: "https://images.unsplash.com/photo-1560472355-536de3962603?w=600&q=80",
    title: "iCentra Masterclass: Digital Transformation Implementation",
    desc: "Designed for senior professionals seeking to understand and implement digital transformation strategies in their organizations.",
    date: "2nd Sep 2025",
    location: "Lagos",
    href: "#",
  },
];

const pastWebinars = [
  {
    image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=600&q=80",
    title: "Integrating Information Security into Your Organizational Culture: May Transform Webinar Recap",
    date: "2nd Sep 2025",
    platform: "Google Meet",
    href: "/news",
  },
  {
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&q=80",
    title: "Industry Leaders Redefine the Role of PMOs at iCentra's Transform Webinar",
    date: "2nd Sep 2025",
    platform: "Google Meet",
    href: "/news",
  },
];

const webinarTopics = [
  "Leadership and Innovation",
  "Digital Transformation",
  "Cybersecurity",
  "Project and Portfolio Management",
  "Business Agility",
  "Strategy and Execution",
];

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
export default function EventsPage() {
  return (
    <main className="w-full overflow-x-hidden">

      {/* ══════════════════════════════════════
          1. HERO — PageHero (reused)
      ══════════════════════════════════════ */}
      <PageHero
        headline={"Stay Ahead With Insightful\nConversations That Drive\nTransformation"}
        subtext="At iCentra, we don't just deliver solutions—we create platforms for meaningful dialogue, innovation, and growth. Our event series brings together industry leaders, visionaries, policymakers, innovators, and professionals to explore ideas that shape the future of work, business, governance, technology, and society."
      >
        <p className="text-white/65 text-[14px] leading-[1.8] max-w-185 -mt-3">
          Through thought-provoking conversations, strategic engagements, and cutting-edge insights,
          iCentra Events empower individuals and organizations to adapt, evolve, and lead in an
          ever-changing world. Whether virtual or in-person, each event is designed to spark
          transformation, unlock opportunities, and inspire collaboration—delivering knowledge that
          drives real impact.
        </p>
      </PageHero>

      {/* ══════════════════════════════════════
          2. UPCOMING EVENTS
      ══════════════════════════════════════ */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Heading */}
          <h2 className="text-[#1A274F] text-[26px] lg:text-[30px] font-bold pb-3 border-b-2 border-[#1A274F] inline-block mb-3">
            Upcoming Events
          </h2>
          <p className="text-[#6B7280] text-[14px] mb-10">
            Join our next event and be part of the conversation that&apos;s transforming people.
          </p>

          {/* Event cards — horizontal layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {upcomingEvents.map((event, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row gap-4 bg-[#F7F9FC] rounded-2xl overflow-hidden border border-[#E5E7EB]"
              >
                {/* Thumbnail */}
                <div className="relative shrink-0 w-full sm:w-45 h-40 sm:h-auto">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                    sizes="180px"
                  />
                </div>
                {/* Content */}
                <div className="flex flex-col gap-2 p-4 sm:py-5 sm:pr-5 flex-1 min-w-0">
                  <h3 className="text-[#1A274F] text-[15px] font-bold leading-snug">{event.title}</h3>
                  <p className="text-[#6B7280] text-[13px] leading-relaxed flex-1">{event.desc}</p>
                  <div className="flex items-center gap-1.5 text-[#6B7280] text-[12px] mt-1">
                    <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{event.date}</span>
                    <span className="mx-1">·</span>
                    <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{event.location}</span>
                  </div>
                  <div className="mt-2">
                    <WebinarRegistrationModal triggerLabel="Reserve Your Spot" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          3. FEATURED EVENT — InnTech Summit
      ══════════════════════════════════════ */}
      <section className="bg-white pb-16 lg:pb-20">
        <div className="max-w-[1280px] mx-auto px-6">
          {/* Heading */}
          <h2 className="text-[#1A274F] text-[26px] lg:text-[30px] font-bold pb-3 border-b-2 border-[#1A274F] inline-block mb-3">
            Event
          </h2>
          <p className="text-[#6B7280] text-[14px] mb-10">
            Join our next event and be part of the conversation that&apos;s transforming people.
          </p>

          {/* InnTech Summit row */}
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
            {/* Left — InnTech logo */}
            <div className="shrink-0 flex items-center justify-center w-full lg:w-[300px] h-[160px] bg-white rounded-2xl border border-[#E5E7EB] p-8">
              {/* InnTech brand text logo */}
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-2">
                  {/* InnTech "N" mark svg */}
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <rect width="40" height="40" rx="6" fill="#1A274F"/>
                    <path d="M10 30V10l12 20V10" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M28 10v20" stroke="#0066FF" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                  <div>
                    <p className="text-[#1A274F] text-[22px] font-extrabold tracking-tight leading-none">InnTech</p>
                    <p className="text-[#6B7280] text-[10px] tracking-widest uppercase">INNOVATION & TECHNOLOGY</p>
                  </div>
                </div>
                <p className="text-[#9CA3AF] text-[10px] tracking-wider mt-1">Powered by <span className="text-[#0066FF] font-semibold">iCentra</span></p>
              </div>
            </div>

            {/* Right — description */}
            <div className="flex-1 min-w-0">
              <h3 className="text-[#1A274F] text-[22px] font-bold mb-3">InnTech Summit</h3>
              <p className="text-[#374151] text-[14px] leading-[1.8] mb-2">
                Where Innovation, Policy, and Technology Converge for Africa&apos;s Future. The InnTech
                Summit is iCentra&apos;s flagship annual event that brings together over 500+ participants
                to explore emerging trends, breakthrough technologies, and transformative ideas shaping
                the continent.
              </p>
              <p className="text-[#374151] text-[14px] leading-[1.8] mb-5">
                Each edition is themed around critical areas influencing national and organizational
                competitiveness.
              </p>
              <WebinarRegistrationModal
                triggerLabel="Learn More →"
                triggerClassName="inline-flex items-center gap-2 text-[#0066FF] text-[14px] font-semibold hover:gap-3 transition-all cursor-pointer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          4. INNTECH SUMMIT 2025 HIGHLIGHT — full-width video
      ══════════════════════════════════════ */}
      <section className="bg-[#1A274F]">
        <div className="max-w-[1280px] mx-auto px-6 py-12 lg:py-16">
          <h2 className="text-white text-[26px] lg:text-[32px] font-bold mb-8">
            InnTech Summit 2025 Highlight
          </h2>
          {/* Full-width video thumbnail */}
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-[#0B1B4D] group cursor-pointer">
            <Image
              src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1400&q=80"
              alt="InnTech Summit 2025 Highlight"
              fill
              className="object-cover opacity-80 group-hover:opacity-70 transition-opacity"
              sizes="100vw"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-[#1A274F]/40" />
            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-[#0066FF] flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl">
                <svg className="w-7 h-7 lg:w-8 lg:h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          5. THE TRANSFORM WEBINAR — text left + brand graphic right
      ══════════════════════════════════════ */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — content */}
          <div className="flex-1 min-w-0">
            <h2 className="text-[#1A274F] text-[22px] lg:text-[26px] font-bold mb-3">
              The Transform Webinar
            </h2>
            <p className="text-[#374151] text-[14px] leading-[1.8] mb-3">
              The Transform Webinar is a virtual thought leadership and knowledge-sharing series
              powered by iCentra. Held monthly (2 hours) and open to a global audience, this series
              features experts and practitioners discussing key topics around:
            </p>
            <ul className="flex flex-col gap-2 mb-4">
              {webinarTopics.map((topic) => (
                <li key={topic} className="flex items-start gap-2.5 text-[#374151] text-[14px] leading-relaxed">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#0066FF] shrink-0" />
                  {topic}
                </li>
              ))}
            </ul>
            <p className="text-[#374151] text-[14px] leading-[1.8]">
              Each session is tailored to equip individuals and organizations with the insights they
              need to adapt, evolve, and lead in a constantly changing world.
            </p>
          </div>

          {/* Right — TRANSFORM branded graphic */}
          <div className="w-full">
            <Image
              src="/images/event/transform-webinar.png"
              alt="The Transform Webinar"
              width={600}
              height={400}
              className="w-full h-auto object-cover"
            />
          
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          6. PAST WEBINARS
      ══════════════════════════════════════ */}
      <section className="bg-[#F7F9FC] py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-[#1A274F] text-[24px] lg:text-[28px] font-bold pb-3 border-b-2 border-[#1A274F] inline-block mb-3">
            Past Webinars
          </h2>
          <p className="text-[#6B7280] text-[14px] mb-10">
            Missed an event? Catch up on key moments, recordings, and thought leadership from past sessions.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pastWebinars.map((webinar, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-[#E5E7EB] flex flex-col">
                {/* Thumbnail */}
                <div className="relative w-full h-[200px] overflow-hidden">
                  <Image
                    src={webinar.image}
                    alt={webinar.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                {/* Content */}
                <div className="p-5 flex flex-col gap-3 flex-1">
                  <h3 className="text-[#1A274F] text-[15px] font-semibold leading-snug flex-1">
                    {webinar.title}
                  </h3>
                  {/* Meta */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2 text-[#6B7280] text-[12px]">
                      <svg className="w-3.5 h-3.5 text-[#0066FF] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{webinar.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#6B7280] text-[12px]">
                      <svg className="w-3.5 h-3.5 text-[#0066FF] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      <span>{webinar.platform}</span>
                    </div>
                  </div>
                  <div className="mt-1">
                    <Link
                      href={webinar.href}
                      className="inline-flex items-center px-5 py-2 rounded-full bg-[#0066FF] text-white text-[12px] font-semibold hover:bg-[#25429A] transition-colors"
                    >
                      View Event Recap
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          7. PARTNER WITH US — DiscoverBanner (reused)
      ══════════════════════════════════════ */}
      <DiscoverBanner
        headline={"Partner With Us"}
        subtext="Are you looking to sponsor, collaborate, or speak at an iCentra event? We would love to hear from you."
        primaryCta={{ label: "Get In Touch", href: "/contact" }}
        // secondaryCta={null}
        image="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=85"
        imageAlt="iCentra team meeting"
      />

    </main>
  );
}