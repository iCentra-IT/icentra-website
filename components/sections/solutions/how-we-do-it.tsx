import SectionHeading from "@/components/ui/section-heading";
import SolutionCard from "@/components/ui/cards/solution-card";

export interface HowWeDoItItem {
  image: string;
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
 * Shared "4 sub-category cards" section used on every
 * /what-we-do/solutions/[category] page, so all category pages
 * share the same structure — only the content differs.
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item) => (
            <div
              key={item.title}
              className="[&>a]:max-w-none [&>a]:w-full [&>a]:aspect-auto [&>a]:h-[340px]"
            >
              <SolutionCard
                image={item.image}
                title={item.title}
                description={item.description}
                href={item.href}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
