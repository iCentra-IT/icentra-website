import TrustedPartners from "@/components/sections/home/partners";
import BlogCard from "@/components/ui/cards/blog-card";
import PageHero from "@/components/ui/page-hero";
import SectionHeading from "@/components/ui/section-heading";
import CaseStudiesSection, { type CaseStudyCard } from "@/components/sections/industry/case-studies-section";
import { NewsletterModal, WebinarRegistrationModal } from "@/components/forms/all-forms";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/motion/reveal";
import { sanityFetch } from "@/sanity/lib/live";
import { postImageUrl } from "@/sanity/lib/image";
import { POSTS_BY_CATEGORY_QUERY } from "@/sanity/lib/queries";
import { formatPostDate, estimateReadTimeFromText } from "@/sanity/lib/format";
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

export default async function IndustriesPage() {
  const [{ data: caseStudyPosts }, { data: insightPosts }] = await Promise.all([
    sanityFetch({ query: POSTS_BY_CATEGORY_QUERY, params: { slug: "case-study" } }),
    sanityFetch({ query: POSTS_BY_CATEGORY_QUERY, params: { slug: "insights" } }),
  ]);

  const caseStudies: CaseStudyCard[] = ((caseStudyPosts ?? []) as RawPost[]).map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    imageUrl: postImageUrl(post.mainImage),
    date: formatPostDate(post.publishedAt),
    readTime: estimateReadTimeFromText(post.plainBody),
  }));

  const latestInsights = ((insightPosts ?? []) as RawPost[]).slice(0, 4).map((post) => ({
    slug: post.slug,
    title: post.title,
    imageUrl: postImageUrl(post.mainImage),
    date: formatPostDate(post.publishedAt),
    readTime: estimateReadTimeFromText(post.plainBody),
  }));

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
          2. PROJECTS THAT DELIVERED TRANSFORMATION — real case studies, paginated
      ══════════════════════════════════════ */}
      <CaseStudiesSection items={caseStudies} />

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
          <div className="md:text-center mb-10">
            <SectionHeading title="What Our Clients Are Saying" />
          </div>

          <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <StaggerItem key={i} className="bg-[#F7F9FC] rounded-2xl p-6 flex flex-col gap-4 border border-[#DCE0E8]">
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
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ══════════════════════════════════════
          5. READY TO START? — dark navy CTA banner
      ══════════════════════════════════════ */}
      <section className="bg-main py-14 lg:py-16">
        <Reveal className="max-w-170 mx-auto px-6 flex flex-col items-center text-center gap-4">
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
        </Reveal>
      </section>

      {/* ══════════════════════════════════════
          6. INSIGHTS — search/filter + BlogCard 2×3 grid
      ══════════════════════════════════════ */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            title="Insights"
            subtitle="Original insights, reports, and events that spark transformation and drive results."
            className="mb-2"
          />

          {/* Latest 4 insights — single row */}
          <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {latestInsights.map((post) => (
              <StaggerItem key={post.slug} className="[&>div]:max-w-none [&>div]:w-full">
                <BlogCard
                  image={post.imageUrl ?? "/images/bg.jpg"}
                  title={post.title}
                  date={post.date}
                  readTime={post.readTime}
                  href={`/news/${post.slug}`}
                />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ══════════════════════════════════════
          7. STAY IN THE KNOW — light blue newsletter banner
      ══════════════════════════════════════ */}
      <section className="bg-[#EAF3FB] py-14 lg:py-16">
        <Reveal className="max-w-150 mx-auto px-6 flex flex-col items-center text-center gap-4">
          <h2 className="text-[#1A274F] text-[24px] lg:text-[30px] font-bold leading-tight">
            Stay in the Know
          </h2>
          <p className="text-[#6B7280] text-[14px] leading-relaxed">
            Subscribe to receive the latest articles, reports, and event invitations delivered straight to your inbox.
          </p>
          <NewsletterModal triggerClassName="inline-flex items-center px-7 py-3.5 rounded-full bg-[#0066FF] text-white text-[14px] font-semibold hover:bg-[#25429A] transition-colors mt-1" />
        </Reveal>
      </section>

      {/* ══════════════════════════════════════
          8. WHITE PAPERS & REPORTS
      ══════════════════════════════════════ */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            title="White Papers & Reports"
            subtitle="Download strategic documents, original research, and practical frameworks created by our experts to support your transformation journey."
            className="mb-2"
          />

          <StaggerGroup className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
            {whitepapers.map((wp) => (
              <StaggerItem key={wp.title}>
                <Link
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
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ══════════════════════════════════════
          9. TRANSFORMATION STARTS WITH CONVERSATION — dark CTA banner
      ══════════════════════════════════════ */}
      <section className="bg-main py-16 lg:py-20">
        <Reveal className="max-w-175 mx-auto px-6 flex flex-col items-center text-center gap-5">
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
        </Reveal>
      </section>

    </main>
  );
}