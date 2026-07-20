import DiscoverBanner from "@/components/ui/banner";
import { TeamCard } from "@/components/ui/cards/team-card";
import PageHero from "@/components/ui/page-hero";
import Image from "next/image";
import Link from "next/link";

/* ─────────────────────────────────────────
   LEADERSHIP DATA
───────────────────────────────────────── */
const leaders = [
  {
    image:
      "/images/about/mansur.png",
    name: "Mansur Ahmed",
    role: "Non-Executive Director",
    linkedin: "https://linkedin.com",
    bio: [
      "Mansur Ahmed is a highly respected Non-Executive Director with over 25 years of board-level experience across financial services, telecommunications, and public sector organizations.",
      "He brings strategic governance expertise and a deep understanding of regulatory environments across West Africa and the UK, helping iCentra navigate complex markets while maintaining the highest standards of corporate integrity.",
    ],
  },
  {
    image:
      "/images/about/taopheek.png",
    name: "Taopheek Babayeju",
    role: "Founder & CEO",
    linkedin: "https://linkedin.com",
    bio: [
      "Taopheek BABAYEJU is a transformation expert, management & technology professional, and author.",
      "He has two and half decades of experience in strategy, digital, organizational, and agile transformation, project, program & portfolio management, PMO delivery, technology consulting, cybersecurity, change management, and learning and development.",
      "Since 2009, Mr. Babayeju has served as the CEO of iCentra, expanding the company from Abuja, Nigeria to Texas, United States, and London, United Kingdom, serving clients globally.",
    ],
  },
  {
    image:
      "/images/about/tunde.png",
    name: "Tunde Ibikunle",
    role: "Chief Technology Officer",
    linkedin: "https://linkedin.com",
    bio: [
      "Tunde Ibikunle is a seasoned technology leader with deep expertise in enterprise architecture, digital transformation, and cybersecurity.",
      "As Chief Technology Officer, he leads iCentra's technology strategy and ensures the company remains at the cutting edge of innovation to serve clients across Africa and globally.",
    ],
  },
  {
    image:
      "/images/about/edith.png",
    name: "Edith Udeagu",
    role: "Non-Executive Director",
    linkedin: "https://linkedin.com",
    bio: [
      "Edith Udeagu is a distinguished Non-Executive Director with extensive experience in corporate governance, risk management, and organizational development.",
      "She has served on multiple boards and advisory committees, bringing a wealth of knowledge in finance, compliance, and strategic planning to iCentra.",
    ],
  },
  {
    image:
      "/images/about/akin.png",
    name: "Akin Oparison",
    role: "Non-Executive Director",
    linkedin: "https://linkedin.com",
    bio: [
      "Akin Oparison is a distinguished Non-Executive Director with a track record of value creation in technology and financial services sectors.",
      "He brings strategic insights and a network spanning both public and private sectors across Nigeria and internationally.",
    ],
  },
  {
    image:
      "/images/about/giwa.png",
    name: "Shewudeen Giwa",
    role: "Non-Executive Director",
    linkedin: "https://linkedin.com",
    bio: [
      "Shewudeen Giwa serves as Non-Executive Director at iCentra, providing independent oversight and strategic counsel to the board.",
      "With a background spanning finance, operations, and organizational transformation, he contributes to shaping iCentra's long-term growth strategy.",
    ],
  },
];

/* ─────────────────────────────────────────
   CORE VALUES DATA
───────────────────────────────────────── */
const valuesLeft = [
  {
    title: "Client Focus",
    text: "We are committed to making a positive difference to our clients by delivering on our promises.",
  },
  {
    title: "Accountability",
    text: "We take full responsibility for our actions and inactions, and honor our obligations.",
  },
  {
    title: "Teamwork",
    text: "As a team, we work together to achieve our clients and to drive our organisation to greater success.",
  },
];

const valuesRight = [
  {
    title: "Integrity",
    text: "Our integrity is our most critical asset; this we never compromise in all our corporate and personal dealings.",
  },
  {
    title: "Excellence",
    text: "Our strive for excellence knows no bound; we substitute nothing for quality and standard.",
  },
  {
    title: "Innovation",
    text: "Our corporate strength lies in the utilisation of the imagination we create and never imitate.",
  },
];

/* ─────────────────────────────────────────
   PAGE COMPONENT
───────────────────────────────────────── */
export default function AboutPage() {
  return (
    <main className="w-full overflow-x-hidden">
      {/* ══════════════════════════════════════
                1. HERO — PageHero (reused)
            ══════════════════════════════════════ */}
      <PageHero
        headline={"History of\nour firm"}
        subtext="Founded in 2009 in Abuja, Nigeria, iCentra emerged with a bold vision: to transform
              the business landscape through technological and organizational performance.
              Our mission goes beyond mere service delivery — we are dedicated to creating
              genuine value for clients and stakeholders."
      />

      {/* ══════════════════════════════════════════════
          2. COMPANY STORY — 4 paragraphs + 2 stacked images
      ══════════════════════════════════════════════ */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          {/* Left — body copy */}
          <div className="flex-1 min-w-0 flex flex-col gap-5">
            <p className="text-[#374151] text-[15px] leading-[1.8]">
              Our name, iCentra (Innovation Centre), was coined from our
              aspiration to be the center of excellence in innovation, from
              Africa to the rest of the world. Our core philosophy remains
              unchanged: a relentless pursuit of excellence, a commitment to
              performance optimization, and a passion for catalyzing positive
              change in the global business ecosystem.
            </p>
            <p className="text-[#374151] text-[15px] leading-[1.8]">
              Over one and a half decades, iCentra has evolved into a dynamic
              and globally recognized business and technology solutions company.
              From its West African root, iCentra has expanded its global
              footprint with strategic offices established in Texas, United
              States, and London, United Kingdom.
            </p>
            <p className="text-[#374151] text-[15px] leading-[1.8]">
              This geographic reach enables us to serve a broad spectrum of
              clients, both domestically and internationally, facilitating
              innovation, growth, and sustainable success.
            </p>
            <p className="text-[#374151] text-[15px] leading-[1.8]">
              Our dedicated team of professionals combines their deep industry
              knowledge with cutting-edge technology solutions to tackle complex
              challenges and drive sustainable success.
            </p>
          </div>

          {/* Right — 2 stacked landscape images */}
          <div className="flex flex-col gap-4 shrink-0 w-full lg:w-90">
            <div className="relative w-full h-90 rounded-2xl overflow-hidden">
              <Image
                src="/images/about/hero.png"
                alt="iCentra team collaboration"
                fill
                className="object-cover"
                sizes="360px"
              />
            </div>
            
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          3. VISION & MISSION — 2 dark side-by-side cards
      ══════════════════════════════════════════════ */}
      <section className="p-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Vision */}
          <div className="bg-[#1A274F] rounded-2xl px-8 py-10 lg:px-10 h-80 lg:py-12 flex flex-col justify-center gap-3 bg-no-repeat" style={{
            "backgroundImage": "url('/images/about/vision.png')"
          }}>
            <h3 className="text-white text-[19px] font-bold">Our Vision</h3>
            <p className="text-white/65 text-base leading-relaxed">
              To be the Centre of excellence where people and organizations find
              tools and resources to thrive, innovate, and create new
              opportunities.
            </p>
          </div>
          {/* Mission */}
          <div className="bg-[#25429A] rounded-2xl px-8 py-10 lg:px-10 h-80 lg:py-12 flex flex-col justify-center gap-3 bg-no-repeat" style={{
            "backgroundImage": "url('/images/about/mission.png')"
          }}>
            <h3 className="text-white text-[19px] font-bold">Our Mission</h3>
            <p className="text-white/65 text-base leading-relaxed">
              Leveraging innovation and technology to transform people and
              organizations for excellent performance.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          4. CTA BANNER — DiscoverBanner (reused)
             Left: navy hex-pattern panel, Right: team photo
      ══════════════════════════════════════════════ */}
      <DiscoverBanner
        headline={
          "Transforming people &\norganizations for excellent\nperformance"
        }
        subtext="Our expertise includes Enterprise Transformation, Cybersecurity, Strategy & Execution, and Learning & Talent."
        primaryCta={{ label: "Contact Us", href: "/contact" }}
        secondaryCta={{ label: "Our Services", href: "/services" }}
        image="/images/about/discover-icentra.png"
        imageAlt="iCentra professionals at work"
      />

      {/* ══════════════════════════════════════════════
          5. CORE VALUES — ring wheel + 6 values
      ══════════════════════════════════════════════ */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-[#1A274F] text-[24px] lg:text-[32px] font-bold mb-14 lg:mb-20">
            Our Core Values
          </h2>

          {/* 3-col layout: values-left | ring-center | values-right */}
          <div className="flex justify-center items-center gap-10 max-w-260 mx-auto">

            <Image 
            src="/core-value.svg"
            alt="iCentra core values"
            width={1000}
            height={1000}
            className="object-cover"

            />

            
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          6. OUR LEADERSHIP — TeamCard grid 4 + 2
      ══════════════════════════════════════════════ */}
      <section className="bg-[#F7F9FC] py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-[#1A274F] text-[24px] lg:text-[32px] font-bold mb-10">
            Our Leadership
          </h2>

          {/* Row 1 — 4 leaders */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
            {leaders.slice(0, 4).map((member) => (
              <div
                key={member.name}
                className="[&>button]:w-full [&>button]:max-w-none [&>button]:h-70 sm:[&>button]:h-75 lg:[&>button]:h-85"
              >
                <TeamCard member={member} />
              </div>
            ))}
          </div>

          {/* Row 2 — 2 leaders (left-aligned via same 4-col grid) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {leaders.slice(4, 6).map((member) => (
              <div
                key={member.name}
                className="[&>button]:w-full [&>button]:max-w-none [&>button]:h-70 sm:[&>button]:h-75 lg:[&>button]:h-85"
              >
                <TeamCard member={member} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          7. TRANSFORMING LIVES
      ══════════════════════════════════════════════ */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-[#1A274F] text-[24px] lg:text-[32px] font-bold mb-10">
            Transforming Lives
          </h2>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
            {/* Text — 2 sub-sections */}
            <div className="flex-1 min-w-0 flex flex-col gap-8">
              <div>
                <h3 className="text-[#1A274F] text-[17px] font-bold mb-3">
                  iCentra Cares
                </h3>
                <p className="text-[#6B7280] text-[14px] leading-[1.8]">
                  At iCentra, we believe that true success goes beyond business
                  achievements. It is about making a meaningful impact in the
                  communities we serve. Through our iCentra Cares initiative, we
                  dedicate ourselves to creating positive change and supporting
                  causes that matter.
                </p>
                <p className="text-[#6B7280] text-[14px] leading-[1.8] mt-3">
                  {`Our Corporate Social Responsibility (CSR) efforts focus on
                  initiatives that foster education, health, and sustainable
                  development. Whether it's through charity events, community
                  outreach programs, or environmental projects, we're committed
                  to giving back in ways that make a real difference.`}
                </p>
              </div>

              <div>
                <h3 className="text-[#1A274F] text-[17px] font-bold mb-3">
                  How We Transform Lives
                </h3>
                <p className="text-[#6B7280] text-[14px] leading-[1.8]">
                {`  Take a look at some of the incredible moments from our past
                  CSR events and initiatives. From training sessions to talent
                  competitions, community engagement and beyond — every
                  initiative is driven by our commitment to people-first
                  transformation. From hospital volunteering to charity matches,
                  we are proud of the difference we've made and we're excited
                  about the future.`}
                </p>
              </div>
            </div>

            {/* Image */}
            <div className="relative shrink-0 w-full lg:w-100 h-75 lg:h-90 rounded-2xl overflow-hidden">
              <Image
                src="/images/about/transformation.png"
                alt="iCentra community event"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 400px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          8. TAB DEVELOPMENT INITIATIVES
      ══════════════════════════════════════════════ */}
      <section className="bg-[#F7F9FC] py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-[#1A274F] text-[24px] lg:text-[32px] font-bold mb-3">
            TAB Development Initiatives
          </h2>
          <p className="text-[#6B7280] text-[14px] leading-[1.8] max-w-200 mb-10">
            TAB Development Initiatives, spearheaded by Taopheek Babayeju
            (Powered by iCentra), aim to promote professional excellence,
            inclusivity, and community resilience in the global technology and
            management sector. These initiatives focus on bridging gaps in
            access to training, certifications, and professional development
            opportunities for both emerging and experienced project
            professionals, especially those from under-served communities.
          </p>

          {/* 3 initiative cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Project 1500 — deep navy */}
            <div className="bg-[#1A274F] rounded-2xl p-7 flex flex-col gap-4 min-h-90">
              <h3 className="text-white text-[26px] font-extrabold">
                Project 1500
              </h3>
              <p className="text-white/65 text-[13px] leading-relaxed flex-1">
                Project 1500 offers a free, comprehensive training for 1,500
                individuals focusing on Project Management, Agile methodologies,
                and Digital Transformation. Each participant will receive
                in-depth training on project management, agile methodologies,
                and digital transformation to ensure that anyone passionate
                about technology and management can benefit. Registration starts
                in January 2025.
              </p>
              <Link
                href="#"
                className="text-light-blue text-[13px] font-semibold hover:underline w-fit mt-auto"
              >
                Read more →
              </Link>
            </div>

            {/* Tosin Agetusin — primary blue */}
            <div className="bg-[#25429A] rounded-2xl p-7 flex flex-col gap-4 min-h-90">
              <div>
                <p className="text-white/55 text-[11px] font-semibold uppercase tracking-widest mb-1">
                  Tosin Agetusin
                </p>
                <h3 className="text-white text-[22px] font-extrabold leading-snug">
                  Certification Grant
                </h3>
              </div>
              <p className="text-white/65 text-[13px] leading-relaxed flex-1">
                The Tosin Agetusin Certification Grant honors the legacy of the
                late Mr. Tosin Agetusin — a true visionary in Nigeria and a
                passionate advocate for lifelong learning and knowledge-sharing.
                This grant provides career-ready professionals with the
                financial support needed to pursue new career milestones. This
                grant covers certification exam fees.
              </p>
              <Link
                href="#"
                className="text-light-blue text-[13px] font-semibold hover:underline w-fit mt-auto"
              >
                Read more →
              </Link>
            </div>

            {/* Fast-Track — bright blue */}
            <div className="bg-[#0066FF] rounded-2xl p-7 flex flex-col gap-4 min-h-90">
              <div>
                <p className="text-white/80 text-[11px] font-extrabold uppercase tracking-[0.22em] mb-2">
                  FAST-TRACK
                </p>
                <h3 className="text-white text-[20px] font-extrabold uppercase leading-tight">
                  TO A CAREER
                  <br />
                  IN BUSINESS
                </h3>
              </div>
              <p className="text-white/80 text-[13px] leading-relaxed flex-1">
               {` The Career Fast Track initiative is designed to help
                professionals elevate their careers through access to iCentra's
                industry-specific skills training. Whether you seek IT, project
                management, or agile certifications, we have a course that fits
                your needs. This programme supports your road to world-class
                career outcomes.`}
              </p>
              <Link
                href="#"
                className="text-white text-[13px] font-semibold hover:underline w-fit mt-auto"
              >
                Read more →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          9. BECOME A VOLUNTEER — centered dark CTA
      ══════════════════════════════════════════════ */}
      <section className="bg-[#1A274F] py-16 lg:py-24">
        <div className="flex flex-col items-center text-center gap-5 px-6">
          <h2 className="text-white text-[26px] lg:text-[36px] font-extrabold leading-tight max-w-120">
            Become a Volunteer
          </h2>
          <p className="text-white/60 text-[14px] leading-relaxed max-w-100">
            Here is an opportunity to make a difference in the lives of people.
          </p>
          <Link
            href="/volunteer"
            className="inline-flex items-center px-8 py-3.5 rounded-full bg-[#0066FF] text-white text-[14px] font-semibold hover:bg-light-blue hover:text-[#1A274F] transition-colors mt-2"
          >
            Continue Here
          </Link>
        </div>
      </section>
    </main>
  );
}
