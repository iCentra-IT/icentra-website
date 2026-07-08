import BlogCard from "@/components/ui/cards/blog-card";
import PageHero from "@/components/ui/page-hero";
import Image from "next/image";
import Link from "next/link";


/* ─────────────────────────────────────────
   TYPE DEFINITIONS — reusable for any case study
───────────────────────────────────────── */

/* ─────────────────────────────────────────
   RELATED CASE STUDIES DATA
───────────────────────────────────────── */
const relatedCaseStudies = [
  {
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80",
    title: "Journey to Information Security Excellence at NRS",
    date: "2nd Sep 2025",
    readTime: "3 min",
    href: "/case-studies/nrs-information-security",
  },
  {
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&q=80",
    title: "Transforming Project Management at CBN",
    date: "2nd Sep 2025",
    readTime: "3 min",
    href: "/case-studies/cbn-project-management",
  },
  {
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80",
    title: "Driving Agile Transformation at NNPC Limited IT Division.",
    date: "2nd Sep 2025",
    readTime: "3 min",
    href: "/case-studies/nnpc-agile-transformation",
  },
];

/* ─────────────────────────────────────────
   PROSE HELPERS
───────────────────────────────────────── */
function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[#1A274F] text-[20px] lg:text-[22px] font-extrabold mt-10 mb-3 leading-snug">
      {children}
    </h2>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[#1A274F] text-[16px] lg:text-[17px] font-bold mt-6 mb-2 leading-snug">
      {children}
    </h3>
  );
}

function H4({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="text-[#1A274F] text-[14px] font-bold mt-4 mb-1.5">
      {children}
    </h4>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[#374151] text-[14px] lg:text-[15px] leading-[1.85]">
      {children}
    </p>
  );
}

function BulletList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="flex flex-col gap-2 my-3 pl-1">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 text-[#374151] text-[14px] lg:text-[15px] leading-[1.8]">
          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#374151] shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function NumberedList({ items }: { items: { title: string; bullets: string[] }[] }) {
  return (
    <ol className="flex flex-col gap-5 my-4">
      {items.map((item, i) => (
        <li key={i}>
          <p className="text-[#1A274F] text-[14px] font-bold mb-1.5">
            {i + 1}. {item.title}
          </p>
          <BulletList items={item.bullets} />
        </li>
      ))}
    </ol>
  );
}

function BoldBulletList({ items }: { items: { label: string; text: string }[] }) {
  return (
    <ul className="flex flex-col gap-2.5 my-3">
      {items.map((item) => (
        <li key={item.label} className="flex items-start gap-2.5 text-[14px] lg:text-[15px] leading-[1.8]">
          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#374151] shrink-0" />
          <span>
            <strong className="text-[#1A274F] font-semibold">{item.label}</strong>
            {item.text && ` – ${item.text}`}
          </span>
        </li>
      ))}
    </ul>
  );
}

/* ─────────────────────────────────────────
   PAGE — NNPC Agile Transformation Case Study
   (Replace content for other case studies)
───────────────────────────────────────── */
export default function CaseStudyPage() {
  return (
    <main className="w-full overflow-x-hidden">

      {/* ══════════════════════════════════════
          1. HERO — PageHero with date + tag below
      ══════════════════════════════════════ */}
      <div className="relative">
        <PageHero
          headline={"Driving Agile Transformation at\nNNPC Limited IT Division"}
        >
          {/* Date + category tag */}
          <div className="flex items-center gap-3 text-white/70 text-[13px]">
            <span>January 18, 2026.</span>
            <Link
              href="/case-studies"
              className="text-[#00DBFF] hover:text-white underline underline-offset-2 transition-colors"
            >
              Case study
            </Link>
          </div>
        </PageHero>
      </div>

      {/* ══════════════════════════════════════
          2. HERO IMAGE — full-width client banner
      ══════════════════════════════════════ */}
      <div className="w-full max-w-[1280px] mx-auto px-6 -mt-2 pb-2">
        <div className="relative w-full h-[260px] sm:h-[340px] lg:h-[420px] rounded-2xl overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&q=80"
            alt="NNPC Limited IT Division"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-[#1A274F]/40" />
          {/* Client logo overlay — bottom right */}
          <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm rounded-xl px-5 py-3 flex items-center gap-2">
            <span className="text-[#1A274F] text-[18px] font-extrabold tracking-widest">NNPC</span>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          3. ARTICLE BODY — long-form content
      ══════════════════════════════════════ */}
      <article className="max-w-[860px] mx-auto px-6 py-12 lg:py-16">

        {/* Executive Summary */}
        <H2>Executive Summary</H2>
        <P>
          NNPC Limited&apos;s Information Technology Division (ITD) embarked on a transformative journey
          to modernize its delivery approach and strengthen alignment with the business. Facing long
          delivery cycles, siloed teams, and limited visibility into project progress, ITD partnered
          with iCentra to introduce agile ways of working. Through leadership coaching, pilot teams,
          and structured agile adoption, the division achieved significant improvements in delivery
          speed, collaboration, and overall stakeholder satisfaction.
        </P>

        {/* Background */}
        <H2>Background</H2>

        <H3>Organizational Context</H3>
        <P>
          As a strategic national energy corporation, NNPC Limited plays a critical role in advancing
          Nigeria&apos;s energy security and economic development. With the organization undergoing broader
          transformation, the IT Division needed to evolve its operating model to:
        </P>
        <BulletList items={[
          "Deliver digital initiatives faster and with greater efficiency",
          "Strengthen collaboration between IT and business stakeholders",
          "Build an adaptive culture capable of responding to emerging needs",
        ]} />

        <H3>Initial Challenge</H3>
        <P>Prior to the intervention, ITD faced:</P>
        <BulletList items={[
          "Long delivery cycles and delays in digital projects",
          "Siloed teams with limited collaboration across functions",
          "Poor visibility into project progress and outcomes",
          "Growing demand for improved responsiveness to business priorities",
        ]} />

        {/* Project Approach */}
        <H2>Project Approach</H2>

        <H3>Partnership with iCentra</H3>
        <P>
          In alignment with NNPC&apos;s transformation agenda, ITD partnered with iCentra to drive an
          Agile Transformation program. The engagement focused on two key workstreams:
        </P>
        <div className="flex flex-col gap-2 my-3 pl-1">
          <p className="text-[#374151] text-[14px] leading-[1.8]">
            <strong className="text-[#1A274F]">a. Leadership Enablement</strong> – Coaching IT and
            business leaders to adopt agile mindsets and practices.
          </p>
          <p className="text-[#374151] text-[14px] leading-[1.8]">
            <strong className="text-[#1A274F]">b. Delivery Enablement</strong> – Supporting pilot teams
            to apply agile frameworks, demonstrate value, and scale adoption.
          </p>
        </div>

        <H4>Key Project Milestones</H4>
        <BoldBulletList items={[
          { label: "Launch of Agile Coaching Program", text: "Targeted sessions for executives, managers, and team leads." },
          { label: "Formation of Pilot Agile Teams", text: "Cross-functional teams structured to deliver iterative value." },
          { label: "Implementation of Agile Ceremonies", text: "Including sprint planning, daily stand-ups, and reviews to improve transparency and collaboration." },
          { label: "Adoption of Agile Metrics", text: "Enhanced visibility into progress, productivity, and outcomes." },
        ]} />

        {/* Implementation Process */}
        <H2>Implementation Process</H2>
        <NumberedList items={[
          {
            title: "Diagnostic & Readiness Assessment",
            bullets: [
              "Evaluation of ITD's current delivery model and cultural readiness for agility",
              "Identification of key gaps and opportunities for transformation",
            ],
          },
          {
            title: "Leadership & Culture Shift",
            bullets: [
              "Executive and management coaching to embed agile leadership behaviors",
              "Change management initiatives to build buy-in and reduce resistance",
            ],
          },
          {
            title: "Pilot Agile Teams",
            bullets: [
              "Formation of cross-functional teams to test and demonstrate agile practices",
              "Deployment of agile ceremonies and tools for improved collaboration",
            ],
          },
          {
            title: "Scaling & Continuous Improvement",
            bullets: [
              "Expansion of agile adoption across more ITD teams",
              "Ongoing coaching, retrospectives, and refinements to sustain momentum",
            ],
          },
        ]} />

        {/* Outcomes and Impact */}
        <H2>Outcomes and Impact</H2>

        <H3>Organizational Benefits</H3>
        <BulletList items={[
          "50% reduction in time-to-delivery for key digital initiatives",
          "Enhanced transparency and alignment between IT and business stakeholders",
          "Establishment of cross-functional agile teams delivering incremental value",
          "Improved morale and a culture of continuous improvement among ITD teams",
        ]} />

        <H3>Sustainability and Excellence</H3>
        <P>
          By embedding agile principles into its operating model, NNPC ITD has created a culture of
          responsiveness and adaptability. The transformation has positioned IT as a true partner to
          the business, capable of delivering at speed and scale in alignment with organizational priorities.
        </P>

        {/* Conclusion */}
        <H2>Conclusion</H2>
        <P>
          The collaboration between NNPC Limited IT Division and iCentra demonstrates how agile
          transformation can accelerate digital delivery and drive cultural change within a large,
          complex organization. The success of this initiative highlights the importance of leadership
          commitment, structured coaching, and phased adoption in achieving sustainable transformation.
        </P>

        <H4>Key Lessons Learned</H4>
        <ol className="flex flex-col gap-2 my-3 pl-1 list-none">
          {[
            "Leadership sponsorship and mindset shifts are critical to embedding agility.",
            "Pilot teams serve as effective change agents for demonstrating value and building momentum.",
            "Continuous improvement and coaching sustain transformation beyond initial adoption.",
          ].map((lesson, i) => (
            <li key={i} className="flex items-start gap-2.5 text-[#374151] text-[14px] leading-[1.8]">
              <span className="shrink-0 text-[#1A274F] font-semibold min-w-[18px]">{i + 1}.</span>
              <span>{lesson}</span>
            </li>
          ))}
        </ol>

        <H3>Future Outlook</H3>
        <P>
          Building on the success of the Agile Transformation program, NNPC ITD aims to scale agile
          practices across more teams and functions. With continued partnership from iCentra, the
          division is well-positioned to extend agility enterprise-wide, supporting NNPC&apos;s broader
          transformation journey.
        </P>

      </article>

      {/* ══════════════════════════════════════
          4. RELATED CASE STUDIES — BlogCard ×3
      ══════════════════════════════════════ */}
      <section className="bg-white border-t border-[#E5E7EB] py-14 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-6">
          <h2 className="text-[#1A274F] text-[24px] lg:text-[30px] font-bold mb-10">
            Related CaseStudy
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedCaseStudies.map((card) => (
              <div key={card.href} className="[&>div]:max-w-none [&>div]:w-full">
                <BlogCard
                  image={card.image}
                  title={card.title}
                  date={card.date}
                  readTime={card.readTime}
                  href={card.href}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}