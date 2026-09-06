import Link from "next/link";
import { Reveal } from "@/components/ui/motion/reveal";

interface DottedCtaBannerLink {
  label: string;
  href: string;
}

interface DottedCtaBannerProps {
  title: string;
  subtext?: string;
  ctaLabel?: string;
  ctaHref?: string;
  bgClassName?: string;
  /** Extra secondary link buttons rendered alongside the primary CTA (outline style) */
  extraLinks?: DottedCtaBannerLink[];
}

/**
 * DottedCtaBanner
 * The recurring "dark banner with a dotted circle pattern + centered CTA"
 * block used to close out every /what-we-do/solutions/[category] page.
 */
export default function DottedCtaBanner({
  title,
  subtext = "Partner with iCentra to build the capability to evolve continuously.",
  ctaLabel = "Get in Touch",
  ctaHref = "/contact",
  bgClassName = "bg-[#1A274F]",
  extraLinks,
}: DottedCtaBannerProps) {
  return (
    <section className={`relative ${bgClassName} overflow-hidden py-20 lg:py-28`}>
    

      <Reveal className="relative z-10 max-w-[760px] mx-auto px-6 flex flex-col items-center text-center gap-5">
        <h2 className="text-white text-[28px] lg:text-[40px] font-extrabold leading-tight">
          {title}
        </h2>
        <p className="text-white/65 text-sm lg:text-base leading-[1.8] max-w-[680px]">
          {subtext}
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
          <Link
            href={ctaHref}
            className="inline-flex items-center px-8 py-3.5 rounded-full bg-[#0066FF] text-white text-sm font-semibold hover:bg-[#00DBFF] hover:text-[#1A274F] transition-colors"
          >
            {ctaLabel}
          </Link>
          {extraLinks?.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="inline-flex items-center px-8 py-3.5 rounded-full border border-white/40 text-white text-sm font-semibold hover:bg-white hover:text-[#1A274F] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
