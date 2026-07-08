import HeroSlider from "@/components/sections/home/hero-slider";
import DiscoverBanner from "@/components/ui/banner";
import BlogCard from "@/components/ui/cards/blog-card";
import SolutionCard from "@/components/ui/cards/solution-card";
import Image from "next/image";
import Link from "next/link";

/* ─────────────────────────────────────────
   TINY LOCAL PRIMITIVES
───────────────────────────────────────── */
function StarRating() {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          className="w-4 h-4 text-yellow-400 fill-current"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function CarouselArrows() {
  return (
    <div className="flex gap-2 shrink-0">
      {["left", "right"].map((d) => (
        <button
          key={d}
          aria-label={d === "left" ? "Previous" : "Next"}
          className="w-9 h-9 rounded-full border border-[#DCE0E8] flex items-center justify-center text-[#1A274F] hover:border-[#0066FF] hover:text-[#0066FF] transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={d === "left" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
            />
          </svg>
        </button>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const stats = [
  { value: "15+", label: "Years of Excellence" },
  { value: "5000+", label: "Clients Served" },
  { value: "99.9%", label: "Success Rate" },
];

const insightCards = [
  {
    image:
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80",
    title: "Strategy is disconnected from execution",
    date: "2nd Sep 2025",
    readTime: "2 min",
    href: "/blog/strategy-execution",
  },
  {
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
    title: "Workforce capability lags behind change",
    date: "2nd Sep 2025",
    readTime: "3 min",
    href: "/blog/workforce-capability",
  },
  {
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80",
    title: "Workforce capability lags behind change",
    date: "2nd Sep 2025",
    readTime: "3 min",
    href: "/blog/workforce-capability-2",
  },
  {
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80",
    title: "Workforce capability lags behind change",
    date: "2nd Sep 2025",
    readTime: "4 min",
    href: "/blog/workforce-capability-3",
  },
];

const solutionCards = [
  {
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    title: "Continuous Transformation",
    description:
      "We help organizations build the capability to continuously evolve — from strategy through to execution and beyond.",
    href: "/solutions/continuous-transformation",
  },
  {
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    title: "Solutions",
    description:
      "End-to-end technology and business solutions tailored to your sector's specific challenges and growth ambitions.",
    href: "/solutions",
  },
  {
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    title: "Platforms",
    description:
      "Scalable digital platforms that accelerate delivery, improve visibility, and create lasting competitive advantage.",
    href: "/solutions/platforms",
  },
];

const partners = [
  {
    name: "NRS",
    src: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=120&h=40&fit=crop&q=80",
  },
  {
    name: "NNPC",
    src: "https://images.unsplash.com/photo-1614680376408-16afefa3332b?w=120&h=40&fit=crop&q=80",
  },
  {
    name: "Microsoft",
    src: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=120&h=40&fit=crop&q=80",
  },
  {
    name: "NRS II",
    src: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=120&h=40&fit=crop&q=80",
  },
  {
    name: "Partner 5",
    src: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=120&h=40&fit=crop&q=80",
  },
  {
    name: "Partner 6",
    src: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=120&h=40&fit=crop&q=80",
  },
  {
    name: "Partner 7",
    src: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=120&h=40&fit=crop&q=80",
  },
  {
    name: "Partner 8",
    src: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=120&h=40&fit=crop&q=80",
  },
];

const projects = [
  {
    bgImage:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80",
    logoText: "NRS",
    title: "Journey to Information Security Excellence at NRS",
    desc: "iCentra's Information Technology Division (ITD) embarked on a transformative journey...",
    href: "#",
  },
  {
    bgImage:
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&q=80",
    logoText: "CSN",
    title: "Transforming Project Management at CSN",
    desc: "iCentra's Information Technology Division (ITD) embarked on a transformative journey...",
    href: "#",
  },
  {
    bgImage:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80",
    logoText: "NNPC",
    title: "Driving Agile Transformation at NNPC Limited IT Division",
    desc: "iCentra's Information Technology Division (ITD) embarked on a transformative journey...",
    href: "#",
  },
  {
    bgImage:
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&q=80",
    logoText: "CSN",
    title: "Transforming Project Management at CSN",
    desc: "iCentra's Information Technology Division (ITD) embarked on a transformative journey...",
    href: "#",
  },
];

const testimonials = [
  {
    name: "Crystal Maiden",
    role: "Product Manager",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80",
    text: "This is incredibly helpful for our team. The attention to detail and quality is very amazing. I highly recommend it for any type of project.",
  },
  {
    name: "Dazzle Maker",
    role: "Creative Director",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80",
    text: "I've used other firms, but this one is the best. The attention to detail and quality is very amazing for all designs. Highly recommend for any project.",
  },
  {
    name: "Crystal Maiden",
    role: "UX Designer",
    avatar:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=80&q=80",
    text: "This kit is incredibly helpful for my design process. Components are clean, modern, and save me a lot of time for beginners and experienced alike.",
  },
];

const blogCards = [
  {
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
    title: "The New Operating Model for Performance",
    date: "2nd Sep 2025",
    readTime: "2 min",
    href: "/blog/operating-model",
  },
  {
    image:
      "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=600&q=80",
    title: "AI & Cybersecurity Governance: Getting Leadership Buy-In",
    date: "2nd Sep 2025",
    readTime: "3 min",
    href: "/blog/ai-governance",
  },
  {
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80",
    title: "5 AI Driven Threats Organizations Can't Ignore in 2025",
    date: "2nd Sep 2025",
    readTime: "3 min",
    href: "/blog/ai-threats",
  },
  {
    image:
      "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=600&q=80",
    title: "AI & Cybersecurity Governance: Getting Leadership Buy-In",
    date: "2nd Sep 2025",
    readTime: "3 min",
    href: "/blog/ai-governance",
  },
];

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
export default function HomePage() {
  return (
    <main className="w-full overflow-x-hidden">
      {/* ══════════════════════════════════════
          1. HERO
      ══════════════════════════════════════ */}
      <section className="relative bg-[#1A274F] overflow-hidden">
        {/* Decorative concentric rings — right side */}
        {/* <div className="absolute right-0 top-0 w-[520px] h-[520px] pointer-events-none overflow-hidden">
          {[0,1,2,3,4,5,6].map((i) => (
            <div
              key={i}
              className="absolute rounded-full border border-[#0066FF]/30"
              style={{ inset: `${i * 38}px` }}
            />
          ))}
          <div className="absolute right-[80px] top-[80px] w-10 h-10 rounded-full bg-[#00DBFF]/40 blur-xl" />
        </div>

        <div className="relative z-10 max-w-[1280px] mx-auto px-6 pt-20 pb-0 lg:pt-24">
          <div className="max-w-[580px] pb-16">
            <h1 className="text-white text-[36px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.1] mb-5">
              Transforming Organizations
              <br />and People for{" "}
              <span className="text-[#00DBFF]">Excellent Performance</span>
            </h1>
            <p className="text-white/60 text-[14px] lg:text-[15px] leading-relaxed max-w-[420px] mb-8">
              We help enterprises strengthen strategy, secure operations, optimize talent, and execute transformation programs that deliver measurable business results.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#0066FF] text-white font-semibold text-[14px] hover:bg-[#00DBFF] hover:text-[#1A274F] transition-colors"
            >
              Start Transformation
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div> */}
        <HeroSlider />
        {/* Stats bar — white strip at bottom of hero */}
        <div className="relative z-10 bg-main">
          <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-3 divide-x divide-[#DCE0E8]">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center px-4">
                <span className="text-white text-[28px] lg:text-[38px] font-extrabold leading-none">
                  {s.value}
                </span>
                <span className="text-white/60 text-[11px] lg:text-[13px] mt-1 text-center">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          2. TRANSFORMATION INSIGHTS — BlogCard
      ══════════════════════════════════════ */}
      <section className="bg-white py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-[#1A274F] text-[22px] lg:text-[28px] font-bold">
              Transformation Insights
            </h2>
            <CarouselArrows />
          </div>

          {/* 4 BlogCards — remove their max-w so they fill the grid column */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {insightCards.map((card) => (
              <div
                key={card.href}
                className="[&>div]:max-w-none [&>div]:w-full"
              >
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

      {/* ══════════════════════════════════════
          3. TECHNOLOGY & BUSINESS SOLUTIONS — SolutionCard
      ══════════════════════════════════════ */}
      <section className="bg-white pb-14 lg:pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-[#1A274F] text-[22px] lg:text-[28px] font-bold mb-8">
            Technology and Business Solutions That Deliver Impact
          </h2>
          {/* 3 SolutionCards — equal columns, fixed height */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {solutionCards.map((s) => (
              <div
                key={s.href}
                className="[&>a]:max-w-none [&>a]:w-full [&>a]:h-95"
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
          4. OUR TRUSTED PARTNERS
      ══════════════════════════════════════ */}
      <section className="bg-white border-t border-[#DCE0E8] py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-[#1A274F] text-[22px] lg:text-[28px] font-bold mb-1">
            Our Trusted Partners
          </h2>
          <p className="text-[#4B6CB7] text-[13px] mb-8">
            Proudly collaborating with global standards organizations and
            technology leaders.
          </p>
          {/* Logo row — horizontal scroll on mobile */}
          <div className="flex flex-wrap items-center gap-8 lg:gap-12">
            {partners.map((p) => (
              <div
                key={p.name}
                className="relative h-8 w-22.5 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
              >
                <Image
                  src={p.src}
                  alt={p.name}
                  fill
                  className="object-contain"
                  sizes="90px"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          5. HIGHLIGHTED TRANSFORMATION PROJECTS
      ══════════════════════════════════════ */}
      <section className="bg-[#F7F9FC] py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-[#1A274F] text-[22px] lg:text-[28px] font-bold">
              Highlighted Transformation Projects
            </h2>
            <CarouselArrows />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {projects.map((p) => (
              <div key={p.href} className="[&>div]:max-w-none [&>div]:w-full">
                <BlogCard
                  image={p.bgImage}
                  title={p.title}
                  // date={p.date}
                  href={p.href}
                  excerpt={p.desc}
                />
              </div>
              // <div key={p.title} className="bg-white rounded-2xl overflow-hidden border border-[#DCE0E8] flex flex-col">
              //   {/* Image area with logo overlay */}
              //   <div className="relative h-[180px] overflow-hidden bg-[#EAF3FB]">
              //     <Image
              //       src={p.bgImage}
              //       alt={p.title}
              //       fill
              //       className="object-cover opacity-30"
              //       sizes="400px"
              //     />
              //     <div className="absolute inset-0 bg-[#1A274F]/30" />
              //     <div className="absolute inset-0 flex items-center justify-center">
              //       <span className="text-white text-[32px] font-extrabold tracking-widest drop-shadow-md">
              //         {p.logoText}
              //       </span>
              //     </div>
              //   </div>
              //   {/* Text content */}
              //   <div className="p-5 flex flex-col flex-1 gap-2">
              //     <h3 className="text-[#1A274F] text-[14px] font-semibold leading-snug">{p.title}</h3>
              //     <p className="text-[#4B6CB7] text-[13px] leading-relaxed flex-1">{p.desc}</p>
              //     <div className="mt-3">
              //       <Link
              //         href={p.href}
              //         className="inline-flex items-center px-5 py-2 rounded-full bg-[#0066FF] text-white text-[13px] font-medium hover:bg-[#25429A] transition-colors"
              //       >
              //         Read More
              //       </Link>
              //     </div>
              //   </div>
              // </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          6. DISCOVER iCENTRA — CTA BANNER
      ══════════════════════════════════════ */}
     
      <DiscoverBanner
        headline={"Discover iCentra.\nExplore Our Expertise."}
        subtext="Learn how we help organizations achieve measurable results through innovation and strategy."
        primaryCta={{ label: "Download Brochure", href: "/brochure" }}
        secondaryCta={{ label: "Explore Capabilities", href: "/capabilities" }}
        image="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80" imageAlt={"Banner Image"}      />

      {/* ══════════════════════════════════════
          7. WHAT OUR CLIENT SAY ABOUT US
      ══════════════════════════════════════ */}
      <section className="bg-white py-14 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-6">
          <h2 className="text-[#1A274F] text-[22px] lg:text-[28px] font-bold mb-10">
            What Our{" "}
            <span className="relative inline-block">
              Client
              <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-[#0066FF] rounded-full" />
            </span>{" "}
            Say About Us
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-[#F7F9FC] rounded-2xl p-6 flex flex-col gap-4 border border-[#DCE0E8]"
              >
                <StarRating />
                <p className="text-[#1A274F]/70 text-[13px] leading-relaxed flex-1">
                 {` "{t.text}"`}
                </p>
                <div className="flex items-center gap-3 pt-3 border-t border-[#DCE0E8]">
                  <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0 bg-[#A8B8F8]">
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      fill
                      className="object-cover"
                      sizes="36px"
                    />
                  </div>
                  <div>
                    <p className="text-[#1A274F] text-[13px] font-semibold">
                      {t.name}
                    </p>
                    <p className="text-[#4B6CB7] text-[11px]">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          8. THOUGHT LEADERSHIP BANNER
      ══════════════════════════════════════ */}
      <DiscoverBanner
        headline={"Thought Leadership for a Changing World\n"}
        subtext="Stay ahead with expert insights on transformation, cybersecurity, and performance delivery."
        primaryCta={{ label: "Explore Insights", href: "/insights" }}
        // secondaryCta={{ label: "Explore Capabilities", href: "/capabilities" }}
        image="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80" imageAlt={"Baner Image"}      />
     

      {/* ══════════════════════════════════════
          9. STAY UPDATED — BLOGS & NEWS — BlogCard
      ══════════════════════════════════════ */}
      <section className="bg-white py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-[#1A274F] text-[22px] lg:text-[28px] font-bold mb-2">
            <span className="relative inline-block">
              Stay
              <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-[#0066FF] rounded-full" />
            </span>{" "}
            Updated with Resources, Blogs &amp; News
          </h2>
          <p className="text-[#4B6CB7] text-[13px] mt-4 mb-10">
            Get the latest insights, expert articles, and company updates all in
            one place.
          </p>

          {/* 3 BlogCards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {blogCards.map((b) => (
              <div key={b.href} className="[&>div]:max-w-none [&>div]:w-full">
                <BlogCard
                  image={b.image}
                  title={b.title}
                  date={b.date}
                  readTime={b.readTime}
                  href={b.href}
                />
              </div>
            ))}
          </div>

          {/* See More CTA */}
          <div className="flex justify-center mt-12">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border-2 border-[#0066FF] text-[#0066FF] text-[14px] font-semibold hover:bg-[#0066FF] hover:text-white transition-colors"
            >
              See More
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
