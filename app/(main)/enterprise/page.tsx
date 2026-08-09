import SolutionCard from "@/components/ui/cards/solution-card";
import PageHero from "@/components/ui/page-hero";
import SectionHeading from "@/components/ui/section-heading";
import Link from "next/link";

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const subServices = [
  {
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=700&q=80",
    title: "AI & Intelligent Automation",
    description:
      "We help organizations design and deploy AI and automation solutions that streamline operations, reduce costs, and unlock new levels of productivity across business functions.",
    href: "/what-we-do/solutions",
  },
  {
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=700&q=80",
    title: "Digital Transformation",
    description:
      "From digital strategy to full-scale implementation, we guide organizations through the complexities of digital change — modernizing systems, processes, and people.",
    href: "/what-we-do/solutions",
  },
  {
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&q=80",
    title: "Organizational Transformation",
    description:
      "We partner with leadership teams to redesign organizational structures, cultures, and operating models that support sustained performance and adaptability.",
    href: "/what-we-do/solutions",
  },
  {
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=700&q=80",
    title: "Agile Transformation",
    description:
      "We build agile capabilities across your enterprise — helping teams deliver faster, respond to change, and continuously improve through proven frameworks and coaching.",
    href: "/what-we-do/solutions",
  },
];

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
export default function EnterpriseTransformationPage() {
  return (
    <main className="w-full overflow-x-hidden">

      {/* ══════════════════════════════════════
          1. HERO — PageHero (reused)
      ══════════════════════════════════════ */}
      <PageHero
        headline="Enterprise Transformation"
        subtext="Building robust and sustainable institutions requires a culture of excellence and continuous innovation. At iCentra, we partner with you to provide insights and solutions that drive value across your business value chain, fueling growth and enhancing performance."
      />

      {/* ══════════════════════════════════════
          2. HOW WE DO IT — 4 SolutionCards
      ══════════════════════════════════════ */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-6">

          {/* Heading */}
          <SectionHeading title="How We Do It" className="mb-4" />
          <p className="text-[#374151] text-[14px] lg:text-[15px] leading-[1.8] max-w-[860px] mb-12">
            At iCentra, we understand that transformation is not a one-size-fits-all journey.
            Our experts work collaboratively with clients to develop tailored, innovative solutions
            designed to optimize business performance and create lasting impact.
          </p>

          {/* 4 SolutionCards — equal columns, fixed height, no max-w */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {subServices.map((s) => (
              <div
                key={s.href}
                className="[&>a]:max-w-none [&>a]:w-full [&>a]:aspect-auto [&>a]:h-[340px]"
              >
                <SolutionCard
                  image={s.image}
                  title={s.title}
                  description={s.description}
                  href={s.href}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          3. WHY CHOOSE iCENTRA? — dark navy centered CTA
      ══════════════════════════════════════ */}
      <section className="relative bg-[#1A274F] overflow-hidden py-20 lg:py-28">
        {/* Dot / circle texture overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ opacity: 0.1 }}
        >
          <svg
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <pattern
                id="whyDots"
                x="0" y="0" width="68" height="68"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="34" cy="34" r="28" fill="none" stroke="white" strokeWidth="1.5" />
                <circle cx="0"  cy="0"  r="28" fill="none" stroke="white" strokeWidth="1.5" />
                <circle cx="68" cy="0"  r="28" fill="none" stroke="white" strokeWidth="1.5" />
                <circle cx="0"  cy="68" r="28" fill="none" stroke="white" strokeWidth="1.5" />
                <circle cx="68" cy="68" r="28" fill="none" stroke="white" strokeWidth="1.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#whyDots)" />
          </svg>
        </div>

        <div className="relative z-10 max-w-[760px] mx-auto px-6 flex flex-col items-center text-center gap-5">
          <h2 className="text-white text-[28px] lg:text-[40px] font-extrabold leading-tight">
            Why Choose iCentra?
          </h2>
          <p className="text-white/65 text-[14px] lg:text-[15px] leading-[1.8] max-w-[680px]">
            Our transformation solutions are designed to help organizations evolve, innovate,
            and excel. By leveraging tailored strategies and cutting-edge tools, we empower
            businesses to achieve their goals, stay competitive, and create a lasting legacy
            of success.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-3.5 rounded-full bg-[#0066FF] text-white text-[14px] font-semibold hover:bg-[#00DBFF] hover:text-[#1A274F] transition-colors mt-2"
          >
            Get in Touch
          </Link>
        </div>
      </section>

    </main>
  );
}