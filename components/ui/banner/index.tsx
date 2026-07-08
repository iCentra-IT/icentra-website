import Link from "next/link";
import Image from "next/image";

interface DiscoverBannerProps {
  headline: string;
  subtext: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  image: string;
  imageAlt: string;
}

export default function DiscoverBanner({
  headline,
  subtext,
  primaryCta,
  secondaryCta,
  image,
  imageAlt,
}: DiscoverBannerProps) {
  return (
    <section className="w-full grid grid-cols-1 lg:grid-cols-2 overflow-hidden" style={{ minHeight: "320px" }}>

      {/* ── LEFT — blue panel with hex pattern ── */}
      <div
        className="relative flex-1 flex items-center px-10 py-14 lg:px-16 lg:py-20"
        style={{
          background: "linear-gradient(135deg, #1a2f6b 0%, #1e3a8a 40%, #1A274F 100%)",
        }}
      >
        
        {/* Content */}
        <div className="relative z-10 max-w-130 m-auto">
          {/* Headline */}
          <h2 className="text-white text-[30px] md:text-[38px] lg:text-[44px] font-bold leading-[1.1] mb-4">
            {headline.split("\n").map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
          </h2>

          {/* Subtext */}
          <p className="text-white/70 text-[14px] lg:text-[15px] leading-relaxed mb-8 max-w-100">
            {subtext}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <Link
              href={primaryCta.href}
              className="inline-flex items-center px-6 py-3 rounded-full bg-[#0066FF] text-white text-[14px] font-semibold hover:bg-light-blue hover:text-[#1A274F] transition-colors"
            >
              {primaryCta.label}
            </Link>
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="inline-flex items-center px-6 py-3 rounded-full bg-[#0066FF] text-white text-[14px] font-semibold hover:bg-light-blue hover:text-[#1A274F] transition-colors"
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* ── RIGHT — full bleed photo ── */}
      <div className="relative w-full min-h-70 lg:min-h-0">
        <Image
          src={image}
          alt={imageAlt}
          fill
          className="object-cover object-center"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
      </div>

    </section>
  );
}