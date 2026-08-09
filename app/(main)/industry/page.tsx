"use client";

import TrustedPartners from "@/components/sections/home/partners";
import BlogCard from "@/components/ui/cards/blog-card";
import PageHero from "@/components/ui/page-hero";
import SectionHeading from "@/components/ui/section-heading";
import { CardCarouselSection } from "@/components/ui/carousel/carouselComponent";
import { NewsletterModal, WebinarRegistrationModal } from "@/components/forms/all-forms";
import Image from "next/image";
import Link from "next/link";


/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const industryTags = [
  "Government", "Not-for-Profit", "Banking and Finance",
  "Telecoms and IT", "Construction", "Oil and Gas",
  "Health", "Agriculture", "Education",
  "Manufacturing", "Defence", "Media",
];

const projects = [
  {
    bgImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80",
    logoText: "NRS",
    title: "Journey to Information Security Excellence at NRS",
    desc: "NNPC Limited's Information Technology Division (ITD) embarked on a transformative...",
    href: "/industry/case-study",
  },
  {
    bgImage: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&q=80",
    logoText: "CSN",
    title: "Transforming Project Management at CSN",
    desc: "NNPC Limited's Information Technology Division (ITD) embarked on a transformative...",
    href: "/industry/case-study",
  },
  {
    bgImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80",
    logoText: "NNPC",
    title: "Driving Agile Transformation at NNPC Limited IT Division",
    desc: "NNPC Limited's Information Technology Division (ITD) embarked on a transformative...",
    href: "/industry/case-study",
  },
];

const testimonials = [
  {
    name: "Crystal Maiden",
    role: "UX Designer",
    company: "",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80",
    stars: 5,
    text: "This is but this one is the best. The attention to detail and quality is very amazing for all designs. Highly recommended for any type of project.",
  },
  {
    name: "Dazzle Healer",
    role: "Head of Operations, Financial Technology Company",
    company: "Financial Technology Company",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80",
    stars: 5,
    text: "iCentra didn't just provide a service—they became an extension of our team. Their support helped us move from ideas to action, and we saw the difference almost immediately.",
  },
  {
    name: "Crystal Maiden",
    role: "UX Designer",
    company: "",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=80&q=80",
    stars: 5,
    text: "This kit is incredibly helpful for my design process. Components are clean, modern, and save me a lot of time for beginners and professionals alike.",
  },
];

const insightCards = [
  {
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
    title: "The New Operating Model for Sustainable Performance",
    date: "2nd Sep 2025", readTime: "3 min", href: "/news/operating-model",
  },
  {
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=600&q=80",
    title: "AI & Cybersecurity Governance: Getting Leadership By-In",
    date: "2nd Sep 2025", readTime: "2 min", href: "/news/ai-governance",
  },
  {
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80",
    title: "5 Ai Driven Threats Organizations Can't Ignore In 2026",
    date: "2nd Sep 2025", readTime: "2 min", href: "/news/ai-threats",
  },
  {
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80",
    title: "The New Operating Model for Sustainable Performance",
    date: "2nd Sep 2025", readTime: "3 min", href: "/news/operating-model-2",
  },
  {
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80",
    title: "AI & Cybersecurity Governance: Getting Leadership By-In",
    date: "2nd Sep 2025", readTime: "2 min", href: "/news/ai-governance-2",
  },
  {
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
    title: "5 Ai Driven Threats Organizations Can't Ignore In 2026",
    date: "2nd Sep 2025", readTime: "2 min", href: "/news/ai-threats-2",
  },
];

const whitepapers = [
  {
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80",
    title: "Project Management Trends 2025",
    href: "/news",
  },
  {
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80",
    title: "Agile Transformation in African Enterprises",
    href: "/news",
  },
  {
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=600&q=80",
    title: "Cybersecurity Readiness in a Digital World",
    href: "/news",
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
   PAGE
───────────────────────────────────────── */
export default function IndustriesPage() {
  return (
    <main className="w-full overflow-x-hidden">

      {/* ══════════════════════════════════════
          1. HERO — PageHero + industry pill tags
      ══════════════════════════════════════ */}
      <PageHero
        headline="Industries We Serve"
        subtext="Our experience spans varying industries and challenges, equipping us with a unique perspective that transforms every client relationship. We help you see the world differently, find opportunities you never imagined, and deliver that birth transformation. No matter your industry, we take the time to understand your unique needs, goals, and challenges."
      >
        {/* Industry tag pills */}
        <div className="flex flex-wrap gap-2 mt-2">
          {industryTags.map((tag) => (
            <span
              key={tag}
              className="px-3.5 py-1.5 rounded-full border border-white/30 text-white/80 text-[12px] font-medium hover:bg-white/10 hover:text-white cursor-pointer transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </PageHero>

      {/* ══════════════════════════════════════
          2. PROJECTS THAT DELIVERED TRANSFORMATION
      ══════════════════════════════════════ */}
      <CardCarouselSection
        items={projects}
        getKey={(p) => p.title}
        heading="Projects That Delivered Transformation"
        underlineWord="Projects"
        subtitle="We believe in showing. These case studies highlight the kind of change we've helped our clients achieve."
        bgClassName="bg-white"
        renderCard={(p) => (
          <div className="bg-white rounded-2xl overflow-hidden border border-[#DCE0E8] flex flex-col h-full">
            <div className="relative h-45 overflow-hidden bg-[#EAF3FB]">
              <Image src={p.bgImage} alt={p.title} fill className="object-cover opacity-40" sizes="400px" />
              <div className="absolute inset-0 bg-[#1A274F]/30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-[28px] font-extrabold tracking-widest drop-shadow">{p.logoText}</span>
              </div>
            </div>
            <div className="p-5 flex flex-col flex-1 gap-2">
              <h3 className="text-[#1A274F] text-[14px] font-semibold leading-snug">{p.title}</h3>
              <p className="text-[#6B7280] text-[13px] leading-relaxed flex-1">{p.desc}</p>
              <div className="mt-3">
                <Link href={p.href} className="inline-flex items-center px-5 py-2 rounded-full bg-[#0066FF] text-white text-[13px] font-medium hover:bg-[#25429A] transition-colors">
                  Read More
                </Link>
              </div>
            </div>
          </div>
        )}
      />

      {/* ══════════════════════════════════════
          3. OUR TRUSTED PARTNERS
      ══════════════════════════════════════ */}
      {/* <section className="bg-[#F7F9FC] py-12 lg:py-16 border-y border-[#DCE0E8]"> */}
        <TrustedPartners />
      {/* </section> */}

      {/* ══════════════════════════════════════
          4. WHAT OUR CLIENTS ARE SAYING
      ══════════════════════════════════════ */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <SectionHeading title="What Our Clients Are Saying" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-[#F7F9FC] rounded-2xl p-6 flex flex-col gap-4 border border-[#DCE0E8]">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 bg-[#A8B8F8]">
                    <Image src={t.avatar} alt={t.name} fill className="object-cover" sizes="40px" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[#1A274F] text-[13px] font-semibold leading-tight">{t.name}</p>
                    <p className="text-[#6B7280] text-[11px] leading-tight truncate max-w-[180px]">{t.role}</p>
                  </div>
                  <div className="ml-auto shrink-0">
                    <StarRating count={t.stars} />
                  </div>
                </div>
                <p className="text-[#374151] text-[13px] leading-relaxed flex-1">
                  &ldquo;{t.text}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          5. READY TO START? — dark navy CTA banner
      ══════════════════════════════════════ */}
      <section className="bg-main py-14 lg:py-16">
        <div className="max-w-170 mx-auto px-6 flex flex-col items-center text-center gap-4">
          <h2 className="text-white text-[24px] lg:text-[32px] font-extrabold leading-tight">
            Ready to Start Your Transformation?
          </h2>
          <p className="text-white/60 text-[14px] leading-relaxed">
            Every great success story begins with a conversation. We are here to support you every step of the way.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-7 py-3.5 rounded-full bg-[#0066FF] text-white text-[14px] font-semibold transition-colors mt-2"
          >
            Get In Touch
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════
          6. INSIGHTS — search/filter + BlogCard 2×3 grid
      ══════════════════════════════════════ */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-[#1A274F] text-[24px] lg:text-[28px] font-bold mb-1">Insights</h2>
          <p className="text-[#6B7280] text-[13px] mb-8">
            Original insights, reports, and events that spark transformation and drive results.
          </p>

          {/* Search + filter bar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            {/* Search */}
            <div className="relative flex-1 max-w-85">
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#DCE0E8] text-[14px] text-[#374151] placeholder-[#9CA3AF] focus:outline-none focus:border-[#0066FF] transition-colors"
              />
            </div>
            {/* Industry filter */}
            <select className="px-4 py-2.5 rounded-xl border border-[#DCE0E8] text-[14px] text-[#6B7280] bg-white focus:outline-none focus:border-[#0066FF] transition-colors cursor-pointer">
              <option value="">Select Industry</option>
              {industryTags.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
            {/* Solution filter */}
            <select className="px-4 py-2.5 rounded-xl border border-[#DCE0E8] text-[14px] text-[#6B7280] bg-white focus:outline-none focus:border-[#0066FF] transition-colors cursor-pointer">
              <option value="">Select Solution</option>
              <option>Enterprise Transformation</option>
              <option>Cybersecurity & GRC</option>
              <option>Strategy & Execution</option>
              <option>Learning & Talent</option>
            </select>
          </div>

          {/* BlogCard 2-row × 3-col grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {insightCards.map((card) => (
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

      {/* ══════════════════════════════════════
          7. STAY IN THE KNOW — light blue newsletter banner
      ══════════════════════════════════════ */}
      <section className="bg-[#EAF3FB] py-14 lg:py-16">
        <div className="max-w-150 mx-auto px-6 flex flex-col items-center text-center gap-4">
          <h2 className="text-[#1A274F] text-[24px] lg:text-[30px] font-bold leading-tight">
            Stay in the Know
          </h2>
          <p className="text-[#6B7280] text-[14px] leading-relaxed">
            Subscribe to receive the latest articles, reports, and event invitations delivered straight to your inbox.
          </p>
          <NewsletterModal triggerClassName="inline-flex items-center px-7 py-3.5 rounded-full bg-[#0066FF] text-white text-[14px] font-semibold hover:bg-[#25429A] transition-colors mt-1" />
        </div>
      </section>

      {/* ══════════════════════════════════════
          8. WHITE PAPERS & REPORTS
      ══════════════════════════════════════ */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-[#1A274F] text-[24px] lg:text-[28px] font-bold mb-2">
            White Papers &amp; Reports
          </h2>
          <p className="text-[#6B7280] text-[13px] mb-10 max-w-140">
            Download strategic documents, original research, and practical frameworks created by our experts to support your transformation journey.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {whitepapers.map((wp) => (
              <Link
                key={wp.title}
                href={wp.href}
                className="group flex flex-col gap-3"
              >
                <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden">
                  <Image
                    src={wp.image}
                    alt={wp.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <p className="text-[#1A274F] text-[15px] font-semibold leading-snug group-hover:text-[#0066FF] transition-colors">
                  {wp.title}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          9. TRANSFORMATION STARTS WITH CONVERSATION — dark CTA banner
      ══════════════════════════════════════ */}
      <section className="bg-main py-16 lg:py-20">
        <div className="max-w-175 mx-auto px-6 flex flex-col items-center text-center gap-5">
          <h2 className="text-white text-[24px] lg:text-[34px] font-extrabold leading-tight">
            Transformation starts with conversation.
          </h2>
          <p className="text-white/60 text-[14px] leading-relaxed max-w-135">
            Join our monthly webinar series, Transform by iCentra, where we bring together leading voices in business, technology, and strategy to discuss key issues, share best practices, and inspire action.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mt-2">
            <WebinarRegistrationModal triggerClassName="inline-flex items-center px-7 py-3.5 rounded-full bg-[#0066FF] text-white text-[14px] font-semibold transition-colors" />
            <Link
              href="/events"
              className="inline-flex items-center px-7 py-3.5 rounded-full border border-white/30 text-white text-[14px] font-semibold hover:bg-white/10 transition-colors"
            >
              View Past Recordings
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}