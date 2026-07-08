import ServiceCard from "@/components/ui/cards/service-card";
import Image from "next/image";
import Link from "next/link";

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const iceSteps = [
  {
    icon: "identify",
    label: "We Identify\nOur Clients\nNeed",
  },
  {
    icon: "commit",
    label: "We Commit\nour Expertise",
  },
  {
    icon: "execute",
    label: "We Execute\nwith Excellence",
  },
];

const solutionCards = [
  {
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=700&q=80",
    category: "Enterprise Transformation",
    title: "Utilize Innovation For Improved Value Delivery",
    activeTitle: "Enterprise Transformation",
    items: [
      "AI & Intelligent Automation",
      "Digital Transformation",
      "Organizational Transformation",
      "Agile Transformation",
    ],
    href: "/solutions/enterprise-transformation",
  },
  {
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=700&q=80",
    category: "Cybersecurity & GRC",
    title: "Mitigate Business Challenges Seamlessly",
    activeTitle: "Cybersecurity & GRC",
    items: [
      "Security Operations",
      "Risk & Compliance",
      "Identity Management",
      "Incident Response",
    ],
    href: "/solutions/cybersecurity-grc",
  },
  {
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=700&q=80",
    category: "Strategy & Execution",
    title: "Achieve Your Objectives With Strategic Goals",
    activeTitle: "Strategy & Execution",
    items: [
      "Portfolio Management",
      "Programme Delivery",
      "Change Management",
      "Benefits Realisation",
    ],
    href: "/solutions/strategy-execution",
  },
  {
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=80",
    category: "Learning & Talent",
    title: "Accelerate Your Growth With Refined Knowledge",
    activeTitle: "Learning & Talent",
    items: [
      "Leadership Development",
      "Digital Skills Training",
      "Certification Programmes",
      "Coaching & Mentoring",
    ],
    href: "/solutions/learning-talent",
  },
];

/* ─────────────────────────────────────────
   ICE PROCESS ICONS — inline SVG
───────────────────────────────────────── */
function IceIcon({ type }: { type: string }) {
  if (type === "identify") {
    return (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5M4 9a8 8 0 0114-4M20 15a8 8 0 01-14 4" />
      </svg>
    );
  }
  if (type === "commit") {
    return (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={1.8}>
        <circle cx="12" cy="12" r="9" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 3" />
      </svg>
    );
  }
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 19l14-14M19 5h-6M19 5v6" />
    </svg>
  );
}

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
export default function OurSolutionsPage() {
  return (
    <main className="w-full overflow-x-hidden">

      {/* ══════════════════════════════════════
          1. HERO — gradient navy + ghost watermark
      ══════════════════════════════════════ */}
      <section className="relative bg-gradient-to-br from-[#0B1B4D] via-[#16266E] to-[#1E3A8A] overflow-hidden">
        {/* Ghost watermark text */}
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-end pr-10 pointer-events-none select-none"
        >
          <span
            className="text-white/[0.05] text-[160px] lg:text-[220px] font-black italic whitespace-nowrap"
            style={{ writingMode: "horizontal-tb" }}
          >
            Solution
          </span>
        </div>

        {/* Subtle radial glow */}
        <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-[#0066FF]/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-[1280px] mx-auto px-6 pt-20 pb-16 lg:pt-24 lg:pb-20">
          <h1 className="text-white text-[36px] sm:text-[46px] lg:text-[58px] font-extrabold leading-[1.08] max-w-[920px] mb-5">
            Empower Organizational<br />
            Excellence: iCentra Solutions
          </h1>

          {/* Cyan underline accent */}
          <div className="w-[110px] h-[4px] rounded-full bg-[#00DBFF] mb-7" />

          <div className="max-w-[860px] flex flex-col gap-4">
            <p className="text-white/75 text-[14px] lg:text-[15px] leading-[1.8]">
              iCentra offers a holistic suite of transformative services designed to propel
              organizations toward sustainable success we provide integrated solutions that
              address the complex challenges of modern businesses.
            </p>
            <p className="text-white/75 text-[14px] lg:text-[15px] leading-[1.8]">
              We are strategic partners who leverage deep expertise, cutting-edge technologies,
              and tailored methodologies to unlock your organization&apos;s full possibilities.
              Whether you&apos;re seeking digital innovation, robust cybersecurity, strategic
              alignment, or skill development, iCentra delivers comprehensive solutions that
              drive performance, mitigate risks, and create lasting value.
            </p>
            <p className="text-white/75 text-[14px] lg:text-[15px] leading-[1.8]">
              From reimagining business processes to implementing advanced technologies, from
              managing organizational change to building resilient security frameworks, we
              transform challenges into opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          2. OUR APPROACH — ICE process diagram
      ══════════════════════════════════════ */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-6">
          <h2 className="text-[#1A274F] text-[26px] lg:text-[32px] font-bold mb-3">
            <span className="relative inline-block">
              Our
              <span className="absolute -bottom-1 left-0 w-8 h-[3px] bg-[#0066FF] rounded-full" />
            </span>{" "}
            Approach
          </h2>
          <p className="text-[#374151] text-[15px] mb-10 max-w-[700px]">
            At iCentra, we address your organization&apos;s end-to-end business needs using the
            effective ICE Approach.
          </p>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center justify-between">

            {/* Left — text + CTA */}
            <div className="flex-1 min-w-0 max-w-[560px]">
              <p className="text-[#6B7280] text-[14px] leading-[1.8] mb-8">
                We will partner with you to drive transformation, create superior value, and
                optimize growth for enhanced performance. We provide tools and resources to
                align business strategies with the right technology solutions and equip clients
                with the capabilities to execute projects, programs, and portfolios effectively.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center px-7 py-3.5 rounded-full bg-[#0066FF] text-white text-[14px] font-semibold hover:bg-[#25429A] transition-colors"
              >
                Start Transformation
              </Link>
            </div>

            {/* Right — ICE step diagram */}
            <div className="flex items-center gap-1 sm:gap-3 shrink-0">
              {iceSteps.map((step, i) => (
                <div key={step.label} className="flex items-center gap-1 sm:gap-3">
                  {/* Circle node */}
                  <div className="flex flex-col items-center justify-center w-[110px] h-[110px] sm:w-[130px] sm:h-[130px] rounded-full bg-gradient-to-br from-[#1A274F] to-[#25429A] shrink-0 text-center px-3 shadow-lg">
                    <IceIcon type={step.icon} />
                    <span className="text-white text-[11px] sm:text-[12px] font-semibold leading-snug mt-2 whitespace-pre-line">
                      {step.label}
                    </span>
                  </div>
                  {/* Arrow connector — not after last item */}
                  {i < iceSteps.length - 1 && (
                    <svg className="w-6 sm:w-8 h-6 sm:h-8 text-[#60A5FA] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4 11h13.17l-5.59-5.59L13 4l8 8-8 8-1.41-1.41L17.17 13H4z" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          3. TECHNOLOGY & BUSINESS SOLUTIONS — ServiceCard ×4
      ══════════════════════════════════════ */}
      <section className="bg-white pb-20 lg:pb-24">
        <div className="max-w-[1280px] mx-auto px-6">
          <h2 className="text-[#1A274F] text-[26px] lg:text-[32px] font-bold mb-10 max-w-[700px]">
            Technology and Business Solutions That Deliver Impact
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {solutionCards.map((card) => (
              <div
                key={card.href}
                className="[&>a]:max-w-none [&>a]:w-full [&>a]:aspect-auto [&>a]:h-[400px]"
              >
                <ServiceCard
                  image={card.image}
                  category={card.category}
                  title={card.title}
                  activeTitle={card.activeTitle}
                  items={card.items}
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