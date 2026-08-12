import type { Metadata } from "next";
import BlogCard from "@/components/ui/cards/blog-card";
import PageHero from "@/components/ui/page-hero";
import SectionHeading from "@/components/ui/section-heading";
import { BlogCardCarousel } from "@/components/ui/carousel/blog-card-carousel";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/motion/reveal";
import { sanityFetch } from "@/sanity/lib/live";
import { postImageUrl } from "@/sanity/lib/image";
import { POSTS_BY_CATEGORY_QUERY } from "@/sanity/lib/queries";
import { formatPostDate, estimateReadTimeFromText } from "@/sanity/lib/format";
import { pageMetadata } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = pageMetadata({
  title: "Cybersecurity & GRC",
  description:
    "iCentra helps organizations build resilient, adaptive cybersecurity postures — risk assessment, threat detection, security architecture, and governance, risk & compliance.",
  path: "/what-we-do/solutions/cybersecurity",
});

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const services = [
  {
    title: "Cyber Risk Assessment & Strategy",
    desc: "We identify vulnerabilities, assess your risk exposure, and create a practical, business-aligned roadmap to strengthen your security posture.",
  },
  {
    title: "Threat Detection & Incident Response",
    desc: "We implement 24/7 threat monitoring, incident response playbooks, and threat intelligence systems to detect and respond in real time.",
  },
  {
    title: "Security Architecture & Implementation",
    desc: "We design and deploy secure IT infrastructure, applications, and cloud environments that meet your business and compliance requirements.",
  },
  {
    title: "Vulnerability & Penetration Testing",
    desc: "We proactively test your networks, applications, and systems to identify and fix weaknesses before attackers exploit them.",
  },
  {
    title: "Security Information & Event Management (SIEM)",
    desc: "We deploy advanced SIEM platforms that centralize event data, provide real-time alerts, and deliver deep visibility across your environment.",
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Assess & Identify",
    desc: "We begin with a full assessment of your current security posture, technology stack, and regulatory gaps.",
  },
  {
    step: "02",
    title: "Design & Plan",
    desc: "We craft a prioritized cybersecurity roadmap tailored to your business needs and risk appetite.",
  },
  {
    step: "03",
    title: "Implement & Monitor",
    desc: "We deploy leading security tools, integrate controls, and establish real-time monitoring and incident response.",
  },
  {
    step: "04",
    title: "Train & Evolve",
    desc: "We strengthen your people through awareness training, simulate threats, and ensure your defenses evolve with the threat landscape.",
  },
];

const testimonials = [
  {
    name: "Crystal Maiden",
    role: "UX Designer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80",
    stars: 5,
    text: "This is but this one is the best. The attention to detail and quality is truly amazing for all designers. I highly recommend it for any type of project.",
  },
  {
    name: "Dazzle Healer",
    role: "Front End Developer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80",
    stars: 5,
    text: "I've used other kits, but this one is the best. The attention to detail and usability are truly amazing for all designers. I highly recommend it for any type of project.",
  },
  {
    name: "Crystal Maiden",
    role: "UX/UI Designer",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=80&q=80",
    stars: 5,
    text: "This UI kit is incredibly helpful for my design process. Components are clean, modern, and save me a lot of time for beginners and professionals alike.",
  },
];

/* ─────────────────────────────────────────
   STAR RATING
───────────────────────────────────────── */
function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────
   SHARED CTA BUTTON
───────────────────────────────────────── */
function ConsultationBtn({ href = "/contact" }: { href?: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center px-7 py-3 rounded-full bg-[#0066FF] text-white text-[14px] font-semibold hover:bg-[#00DBFF] hover:text-[#1A274F] transition-colors"
    >
      Schedule a Consultation
    </Link>
  );
}

type SanityImage = { asset?: { _ref: string } } | null | undefined;

type RawPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  mainImage?: SanityImage;
  publishedAt: string;
  plainBody?: string;
};

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
export default async function CybersecurityPage() {
  const [{ data: caseStudyPosts }, { data: insightPosts }] = await Promise.all([
    sanityFetch({ query: POSTS_BY_CATEGORY_QUERY, params: { slug: "case-study" } }),
    sanityFetch({ query: POSTS_BY_CATEGORY_QUERY, params: { slug: "cybersecurity" } }),
  ]);

  const caseStudyItems = ((caseStudyPosts ?? []) as RawPost[]).slice(0, 6).map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    imageUrl: postImageUrl(post.mainImage),
    date: formatPostDate(post.publishedAt),
    readTime: estimateReadTimeFromText(post.plainBody),
    href: `/industry/case-study/${post.slug}`,
  }));

  const insightItems = ((insightPosts ?? []) as RawPost[]).slice(0, 3);

  return (
    <main className="w-full overflow-x-hidden">

      {/* ══════════════════════════════════════
          1. HERO — PageHero + bg photo + CTA link
      ══════════════════════════════════════ */}
      <div className="relative">
        {/* Background photo layer */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=1600&q=80"
            alt=""
            fill
            className="object-cover opacity-20"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1B4D]/95 via-[#16266E]/85 to-[#1A274F]/60" />
        </div>
        <div className="relative z-10">
          <PageHero
            headline={"Secure Today. Safeguard\nTomorrow"}
            subtext="Protecting your business against evolving threats in a digital world."
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-[#00DBFF] text-[14px] font-semibold group"
            >
              <span className="border-b border-[#00DBFF]/50 group-hover:border-[#00DBFF] transition-colors">
                Schedule a Consultation
              </span>
              <span className="w-7 h-7 rounded-full bg-[#0066FF] flex items-center justify-center group-hover:bg-[#00DBFF] transition-colors shrink-0">
                <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          </PageHero>
        </div>
      </div>

      {/* ══════════════════════════════════════
          2. INTRO — 2 paragraphs
      ══════════════════════════════════════ */}
      <section className="bg-white py-14 lg:py-16">
        <Reveal className="max-w-[1280px] mx-auto px-6 flex flex-col gap-4 max-w-[900px]">
          <p className="text-[#374151] text-[15px] leading-[1.85]">
            In today&apos;s hyper-connected world, cyber threats are evolving faster than ever, targeting
            vulnerabilities in systems, people, and processes. Many organizations are exposed due to
            outdated infrastructure, poor visibility, or lack of preparedness.
          </p>
          <p className="text-[#374151] text-[15px] leading-[1.85]">
            Just one breach can compromise customer trust, disrupt operations, and result in regulatory
            penalties. That&apos;s why cyber resilience is no longer optional — it&apos;s critical. At iCentra,
            we help businesses build a strong, adaptive cybersecurity posture by protecting digital
            assets, managing risks, and ensuring regulatory compliance. Our approach is strategic,
            proactive, and tailored to your unique environment.
          </p>
        </Reveal>
      </section>

      {/* ══════════════════════════════════════
          3. FULL-WIDTH CYBER IMAGE
      ══════════════════════════════════════ */}
      <Reveal as="div" className="w-full max-w-[1280px] mx-auto px-6 pb-14">
        <div className="relative w-full h-[240px] sm:h-[320px] lg:h-[400px] rounded-2xl overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1400&q=80"
            alt="Cybersecurity"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[#0B1B4D]/40" />
          {/* Keyhole lock icon overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-20 h-20 text-[#00DBFF]/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
        </div>
      </Reveal>

      {/* ══════════════════════════════════════
          4. SERVICES — intro + 5-tile grid
      ══════════════════════════════════════ */}
      <section className="bg-white pb-14 lg:pb-16">
        <div className="max-w-[1280px] mx-auto px-6">
          <p className="text-[#374151] text-[15px] leading-[1.85] max-w-[900px] mb-3">
            From proactive risk assessments to real-time threat detection, our cybersecurity services
            are designed to protect every layer of your digital ecosystem — helping you stay ahead of
            threats, meet compliance demands, and build long-term resilience.
          </p>
          <p className="text-[#1A274F] text-[15px] font-bold mb-8">
            Our Cybersecurity Solutions Cover the Full Threat Landscape
          </p>

          {/* First 3 services */}
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {services.slice(0, 3).map((s) => (
              <StaggerItem key={s.title}>
                <h4 className="text-[#1A274F] text-[14px] font-bold mb-1.5">{s.title}</h4>
                <p className="text-[#6B7280] text-[13px] leading-relaxed">{s.desc}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>

          {/* Last 2 services */}
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[860px]">
            {services.slice(3).map((s) => (
              <StaggerItem key={s.title}>
                <h4 className="text-[#1A274F] text-[14px] font-bold mb-1.5">{s.title}</h4>
                <p className="text-[#6B7280] text-[13px] leading-relaxed">{s.desc}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ══════════════════════════════════════
          5. LET'S FORTIFY — dark navy CTA banner
      ══════════════════════════════════════ */}
      <section className="relative bg-[#1A274F] overflow-hidden py-14 lg:py-16">
        <div className="absolute inset-0 pointer-events-none opacity-[0.07]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="fortifyDots" x="0" y="0" width="64" height="64" patternUnits="userSpaceOnUse">
                <circle cx="32" cy="32" r="26" fill="none" stroke="white" strokeWidth="1.5" />
                <circle cx="0" cy="0" r="26" fill="none" stroke="white" strokeWidth="1.5" />
                <circle cx="64" cy="0" r="26" fill="none" stroke="white" strokeWidth="1.5" />
                <circle cx="0" cy="64" r="26" fill="none" stroke="white" strokeWidth="1.5" />
                <circle cx="64" cy="64" r="26" fill="none" stroke="white" strokeWidth="1.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#fortifyDots)" />
          </svg>
        </div>
        <Reveal className="relative z-10 max-w-[680px] mx-auto px-6 flex flex-col items-center text-center gap-4">
          <h2 className="text-white text-[26px] lg:text-[34px] font-extrabold leading-tight">
            Let&apos;s Fortify Your Cyber Defences
          </h2>
          <p className="text-white/60 text-[14px] leading-relaxed">
            Partner with iCentra to build the capability to evolve continuously.
          </p>
          <div className="mt-2">
            <ConsultationBtn />
          </div>
        </Reveal>
      </section>

      {/* ══════════════════════════════════════
          6. HOW IT WORKS — 4-column process
      ══════════════════════════════════════ */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-6">
          <SectionHeading
            title="How It Works"
            subtitle="Our cybersecurity approach is structured, comprehensive, and business-aligned."
            className="mb-1"
          />

          <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
            {howItWorks.map((step) => (
              <StaggerItem key={step.step} className="flex flex-col gap-3">
                {/* Step number */}
                <span className="text-[#DCE0E8] text-[36px] font-extrabold leading-none">{step.step}</span>
                <h4 className="text-[#1A274F] text-[15px] font-bold">{step.title}</h4>
                <p className="text-[#6B7280] text-[13px] leading-relaxed">{step.desc}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ══════════════════════════════════════
          7. CYBERSECURITY IS NOT OPTIONAL — dark navy banner
      ══════════════════════════════════════ */}
      <section className="relative bg-[#25429A] overflow-hidden py-14 lg:py-16">
        <div className="absolute inset-0 pointer-events-none opacity-[0.08]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="criticalDots" x="0" y="0" width="64" height="64" patternUnits="userSpaceOnUse">
                <circle cx="32" cy="32" r="26" fill="none" stroke="white" strokeWidth="1.5" />
                <circle cx="0" cy="0" r="26" fill="none" stroke="white" strokeWidth="1.5" />
                <circle cx="64" cy="0" r="26" fill="none" stroke="white" strokeWidth="1.5" />
                <circle cx="0" cy="64" r="26" fill="none" stroke="white" strokeWidth="1.5" />
                <circle cx="64" cy="64" r="26" fill="none" stroke="white" strokeWidth="1.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#criticalDots)" />
          </svg>
        </div>
        <Reveal className="relative z-10 max-w-[740px] mx-auto px-6 flex flex-col items-center text-center gap-4">
          <h2 className="text-white text-[24px] lg:text-[32px] font-extrabold leading-tight">
            Cybersecurity Is Not Optional — It&apos;s Critical
          </h2>
          <p className="text-white/60 text-[14px] leading-relaxed">
            Partner with iCentra to build the capability to evolve continuously.
          </p>
          <div className="mt-2">
            <ConsultationBtn />
          </div>
        </Reveal>
      </section>

      {/* ══════════════════════════════════════
          8. WHAT OUR CLIENT SAY ABOUT US
      ══════════════════════════════════════ */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-10">
            <SectionHeading title="What Our Client Say About Us" />
          </div>

          <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <StaggerItem key={i} className="bg-[#F7F9FC] rounded-2xl p-6 flex flex-col gap-4 border border-[#DCE0E8]">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 bg-[#A8B8F8]">
                      <Image src={t.avatar} alt={t.name} fill className="object-cover" sizes="40px" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[#1A274F] text-[13px] font-semibold truncate">{t.name}</p>
                      <p className="text-[#6B7280] text-[11px] truncate">{t.role}</p>
                    </div>
                  </div>
                  <StarRating count={t.stars} />
                </div>
                <p className="text-[#374151] text-[13px] leading-relaxed flex-1">
                  &ldquo;{t.text}&rdquo;
                </p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ══════════════════════════════════════
          9. HIGHLIGHTED TRANSFORMATION PROJECTS — real case studies
      ══════════════════════════════════════ */}
      <BlogCardCarousel
        items={caseStudyItems}
        heading="Highlighted Transformation Projects"
        bgClassName="bg-[#F7F9FC]"
        viewAllHref="/industry#case-studies"
        viewAllLabel="View All Case Studies"
      />

      {/* ══════════════════════════════════════
          10. INSIGHT ARTICLE — real Cybersecurity insights
      ══════════════════════════════════════ */}
      <section className="bg-white py-14 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-6">
          <SectionHeading title="Insight Article" className="mb-10" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {insightItems.map((post) => (
              <div key={post.slug} className="[&>div]:max-w-none [&>div]:w-full">
                <BlogCard
                  image={postImageUrl(post.mainImage) ?? "/images/bg.jpg"}
                  title={post.title}
                  date={formatPostDate(post.publishedAt)}
                  readTime={estimateReadTimeFromText(post.plainBody)}
                  href={`/news/${post.slug}`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
