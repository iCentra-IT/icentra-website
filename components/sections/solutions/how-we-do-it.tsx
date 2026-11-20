import Link from "next/link";
import SectionHeading from "@/components/ui/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/ui/motion/reveal";

export interface HowWeDoItItem {
  title: string;
  description: string;
  href: string;
}

interface HowWeDoItProps {
  intro?: string;
  items: HowWeDoItItem[];
}

/**
 * HowWeDoIt
 * Shared "4 sub-category" section used on every
 * /what-we-do/solutions/[category] page, so all category pages
 * share the same structure — only the content differs. Each sub-category is
 * a descriptive text block (eyebrow + summary) rather than an image card, so
 * the real content is readable before clicking through.
 */
export default function HowWeDoIt({ intro, items }: HowWeDoItProps) {
  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="max-w-[1280px] mx-auto px-6">
        <SectionHeading title="How We Do It" className="mb-4" />
        {intro && (
          <p className="text-[#374151] text-sm lg:text-base leading-[1.8] max-w-[860px] mb-12">
            {intro}
          </p>
        )}

        <StaggerGroup className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {items.map((item) => (
            <StaggerItem
              key={item.title}
              className="flex flex-col gap-3 bg-[#F7F9FC] rounded-2xl p-7 lg:p-8 border border-[#DCE0E8]"
            >
              <p className="text-[#0066FF] text-xs font-bold tracking-[0.14em] uppercase">
                {item.title}
              </p>
              <p className="text-[#374151] text-sm lg:text-base leading-relaxed flex-1">
                {item.description}
              </p>
              <Link
                href={item.href}
                className="group inline-flex items-center gap-1.5 text-[#0066FF] text-sm font-semibold hover:gap-2.5 transition-all w-fit"
              >
                Read more
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
